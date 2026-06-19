'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, X, Loader2, Minimize2, Maximize2, Send, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { usePageStore } from '@/store/usePageStore';
import { useCoachHistory, useSaveCoachMessage } from '@/hooks/queries/useAi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: string[];
}

export default function CoachChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const pageContextData = usePageStore((s) => s.pageContextData);

  const { data: historyData, isLoading: isLoadingHistory } = useCoachHistory();
  const saveMessageMutation = useSaveCoachMessage();

  useEffect(() => {
    if (historyData && historyData.length > 0 && messages.length === 0) {
      setMessages(historyData);
    }
  }, [historyData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '', toolInvocations: [] }]);

    try {
      // Create context block
      let systemContext = `[System Context: User is on page '${pathname}'.`;
      if (pageContextData) {
        systemContext += ` Data being viewed: ${pageContextData}`;
      }
      systemContext += ']';

      // Secretly prepend context to the user's message payload for the backend
      const contextualizedMessage = { 
        role: 'user' as const, 
        content: `${systemContext}\n\n${userMessage.content}` 
      };

      const payloadMessages = messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })).concat(contextualizedMessage);

      const response = await fetch('http://localhost:8000/agent/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_type: 'coach',
          messages: payloadMessages
        })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finalAssistantContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            const dataStr = line.slice(6).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];

                if (data.type === 'text') {
                  lastMsg.content += data.content;
                  finalAssistantContent += data.content;
                } else if (data.type === 'tool_start') {
                  if (!lastMsg.toolInvocations) lastMsg.toolInvocations = [];
                  lastMsg.toolInvocations.push(`Thinking: Used ${data.tool}...`);
                }
                
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing SSE JSON:", e, "Data string:", dataStr);
            }
          }
        }
      }

      // Save messages to backend
      try {
        saveMessageMutation.mutateAsync({
          messages: [
            { role: 'user', content: userMessage.content }, // Save the original clean message, not contextualized
            { role: 'assistant', content: finalAssistantContent }
          ]
        });
      } catch (e) {
        console.error("Failed to save messages to history", e);
      }

    } catch (error) {
      console.error('Error connecting to coach:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        lastMsg.content = "Sorry, I'm having trouble connecting to the server right now.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary text-on-primary rounded-sm hover:opacity-90 transition-all z-50 flex items-center justify-center group border border-hairline shadow-none"
      >
        <Bot size={28} className="group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className={clsx(
      "fixed right-6 bottom-6 flex flex-col bg-canvas border-hairline shadow-none rounded-sm overflow-hidden z-50 transition-all duration-300 ease-in-out",
      isMinimized ? "w-80 h-16" : "w-96 h-[600px] max-h-[80vh]"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-canvas-dark border-b-hairline cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-on-primary rounded-sm">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-display text-ink">Career Coach</h3>
            <p className="text-[10px] font-mono text-body uppercase tracking-[0.08px]">Powered by NVIDIA NIM</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-body">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:text-ink transition-colors">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }} className="hover:text-ink transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={clsx("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto" : "mr-auto")}>
                <div className={clsx(
                  "p-3 rounded-sm text-sm leading-relaxed border-hairline",
                  msg.role === 'user' 
                    ? "bg-primary text-on-primary" 
                    : "bg-canvas-dark text-ink"
                )}>
                  {msg.content || (msg.role === 'assistant' && !msg.toolInvocations?.length ? <span className="animate-pulse">...</span> : null)}
                </div>
                
                {/* Tool Invocations */}
                {msg.toolInvocations && msg.toolInvocations.map((toolStr, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2 ml-2 text-[10px] font-mono uppercase tracking-[0.08px] text-body">
                    <Loader2 size={12} className="animate-spin" />
                    <span>{toolStr}</span>
                  </div>
                ))}
              </div>
            ))}
            {isLoading && !messages[messages.length - 1]?.content && !messages[messages.length - 1]?.toolInvocations?.length && (
              <div className="flex items-center gap-2 ml-2 text-[10px] font-mono uppercase tracking-[0.08px] text-body">
                <Loader2 size={12} className="animate-spin" />
                <span>Coach is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-canvas-dark border-t-hairline">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your career coach..."
                className="flex-1 bg-canvas text-sm text-ink placeholder-body rounded-sm px-4 py-2 border-hairline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-primary text-on-primary rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, X, Loader2, Minimize2, Maximize2, Send, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { usePageStore } from '@/store/usePageStore';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: string[];
}

export default function RecruiterCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const pathname = usePathname();
  const pageContextData = usePageStore((s) => s.pageContextData);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '', toolInvocations: [] }]);

    try {
      let systemContext = `[System Context: User is on page '${pathname}'.`;
      if (pageContextData) {
        systemContext += ` Data being viewed: ${pageContextData}`;
      }
      systemContext += ']';

      const contextualizedMessage = { 
        role: 'user' as const, 
        content: `${systemContext}\n\n${userMessage.content}` 
      };

      const payloadMessages = messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })).concat(contextualizedMessage);

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/agent/invoke`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          agent_type: 'recruiter',
          messages: payloadMessages
        })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finalAssistantContent = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? ''; // retain incomplete trailing line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6).trim();
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
              console.error("Error parsing SSE JSON:", e, dataStr);
            }
          }
        }
      }

      // Optionally save to aiChatMessages DB here if needed
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Sorry, I'm having trouble connecting right now.";
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
        className="fixed bottom-6 right-6 p-4 bg-primary hover:opacity-90 text-on-primary rounded-sm shadow-none transition-opacity z-50 flex items-center justify-center group"
      >
        <Sparkles className="w-6 h-6 mr-2 group-hover:animate-pulse" />
        <span className="font-display">Copilot</span>
      </button>
    );
  }

  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 bg-canvas rounded-sm shadow-none border-hairline flex flex-col overflow-hidden transition-all duration-300 z-50',
        isMinimized ? 'w-80 h-16' : 'w-[400px] h-[600px]'
      )}
    >
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between text-on-primary cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-on-primary" />
          <div>
            <h3 className="font-display">Recruiter Copilot</h3>
            {!isMinimized && <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-on-primary opacity-80">Powered by NVIDIA Nemotron</p>}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 hover:bg-canvas/20 rounded-sm transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:bg-canvas/20 rounded-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-canvas-dark">
            {messages.map((msg, i) => (
              <div key={msg.id || i} className={clsx('flex flex-col max-w-[85%]', msg.role === 'user' ? 'ml-auto' : 'mr-auto')}>
                <div className={clsx(
                  'rounded-sm p-3 text-[10px] font-mono uppercase tracking-[0.08px] leading-relaxed whitespace-pre-wrap', 
                  msg.role === 'user' 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-canvas border-hairline text-ink'
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
            {isLoading && !messages.length && (
              <div className="flex justify-start">
                <div className="bg-canvas border-hairline rounded-sm p-3 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.08px] text-body">Thinking...</span>
                </div>
              </div>
            )}
            {isLoading && messages.length > 0 && !messages[messages.length - 1].content && !messages[messages.length - 1].toolInvocations?.length && (
              <div className="flex justify-start">
                <div className="bg-canvas border-hairline rounded-sm p-3 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.08px] text-body">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-canvas border-t-hairline">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me to screen this candidate..."
                className="w-full pl-4 pr-12 py-3 rounded-sm border-hairline bg-canvas-dark text-ink font-mono text-[10px] uppercase tracking-[0.08px] focus:outline-none focus:border-primary transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:opacity-90 disabled:opacity-50 text-on-primary rounded-sm transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

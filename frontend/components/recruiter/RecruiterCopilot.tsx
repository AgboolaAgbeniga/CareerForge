'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, X, Loader2, Minimize2, Maximize2, Send, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { usePageContext } from '@/contexts/PageContext';
import apiClient from '@/lib/apiClient';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: string[];
}

export default function RecruiterCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I am your Recruiter Copilot. I can screen candidates, draft outreach emails, and analyze talent pools." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const pathname = usePathname();
  const { pageContextData } = usePageContext();
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
        role: 'user', 
        content: `${systemContext}\n\n${userMessage.content}` 
      };

      const payloadMessages = messages.map(m => ({ role: m.role, content: m.content })).concat(contextualizedMessage);

      const response = await fetch('http://localhost:8000/agent/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_type: 'recruiter',
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
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <Sparkles className="w-6 h-6 mr-2 group-hover:animate-pulse" />
        <span className="font-semibold">Copilot</span>
      </button>
    );
  }

  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 z-50',
        isMinimized ? 'w-80 h-16' : 'w-[400px] h-[600px]'
      )}
    >
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex items-center justify-between text-white cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-indigo-200" />
          <div>
            <h3 className="font-semibold">Recruiter Copilot</h3>
            {!isMinimized && <p className="text-xs text-indigo-200">Powered by NVIDIA Nemotron</p>}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg, i) => (
              <div key={msg.id || i} className={clsx('flex flex-col max-w-[85%]', msg.role === 'user' ? 'ml-auto' : 'mr-auto')}>
                <div className={clsx(
                  'rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap', 
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm rounded-tl-sm'
                )}>
                  {msg.content || (msg.role === 'assistant' && !msg.toolInvocations?.length ? <span className="animate-pulse">...</span> : null)}
                </div>
                
                {/* Tool Invocations */}
                {msg.toolInvocations && msg.toolInvocations.map((toolStr, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-2 ml-2 text-xs text-indigo-400">
                    <Loader2 size={12} className="animate-spin" />
                    <span>{toolStr}</span>
                  </div>
                ))}
              </div>
            ))}
            {isLoading && !messages[messages.length - 1].content && !messages[messages.length - 1].toolInvocations?.length && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-sm flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-sm text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me to screen this candidate..."
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors"
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

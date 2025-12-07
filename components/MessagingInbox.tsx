import React from 'react';
import {
  Plus,
  Search,
  Briefcase,
  Building2,
  User,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Clock,
  Paperclip,
  Smile,
  Sparkles,
  ArrowRight,
  Bot,
  Wand2,
  BarChart2,
  CalendarPlus,
  FileText,
} from 'lucide-react';

const styles = `
body {
  font-family: 'Rethink Sans', sans-serif;
  background-color: #fafafa;
  overflow-x: hidden;
}

/* Subtle Glass Effect */
.glass-panel {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Gradients */
.ai-gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-btn-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  transition: all 0.2s ease;
}
.ai-btn-gradient:hover {
  opacity: 0.95;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  transform: translateY(-1px);
}

/* Message Bubble Gradient (User) */
.msg-bubble-user {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
}

/* AI Border Gradient */
.ai-border-gradient {
  position: relative;
  background: #fff;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 0.75rem;
}
.ai-border-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #60a5fa, #c084fc);
}

/* Custom Scrollbar for Chat */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Pulse Animation for AI */
@keyframes pulse-soft {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
.animate-pulse-soft {
  animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

const MessagingInbox: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main className="flex-grow flex overflow-hidden w-full max-w-7xl mx-auto border-x border-slate-200 bg-white h-[calc(100vh-64px)]">
        {/* 2. CONVERSATION LIST PANEL (Left) */}
        <aside className="w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-200 bg-slate-50/30 flex-none z-10">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex-none">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Messages
              </h2>
              <button className="text-slate-400 hover:text-indigo-600 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-slate-200">
                <Plus size={18} />
              </button>
            </div>
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {/* Active Item */}
            <div className="p-4 border-b border-slate-100 bg-white border-l-4 border-l-indigo-600 cursor-pointer hover:bg-slate-50 transition-colors group relative">
              <div className="flex gap-3">
                <div className="relative flex-none">
                  <div className="w-12 h-12 rounded-full border border-slate-200 p-0.5 bg-white">
                    <img
                      src="https://i.pravatar.cc/150?u=sara"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                      Sarah Miller
                    </h3>
                    <span className="text-[10px] font-medium text-indigo-600">
                      2m
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                    <Briefcase size={10} />
                    Stripe &middot; Sr. Designer
                  </p>
                  <p className="text-xs text-slate-600 truncate font-medium">
                    That sounds great! Are you available...
                  </p>
                </div>
              </div>
            </div>

            {/* Unread Item */}
            <div className="p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors group">
              <div className="flex gap-3">
                <div className="relative flex-none">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    L
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-slate-700 truncate group-hover:text-slate-900">
                      Linear Team
                    </h3>
                    <span className="text-[10px] text-slate-400">1h</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Building2 size={10} />
                    Linear
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 truncate group-hover:text-slate-600">
                      Application viewed: Frontend Eng...
                    </p>
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Read Item */}
            <div className="p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors group opacity-70 hover:opacity-100">
              <div className="flex gap-3">
                <div className="relative flex-none">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 p-0.5">
                    <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <User size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-slate-700 truncate">
                      Michael Chen
                    </h3>
                    <span className="text-[10px] text-slate-400">1d</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    Vercel &middot; Engineering Mgr
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    Thanks for applying. We will be...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex-none">
            <button className="w-full py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
              Start New Conversation
            </button>
          </div>
        </aside>

        {/* 3. CHAT PANEL (Center) */}
        <section className="flex-1 flex flex-col min-w-0 bg-white relative">
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 flex-none bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?u=sara"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Sarah Miller
                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    Stripe
                  </span>
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  Regarding:
                  <span className="font-medium text-slate-700">
                    Senior Product Designer
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-md">
                <Phone size={18} />
              </button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-md">
                <Video size={18} />
              </button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-md">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Date Divider */}
            <div className="flex justify-center">
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Today
              </span>
            </div>

            {/* Recruiter Message */}
            <div className="flex gap-4 max-w-2xl">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-none overflow-hidden mt-1">
                <img
                  src="https://i.pravatar.cc/150?u=sara"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none px-5 py-3 text-sm text-slate-700 leading-relaxed shadow-sm">
                  <p className="mb-2">
                    Hi Alex! Thanks for applying to the Senior Product Designer
                    role.
                  </p>
                  <p>
                    I reviewed your portfolio and I'm really impressed with the
                    case study on the Design System migration. The attention to
                    detail is exactly what we're looking for at Stripe.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 ml-1 font-medium">
                  10:23 AM
                </span>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-none overflow-hidden mt-1 ring-2 ring-indigo-50">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-end">
                <div className="msg-bubble-user text-white rounded-2xl rounded-tr-none px-5 py-3 text-sm leading-relaxed shadow-md">
                  <p>Hi Sarah! Thank you so much for reaching out.</p>
                  <p className="mt-2">
                    I've been a huge fan of Stripe's interface for years, so
                    that means a lot. I'd love to chat more about how I can
                    contribute to the team.
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-1 mr-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    10:35 AM
                  </span>
                  <CheckCheck size={12} />
                </div>
              </div>
            </div>

            {/* Recruiter Message */}
            <div className="flex gap-4 max-w-2xl">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-none overflow-hidden mt-1">
                <img
                  src="https://i.pravatar.cc/150?u=sara"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none px-5 py-3 text-sm text-slate-700 leading-relaxed shadow-sm">
                  <p>
                    That's great to hear! Are you available for a quick
                    30-minute intro call this coming Tuesday?
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 ml-1 font-medium">
                  10:38 AM
                </span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-white flex-none">
            {/* AI Hint in Input */}
            <div className="flex justify-between items-center mb-2 px-1">
              <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock size={12} />
                Respond within 24 hours to increase success rate by 40%.
              </p>
            </div>

            <div className="relative bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
              <textarea
                className="w-full bg-transparent border-none rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:ring-0 resize-none custom-scrollbar"
                rows={2}
                placeholder="Write a message..."
              ></textarea>

              <div className="flex justify-between items-center p-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                <div className="flex gap-1">
                  <button
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Attach File"
                  >
                    <Paperclip size={18} />
                  </button>
                  <button
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Insert Emoji"
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                    title="AI Draft"
                  >
                    <Sparkles size={14} />
                    AI Draft
                  </button>
                </div>
                <button className="ai-btn-gradient text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                  Send
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI INSIGHTS PANEL (Right Sidebar) */}
        <aside className="hidden xl:flex w-80 flex-col border-l border-slate-200 bg-slate-50/30 flex-none overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Bot size={20} />
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              AI Assistant
            </h3>
          </div>

          {/* Insight Card 1 (Contextual) */}
          <div className="ai-border-gradient p-0.5 rounded-xl shadow-sm">
            <div className="bg-white rounded-[10px] p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Smart Suggestion
                </h4>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Recruiter asked for availability. Propose specific slots to
                reduce back-and-forth.
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded p-2 mb-3 cursor-pointer hover:border-indigo-200 transition-colors">
                <p className="text-xs text-slate-500 italic">
                  "Yes, Tuesday works well. I'm free between 2 PM and 4 PM PST.
                  Does that work for you?"
                </p>
              </div>
              <button className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center justify-center gap-2 group">
                <Wand2 size={12} />
                Insert Suggestion
              </button>
            </div>
          </div>

          {/* Insight Card 2 (Tone) */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <BarChart2 size={14} />
                Conversation Tone
              </h4>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                Positive
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Professionalism</span>
                  <span>98%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-800 rounded-full w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Engagement</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-100 pt-2">
              Tip: Maintain this tone. It aligns with Stripe's culture.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
              Next Steps
            </h4>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm text-xs font-medium text-slate-600 transition-all flex items-center gap-2">
              <CalendarPlus size={14} />
              Schedule Interview
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm text-xs font-medium text-slate-600 transition-all flex items-center gap-2">
              <FileText size={14} />
              Share Resume PDF
            </button>
          </div>
        </aside>
      </main>
    </>
  );
};

export default MessagingInbox;

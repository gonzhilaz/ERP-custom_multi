'use client';

import React from 'react';
import {
  MessageSquare,
  Send,
  Mic,
  Paperclip,
  Users,
  Search,
  Volume2,
  FileText
} from 'lucide-react';
import { useChat } from '@/hooks/chat/useChat';

export const ChatView = () => {
  const {
    channels,
    activeChannel,
    setActiveChannel,
    messages,
    inputMessage,
    setInputMessage,
    isRecordingVoice,
    sendMessage,
    sendVoiceNote
  } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Channels Sidebar */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            <h2 className="font-bold text-xs text-slate-900 dark:text-white">Team Chat</h2>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari channel atau staf..."
              className="w-full bg-white dark:bg-slate-800 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase">Channels & Teams</div>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeChannel.id === ch.id
                  ? 'bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Users className="w-3.5 h-3.5 shrink-0 opacity-60" />
                <span className="truncate">{ch.name}</span>
              </div>
              {ch.unread > 0 && (
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] flex items-center justify-center font-bold">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeChannel.name}</h3>
            <span className="text-[10px] text-slate-400">Diskusi Real-time, Kirim Berkas & Voice Note</span>
          </div>
          <div className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>WebSocket Live</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
              <div className="text-[10px] text-slate-400 font-medium mb-1">{m.sender} • {m.time}</div>

              {m.type === 'TEXT' && (
                <div className={`p-3 rounded-2xl text-xs max-w-md ${
                  m.isMe
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              )}

              {m.type === 'VOICE_NOTE' && (
                <div className={`p-3 rounded-2xl text-xs max-w-md flex items-center gap-3 ${
                  m.isMe
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="font-semibold text-[11px]">{m.content}</div>
                    <div className="text-[9px] opacity-80">{m.duration} • Audio Voice Note</div>
                  </div>
                </div>
              )}

              {m.type === 'FILE' && (
                <div className={`p-3 rounded-2xl text-xs max-w-md flex items-center gap-3 border border-slate-200 dark:border-slate-700 ${
                  m.isMe ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-slate-50 dark:bg-slate-800 rounded-tl-none'
                }`}>
                  <FileText className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="font-bold text-[11px]">{m.fileName}</div>
                    <div className="text-[9px] opacity-75">{m.fileSize} • Terlampir</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={sendVoiceNote}
            className={`p-2 rounded-lg transition-colors ${
              isRecordingVoice
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isRecordingVoice ? 'Merekam Suara...' : 'Ketik pesan atau ketik /po untuk referensi...'}
            className="flex-1 bg-white dark:bg-slate-800 text-xs px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            type="submit"
            className="p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-md shadow-sky-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

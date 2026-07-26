'use client';

import { useState } from 'react';
import { MOCK_CHANNELS, MOCK_INITIAL_MESSAGES, ChatChannelItem, ChatMessageItem } from '@/lib/mock/chat';

export function useChat() {
  const [activeChannel, setActiveChannel] = useState<ChatChannelItem>(MOCK_CHANNELS[1]);
  const [messages, setMessages] = useState<ChatMessageItem[]>(MOCK_INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessageItem = {
      id: `m-${Date.now()}`,
      sender: 'Budi Santoso (Anda)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'TEXT',
      content: inputMessage
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
  };

  const sendVoiceNote = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      const voiceMsg: ChatMessageItem = {
        id: `m-${Date.now()}`,
        sender: 'Budi Santoso (Anda)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        type: 'VOICE_NOTE',
        content: 'Voice Mail Pesan Suara (0:15)',
        duration: '0:15'
      };
      setMessages((prev) => [...prev, voiceMsg]);
    }, 1500);
  };

  return {
    channels: MOCK_CHANNELS,
    activeChannel,
    setActiveChannel,
    messages,
    inputMessage,
    setInputMessage,
    isRecordingVoice,
    sendMessage,
    sendVoiceNote
  };
}

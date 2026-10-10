'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Brain,
  RotateCcw,
  Bot,
  User,
  Zap,
} from 'lucide-react';
import { WardrobeItem, HistoricalEra } from '@/data/historical-data';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface AiStylistChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentEra: HistoricalEra;
  eventContext: string;
  selectedStyle: string;
  selectedItems: WardrobeItem[];
}

const SAMPLE_QUESTIONS = [
  'Phối Áo Ngũ Thân với sneakers sao cho sành điệu mà chuẩn mực?',
  'Tại sao họa tiết Rồng 5 móng bị cấm kỵ với đồ dạo phố?',
  'Phân biệt phom dáng Áo Giao Lĩnh và Áo Viên Lĩnh?',
  'Gợi ý set đồ Việt phục dự đám cưới trang nhã cho Gen Z?',
];

let msgCounter = 0;
function createMessageId(): string {
  msgCounter += 1;
  return `msg-${Date.now()}-${msgCounter}`;
}

export function AiStylistChatDrawer({
  isOpen,
  onClose,
  currentEra,
  eventContext,
  selectedStyle,
  selectedItems,
}: AiStylistChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Chào bạn! Mình là AI Stylist kiêm Cố vấn Sử học của "Áo Xưa Nay". Bạn đang tìm hiểu phục trang thời nào hoặc muốn mình tư vấn cách mix & match Việt phục đi học, dạo phố, dự tiệc?',
      timestamp: '10:00',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [highThinking, setHighThinking] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          currentOutfitContext: {
            era: currentEra.name,
            event: eventContext,
            style: selectedStyle,
            items: selectedItems.map((i) => i.name),
          },
          enableHighThinking: highThinking,
        }),
      });

      const data = await response.json();
      const modelReply = data.reply || 'Cảm ơn bạn đã hỏi. Bạn muốn tìm hiểu thêm về khía cạnh nào nữa?';

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-model-${Date.now()}`,
          role: 'model',
          content: modelReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-model-err-${Date.now()}`,
          role: 'model',
          content:
            'Hiện tại kết nối mạng đang gián đoạn một chút. Nhưng về nguyên tắc phối đồ, bạn hãy nhớ: Tôn trọng phom dáng cổ và tiết chế phụ kiện hiện đại để trang phục hài hòa nhất nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: createMessageId(),
        role: 'model',
        content: 'Cuộc trò chuyện đã được làm mới. Hãy đặt câu hỏi cho Cố vấn thời trang nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#991B1B] text-amber-100 flex items-center justify-center font-bold text-sm shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                AI Stylist & Cố Vấn Sử Học
              </h3>
              <p className="text-[11px] text-stone-500">
                gemini-3.1-pro-preview · Tư duy sâu (High Thinking)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* High Thinking Toggle */}
            <button
              onClick={() => setHighThinking(!highThinking)}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all ${
                highThinking
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-stone-100 border-stone-200 text-stone-600'
              }`}
              title="Bật/Tắt chế độ suy luận sâu cho các câu hỏi phức tạp"
            >
              <Brain className={`w-3.5 h-3.5 ${highThinking ? 'text-amber-600' : 'text-stone-400'}`} />
              <span className="hidden sm:inline">High Thinking</span>
            </button>

            <button
              onClick={handleClearHistory}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="Làm mới đoạn chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Context Indicator Strip */}
        <div className="bg-stone-100/90 px-4 py-2 border-b border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-stone-800">Đang thử:</span>
            <span>{currentEra.name}</span>
            <span aria-hidden="true">·</span>
            <span>{eventContext}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[120px]">
              {selectedItems.length > 0 ? `${selectedItems.length} món` : 'Trống'}
            </span>
          </div>
          <span className="text-emerald-700 font-medium shrink-0 ml-2">Đang kết nối</span>
        </div>

        {/* Chat Thread Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-md bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <div
                    className={`mt-1.5 text-[10px] text-right ${
                      isUser ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-md bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator with Thinking animation */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-md bg-[#991B1B]/10 text-[#991B1B] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-stone-200/90 rounded-2xl rounded-bl-xs px-4 py-3 text-xs text-stone-600 shadow-2xs flex items-center gap-2">
                {highThinking ? (
                  <>
                    <Brain className="w-4 h-4 text-amber-600 animate-pulse" />
                    <span>Stylist đang tư duy sâu & đối chiếu sử liệu...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>Đang trả lời...</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-white border-t border-stone-100">
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Gợi ý câu hỏi nhanh:
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-lg whitespace-nowrap text-[11px] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <div className="p-3 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi cho AI Stylist..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#991B1B] transition-all text-stone-800"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-40 text-white rounded-xl transition-all shadow-2xs shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

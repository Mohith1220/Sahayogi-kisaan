import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  content: 'Hello! How can I help you with farming today? You can ask me about:\n\n- Farming practices\n- Weather conditions\n- Government schemes\n- Equipment recommendations',
  createdAt: new Date().toISOString(),
};

// Predefined responses for common queries
const STATIC_RESPONSES: Record<string, string> = {
  'weather': 'The weather in Karnataka varies by region. The best time for planting is during the monsoon season (June-September). Always check local weather forecasts before planning agricultural activities.',
  'crops': 'Major crops in Karnataka include:\n- Ragi (Finger Millet)\n- Rice\n- Jowar (Sorghum)\n- Pulses\n- Cotton\n\nChoose crops based on your soil type and local climate.',
  'fertilizer': 'For best results:\n1. Test your soil before applying fertilizers\n2. Use organic fertilizers when possible\n3. Follow recommended NPK ratios\n4. Apply fertilizers at the right growth stage',
  'schemes': 'Current government schemes in Karnataka:\n1. PM Kisan Samman Nidhi\n2. Soil Health Card Scheme\n3. Krishi Yantra Dhare\n4. Karnataka Raitha Suraksha',
  'equipment': 'Essential farming equipment:\n1. Tractors and implements\n2. Irrigation systems\n3. Harvesting machines\n4. Storage solutions\n\nMany are available with government subsidies.',
  'default': 'I can help you with information about farming practices, weather conditions, government schemes, and equipment recommendations. Please ask a specific question about any of these topics.'
};

export function ChatBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findBestResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(STATIC_RESPONSES)) {
      if (normalizedInput.includes(key)) {
        return response;
      }
    }

    // If no specific match is found, return default response
    return STATIC_RESPONSES.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response delay for natural feeling
    setTimeout(() => {
      const response = findBestResponse(input);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        aria-label={t('chatbot.title')}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-96 sm:h-[600px] flex flex-col bg-white dark:bg-gray-800 sm:rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold dark:text-white">{t('chatbot.title')}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
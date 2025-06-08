'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { parse } from 'papaparse';
import { Send } from 'lucide-react';

export default function Interactive() {
  const { counter, messages, increment, decrement, reset, addMessage } = useAppStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [chatInput, setChatInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    parse(file, {
      complete: (results) => {
        setUploadedData(results.data);
        setIsProcessing(false);
      },
      header: true,
      dynamicTyping: true,
    });
  };

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    addMessage({ role: 'user', content: chatInput });
    addMessage({ role: 'assistant', content: `Echo: ${chatInput}` });
    setChatInput('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Interactive Features</h2>

      <div>
        <h3 className="text-xl font-semibold mb-4">Session State</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={increment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Increment
            </button>
            <button
              onClick={decrement}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Decrement
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
          <p className="text-2xl font-bold">Counter value: {counter}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">File Upload</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Choose a CSV file'}
            </button>
          </div>
          
          {uploadedData && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Uploaded data (first 5 rows):</p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(uploadedData[0] || {}).map(key => (
                        <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {uploadedData.slice(0, 5).map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((value: any, j) => (
                          <td key={j} className="px-4 py-2 text-sm">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Progress Bar</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <button
            onClick={startProgress}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
          >
            Start Progress
          </button>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center">Progress: {progress}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Chat Interface</h3>
        <div className="bg-white rounded-lg shadow">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-600 text-center">No messages yet. Start a conversation!</p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleChatSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Say something..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
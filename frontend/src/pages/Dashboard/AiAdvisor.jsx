import React, { useState, useRef, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'

const AiAdvisor = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Advisor. How can I help you with your finances today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer qlfCOdbay5nSsyPkt0t8idaKIBtWwWNS09bqiT5l`,  // 🔐 Replace this with your actual key
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'command-r-plus',     // or 'command' / 'command-light'
          prompt: input,
          max_tokens: 300,
          temperature: 0.6,
          k: 0,
          p: 0.75,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      })

      const data = await res.json()
      const aiText = data.generations?.[0]?.text?.trim() || 'Sorry, I couldn’t generate a response.'

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { sender: 'ai', text: 'Something went wrong. Please try again later.' }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <DashboardLayout activeMenu="AI Advisor">
      <div className='flex justify-center items-center py-6'>
        <div className="max-w-4xl lg:min-w-full lg:min-h-[630px] bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl text-white font-semibold text-center mb-4">AI Advisor</h2>
          
          <div className="flex-1 overflow-y-auto mb-4 p-3 bg-gray-300 rounded-xl min-h-[200px] max-h-[490px] overflow-y-auto hide-scrollbar" style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 8
              }}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-[15px] ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-100 text-gray-900 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm italic text-gray-600">AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI Advisor..."
              className="flex-1 p-2 rounded-lg border border-gray-400 bg-gray-600 text-base text-white placeholder-gray-300"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-7 py-2 rounded-lg bg-gray-100 font-semibold text-base hover:bg-gray-300 transition-colors disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AiAdvisor

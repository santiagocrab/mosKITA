import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m mosKITA Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const responses = {
    'hello': 'Hello! I\'m here to help you with dengue-related questions. What would you like to know?',
    'symptoms': 'Common dengue symptoms include: high fever, severe headache, pain behind the eyes, joint and muscle pain, rash, and mild bleeding. If you experience these, seek medical attention immediately.',
    'prevention': 'To prevent dengue: 1) Eliminate standing water, 2) Use mosquito repellent, 3) Wear long sleeves, 4) Use mosquito nets, 5) Keep surroundings clean.',
    'risk': 'You can check your barangay\'s dengue risk level on our homepage or visit the specific barangay page for detailed forecasts.',
    'report': 'To report a case, click the "Report Dengue Case" button on the homepage or visit /report. Your report helps us track and prevent outbreaks.',
    'default': 'I can help you with: dengue symptoms, prevention tips, checking risk levels, reporting cases, and general information. What would you like to know?'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])

    // Simple keyword matching for responses
    const lowerInput = input.toLowerCase()
    let response = responses.default
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      response = responses.hello
    } else if (lowerInput.includes('symptom')) {
      response = responses.symptoms
    } else if (lowerInput.includes('prevent') || lowerInput.includes('avoid')) {
      response = responses.prevention
    } else if (lowerInput.includes('risk') || lowerInput.includes('forecast')) {
      response = responses.risk
    } else if (lowerInput.includes('report') || lowerInput.includes('case')) {
      response = responses.report
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 500)

    setInput('')
  }

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-green-600 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">💬</span>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border-2 border-green-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-green text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <span className="font-heading font-bold">Ask mosKITA</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-green text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-green text-white rounded-lg font-semibold hover:bg-green-600"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot


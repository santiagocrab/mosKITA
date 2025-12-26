import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InformationDesk = () => {
  const [openAccordion, setOpenAccordion] = useState(null)

  const faqs = [
    {
      question: 'What is dengue?',
      answer: 'Dengue is a viral infection transmitted by the Aedes mosquito. It can cause severe flu-like symptoms and, in some cases, develop into a potentially lethal complication called severe dengue.'
    },
    {
      question: 'How is dengue transmitted?',
      answer: 'Dengue is spread through the bite of an infected Aedes mosquito, primarily Aedes aegypti. The mosquito becomes infected when it bites a person with dengue virus in their blood.'
    },
    {
      question: 'What are the warning signs of severe dengue?',
      answer: 'Warning signs include: severe abdominal pain, persistent vomiting, rapid breathing, bleeding gums, fatigue, restlessness, and blood in vomit. If you experience these, seek immediate medical attention.'
    },
    {
      question: 'How can I prevent dengue?',
      answer: 'Prevent dengue by: eliminating mosquito breeding sites (standing water), using mosquito repellent, wearing protective clothing, using mosquito nets, and keeping your surroundings clean.'
    },
    {
      question: 'Is there a vaccine for dengue?',
      answer: 'Yes, there is a dengue vaccine available. Consult with your healthcare provider to determine if vaccination is appropriate for you or your family members.'
    },
    {
      question: 'What should I do if I suspect I have dengue?',
      answer: 'Seek medical attention immediately. Rest, stay hydrated, and avoid medications like aspirin or ibuprofen that can increase bleeding risk. Follow your doctor\'s instructions carefully.'
    }
  ]

  const preventionChecklist = [
    'Eliminate standing water in containers',
    'Cover water storage containers',
    'Clean gutters and drains regularly',
    'Use mosquito repellent daily',
    'Wear long sleeves and pants',
    'Use mosquito nets while sleeping',
    'Install window and door screens',
    'Keep surroundings clean and dry',
    'Dispose of trash properly',
    'Change water in vases and flower pots weekly'
  ]

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-light via-green-50 to-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
            📚 Information Desk
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about dengue prevention, symptoms, and LGU efforts
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors"
                >
                  <span className="text-lg font-heading font-semibold text-navy">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openAccordion === index ? 180 : 0 }}
                    className="text-2xl"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-green-50 text-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prevention Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">
            ✅ What to Do During a Dengue Outbreak
          </h2>
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {preventionChecklist.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Symptoms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Common Symptoms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-6">
              <h3 className="text-xl font-heading font-bold text-red-900 mb-4">Mild Symptoms</h3>
              <ul className="space-y-2 text-gray-700">
                {['High fever (40°C)', 'Severe headache', 'Pain behind the eyes', 'Muscle and joint pains', 'Nausea', 'Vomiting', 'Swollen glands', 'Rash'].map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg border-2 border-red-400 p-6">
              <h3 className="text-xl font-heading font-bold text-red-900 mb-4">⚠️ Severe Symptoms (Seek Immediate Help)</h3>
              <ul className="space-y-2 text-gray-700">
                {['Severe abdominal pain', 'Persistent vomiting', 'Rapid breathing', 'Bleeding gums', 'Blood in vomit', 'Fatigue', 'Restlessness'].map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">⚠</span>
                    <span className="font-semibold">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* LGU Efforts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">LGU Naga City Efforts</h2>
          <div className="bg-gradient-to-r from-green-50 to-navy-50 rounded-xl shadow-lg border-2 border-green-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🏥', title: 'Health Centers', desc: '24/7 monitoring and case management' },
                { icon: '🚨', title: 'Rapid Response', desc: 'Immediate action on reported cases' },
                { icon: '📢', title: 'Public Awareness', desc: 'Community education campaigns' },
              ].map((effort, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center bg-white rounded-lg p-6"
                >
                  <div className="text-5xl mb-4">{effort.icon}</div>
                  <h3 className="text-xl font-heading font-bold text-navy mb-2">{effort.title}</h3>
                  <p className="text-gray-600">{effort.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video/Poster Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Educational Resources</h2>
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-8">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/p3kZjyTxisk"
                title="Dengue Prevention Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-300 rounded-xl p-8"
        >
          <h2 className="text-3xl font-heading font-bold text-red-900 mb-6">🚨 Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Naga City Health Office', phone: '(054) 472-1234' },
              { name: 'Emergency Services', phone: '911' },
              { name: 'Bicol Medical Center', phone: '(054) 472-1235' },
              { name: 'DOH Hotline', phone: '(02) 8651-7800' },
            ].map((contact, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-1">{contact.name}</p>
                <p className="text-red-700 font-mono">{contact.phone}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InformationDesk

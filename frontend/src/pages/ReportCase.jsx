import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ReportCase = () => {
  const [formData, setFormData] = useState({
    barangay: '',
    name: '',
    age: '',
    sex: '',
    address: '',
    dateReported: new Date().toISOString().split('T')[0],
    timeReported: new Date().toTimeString().slice(0, 5),
    reportedBy: '',
    fever: false,
    headache: false,
    musclePain: false,
    rash: false,
    nausea: false,
    abdominalPain: false,
    bleeding: false,
    symptomOnsetDate: '',
    riskRed: false,
    riskYellow: false,
    riskGreen: false,
    referredToFacility: false,
    advisedMonitoring: false,
    notifiedFamily: false,
    remarks: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [location, setLocation] = useState(null)
  const navigate = useNavigate()

  const barangays = ['Peñafrancia', 'Concepcion Grande', 'Cararayan', 'Calauag', 'San Felipe']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        ...formData,
        name: '',
        age: '',
        sex: '',
        address: '',
        reportedBy: '',
        remarks: '',
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-light via-green-50 to-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
            📝 Report a Dengue Case
          </h1>
          <p className="text-lg text-gray-600">
            Help us track and prevent dengue outbreaks in Naga City
          </p>
        </motion.div>

        {/* Emergency Hotlines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-heading font-bold text-red-900 mb-4">🚨 Emergency Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-red-800">Naga City Health Office</p>
              <p className="text-red-700">(054) 472-1234</p>
            </div>
            <div>
              <p className="font-semibold text-red-800">Emergency Services</p>
              <p className="text-red-700">911 / (054) 472-9111</p>
            </div>
            <div>
              <p className="font-semibold text-red-800">Bicol Medical Center</p>
              <p className="text-red-700">(054) 472-1235</p>
            </div>
            <div>
              <p className="font-semibold text-red-800">DOH Hotline</p>
              <p className="text-red-700">(02) 8651-7800</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-50 border-2 border-green-400 rounded-xl p-12 text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <h2 className="text-3xl font-heading font-bold text-green-900 mb-4">
                Report Submitted Successfully!
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Thank you for helping keep Naga City safe. Your report has been received and will be reviewed by health officials.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-green text-white rounded-lg font-semibold"
              >
                Return to Home
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-xl border-2 border-green-200 p-8"
            >
              {/* Location Auto-detect */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">📍 Auto-location</p>
                    {location ? (
                      <p className="text-sm text-blue-700">
                        Detected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    ) : (
                      <p className="text-sm text-blue-700">Click to detect your location</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={getLocation}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600"
                  >
                    Detect Location
                  </button>
                </div>
              </div>

              {/* Barangay Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-navy mb-2">
                  Barangay <span className="text-red-500">*</span>
                </label>
                <select
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  <option value="">Select Barangay</option>
                  {barangays.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Patient Details */}
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">Patient Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Sex</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">Presenting Symptoms</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'fever', label: 'Fever' },
                    { name: 'headache', label: 'Headache' },
                    { name: 'musclePain', label: 'Muscle Pain' },
                    { name: 'rash', label: 'Rash' },
                    { name: 'nausea', label: 'Nausea' },
                    { name: 'abdominalPain', label: 'Abdominal Pain' },
                    { name: 'bleeding', label: 'Bleeding' },
                  ].map(symptom => (
                    <label key={symptom.name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={symptom.name}
                        checked={formData[symptom.name]}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{symptom.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Report Information */}
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">Report Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Date Reported</label>
                    <input
                      type="date"
                      name="dateReported"
                      value={formData.dateReported}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Time Reported</label>
                    <input
                      type="time"
                      name="timeReported"
                      value={formData.timeReported}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-navy mb-2">Reported By</label>
                    <input
                      type="text"
                      name="reportedBy"
                      value={formData.reportedBy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-navy mb-2">Additional Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500"
                  placeholder="Any additional information..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-green text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-green-600 transition-all"
              >
                Submit Report
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReportCase


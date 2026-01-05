import React from 'react'
import { FaCircle } from 'react-icons/fa'

const RISK_COLORS = {
  'Low': {
    fill: '#B8E994',
    border: '#7ED321',
    label: 'Low Risk',
    description: 'Probability < 30%',
  },
  'Moderate': {
    fill: '#FFD86A',
    border: '#FFC107',
    label: 'Moderate Risk',
    description: 'Probability 30-50%',
  },
  'Elevated': {
    fill: '#FFA94D',
    border: '#FF8C00',
    label: 'Elevated Risk',
    description: 'Probability 50-60%',
  },
  'High': {
    fill: '#FF6B6B',
    border: '#FF4757',
    label: 'High Risk',
    description: 'Probability 60-80%',
  },
  'Extreme': {
    fill: '#D7263D',
    border: '#C21807',
    label: 'Extreme Risk',
    description: 'Probability > 80%',
  },
}

const RiskLegend = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCircle className="text-primary" />
        Risk Level Guide
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(RISK_COLORS).map(([risk, colors]) => {
          const bgColor = risk === 'Low' ? 'bg-green-50' :
                         risk === 'Moderate' ? 'bg-yellow-50' :
                         risk === 'Elevated' ? 'bg-orange-50' :
                         risk === 'High' ? 'bg-red-50' :
                         'bg-red-100'
          
          const borderColor = risk === 'Low' ? 'border-green-300' :
                             risk === 'Moderate' ? 'border-yellow-300' :
                             risk === 'Elevated' ? 'border-orange-300' :
                             risk === 'High' ? 'border-red-300' :
                             'border-red-400'
          
          const textColor = risk === 'Low' ? 'text-green-800' :
                           risk === 'Moderate' ? 'text-yellow-800' :
                           risk === 'Elevated' ? 'text-orange-800' :
                           risk === 'High' ? 'text-red-800' :
                           'text-red-900'
          
          return (
            <div 
              key={risk}
              className={`${bgColor} rounded-lg p-4 border-2 ${borderColor} flex items-center space-x-3 transition-all hover:shadow-md`}
            >
              <div 
                className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                style={{ 
                  backgroundColor: colors.fill,
                  borderColor: colors.border,
                }}
              />
              <div>
                <h4 className={`text-lg font-bold ${textColor}`}>{colors.label}</h4>
                <p className={`text-sm ${textColor} opacity-80`}>{colors.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RiskLegend

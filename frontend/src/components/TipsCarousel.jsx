import { useState, useEffect } from 'react'
import { 
  FaBug, 
  FaTint, 
  FaThermometerHalf, 
  FaLeaf, 
  FaShirt,
  FaSprayCan,
  FaWindowMaximize,
  FaWater,
  FaBucket,
  FaSeedling,
  FaBook
} from 'react-icons/fa'

const TIPS = [
  { icon: FaBug, text: "A bottle cap of stagnant water can breed 100+ mosquitoes." },
  { icon: FaTint, text: "Empty containers, tires, and plant pots weekly to prevent breeding." },
  { icon: FaThermometerHalf, text: "Mosquitoes are most active during dawn and dusk hours." },
  { icon: FaLeaf, text: "Use mosquito-repellent plants like citronella and lemongrass." },
  { icon: FaShirt, text: "Wear long sleeves and pants during peak mosquito hours." },
  { icon: FaSprayCan, text: "Apply insect repellent with DEET or picaridin for protection." },
  { icon: FaWindowMaximize, text: "Install window screens to keep mosquitoes out of your home." },
  { icon: FaWater, text: "Keep gutters clean and free of standing water." },
  { icon: FaBucket, text: "Cover water storage containers tightly." },
  { icon: FaSeedling, text: "Remove standing water from flower pot saucers daily." }
]

const TipsCarousel = () => {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length)
    }, 10000) // Rotate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const goToTip = (index) => {
    setCurrentTip(index)
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-200 animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        <FaBook className="text-2xl text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">Did You Know?</h3>
      </div>
      <div className="min-h-[60px] flex items-center gap-3">
        {TIPS[currentTip] && (
          <>
            <TIPS[currentTip].icon className="text-2xl text-green-600 flex-shrink-0" />
            <p className="text-gray-800 text-sm leading-relaxed transition-opacity duration-500">
              {TIPS[currentTip].text}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {TIPS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTip(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentTip ? 'bg-green-600 w-6' : 'bg-green-300'
            }`}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TipsCarousel


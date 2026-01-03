import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import PublicNavbar from './components/PublicNavbar'
import AdminNavbar from './components/AdminNavbar'

// Lazy load pages for faster initial load
const Home = lazy(() => import('./pages/Home'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const BarangayPage = lazy(() => import('./pages/BarangayPage'))
const InformationDesk = lazy(() => import('./pages/InformationDesk'))
const ReportCase = lazy(() => import('./pages/ReportCase'))
const Barangays = lazy(() => import('./pages/Barangays'))
const NotFound = lazy(() => import('./pages/NotFound'))
import Chatbot from './components/Chatbot'

function App() {
  const [loading, setLoading] = useState(false) // Always skip loading in dev

  useEffect(() => {
    // Skip loading screen completely for faster startup
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div></div>}>
        <Routes>
          {/* Admin Routes - Separate Layout */}
          <Route
            path="/admin"
            element={
              <div className="min-h-screen bg-gray-50">
                <AdminNavbar />
                <div className="pt-20">
                  <AdminDashboard />
                </div>
              </div>
            }
          />

          {/* Public Routes - Public Layout */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-background">
                <PublicNavbar />
                <Home />
              </div>
            }
          />
          <Route
            path="/bagumbayan-norte"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Bagumbayan Norte" />
              </div>
            }
          />
          <Route
            path="/concepcion-grande"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Concepcion Grande" />
              </div>
            }
          />
          <Route
            path="/tinago"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Tinago" />
              </div>
            }
          />
          <Route
            path="/balatas"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Balatas" />
              </div>
            }
          />
          <Route
            path="/san-felipe"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="San Felipe" />
              </div>
            }
          />
          <Route
            path="/penafrancia"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Peñafrancia" />
              </div>
            }
          />
          <Route
            path="/cararayan"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Cararayan" />
              </div>
            }
          />
          <Route
            path="/calauag"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <BarangayPage barangay="Calauag" />
              </div>
            }
          />
          <Route
            path="/barangays"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <Barangays />
              </div>
            }
          />
          <Route
            path="/report"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <ReportCase />
              </div>
            }
          />
          <Route
            path="/information"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <InformationDesk />
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50">
                <PublicNavbar />
                <NotFound />
              </div>
            }
          />
        </Routes>
        <Chatbot />
      </Suspense>
    </Router>
  )
}

export default App

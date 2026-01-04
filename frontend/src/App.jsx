import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <StarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          {/* Global Admin Button - Shows on all pages except admin pages */}
          <AdminButton />
        </div>
      </div>
    </Router>
  );
}

// Admin Button Component - Shows on all public pages
const AdminButton = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  if (isAdminPage) return null;

  return (
    <Link
      to="/admin/login"
      className="fixed bottom-8 right-8 z-50 group animate-fade-in"
      title="Admin Login"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse-slow"></div>
        <button className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/50 hover:shadow-primary-500/70 transition-all duration-300 hover:scale-110 group-hover:rotate-12 border-2 border-primary-400/30">
          <FaUserShield className="text-2xl" />
        </button>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark-900 animate-pulse flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </span>
        <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-dark-800 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border border-white/10 shadow-lg">
            Admin Login
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-dark-800"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default App;


import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-900/95 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              KA Web & App Developers
            </h3>
            <p className="text-gray-400 mb-4">
              Affordable Website & Mobile App Development for Businesses
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/krishnakant1794" className="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaGithub className="text-gray-400 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/krishnakant-kumar1794/" className="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaLinkedin className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Projects', 'Pricing', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/919263945768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <FaWhatsapp className="text-green-400" />
                  </div>
                  <span>9263945768</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:7488415643"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <FaPhone className="text-blue-400" />
                  </div>
                  <span>7488415643</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:krishnakk8281@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <FaEnvelope className="text-red-400" />
                  </div>
                  <span className="text-sm">krishnakk8281@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates and offers
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © {currentYear} KA Web & App Developers. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Developed by <span className="text-primary-400 font-semibold">Krishnakant Kumar</span> &{' '}
            <span className="text-primary-400 font-semibold">Abhay Shankar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

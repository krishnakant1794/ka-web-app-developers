import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaMobileAlt, FaLaptopCode, FaServer, FaRocket, FaAward, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6 animate-float">
              <span className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
                🚀 Professional Web & App Development
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent animate-slide-down">
              KA Web & App Developers
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-gray-300 font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Affordable Website & Mobile App Development
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              We help Indian businesses, startups, and students transform their ideas into 
              professional websites and mobile applications. Quality development at affordable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>View Projects</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                to="/contact"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:border-primary-500 hover:scale-105"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-primary-400">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions for your digital needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaCode, title: 'Website Development', desc: 'Modern, responsive websites' },
              { icon: FaMobileAlt, title: 'Flutter Apps', desc: 'Cross-platform mobile apps' },
              { icon: FaLaptopCode, title: 'Full Stack', desc: 'Complete web applications' },
              { icon: FaServer, title: 'Backend & API', desc: 'Robust server solutions' },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why <span className="text-primary-400">Choose Us?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '₹', title: 'Affordable Pricing', desc: 'Competitive prices for Indian businesses' },
              { icon: <FaRocket />, title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
              { icon: <FaAward />, title: 'Quality First', desc: 'Thorough testing and quality checks' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-primary-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

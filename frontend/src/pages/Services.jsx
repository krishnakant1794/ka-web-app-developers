import { FaCode, FaMobileAlt, FaLaptopCode, FaServer, FaCheck, FaArrowRight } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaCode className="text-5xl" />,
      title: 'Website Development',
      description: 'Professional, responsive websites that work seamlessly across all devices.',
      features: [
        'Responsive Design (Mobile, Tablet, Desktop)',
        'SEO Optimized',
        'Fast Loading Speed',
        'Modern UI/UX Design',
        'Contact Forms & Integration',
        'Google Analytics Setup',
      ],
      technologies: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Vite'],
    },
    {
      icon: <FaMobileAlt className="text-5xl" />,
      title: 'Flutter App Development',
      description: 'Cross-platform mobile applications for iOS and Android using Flutter.',
      features: [
        'iOS & Android Support',
        'Single Codebase',
        'Native Performance',
        'Material Design',
        'Firebase Integration',
        'App Store Deployment',
      ],
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management'],
    },
    {
      icon: <FaLaptopCode className="text-5xl" />,
      title: 'Full Stack Development',
      description: 'Complete web applications with frontend, backend, and database.',
      features: [
        'Frontend Development',
        'Backend API Development',
        'Database Design',
        'User Authentication',
        'Payment Integration',
        'Cloud Deployment',
      ],
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    },
    {
      icon: <FaServer className="text-5xl" />,
      title: 'Backend & API Development',
      description: 'Robust server-side solutions and RESTful APIs for your applications.',
      features: [
        'RESTful API Design',
        'Database Management',
        'Authentication & Authorization',
        'File Upload Handling',
        'Email Services',
        'Cloud Integration',
      ],
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'AWS', 'Render'],
    },
  ];

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
              What We Offer
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-primary-400">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive web and mobile app development services tailored for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-500/30">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{service.title}</h2>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 group/item">
                        <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary-500 transition-colors">
                          <FaCheck className="text-primary-400 text-xs" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-primary-500/10 text-primary-300 rounded-lg text-sm font-medium border border-primary-500/20 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

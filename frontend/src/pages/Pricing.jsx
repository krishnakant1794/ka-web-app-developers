import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa';
import api from '../config/axios';

const Pricing = () => {
  const [websitePlans, setWebsitePlans] = useState([]);
  const [appPlans, setAppPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      setLoading(true);
      const [websiteRes, appRes] = await Promise.all([
        api.get('/api/pricing?category=Website'),
        api.get('/api/pricing?category=App'),
      ]);
      const websiteData = Array.isArray(websiteRes.data) ? websiteRes.data : [];
      const appData = Array.isArray(appRes.data) ? appRes.data : [];
      setWebsitePlans(websiteData);
      setAppPlans(appData);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      setWebsitePlans([]); // Set empty arrays on error
      setAppPlans([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/30 border-t-primary-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
              Affordable Pricing
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pricing <span className="text-primary-400">Plans</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Affordable pricing plans designed for Indian businesses, startups, and students
          </p>
        </div>

        {/* Website Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center">
            <span className="w-2 h-10 bg-primary-500 rounded-full mr-4"></span>
            Website Plans
          </h2>
          {websitePlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {websitePlans.map((plan, index) => (
                <PricingCard key={plan._id} plan={plan} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-400">No website plans available. Please contact us for pricing.</p>
            </div>
          )}
        </div>

        {/* App Plans */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center">
            <span className="w-2 h-10 bg-primary-500 rounded-full mr-4"></span>
            App Plans
          </h2>
          {appPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {appPlans.map((plan, index) => (
                <PricingCard key={plan._id} plan={plan} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-400">No app plans available. Please contact us for pricing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ plan, index }) => {
  return (
    <div
      className={`relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up ${
        plan.isPopular
          ? 'border-primary-500 shadow-lg shadow-primary-500/30 scale-105'
          : 'border-white/10 hover:border-primary-500/50'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
            <FaCrown />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">{plan.planName}</h3>
          <div className="mb-4">
            <span className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              ₹{plan.price.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{plan.targetAudience}</p>
        </div>

        <div className="mb-8">
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <span className="w-1 h-5 bg-primary-500 rounded-full mr-3"></span>
            Features
          </h4>
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-primary-400 text-xs" />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <span className="w-1 h-5 bg-primary-500 rounded-full mr-3"></span>
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {plan.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary-500/10 text-primary-300 rounded-lg text-xs font-medium border border-primary-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <a
          href="/contact"
          className={`block w-full text-center py-4 rounded-xl font-semibold transition-all duration-300 ${
            plan.isPopular
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Pricing;

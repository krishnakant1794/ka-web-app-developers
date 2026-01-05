import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import api from '../config/axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/testimonials');
      const data = Array.isArray(response.data) ? response.data : [];
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/30 border-t-primary-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading testimonials...</p>
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
              Client Reviews
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Client <span className="text-primary-400">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What our clients say about our work
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{testimonial.clientName}</h3>
            <p className="text-sm text-primary-400">{testimonial.projectType} Project</p>
          </div>
          <div className="text-primary-400/30">
            <FaQuoteLeft className="text-4xl" />
          </div>
        </div>

        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg mr-1 ${
                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
              }`}
            />
          ))}
        </div>

        <p className="text-gray-300 italic leading-relaxed relative">
          <span className="text-primary-400/30 text-2xl absolute -top-2 -left-2">"</span>
          {testimonial.feedback}
          <span className="text-primary-400/30 text-2xl">"</span>
        </p>
      </div>
    </div>
  );
};

export default Testimonials;

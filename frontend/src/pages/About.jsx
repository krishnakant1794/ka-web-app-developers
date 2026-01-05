import { useState, useEffect } from 'react';
import { FaCode, FaUsers, FaRocket, FaAward, FaGraduationCap, FaBriefcase, FaStar } from 'react-icons/fa';
import api from '../config/axios';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/team-members');
      const data = Array.isArray(response.data) ? response.data : [];
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setTeamMembers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
              About Us
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-primary-400">Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn more about KA Web & App Developers and our mission
          </p>
        </div>

        {/* Company Mission */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-16 border border-white/10 animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-10 bg-primary-500 rounded-full mr-4"></span>
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            At KA Web & App Developers, our mission is to make professional web and mobile app 
            development accessible and affordable for Indian businesses, startups, and students. 
            We believe that every business, regardless of size, deserves a high-quality digital presence.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We combine technical expertise with a deep understanding of the Indian market to deliver 
            solutions that are not only technically sound but also cost-effective and tailored to 
            local business needs.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why <span className="text-primary-400">Choose Us?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaCode, title: 'Expert Developers', desc: 'Skilled in modern technologies' },
              { icon: FaRocket, title: 'Fast Delivery', desc: 'Quick turnaround times' },
              { icon: FaAward, title: 'Quality First', desc: 'Attention to detail' },
              { icon: FaUsers, title: 'Client Focused', desc: 'Your success is our priority' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl shadow-lg shadow-primary-500/30">
                  <item.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center">
            <span className="w-2 h-10 bg-primary-500 rounded-full mr-4"></span>
            Our Team
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/30 border-t-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading team members...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member._id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary-500/30 group-hover:border-primary-500 transition-all duration-300 shadow-lg shadow-primary-500/20"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/20 border-4 border-primary-500/30 group-hover:border-primary-500 transition-all duration-300 shadow-lg shadow-primary-500/20 ${member.photo ? 'hidden' : ''}`}
                    >
                      <span className="text-4xl font-bold text-primary-300">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {member.name}
                      {member.isHead && (
                        <span className="ml-2 text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full font-semibold">
                          Head
                        </span>
                      )}
                    </h3>
                    <p className="text-primary-400 font-semibold mb-6">{member.role}</p>
                    
                    {member.education && (
                      <div className="mb-4 text-left">
                        <div className="flex items-center space-x-2 text-gray-300 mb-2">
                          <FaGraduationCap className="text-primary-400" />
                          <span className="text-sm font-medium">Education</span>
                        </div>
                        <p className="text-gray-400 text-sm ml-7">{member.education}</p>
                      </div>
                    )}

                    {member.experience && (
                      <div className="mb-4 text-left">
                        <div className="flex items-center space-x-2 text-gray-300 mb-2">
                          <FaBriefcase className="text-primary-400" />
                          <span className="text-sm font-medium">Experience</span>
                        </div>
                        <p className="text-gray-400 text-sm ml-7">{member.experience}</p>
                      </div>
                    )}

                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{member.biography}</p>

                    {member.skills && member.skills.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Skills:</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {member.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary-500/10 text-primary-300 rounded-lg text-xs font-medium border border-primary-500/30 hover:bg-primary-500/20 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No team members added yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;

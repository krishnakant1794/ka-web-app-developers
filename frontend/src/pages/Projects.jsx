import { useState, useEffect } from 'react';
import { FaGlobe, FaMobileAlt, FaLaptopCode, FaExternalLinkAlt, FaStar, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects${filter !== 'all' ? `?category=${filter}` : ''}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Website':
        return <FaGlobe className="text-blue-400" />;
      case 'App':
        return <FaMobileAlt className="text-green-400" />;
      case 'Full Stack':
        return <FaLaptopCode className="text-purple-400" />;
      default:
        return <FaGlobe className="text-blue-400" />;
    }
  };

  const clientProjects = projects.filter(p => p.category === 'Client Project');
  const personalProjects = projects.filter(p => p.category === 'Personal Project');

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/30 border-t-primary-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold border border-primary-500/30">
              Our Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-primary-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing our portfolio of client projects and personal work
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 space-x-4 animate-slide-down">
          {[
            { label: 'All Projects', value: 'all' },
            { label: 'Client Projects', value: 'Client Project' },
            { label: 'Personal Projects', value: 'Personal Project' },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === btn.value
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Client Projects Section */}
        {(filter === 'all' || filter === 'Client Project') && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Client Projects
            </h2>
            {clientProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientProjects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} getTypeIcon={getTypeIcon} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-400">No client projects available yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Personal Projects Section */}
        {(filter === 'all' || filter === 'Personal Project') && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Personal / Previous Projects
            </h2>
            {personalProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalProjects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} getTypeIcon={getTypeIcon} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-400">No personal projects available yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, getTypeIcon, index }) => {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
              {getTypeIcon(project.type)}
            </div>
            <span className="text-sm font-medium text-gray-300">{project.type}</span>
          </div>
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-primary-500/20 hover:bg-primary-500/40 rounded-lg flex items-center justify-center text-primary-400 transition-all duration-300 hover:scale-110"
            >
              <FaExternalLinkAlt className="text-sm" />
            </a>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 text-sm">Features:</h4>
          <ul className="space-y-2">
            {project.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 text-sm">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary-500/10 text-primary-300 rounded-lg text-xs font-medium border border-primary-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.clientFeedback && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center mb-2">
              <span className="text-sm font-semibold text-white mr-2">Client Feedback:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < 5 ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-300 italic">"{project.clientFeedback}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

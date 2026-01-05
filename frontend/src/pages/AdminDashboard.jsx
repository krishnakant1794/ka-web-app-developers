import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/axios';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEnvelope, FaCheck } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'testimonials') fetchTestimonials();
    if (activeTab === 'pricing') fetchPricingPlans();
    if (activeTab === 'messages') fetchContactMessages();
    if (activeTab === 'team') fetchTeamMembers();
  }, [activeTab]);

  // Fetch messages count on mount (for badge)
  useEffect(() => {
    if (!loading) {
      fetchContactMessages();
    }
  }, [loading]);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      await api.get('/api/auth/verify');
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      const data = Array.isArray(response.data) ? response.data : [];
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/api/testimonials');
      const data = Array.isArray(response.data) ? response.data : [];
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const fetchPricingPlans = async () => {
    try {
      const response = await api.get('/api/pricing');
      const data = Array.isArray(response.data) ? response.data : [];
      setPricingPlans(data);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      const response = await api.get('/api/contact', getAuthHeaders());
      const data = Array.isArray(response.data) ? response.data : [];
      setContactMessages(data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await api.get('/api/team-members');
      const data = Array.isArray(response.data) ? response.data : [];
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/api/${type}/${id}`, getAuthHeaders());
      if (type === 'projects') fetchProjects();
      if (type === 'testimonials') fetchTestimonials();
      if (type === 'pricing') fetchPricingPlans();
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleLogout = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      localStorage.removeItem('adminToken');
      // Clear any other admin-related data
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if there's an error
      navigate('/admin/login', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/30 border-t-primary-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative">
      {/* Star Background for Admin */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="bg-dark-800/95 backdrop-blur-md shadow-2xl border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section - Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-xl" style={{ fontFamily: 'brush script, cursive' }}>KA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-orange-500">Admin Dashboard</h1>
                  <p className="text-gray-400 text-xs">Manage your website content</p>
                </div>
              </Link>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="flex items-center space-x-2">
              {/* Standard Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  Services
                </Link>
                <Link
                  to="/projects"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  Projects
                </Link>
                <Link
                  to="/pricing"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  Pricing
                </Link>
                <Link
                  to="/testimonials"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/5"
                >
                  Testimonials
                </Link>
              </div>

              {/* Highlighted Section with About, Contact, and Logout */}
              <div className="flex items-center space-x-1 bg-red-900/50 border border-red-800/60 rounded-xl px-2 py-1 shadow-lg shadow-red-900/30">
                <Link
                  to="/about"
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg"
                >
                  Contact
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors rounded-lg flex items-center space-x-1 group cursor-pointer"
                >
                  <span>►</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
          {[
            { id: 'projects', label: 'Projects', icon: '📁' },
            { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
            { id: 'pricing', label: 'Pricing', icon: '💰' },
            { id: 'messages', label: 'Messages', icon: '💬', badge: contactMessages.filter(m => !m.isRead).length },
            { id: 'team', label: 'Team', icon: '👥' },
          ].map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-primary-500/30'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg shadow-red-500/50">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            editingItem={editingItem}
            onAdd={() => {
              setModalType('project');
              setEditingItem(null);
              setShowModal(true);
            }}
            onEdit={(item) => {
              setModalType('project');
              setEditingItem(item);
              setShowModal(true);
            }}
            onDelete={(id) => handleDelete('projects', id)}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
            }}
            onRefresh={fetchProjects}
            showModal={showModal && modalType === 'project'}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsTab
            testimonials={testimonials}
            editingItem={editingItem}
            onAdd={() => {
              setModalType('testimonial');
              setEditingItem(null);
              setShowModal(true);
            }}
            onEdit={(item) => {
              setModalType('testimonial');
              setEditingItem(item);
              setShowModal(true);
            }}
            onDelete={(id) => handleDelete('testimonials', id)}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
            }}
            onRefresh={fetchTestimonials}
            showModal={showModal && modalType === 'testimonial'}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingTab
            plans={pricingPlans}
            editingItem={editingItem}
            onAdd={() => {
              setModalType('pricing');
              setEditingItem(null);
              setShowModal(true);
            }}
            onEdit={(item) => {
              setModalType('pricing');
              setEditingItem(item);
              setShowModal(true);
            }}
            onDelete={(id) => handleDelete('pricing', id)}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
            }}
            onRefresh={fetchPricingPlans}
            showModal={showModal && modalType === 'pricing'}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesTab
            messages={contactMessages}
            onRefresh={fetchContactMessages}
          />
        )}

        {activeTab === 'team' && (
          <TeamMembersTab
            members={teamMembers}
            editingItem={editingItem}
            onAdd={() => {
              setModalType('team');
              setEditingItem(null);
              setShowModal(true);
            }}
            onEdit={(item) => {
              setModalType('team');
              setEditingItem(item);
              setShowModal(true);
            }}
            onDelete={(id) => handleDelete('team-members', id)}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
            }}
            onRefresh={fetchTeamMembers}
            showModal={showModal && modalType === 'team'}
          />
        )}
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = ({ projects, editingItem, onAdd, onEdit, onDelete, onClose, onRefresh, showModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Website',
    category: 'Client Project',
    description: '',
    features: '',
    techStack: '',
    liveDemoLink: '',
    clientFeedback: '',
  });

  useEffect(() => {
    if (showModal && editingItem) {
      const item = projects.find(p => p._id === editingItem._id);
      if (item) {
        setFormData({
          name: item.name || '',
          type: item.type || 'Website',
          category: item.category || 'Client Project',
          description: item.description || '',
          features: item.features?.join('\n') || '',
          techStack: item.techStack?.join('\n') || '',
          liveDemoLink: item.liveDemoLink || '',
          clientFeedback: item.clientFeedback || '',
        });
      }
    } else if (showModal) {
      setFormData({
        name: '',
        type: 'Website',
        category: 'Client Project',
        description: '',
        features: '',
        techStack: '',
        liveDemoLink: '',
        clientFeedback: '',
      });
    }
  }, [showModal, editingItem, projects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
      techStack: formData.techStack.split('\n').filter(t => t.trim()),
    };

    try {
      if (editingItem) {
        await api.put(`/api/projects/${editingItem._id}`, data);
      } else {
        await api.post('/api/projects', data);
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error saving project');
    }
  };

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Projects
            </h2>
            <p className="text-gray-400 text-sm">Manage your project portfolio</p>
          </div>
          <button
            onClick={onAdd}
            className="group flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 font-semibold"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            <span>Add Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-primary-400 text-3xl" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No projects yet</p>
            <p className="text-gray-500 text-sm">Click "Add Project" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-primary-400 font-bold text-sm">{project.type.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{project.name}</h3>
                        <p className="text-xs text-gray-400">{project.type} • {project.category}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="flex-1 group/btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(project._id)}
                      className="flex-1 group/btn bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-red-500/30 hover:border-red-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={onClose} title={editingItem ? 'Edit Project' : 'Add Project'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option>Website</option>
              <option>App</option>
              <option>Full Stack</option>
            </select>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option>Client Project</option>
              <option>Personal Project</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <textarea
              placeholder="Features (one per line)"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <textarea
              placeholder="Tech Stack (one per line)"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="url"
              placeholder="Live Demo Link (optional)"
              value={formData.liveDemoLink}
              onChange={(e) => setFormData({ ...formData, liveDemoLink: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <textarea
              placeholder="Client Feedback (optional)"
              value={formData.clientFeedback}
              onChange={(e) => setFormData({ ...formData, clientFeedback: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 font-semibold">
                Save
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-white/5 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Testimonials Tab Component
const TestimonialsTab = ({ testimonials, editingItem, onAdd, onEdit, onDelete, onClose, onRefresh, showModal }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    projectType: 'Website',
    feedback: '',
    rating: 5,
  });

  useEffect(() => {
    if (showModal && editingItem) {
      const item = testimonials.find(t => t._id === editingItem._id);
      if (item) {
        setFormData({
          clientName: item.clientName || '',
          projectType: item.projectType || 'Website',
          feedback: item.feedback || '',
          rating: item.rating || 5,
        });
      }
    } else if (showModal) {
      setFormData({
        clientName: '',
        projectType: 'Website',
        feedback: '',
        rating: 5,
      });
    }
  }, [showModal, editingItem, testimonials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/api/testimonials/${editingItem._id}`, formData);
      } else {
        await api.post('/api/testimonials', formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error saving testimonial');
    }
  };

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Testimonials
            </h2>
            <p className="text-gray-400 text-sm">Manage client feedback</p>
          </div>
          <button
            onClick={onAdd}
            className="group flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 font-semibold"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            <span>Add Testimonial</span>
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-primary-400 text-3xl" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No testimonials yet</p>
            <p className="text-gray-500 text-sm">Click "Add Testimonial" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <span className="text-primary-400 font-bold">{testimonial.clientName.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.clientName}</h3>
                      <p className="text-xs text-gray-400">{testimonial.projectType}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-6 line-clamp-3 italic">"{testimonial.feedback}"</p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(testimonial)}
                      className="flex-1 group/btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(testimonial._id)}
                      className="flex-1 group/btn bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-red-500/30 hover:border-red-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <Modal onClose={onClose} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option>Website</option>
                  <option>App</option>
                  <option>Full Stack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Feedback</label>
                <textarea
                  placeholder="Enter client feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Enter rating (1-5)"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 font-semibold">
                  Save
                </button>
                <button type="button" onClick={onClose} className="flex-1 bg-white/5 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300">
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

// Pricing Tab Component
const PricingTab = ({ plans, editingItem, onAdd, onEdit, onDelete, onClose, onRefresh, showModal }) => {
  const [formData, setFormData] = useState({
    planName: '',
    category: 'Website',
    price: '',
    targetAudience: '',
    features: '',
    technologies: '',
    isPopular: false,
  });

  useEffect(() => {
    if (showModal && editingItem) {
      const item = plans.find(p => p._id === editingItem._id);
      if (item) {
        setFormData({
          planName: item.planName || '',
          category: item.category || 'Website',
          price: item.price || '',
          targetAudience: item.targetAudience || '',
          features: item.features?.join('\n') || '',
          technologies: item.technologies?.join('\n') || '',
          isPopular: item.isPopular || false,
        });
      }
    } else if (showModal) {
      setFormData({
        planName: '',
        category: 'Website',
        price: '',
        targetAudience: '',
        features: '',
        technologies: '',
        isPopular: false,
      });
    }
  }, [showModal, editingItem, plans]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split('\n').filter(f => f.trim()),
      technologies: formData.technologies.split('\n').filter(t => t.trim()),
    };

    try {
      if (editingItem) {
        await api.put(`/api/pricing/${editingItem._id}`, data);
      } else {
        await api.post('/api/pricing', data);
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error saving pricing plan');
    }
  };

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Pricing Plans
            </h2>
            <p className="text-gray-400 text-sm">Manage your pricing packages</p>
          </div>
          <button
            onClick={onAdd}
            className="group flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 font-semibold"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            <span>Add Plan</span>
          </button>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-primary-400 text-3xl" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No pricing plans yet</p>
            <p className="text-gray-500 text-sm">Click "Add Plan" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up ${
                  plan.isPopular
                    ? 'border-primary-500/50 shadow-lg shadow-primary-500/30'
                    : 'border-white/10 hover:border-primary-500/50 hover:shadow-primary-500/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      Popular
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.planName}</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                      ₹{plan.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{plan.category}</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-6">{plan.targetAudience}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(plan)}
                      className="flex-1 group/btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(plan._id)}
                      className="flex-1 group/btn bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-red-500/30 hover:border-red-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <Modal onClose={onClose} title={editingItem ? 'Edit Pricing Plan' : 'Add Pricing Plan'}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                <input
                  type="text"
                  placeholder="Enter plan name"
                  value={formData.planName}
                  onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option>Website</option>
                  <option>App</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                <input
                  type="text"
                  placeholder="Who is this plan for?"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
                <textarea
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (one per line)</label>
                <textarea
                  placeholder="React.js&#10;Node.js&#10;MongoDB"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  required
                />
              </div>
              <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-gray-300 font-medium">Mark as Popular Plan</span>
              </label>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 font-semibold">
                  Save
                </button>
                <button type="button" onClick={onClose} className="flex-1 bg-white/5 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300">
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

// Team Members Tab Component
const TeamMembersTab = ({ members, editingItem, onAdd, onEdit, onDelete, onClose, onRefresh, showModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '',
    biography: '',
    education: '',
    experience: '',
    skills: '',
    isHead: false,
    order: 0,
  });

  useEffect(() => {
    if (showModal && editingItem) {
      const item = members.find(m => m._id === editingItem._id);
      if (item) {
        setFormData({
          name: item.name || '',
          role: item.role || '',
          photo: item.photo || '',
          biography: item.biography || '',
          education: item.education || '',
          experience: item.experience || '',
          skills: item.skills?.join('\n') || '',
          isHead: item.isHead || false,
          order: item.order || 0,
        });
      }
    } else if (showModal) {
      setFormData({
        name: '',
        role: '',
        photo: '',
        biography: '',
        education: '',
        experience: '',
        skills: '',
        isHead: false,
        order: 0,
      });
    }
  }, [showModal, editingItem, members]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split('\n').filter(s => s.trim()),
      order: parseInt(formData.order) || 0,
    };

    try {
      if (editingItem) {
        await api.put(`/api/team-members/${editingItem._id}`, data);
      } else {
        await api.post('/api/team-members', data);
      }
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error saving team member');
    }
  };

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
              Team Members
            </h2>
            <p className="text-gray-400 text-sm">Manage your team profiles</p>
          </div>
          <button
            onClick={onAdd}
            className="group flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 font-semibold"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            <span>Add Team Member</span>
          </button>
        </div>

        {members.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-primary-400 text-3xl" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No team members yet</p>
            <p className="text-gray-500 text-sm">Click "Add Team Member" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={member._id}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-500/30 group-hover:border-primary-500 transition-all duration-300 shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/20 border-4 border-primary-500/30 group-hover:border-primary-500 transition-all duration-300 shadow-lg ${member.photo ? 'hidden' : ''}`}
                  >
                    <span className="text-3xl font-bold text-primary-300">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {member.name}
                    {member.isHead && (
                      <span className="ml-2 text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-2 py-1 rounded-full font-semibold">
                        Head
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-primary-400 mb-6 font-semibold">{member.role}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="flex-1 group/btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(member._id)}
                      className="flex-1 group/btn bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-red-500/30 hover:border-red-500/50 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaTrash className="group-hover/btn:scale-110 transition-transform" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <Modal onClose={onClose} title={editingItem ? 'Edit Team Member' : 'Add Team Member'}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter team member name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  placeholder="e.g., Full Stack Developer & Co-Founder"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Photo URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Biography</label>
                <textarea
                  placeholder="Enter team member biography"
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Education</label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science & Engineering, Central University of Jharkhand"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                <input
                  type="text"
                  placeholder="e.g., 2+ years of experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills (one per line)</label>
                <textarea
                  placeholder="React.js&#10;Node.js&#10;MongoDB&#10;Flutter"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                <input
                  type="number"
                  placeholder="0 = first, 1 = second, etc."
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isHead}
                  onChange={(e) => setFormData({ ...formData, isHead: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-gray-300 font-medium">Mark as Head of Company</span>
              </label>
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 font-semibold">
                  Save
                </button>
                <button type="button" onClick={onClose} className="flex-1 bg-white/5 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300">
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ messages, onRefresh }) => {
  const handleMarkAsRead = async (messageId) => {
    try {
      await api.put(`/api/contact/${messageId}/read`);
      onRefresh();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
            <span className="w-2 h-8 bg-primary-500 rounded-full mr-4"></span>
            Contact Messages
          </h2>
          <p className="text-gray-400 text-sm">
            {unreadCount > 0 ? (
              <span className="text-red-400 font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</span>
              </span>
            ) : (
              <span className="text-green-400 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>All messages read</span>
              </span>
            )}
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="group bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-110 border border-primary-500/30 hover:border-primary-500/50 font-semibold flex items-center space-x-2"
        >
          <span className="group-hover:rotate-180 transition-transform duration-500">↻</span>
          <span>Refresh</span>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-12 text-center">
          <FaEnvelope className="text-gray-400 text-5xl mx-auto mb-4" />
          <p className="text-white text-lg mb-2">No messages yet</p>
          <p className="text-gray-400">Messages from the contact form will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`group relative bg-white/5 backdrop-blur-md rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/20 animate-slide-up ${
                !message.isRead ? 'border-l-4 border-primary-500 border-white/10 shadow-lg shadow-primary-500/10' : 'border-white/10'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{message.name}</h3>
                    {!message.isRead && (
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-primary-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {message.email}
                  </a>
                  {message.whatsapp && (
                    <p className="text-gray-400 text-sm mt-1">WhatsApp: {message.whatsapp}</p>
                  )}
                  {message.phone && (
                    <p className="text-gray-400 text-sm mt-1">Phone: {message.phone}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
                {!message.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(message._id)}
                    className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-green-500/30 text-sm font-semibold"
                    title="Mark as read"
                  >
                    <FaCheck />
                    <span>Mark Read</span>
                  </button>
                )}
              </div>
              <div className="bg-white/5 rounded-xl p-4 mt-4 border border-white/10">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{message.message}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${message.email}?subject=Re: Your inquiry from KA Web & App Developers`}
                  className="group/btn bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-primary-500/30 hover:border-primary-500/50 text-sm font-semibold flex items-center space-x-2"
                >
                  <span>📧</span>
                  <span>Email</span>
                </a>
                {message.whatsapp && (
                  <a
                    href={`https://wa.me/${message.whatsapp.replace(/\D/g, '')}?text=Hi, I'm responding to your inquiry from our website.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-green-500/30 hover:border-green-500/50 text-sm font-semibold flex items-center space-x-2"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
                {message.phone && (
                  <a
                    href={`tel:${message.phone.replace(/\D/g, '')}`}
                    className="group/btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-500/50 text-sm font-semibold flex items-center space-x-2"
                  >
                    <span>📞</span>
                    <span>Call</span>
                  </a>
                )}
                {!message.whatsapp && (
                  <a
                    href={`https://wa.me/919263945768?text=Hi, I'm responding to your inquiry from our website.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border border-green-500/30 hover:border-green-500/50 text-sm font-semibold flex items-center space-x-2"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-dark-800 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminDashboard;


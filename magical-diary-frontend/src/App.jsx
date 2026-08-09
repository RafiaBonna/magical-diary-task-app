import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Trash2, Feather, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const triggerMagicSparkles = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f48fb1', '#ce93d8', '#ffe082', '#81d4fa', '#ffffff']
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(API_URL, { text: taskInput });
      setTasks([response.data, ...tasks]);
      setTaskInput('');
      triggerMagicSparkles();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task! Please check Laravel backend and MySQL database.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      triggerMagicSparkles();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="diary-viewport">
      <div className="book">
        
        {/* 3D BOOK COVER */}
        <div 
          className={`book-cover ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(true)}
        >
          <div className="crown-icon">👑</div>
          <h1 className="cover-title">My Magical Diary</h1>
          <p className="cover-subtitle">✨ Click the Emblem to Open ✨</p>
        </div>

        {/* MATCHING MAGICAL PAGE */}
        <div className="diary-page">
          <div>
            {/* Header */}
            <div className="page-header">
              <div className="magical-title">
                <BookOpen size={30} />
                <span>Royal Wishlist 🏰</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={24} color="#fbc02d" />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="close-btn"
                  title="Close Diary"
                >
                  <X size={16} /> Close
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleAddTask} className="wish-form">
              <div className="input-container">
                <Feather className="quill-icon" size={18} />
                <input
                  type="text"
                  placeholder="Inscribe a wish in magic ink..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="wish-input"
                />
              </div>
              <button type="submit" disabled={loading} className="inscribe-btn">
                {loading ? 'Writing...' : 'Inscribe'}
              </button>
            </form>

            {/* Task List */}
            <div className="task-list">
              <AnimatePresence>
                {tasks.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#ba68c8', marginTop: '30px', fontStyle: 'italic', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <Heart size={18} color="#f48fb1" /> The scroll is empty. Write your first wish!
                  </p>
                ) : (
                  tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="task-item"
                    >
                      <span
                        onClick={() => handleToggleTask(task.id)}
                        className={`handwritten-text ${task.completed ? 'completed-text' : ''}`}
                      >
                        {task.completed ? '✨ ' : '🌸 '} {task.text}
                      </span>

                      <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="footer-text">
            Protected by Royal Magic & Laravel MySQL 💖
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
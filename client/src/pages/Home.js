// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     axios
//       .get('http://localhost:5001/api/posts', {
//         headers: token ? { Authorization: `Bearer ${token}` } : {}
//       })
//       .then(res => setPosts(res.data))
//       .catch(console.error);
//   }, [token]);

//   const handleDelete = async id => {
//     if (!window.confirm('Delete this post?')) return;
//     try {
//       await axios.delete(`http://localhost:5001/api/posts/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPosts(p => p.filter(post => post._id !== id));
//     } catch (err) {
//       console.error('Failed to delete:', err);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 1200,
//         margin: '0 auto',
//         padding: '2rem',
//         fontFamily: 'sans-serif',
//         background: '#f0f2f5'
//       }}
//     >
//       <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
//         {token ? 'My Posts' : 'All Posts'}
//       </h1>

//       {/* Grid Container */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//           gap: '1.5rem'
//         }}
//       >
//         {posts.map(p => (
//           <div
//             key={p._id}
//             style={{
//               background: '#fff',
//               borderRadius: '8px',
//               overflow: 'hidden',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             {p.imagePath && (
//               <img
//                 src={`http://localhost:5001/uploads/${p.imagePath}`}
//                 alt={p.title}
//                 style={{ width: '100%', height: 180, objectFit: 'cover' }}
//               />
//             )}
//             <div
//               style={{
//                 padding: '1rem',
//                 flexGrow: 1,
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>{p.title}</h3>
//               <p style={{ color: '#555', flexGrow: 1 }}>
//                 {p.content.length > 100 ? p.content.slice(0, 100) + '…' : p.content}
//               </p>
//               <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
//                 <Link
//                   to={`/post/${p._id}`}
//                   style={{
//                     padding: '0.5rem 1rem',
//                     borderRadius: '4px',
//                     textDecoration: 'none',
//                     border: '1px solid #007bff',
//                     color: '#007bff'
//                   }}
//                 >
//                   Read More
//                 </Link>
//                 {token && (
//                   <>
//                     <Link
//                       to={`/edit/${p._id}`}
//                       style={{
//                         padding: '0.5rem 1rem',
//                         borderRadius: '4px',
//                         textDecoration: 'none',
//                         border: '1px solid #6c757d',
//                         color: '#6c757d'
//                       }}
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       style={{
//                         padding: '0.5rem 1rem',
//                         borderRadius: '4px',
//                         border: '1px solid #dc3545',
//                         background: 'transparent',
//                         color: '#dc3545',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // 🌙 dark mode toggle
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, [token]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <div style={{ ...theme.wrapper }}>
      <div style={theme.header}>
        <h1 style={theme.title}>
           Blogs -<span style={theme.accent}> just write it!</span>
        </h1>
        <button onClick={() => setDarkMode(!darkMode)} style={theme.toggleBtn}>
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div style={theme.gridContainer}>
        {posts.map(p => (
          <div
            key={p._id}
            style={theme.card}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = darkMode
                ? '0 10px 25px rgba(255,255,255,0.1)'
                : '0 10px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = theme.card.boxShadow;
            }}
          >
            {p.imagePath && (
              <img
                src={`http://localhost:5001/uploads/${p.imagePath}`}
                alt={p.title}
                style={theme.image}
              />
            )}
            <div style={theme.content}>
              <h3 style={theme.postTitle}>{p.title}</h3>
              <p style={theme.postText}>
                {p.content.length > 120 ? p.content.slice(0, 120) + '…' : p.content}
              </p>
              <div style={theme.buttonGroup}>
                <Link to={`/post/${p._id}`} style={buttonStyle('#3498db')}>Read More</Link>
                {token && (
                  <>
                    <Link to={`/edit/${p._id}`} style={buttonStyle('#6c757d')}>Edit</Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        ...buttonStyle('#e74c3c'),
                        background: 'transparent',
                        border: '1px solid #e74c3c',
                        color: '#e74c3c'
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ✅ Reusable button style
const buttonStyle = (color) => ({
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  textDecoration: 'none',
  background: color,
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease'
});

// ✅ Light Theme
const lightStyles = {
  wrapper: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(120deg, #dad7d7ff 0%, #ebedee 100%)',
    boxSizing: 'border-box',
    color: '#2c3e50'
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 2rem',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0
  },
  accent: {
    color: '#0a72faff'
  },
  toggleBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    background: '#2c3e50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  gridContainer: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  card: {
    background: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover'
  },
  content: {
    padding: '1.2rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  postTitle: {
    margin: '0 0 0.8rem',
    fontSize: '1.4rem',
    color: '#34495e'
  },
  postText: {
    color: '#666',
    flexGrow: 1,
    lineHeight: '1.5'
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  }
};

// ✅ Dark Theme
const darkStyles = {
  ...lightStyles,
  wrapper: {
    ...lightStyles.wrapper,
    background: '#121212',
    color: '#f0f0f0'
  },
  card: {
    ...lightStyles.card,
    background: '#1e1e1e',
    boxShadow: '0 8px 20px rgba(255,255,255,0.05)'
  },
  postTitle: {
    ...lightStyles.postTitle,
    color: '#fff'
  },
  postText: {
    ...lightStyles.postText,
    color: '#bbb'
  },
  toggleBtn: {
    ...lightStyles.toggleBtn,
    background: '#f0f0f0',
    color: '#121212'
  }
};

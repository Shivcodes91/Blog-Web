
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams, Link } from 'react-router-dom';

// // export default function PostDetail() {
// //   const { id } = useParams();
// //   const [post, setPost] = useState(null);
// //   const [likes, setLikes] = useState(0);
// //   const [comments, setComments] = useState([]);
// //   const [commentInput, setCommentInput] = useState('');
// //   const token = localStorage.getItem('token');

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5001/api/posts/${id}`, {
// //         headers: token ? { Authorization: `Bearer ${token}` } : {}
// //       })
// //       .then(res => {
// //         setPost(res.data);
// //         setLikes(res.data.likes || 0);
// //         setComments(res.data.comments || []);
// //       })
// //       .catch(console.error);
// //   }, [id, token]);

// //   const handleLike = async () => {
// //     try {
// //       const res = await axios.post(
// //         `http://localhost:5001/api/posts/${id}/like`
// //       );
// //       setLikes(res.data.likes);
// //     } catch (err) {
// //       console.error('Failed to like:', err);
// //     }
// //   };

// //   const handleComment = async () => {
// //     if (!commentInput.trim()) return;
// //     try {
// //       const res = await axios.post(`http://localhost:5001/api/posts/${id}/comment`, {
// //         text: commentInput,
// //         user: 'Anonymous' // You can change this to the logged-in user's name
// //       });
// //       setComments(res.data.comments);
// //       setCommentInput('');
// //     } catch (err) {
// //       console.error('Failed to comment:', err);
// //     }
// //   };

// //   if (!post) return <p>Loading…</p>;

// //   return (
// //     <div className="card mb-4 shadow-sm">
// //       {post.imagePath && (
// //         <img
// //           src={`http://localhost:5001/uploads/${post.imagePath}`}
// //           className="card-img-top"
// //           alt={post.title}
// //         />
// //       )}
// //       <div className="card-body">
// //         <h2 className="card-title">{post.title}</h2>
// //         <p className="text-muted mb-2">Category: {post.category}</p>
// //         <p className="card-text">{post.content}</p>

// //         {/* Like Section */}
// //         <button onClick={handleLike} className="btn btn-outline-primary me-2">
// //           ❤️ Like ({likes})
// //         </button>

// //         {/* Comments Section */}
// //         <div className="mt-4">
// //           <h5>Comments</h5>
// //           <ul className="list-group mb-3">
// //             {comments.length > 0 ? (
// //               comments.map((c, index) => (
// //                 <li key={index} className="list-group-item">
// //                   <strong>{c.user}:</strong> {c.text}
// //                 </li>
// //               ))
// //             ) : (
// //               <li className="list-group-item text-muted">No comments yet.</li>
// //             )}
// //           </ul>

// //           <div className="input-group">
// //             <input
// //               type="text"
// //               value={commentInput}
// //               onChange={(e) => setCommentInput(e.target.value)}
// //               className="form-control"
// //               placeholder="Write a comment…"
// //             />
// //             <button onClick={handleComment} className="btn btn-primary">
// //               Submit
// //             </button>
// //           </div>
// //         </div>

// //         <Link to="/" className="btn btn-secondary mt-4">Back to Posts</Link>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// export default function PostDetail() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [commentInput, setCommentInput] = useState('');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5001/api/posts/${id}`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {}
//       })
//       .then(res => {
//         setPost(res.data);
//         setLikes(res.data.likes || 0);
//         setComments(res.data.comments || []);
//       })
//       .catch(console.error);
//   }, [id, token]);

//   const handleLike = async () => {
//     try {
//       const res = await axios.post(`http://localhost:5001/api/posts/${id}/like`);
//       setLikes(res.data.likes);
//     } catch (err) {
//       console.error('Failed to like:', err);
//     }
//   };

//   const handleComment = async () => {
//     if (!commentInput.trim()) return;
//     try {
//       const res = await axios.post(`http://localhost:5001/api/posts/${id}/comment`, {
//         text: commentInput,
//         user: 'Anonymous' // Replace with actual user
//       });
//       setComments(res.data.comments);
//       setCommentInput('');
//     } catch (err) {
//       console.error('Failed to comment:', err);
//     }
//   };

//   if (!post) return <p className="text-center mt-5">Loading…</p>;

//   return (
//     <div className="container my-5">
//       <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
//         {post.imagePath && (
//           <img
//             src={`http://localhost:5001/uploads/${post.imagePath}`}
//             className="w-100"
//             style={{ maxHeight: '400px', objectFit: 'cover' }}
//             alt={post.title}
//           />
//         )}
//         <div className="card-body p-4">
//           <h2 className="card-title mb-3">{post.title}</h2>
//           <span className="badge text-bg-secondary mb-2">{post.category}</span>
//           <p className="card-text fs-5 mt-3">{post.content}</p>

//           {/* Like Button */}
//           <div className="my-4">
//             <button onClick={handleLike} className="btn btn-outline-danger rounded-pill px-4 py-2">
//               ❤️ Like <span className="ms-1">({likes})</span>
//             </button>
//           </div>

//           {/* Comment Section */}
//           <div className="mt-5">
//             <h5 className="mb-3">💬 Comments</h5>
//             <div className="mb-4">
//               {comments.length > 0 ? (
//                 <ul className="list-group">
//                   {comments.map((c, index) => (
//                     <li
//                       key={index}
//                       className="list-group-item border-0 border-start border-4 border-primary bg-light mb-2 rounded"
//                     >
//                       <strong className="me-2">{c.user}:</strong> {c.text}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted fst-italic">No comments yet. Be the first!</p>
//               )}
//             </div>

//             <div className="input-group">
//               <input
//                 type="text"
//                 value={commentInput}
//                 onChange={(e) => setCommentInput(e.target.value)}
//                 className="form-control rounded-start-pill"
//                 placeholder="Write a comment…"
//               />
//               <button
//                 onClick={handleComment}
//                 className="btn btn-primary rounded-end-pill px-4"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>

//           {/* Back Button */}
//           <div className="mt-5">
//             <Link to="/" className="btn btn-outline-secondary rounded-pill">
//               ← Back to Posts
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/posts/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(res => {
        setPost(res.data);
        setLikes(res.data.likes || 0);
        setComments(res.data.comments || []);
      })
      .catch(console.error);
  }, [id, token]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:5001/api/posts/${id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleComment = async () => {
    if (!commentInput.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5001/api/posts/${id}/comment`, {
        text: commentInput,
        user: 'Anonymous' // Replace with logged-in user's name if needed
      });
      setComments(res.data.comments);
      setCommentInput('');
    } catch (err) {
      console.error('Failed to comment:', err);
    }
  };

  if (!post) return <p className="text-center mt-5">Loading…</p>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

        {/* ✅ Improved Image Display */}
        {post.imagePath && (
          <div className="w-100" style={{ maxHeight: '500px', overflow: 'hidden' }}>
            <img
              src={`http://localhost:5001/uploads/${post.imagePath}`}
              alt={post.title}
              className="img-fluid w-100"
              style={{ objectFit: 'cover', height: '100%', borderBottom: '2px solid #dee2e6' }}
            />
          </div>
        )}

        <div className="card-body p-4">
          <h2 className="card-title mb-3">{post.title}</h2>
          <span className="badge text-bg-secondary mb-2">{post.category}</span>
          <p className="card-text fs-5 mt-3">{post.content}</p>

          {/* ❤️ Like Button */}
          <div className="my-4">
            <button onClick={handleLike} className="btn btn-outline-danger rounded-pill px-4 py-2">
              ❤️ Like <span className="ms-1">({likes})</span>
            </button>
          </div>

          {/* 💬 Comments Section */}
          <div className="mt-5">
            <h5 className="mb-3">💬 Comments</h5>
            <div className="mb-4">
              {comments.length > 0 ? (
                <ul className="list-group">
                  {comments.map((c, index) => (
                    <li
                      key={index}
                      className="list-group-item border-0 border-start border-4 border-primary bg-light mb-2 rounded"
                    >
                      <strong className="me-2">{c.user}:</strong> {c.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted fst-italic">No comments yet. Be the first!</p>
              )}
            </div>

            {/* ✍️ Comment Input */}
            <div className="input-group">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="form-control rounded-start-pill"
                placeholder="Write a comment…"
              />
              <button
                onClick={handleComment}
                className="btn btn-primary rounded-end-pill px-4"
              >
                Submit
              </button>
            </div>
          </div>

          {/* 🔙 Back Button */}
          <div className="mt-5">
            <Link to="/" className="btn btn-outline-secondary rounded-pill">
              ← Back to Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

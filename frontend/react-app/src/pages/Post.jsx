import { useState, useEffect } from 'react';
import api from '../services/api';          // <-- default import
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Failed to load posts:', err))
      .finally(() => setLoading(false));
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };


  if (loading) return <p>Loading…</p>;

  return (
    <section>
      <h4>Posts</h4>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <h5>{p.title}</h5>
            <p>{p.content}</p>
            <Link to={`/posts/${p.id}/`}>Read more</Link>
          </li>
        ))}
      </ul>
     <a onClick={handleLogout} ><h1 >Logout</h1></a> 
    </section>
  );
}

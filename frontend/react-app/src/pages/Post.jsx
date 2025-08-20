import { useState, useEffect } from 'react';
import api from '../services/api';          // <-- default import
import { Link } from 'react-router-dom';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts/')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Failed to load posts:', err))
      .finally(() => setLoading(false));
  }, []);

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
    </section>
  );
}

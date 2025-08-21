import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState(''); // just for UI
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // make sure this key is correct
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      // Try common claim names you might have:
      const name =
        decoded.username ||
        decoded.name ||
        decoded.email ||
        (decoded.user_id ? `User#${decoded.user_id}` : '');
      setDisplayName(name || '');
      // NOTE: We are NOT sending author to the server. Backend will set it.
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) formData.append('image', image);

      // Do NOT set Content-Type manually; Axios will add the proper boundary.
      await api.post('/posts/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      alert('✅ Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('❌ Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {displayName && (
        <p style={{ marginBottom: 8, color: '#555' }}>
          Posting as: <strong>{displayName}</strong>
        </p>
      )}

      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Post'}
      </button>
    </form>
  );
}

export default CreatePost;

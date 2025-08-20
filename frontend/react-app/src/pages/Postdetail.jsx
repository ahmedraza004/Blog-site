import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}/`)
      .then(response => setPostDetail(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!postDetail) return <p>No post found.</p>;

  return (
    <div>
      <h1>ID: {postDetail.id}</h1>
      <h2>Title: {postDetail.title}</h2>
      <h3>Author: {postDetail.author}</h3>
      <p>Content: {postDetail.content}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default PostDetail;

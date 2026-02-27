import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import formatDateTime from "../../utils/formatDateTime";
import styles from "./PostDetail.module.css";


const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPost = async (slug) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/blog/${slug}/`,
      );
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPost(slug);
  }, [slug]);

  if (loading) return <div className="state-box">Loading post...</div>;
  if (error)
    return (
      <div className="state-box">
        <a href="/" className={styles.back}>
          ⟵ Back to posts
        </a>
        <br />
        {error}
      </div>
    );

  return (
    <div className={styles.container}>
      <a href="/" className={styles.back}>
        ⟵ Back to posts
      </a>
      <h1 className={styles.title}>{post.title}</h1>
      <time className={styles.date}>
        Published at: {formatDateTime(post.created_at)}
      </time>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.body }}
      ></div>
      <p className={styles.email}>armin.lambda@gmail.com</p>
    </div>
  );
};

export default PostDetail;

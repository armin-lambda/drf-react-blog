import { useState, useEffect } from "react";
import axios from "axios";

import formatDateTime from "../../utils/formatDateTime";
import styles from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPosts = async (query = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/blog/?search=${query}`,
      );
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(search);
  }, [search]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search posts..."
        className={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <div className="state-box">Loading posts...</div>}
      {!loading && error && <div className="state-box">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <div className="state-box">Nothing to show...</div>
      )}

      {!loading &&
        !error &&
        posts.map((post) => (
          <div className={styles.card} key={post.id}>
            <a href={`/${post.slug}`} className={styles.title}>
              {post.title}
            </a>
            <span className={styles.date}>
              Published at: {formatDateTime(post.created_at)}
            </span>
            <p className={styles.excerpt}>{post.body}</p>
            <p className={styles.email}>armin.lambda@gmail.com</p>
          </div>
        ))}
    </div>
  );
};

export default PostList;

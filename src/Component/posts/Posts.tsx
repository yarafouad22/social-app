import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  body: string;
  user: {
    name: string;
    username: string;
  };
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


     setPosts(response.data.data.posts);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to get posts"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Posts</h2>

      {posts.map((post) => (
        <div className="card mb-3" key={post._id}>
          <div className="card-body">
            <h5>{post.user?.name}</h5>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
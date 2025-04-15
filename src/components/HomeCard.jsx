import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("http://localhost:4000/api/v1/post/getposts", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setPosts([...posts, ...data?.posts]);
    };
    fetchPost();
  }, []);

  return (
    <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between mx-4 sm:mx-0">
      {posts.length > 0 &&
        posts?.slice(0, 2).map((post, index) => (
          <div
            key={index}
            className="group relative w-full h-[300px] sm:w-60 md:w-[32rem] md:h-[500px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg transition-all hover:text-sm"
          >
            <Link to={`/post/${post.slug}`}>
              <img
                src={post.image}
                alt="post cover"
                className="h-[150px] w-full md:h-[400px] object-cover group-hover:h-[300px] transition-all duration-300 z-20"
              />
            </Link>
            <div className="p-3 flex flex-col gap-2">
              <p className="text-md font-semibold line-clamp-1 md:text-xl">
                {post.title}
              </p>
              <span className="italic text-sm md:text-lg">{post.category}</span>
              <Link
                to={`/post/${post.slug}`}
                className="z-10 group-hover:bottom-2 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-br-xl rounded-tl-xl m-2"
              >
                Read Article
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomeCard;

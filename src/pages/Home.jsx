import React, { useState, useEffect } from "react";
import CallToAction from "../components/CallToAction.jsx";
import PostCard from "../components/PostCard.jsx";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection.jsx";
import HomeCard from "../components/HomeCard.jsx";

const Home = () => {
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
    <div>
      <div className="flex flex-col gap-6 max-w-6xl mx-auto my-8">
        <h1 className="text-3xl font-bold lg:text-6xl text-teal-600 dark:text-teal-200">
          Welcome to Inner Lens
        </h1>
        <p className="text-xs sm:text-sm  text-teal-600 dark:text-teal-200">
          Here you'll find thoughtful analysis, diverse perspectives, and
          engaging discourse on the issues that shape our world.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm  text-teal-600 dark:text-teal-200 font-bold hover:underline hover:underline-offset-2"
        >
          View all Posts
        </Link>
      </div>
      <div className="my-6 max-w-6xl mx-auto">
        <HeroSection />
      </div>
      <div className="my-6 px-6 sm:px-0 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6 mt-12 py-6 text-teal-600 dark:text-teal-200">
          Trending Posts
        </h1>
        <HomeCard />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center text-teal-600 dark:text-teal-200">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-600 hover:underline hover:underline-offset-2 text-center"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
      <div className="p-3 max-w-6xl mx-auto">
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;

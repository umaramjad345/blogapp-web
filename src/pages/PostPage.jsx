import { Spinner, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import PostCard from "../components/PostCard.jsx";
import CommentSection from "../components/CommentSection.jsx";

const PostPage = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:4000/api/v1/post/getposts?slug=${postSlug}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data?.posts[0]);
          setError(false);
          setLoading(false);
          return;
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(
          `http://localhost:4000/api/v1/post/getposts?limit=4`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data?.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col justify-center items-center border-b border-slate-500 max-w-3xl w-full mx-auto mt-10 py-3">
        <h1 className="text-3xl text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <div className="flex justify-end items-center self-end gap-2 text-teal-600 dark:text-teal-200 text-md">
          <p className="">Category:</p>
          <Link
            to={`/search?category=${post && post.category}`}
            className="hover:underline hover:underline-offset-2"
          >
            {post && post.category}
          </Link>
        </div>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-5 p-3 max-h-[600px] max-w-3xl w-full mx-auto object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500  max-w-3xl w-full mx-auto text-xs text-teal-600 dark:text-teal-200">
        <span>
          {post &&
            post.createdAt &&
            new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-3xl w-full mx-auto text-justify font-semibold"
        dangerouslySetInnerHTML={{ __html: post && post?.content }}
      ></div>
      <div className="max-w-3xl mx-auto my-5 w-full">
        <CallToAction />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 sm:flex-row max-w-3xl w-full mx-auto p-8 border border-teal-500 rounded-tl-3xl rounded-br-3xl">
        {recentPosts &&
          recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
      <CommentSection postId={post._id} />
    </main>
  );
};

export default PostPage;

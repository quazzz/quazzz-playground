'use client'
import { useState } from "react"
export default function page(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const submitPost = async () => {
    try {
      if (!title || !content) {
        return;
      }
  
  
      
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: content, author: 'admin' }),
      });
  
      if (res.ok) {
        setContent('');
        setTitle('');
      }
    } catch (error) {
      console.error(error);
    }
  };
    return(
      <div className="grid items-center justify-items-center min-h-screen p-6 sm:p-12 bg-black font-sans text-white font-sans">
       <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-purple-900/20"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
      </div>
        <div className="flex flex-col items-center mt-16 w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-4 z-100">add new post</h2>
        <div className="space-y-4 w-full z-1000">
          <input
            className="bg-black p-4 border border-gray-700 rounded-xl w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <input
            type="text"
            className="bg-black p-4 border border-gray-700 rounded-xl w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="content"
          />
        </div>
        <button
          onClick={submitPost}
          className="z-100 cursor-pointer mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg"
        >
          Submit
        </button>
      </div>
      </div>
    )
}
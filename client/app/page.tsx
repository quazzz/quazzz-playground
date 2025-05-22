"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./context/authContext";
import { Github, ExternalLink, Trash2, MenuIcon } from "lucide-react";
interface Post {
  id: string;
  title: string;
  content: string;
  author: any;
  createdAt: any;
}

export default function Home() {
  const {getRole} = useAuth()
  const role = getRole()
  console.log('ROLE...', role)
  const [posts, setPosts] = useState<Post[]>([]);
  const [burger, setBurger] = useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const json = await res.json();
      setPosts(json);
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    try {
      const res = await fetch("/api/posts", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-zinc-100 min-h-screen font-sans">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-purple-900/20"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
      </div>
      <div className="relative z-10">
     
        <header className="sticky z-1000 top-3 mx-4 rounded-2xl backdrop-blur-md max-w-3xl md:mx-auto lg:max-w-6xl bg-zinc-950/70 border-b border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="font-mono text-xl font-bold">
                    <span className="bg-clip-text text-transparent bg-purple-500">
                      quazzz
                    </span>
                    <span className="text-zinc-400">/</span>
                    <span className="text-white">playground</span>
                  </h1>
                </div>
              </div>
              <nav className=" items-center space-x-8 hidden md:flex">
                <Link
                  href="#about"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /about
                </Link>
                <Link
                  href="#projects"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                 /projects
                </Link>
                <Link
                  href="#links"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /links
                </Link>
                <Link
                  href="https://github.com/quazzz"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Github size={18} />
                </Link>
                 {role === "admin" && 
                  <Link
                  href=""
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /logout
                </Link>
                }
              </nav>
              <MenuIcon  onClick={() => setBurger(!burger)} className="cursor-pointer block md:hidden"></MenuIcon>
             
            </div>
             {
                burger ? <nav className=" items-center flex flex-col justify-center text-center space-y-4 p-3 ">
                <Link
                  href="#about"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /about
                </Link>
                <Link
                  href="#projects"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /projects
                </Link>
                <Link
                  href="#links"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /links
                </Link>
                <Link
                  href="https://github.com/quazzz"
                  className="text-zinc-400 hover:text-white transition-colors "
                >
                  <Github size={18} />
                </Link>
                {role === "admin" && 
                  <Link
                  href=""
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm font-medium"
                >
                  /logout
                </Link>
                }
              </nav> : ''
              }
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-16">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                peak <span className="text-purple-500">developer</span>{" "}
                projects and ideas
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                a collection of thoughts, projects, and experiments from the
                digital reality
              </p>
            </div>
          </section>

          <section className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-black border border-zinc-800 hover:border-zinc-900 transition-all hover:shadow-lg hover:shadow-purple-900/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <time
                        className="text-xs text-zinc-500 font-mono"
                        dateTime={post.createdAt}
                      >
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-zinc-600 hover:text-zinc-200 transition-colors cursor-pointer"
                        aria-label="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-500 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="pt-4 border-t border-zinc-800/50 flex justify-between items-center">
                      <div className="flex items-center text-xs font-medium">
                        <span className="text-purple-500 mr-1.5">@</span>
                        <span className="text-zinc-300">{post.author}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} className="text-purple-500" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

       
        <footer className=" py-12 relative z-10 ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="font-mono text-lg font-bold">
                  <span className="text-purple-500">quazzz</span>
                  <span className="text-zinc-400">/</span>
                  <span className="text-white">playground</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-2">
                  experiments, thoughts, and digital explorations
                </p>
              </div>
              <div className="flex space-x-8">
                <Link
                  href="#about"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm"
                >
                  /about
                </Link>
                <Link
                  href="#projects"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm"
                >
                  /projects
                </Link>
                <Link
                  href="#links"
                  className="text-zinc-400 hover:text-purple-500 transition-colors text-sm"
                >
                  /links
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 text-center text-zinc-500 text-sm">
              © {new Date().getFullYear()} quazzz/playground. all code is
              available via MIT license through github
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

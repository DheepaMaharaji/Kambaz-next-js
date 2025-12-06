"use client";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NewPostButton from "./NewPostButton";
import SearchPostsField from "./SearchPostsField";
import CategoryAccordion from "./categoryAccordion";
import PostScreen, { Post } from "../PostScreen/PostScreen";

 

const categorizePost = (date: Date, now: Date): string => {
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last Week";

  // Compute week range
  const postDate = new Date(date);
  const day = postDate.getDay();
  const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(postDate.setDate(diff));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return `${monday.getMonth() + 1}/${monday.getDate()} - ${
    sunday.getMonth() + 1
  }/${sunday.getDate()}`;
};

const ListOfPostsSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["Today", "Yesterday", "Last Week"])
  );

  const [posts] = useState<Post[]>([
    {
        id: "1",
        title: "How to make buttons sit on the right o...",
        author: "Alice",
        authorRole: "student",
        content: "In Homework one, we are implementing an assignment editor page. At the bottom of the page, we need to create two buttons",
        createdAt: new Date(2024, 11, 5, 16, 9),
        type: "question",
        views: 0
    },
    {
        id: "2",
        title: "Clarification on Lab1",
        author: "Megan",
        authorRole: "student",
        content: 'In the anchor tag part of lab1 (bottom of page 17), we are asked to "Create another link to your code repository on GitH',
        createdAt: new Date(2024, 11, 5, 14, 43),
        type: "question",
        views: 0
    },
    {
        id: "3",
        title: "Heet Kanani - Office hours s...",
        author: "Heet Kanani",
        authorRole: "instructor",
        content: "Hello everyone,I'm holding office hours from until 10:30am EST. Feel free to drop by if you have any questions through",
        createdAt: new Date(2024, 11, 4, 6, 56),
        type: "note",
        views: 0
    },
    {
        id: "4",
        title: "Aryan Mehta - Office Hourse",
        author: "Aryan Mehta",
        authorRole: "instructor",
        content: "Good Evening, I am holding office hours today from 2pm EST. Feel free to drop by if you have any questions about",
        createdAt: new Date(2024, 10, 29, 14, 0),
        type: "note",
        views: 0
    },
    {
        id: "5",
        title: "Kaumudi Rawal - Office Hours",
        author: "Kaumudi Rawal",
        authorRole: "instructor",
        content: "Hello everyone,I'm holding office hours until 10:30am EST. Feel free to drop by if you have any questions.",
        createdAt: new Date(2024, 10, 28, 10, 0),
        type: "note",
        views: 0
    },
  ]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const s = new Set(prev);
      s.has(category) ? s.delete(category) : s.add(category);
      return s;
    });
  };

  const handlePostClick = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) setSelectedPost(post);
  };


   const handleNewPost = () => console.log("New post clicked");


  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const category = categorizePost(post.createdAt, new Date());
    (acc[category] = acc[category] || []).push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const order = ["Today", "Yesterday", "Last Week"];
  const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return b.localeCompare(a);
  });
 
  return (
    <div className="d-flex h-100 bg-light">
      

      {/* SIDEBAR PANEL */}
      <div
        className={`bg-white border-start transition-all ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: isOpen ? "380px" : "40px",
          overflow: "hidden",
          transition: "width 0.3s ease",
        }}

        
      >
      
        {isOpen ? (
          <div className="h-100 d-flex flex-column">
            {/* Header */}
            <div className="p-3 border-bottom d-flex align-items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-light p-1"
              >
                <FiChevronRight size={20} className="text-secondary" />
              </button>
              <h2 className="m-0 fw-semibold text-dark">Posts</h2>
            </div>

            {/* New Post + Search */}
            <div className="p-3 border-bottom">
              <div className="mb-2">
                <NewPostButton onClick={handleNewPost} />
              </div>
              <SearchPostsField
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            {/* List */}
            <div className="flex-grow-1 overflow-auto">
              {sortedCategories.map((category) => (
                <CategoryAccordion
                  key={category}
                  title={category}
                  posts={groupedPosts[category]}
                  isOpen={openCategories.has(category)}
                  onToggle={() => toggleCategory(category)}
                  onPostClick={handlePostClick}
                />
              ))}
            </div>
          </div>
        ):(
            <button
                onClick={() => setIsOpen(true)}
                className="w-100 h-100 btn btn-light d-flex align-items-center justify-content-center"
            >
                <FiChevronRight size={20} className="text-secondary" />
            </button>
        )}
      </div>

        {/* MAIN CONTENT */}
      
        <div className="flex-grow-1 p-4 overflow-auto">
                {selectedPost ? (
                    <PostScreen
                    post={selectedPost}
                    currentUserRole="student" // or dynamically from your app
                    currentUserName="Bob" // replace with logged-in user
                    />
                ) : (
                    <>
                    <h1 className="fs-3 fw-bold text-dark">Q&A Forum</h1>
                    <p className="text-muted mt-2">
                        Select a post from the sidebar to view details
                    </p>
                    </>
                )}
        </div>
      

      {/* SIDEBAR TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="position-fixed end-0 top-0 m-3 btn btn-white border shadow-sm"
        >
          <FiChevronRight size={20} className="text-secondary" />
        </button>
      )}
    </div>
  );
};

export default ListOfPostsSidebar;

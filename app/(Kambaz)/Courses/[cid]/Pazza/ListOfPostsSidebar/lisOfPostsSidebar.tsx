
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FiChevronRight } from "react-icons/fi";
import NewPostButton from "./NewPostButton";
import SearchPostsField from "./SearchPostsField";
//import FolderFilters from "../P&B/FolderFilter";
import CategoryAccordion from "./categoryAccordion";
import PostScreen from "../PostScreen/PostScreen";
import NewPostForm from "../NewPost/NewPostForm";
import { Post } from "./PostItem";
import ClassAtGlance from "./ClassAtGlance";
import * as client from "../../../client";
import { User } from "@/app/(Kambaz)/Account/reducer";

// --- Helper function to categorize posts ---
const categorizePost = (date: Date, now: Date): string => {
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last Week";

  const postDate = new Date(date);
  const day = postDate.getDay();
  const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(postDate.setDate(diff));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
};

interface RootState {
  accountReducer: {
    currentUser: User;
  };
}

interface ListOfPostsSidebarProps {
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  folders: string[];
  onNavigateToManageFolders: () => void;
}
const ListOfPostsSidebar: React.FC<ListOfPostsSidebarProps> = ({
  selectedFolder,
  onFolderChange,
  folders,
  onNavigateToManageFolders
}) => {
  const { cid } = useParams();
  const courseId = cid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // ============================================
  // CHANGE 1: Added folder filtering state
  // ============================================
  //const [folders, setFolders] = useState<string[]>(["All"]);
  //const [selectedFolder, setSelectedFolder] = useState<string>("All");
  
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["Today", "Yesterday", "Last Week"])
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // ============================================
  // CHANGE 2: Fetch folders when component mounts
  // ============================================
  useEffect(() => {
    if (courseId && currentUser) {
      
      fetchPosts();
    }
  }, [courseId, currentUser]);

  // ============================================
  // CHANGE 3: Added fetchFolders function
  // ============================================
  // const fetchFolders = async () => {
  //   try {
  //     const foldersData = await client.getFoldersForCourse(courseId);
  //     const folderNames = foldersData.map((f) => f.name);
  //     setFolders(["All", ...folderNames]);
  //   } catch (error) {
  //     console.error("Error fetching folders:", error);
  //     setFolders(["All"]); // Fallback to "All" if error
  //   }
  // };

  const fetchPosts = async () => {
    try {
      setLoading(true);
     
      const data = await client.findPostsByFolderName(
      courseId,
      selectedFolder,
      currentUser._id,
      currentUser.role as string
    );
    
      // Transform API data to match Post interface
      const transformedPosts = data.map((post: Post) => ({
        _id: post._id,
        title: post.title,
        author: `${currentUser.firstName} ${currentUser.lastName}`,
        authorRole: (post.authorRole || "student").toLowerCase(),
        content: post.content,
        createdAt: new Date(post.createdAt),
        type: post.type,
        views: post.views || 0,
        folder: post.folder || [],
        users: post.users,
        to: post.to,
        studentAnswers: post.studentAnswers || [],
        instructorAnswers: post.instructorAnswers || [],
        readByUserIds: post.readByUserIds || [],
      }));
    
    
      setPosts(transformedPosts);
    }
    
     catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const s = new Set(prev);
      s.has(category) ? s.delete(category) : s.add(category);
      return s;
    });
  };

  const handlePostClick = async (postId: string) => {
    const post = posts.find((p) => p._id === postId);
    if (post) {
      setSelectedPost(post);
      setShowNewPostForm(false);

      // Increment view count
      try {
        await client.incrementViews(postId, currentUser._id);
        // Update local state
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === postId
              ? {
                  ...p,
                  views: p.views + 1,
                  readByUserIds: [...p.readByUserIds, currentUser._id],
                }
              : p
          )
        );
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    }
  };

  const handleNewPostClick = () => {
    setShowNewPostForm(true);
    setSelectedPost(null);
  };

  const handlePostCreated = async (newPost: Post) => {
    try {
      // Create post via API
      const createdPost = await client.createPost(courseId, {
          title: newPost.title,
          content: newPost.content,
          author: `${currentUser.firstName} ${currentUser.lastName}`,
          authorRole: currentUser.role as string,
          type: newPost.type,
          to: newPost.to || "Entire Class",
          users: newPost.users || [],
          folder: newPost.folder || [],
          _id: "",
          createdAt: new Date(),
          views: 0,
          studentAnswers: [],
          instructorAnswers: [],
          readByUserIds: [],
          isSelected:false
      });

      // Transform and add to posts list
      const transformedPost = {
        _id: createdPost._id,
        title: createdPost.title,
        author: createdPost.author,
        authorRole: createdPost.authorRole.toLowerCase(),
        content: createdPost.content,
        createdAt: new Date(createdPost.createdAt),
        type: createdPost.type,
        views: 0,
        folder: createdPost.folder,
        users: createdPost.users,
        to: createdPost.to,
        studentAnswers: [],
        instructorAnswers: [],
        readByUserIds: [],
        isSelected:false,
      };

      setPosts([transformedPost, ...posts]);
      setShowNewPostForm(false);
      setSelectedPost(transformedPost);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  // ============================================
  // CHANGE 4: Added folder change handler
  // ============================================
  // const handleFolderChange = (folder: string) => {
  //   setSelectedFolder(folder);
  // };

  // ============================================
  // CHANGE 5: Updated filtering to include folder filter
  // ============================================
  const filteredPosts = posts.filter((p) => {
    // Check if matches search query
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if matches selected folder
    const matchesFolder =
      selectedFolder === "All" ||
      (p.folder && p.folder.includes(selectedFolder));
    
    return matchesSearch && matchesFolder;
  });

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

  if (loading) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <p className="text-muted">Please log in to view posts.</p>
      </div>
    );
  }

  return (
    <div className="d-flex h-100 bg-light">
      {/* SIDEBAR */}
      <div
        className="bg-white border-start flex-shrink-0"
        style={{
          width: isOpen ? "400px" : "40px",
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
                <NewPostButton onClick={handleNewPostClick} />
              </div>
              <SearchPostsField
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

          

            {/* List of posts */}
            <div className="flex-grow-1 overflow-auto">
              {sortedCategories.length === 0 ? (
                <div className="p-3 text-center text-muted">
                  {selectedFolder === "All" 
                    ? "No posts found" 
                    : `No posts found in "${selectedFolder}"`}
                </div>
              ) : (
                sortedCategories.map((category) => (
                  <CategoryAccordion
                    key={category}
                    title={category}
                    posts={groupedPosts[category]}
                    isOpen={openCategories.has(category)}
                    onToggle={() => toggleCategory(category)}
                    onPostClick={handlePostClick}
                    selectedPostId={selectedPost?._id}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
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
        {showNewPostForm ? (
          <NewPostForm
            onCancel={() => setShowNewPostForm(false)}
            onPostCreated={handlePostCreated}
            onManageFolders={onNavigateToManageFolders}
            folders={folders}
          />
        ) : selectedPost ? (
          <PostScreen
            post={selectedPost}
            currentUserRole={currentUser.role?.toLowerCase() as string}
            currentUserName={currentUser.username || currentUser._id}
          />
        ) : (
          <>
            <ClassAtGlance
              posts={posts}
              studentsEnrolled={5}
              currentUserId={currentUser._id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfPostsSidebar;

// // "use client";

// // import React, { useState } from "react";
// // import { FiChevronRight } from "react-icons/fi";
// // import NewPostButton from "./NewPostButton";
// // import SearchPostsField from "./SearchPostsField";
// // import CategoryAccordion from "./categoryAccordion";
// // import PostScreen from "../PostScreen/PostScreen";
// // import NewPostForm from "../NewPost/NewPostForm";
// // import { Post } from "./PostItem";
// // import ClassAtGlance from "./ClassAtGlance";

// // // --- Helper function to categorize posts ---
// // const categorizePost = (date: Date, now: Date): string => {
// //   const diffTime = now.getTime() - date.getTime();
// //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// //   if (diffDays === 0) return "Today";
// //   if (diffDays === 1) return "Yesterday";
// //   if (diffDays <= 7) return "Last Week";

// //   const postDate = new Date(date);
// //   const day = postDate.getDay();
// //   const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
// //   const monday = new Date(postDate.setDate(diff));
// //   const sunday = new Date(monday);
// //   sunday.setDate(monday.getDate() + 6);

// //   return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
// // };

// // const ListOfPostsSidebar: React.FC = () => {
// //   const [isOpen, setIsOpen] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [openCategories, setOpenCategories] = useState<Set<string>>(
// //     new Set(["Today", "Yesterday", "Last Week"])
// //   );

// //   const [posts, setPosts] = useState<Post[]>([
// //     {
// //         id: "1",
// //         title: "How to make buttons sit on the right...",
// //         author: "Alice",
// //         authorRole: "student",
// //         content: "In Homework one, we are implementing an assignment editor page...",
// //         createdAt: new Date(2024, 11, 5, 16, 9),
// //         type: "question",
// //         views: 0,
// //         studentAnswers: [],
// //         instructorAnswers: [],
// //         readByUserIds: []
// //     },
// //     {
// //         id: "2",
// //         title: "Clarification on Lab1",
// //         author: "Megan",
// //         authorRole: "student",
// //         content: 'In the anchor tag part of lab1, we are asked to create another link...',
// //         createdAt: new Date(2024, 11, 5, 14, 43),
// //         type: "question",
// //         views: 0,
// //         studentAnswers: [],
// //         instructorAnswers: [],
// //         readByUserIds: []
// //     },
// //     {
// //         id: "3",
// //         title: "Heet Kanani - Office hours s...",
// //         author: "Heet Kanani",
// //         authorRole: "instructor",
// //         content: "Hello everyone, I'm holding office hours until 10:30am EST...",
// //         createdAt: new Date(2024, 11, 4, 6, 56),
// //         type: "note",
// //         views: 0,
// //         studentAnswers: [],
// //         instructorAnswers: [],
// //         readByUserIds: []
// //     },
// //     {
// //         id: "4",
// //         title: "Aryan Mehta - Office Hours",
// //         author: "Aryan Mehta",
// //         authorRole: "instructor",
// //         content: "Good Evening, I am holding office hours today from 2pm EST...",
// //         createdAt: new Date(2024, 10, 29, 14, 0),
// //         type: "note",
// //         views: 0,
// //         studentAnswers: [],
// //         instructorAnswers: [],
// //         readByUserIds: []
// //     },
// //     {
// //         id: "5",
// //         title: "Kaumudi Rawal - Office Hours",
// //         author: "Kaumudi Rawal",
// //         authorRole: "instructor",
// //         content: "Hello everyone, I'm holding office hours until 10:30am EST...",
// //         createdAt: new Date(2024, 10, 28, 10, 0),
// //         type: "note",
// //         views: 0,
// //         studentAnswers: [],
// //         instructorAnswers: [],
// //         readByUserIds: []
// //     },
// //   ]);

// //   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
// //   const [showNewPostForm, setShowNewPostForm] = useState(false);

// //   const toggleCategory = (category: string) => {
// //     setOpenCategories((prev) => {
// //       const s = new Set(prev);
// //       s.has(category) ? s.delete(category) : s.add(category);
// //       return s;
// //     });
// //   };

// //   const handlePostClick = (postId: string) => {
// //     const post = posts.find((p) => p.id === postId);
// //     if (post) {
// //       setSelectedPost(post);
// //       setShowNewPostForm(false);
// //     }
// //   };

// //   const handleNewPostClick = () => {
// //     setShowNewPostForm(true);
// //     setSelectedPost(null);
// //   };

// //   const handlePostCreated = (newPost: Post) => {
// //     setPosts([newPost, ...posts]);
// //     setShowNewPostForm(false);
// //     setSelectedPost(newPost);
// //   };

// //   // --- Filter and group posts ---
// //   const filteredPosts = posts.filter(
// //     (p) =>
// //       p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       p.content.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const groupedPosts = filteredPosts.reduce((acc, post) => {
// //     const category = categorizePost(post.createdAt, new Date());
// //     (acc[category] = acc[category] || []).push(post);
// //     return acc;
// //   }, {} as Record<string, Post[]>);

// //   const order = ["Today", "Yesterday", "Last Week"];
// //   const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
// //     const ai = order.indexOf(a);
// //     const bi = order.indexOf(b);
// //     if (ai !== -1 && bi !== -1) return ai - bi;
// //     if (ai !== -1) return -1;
// //     if (bi !== -1) return 1;
// //     return b.localeCompare(a);
// //   });

// //   return (
// //     <div className="d-flex h-100 bg-light">
// //       {/* SIDEBAR */}
// //       <div
// //         className="bg-white border-start"
// //         style={{
// //           width: isOpen ? "380px" : "40px",
// //           overflow: "hidden",
// //           transition: "width 0.3s ease",
// //         }}
// //       >
// //         {isOpen ? (
// //           <div className="h-100 d-flex flex-column">
// //             {/* Header */}
// //             <div className="p-3 border-bottom d-flex align-items-center gap-2">
// //               <button
// //                 onClick={() => setIsOpen(false)}
// //                 className="btn btn-light p-1"
// //               >
// //                 <FiChevronRight size={20} className="text-secondary" />
// //               </button>
// //               <h2 className="m-0 fw-semibold text-dark">Posts</h2>
// //             </div>

// //             {/* New Post + Search */}
// //             <div className="p-3 border-bottom">
// //               <div className="mb-2">
// //                 <NewPostButton onClick={handleNewPostClick} />
// //               </div>
// //               <SearchPostsField
// //                 value={searchQuery}
// //                 onChange={setSearchQuery}
// //               />
// //             </div>

// //             {/* List of posts */}
// //             <div className="flex-grow-1 overflow-auto">
// //               {sortedCategories.map((category) => (
// //                 <CategoryAccordion
// //                   key={category}
// //                   title={category}
// //                   posts={groupedPosts[category]}
// //                   isOpen={openCategories.has(category)}
// //                   onToggle={() => toggleCategory(category)}
// //                   onPostClick={handlePostClick}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         ) : (
// //           <button
// //             onClick={() => setIsOpen(true)}
// //             className="w-100 h-100 btn btn-light d-flex align-items-center justify-content-center"
// //           >
// //             <FiChevronRight size={20} className="text-secondary" />
// //           </button>
// //         )}
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="flex-grow-1 p-4 overflow-auto">
// //         {showNewPostForm ? (
// //           <NewPostForm
// //             onCancel={() => setShowNewPostForm(false)}
// //             onPostCreated={handlePostCreated}
// //           />
// //         ) : selectedPost ? (
// //           <PostScreen
// //             post={selectedPost}
// //             currentUserRole="student"
// //             currentUserName="Bob"
// //           />
// //         ) : (
// //           <>
// //             <ClassAtGlance posts={posts} studentsEnrolled={5} currentUserId="3"/>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ListOfPostsSidebar;

// "use client";

// import React, { useState, useEffect } from "react";
// import { FiChevronRight } from "react-icons/fi";
// import NewPostButton from "./NewPostButton";
// import SearchPostsField from "./SearchPostsField";
// import CategoryAccordion from "./categoryAccordion";
// import PostScreen from "../PostScreen/PostScreen";
// import NewPostForm from "../NewPost/NewPostForm";
// import { Post } from "./PostItem";
// import ClassAtGlance from "./ClassAtGlance";
// import * as client from "../../../client" // Adjust path to your client.ts file
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store";
// // --- Helper function to categorize posts ---
// const categorizePost = (date: Date, now: Date): string => {

//   const diffTime = now.getTime() - date.getTime();
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return "Today";
//   if (diffDays === 1) return "Yesterday";
//   if (diffDays <= 7) return "Last Week";

//   const postDate = new Date(date);
//   const day = postDate.getDay();
//   const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
//   const monday = new Date(postDate.setDate(diff));
//   const sunday = new Date(monday);
//   sunday.setDate(monday.getDate() + 6);

//   return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
// };

// interface ListOfPostsSidebarProps {
//   courseId: string;
//   currentUserId: string;
//   currentUserRole: string;
// }

// const ListOfPostsSidebar: React.FC<ListOfPostsSidebarProps> = ({
//   courseId,
//   currentUserId,
//   currentUserRole,
// }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openCategories, setOpenCategories] = useState<Set<string>>(
//     new Set(["Today", "Yesterday", "Last Week"])
//   );
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const [showNewPostForm, setShowNewPostForm] = useState(false);
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   // Fetch posts on component mount
//   useEffect(() => {
//     fetchPosts();
//   }, [courseId]);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const data = await client.findVisiblePostsForUser(
//         courseId,
//         currentUserId,
//         currentUserRole
//       );
      
//       // Transform API data to match Post interface
//       const transformedPosts = data.map((post: Post) => ({
//         id: post._id,
//         title: post.title,
//         author: post.author?.username || post.author,
//         authorRole: post.authorRole?.toLowerCase() || "student",
//         content: post.content,
//         createdAt: new Date(post.createdAt),
//         type: post.type,
//         views: post.views || 0,
//         folder: post.folder,
//         users: post.users,
//         to: post.to,
//         studentAnswers: post.studentAnswers || [],
//         instructorAnswers: post.instructorAnswers || [],
//         readByUserIds: post.readByUserIds || [],
//       }));

//       setPosts(transformedPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCategory = (category: string) => {
//     setOpenCategories((prev) => {
//       const s = new Set(prev);
//       s.has(category) ? s.delete(category) : s.add(category);
//       return s;
//     });
//   };

//   const handlePostClick = async (postId: string) => {
//     const post = posts.find((p) => p.id === postId);
//     if (post) {
//       setSelectedPost(post);
//       setShowNewPostForm(false);

//       // Increment view count
//       try {
//         await client.incrementViews(postId, currentUserId);
//         // Update local state
//         setPosts((prevPosts) =>
//           prevPosts.map((p) =>
//             p.id === postId
//               ? {
//                   ...p,
//                   views: p.views + 1,
//                   readByUserIds: [...p.readByUserIds, currentUserId],
//                 }
//               : p
//           )
//         );
//       } catch (error) {
//         console.error("Error incrementing views:", error);
//       }
//     }
//   };

//   const handleNewPostClick = () => {
//     setShowNewPostForm(true);
//     setSelectedPost(null);
//   };

//   const handlePostCreated = async (newPost: Post) => {
//     try {
//       // Create post via API
//       const createdPost = await client.createPost(courseId, {
//           title: newPost.title,
//           content: newPost.content,
//           author: currentUserId,
//           authorRole: currentUserRole,
//           type: newPost.type,
//           to: newPost.to || "Entire Class",
//           users: newPost.users || [],
//           folder: newPost.folder || [],
//           id: "",
//           createdAt: new Date(),
//           views: 0,
//           studentAnswers: [],
//           instructorAnswers: [],
//           readByUserIds: []
//       });

//       // Transform and add to posts list
//       const transformedPost = {
//         id: createdPost._id,
//         title: createdPost.title,
//         author: createdPost.author?.username || createdPost.author,
//         authorRole: createdPost.authorRole?.toLowerCase() || "student",
//         content: createdPost.content,
//         createdAt: new Date(createdPost.createdAt),
//         type: createdPost.type,
//         views: 0,
//         folder: createdPost.folder,
//         users: createdPost.users,
//         to: createdPost.to,
//         studentAnswers: [],
//         instructorAnswers: [],
//         readByUserIds: [],
//       };

//       setPosts([transformedPost, ...posts]);
//       setShowNewPostForm(false);
//       setSelectedPost(transformedPost);
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert("Failed to create post. Please try again.");
//     }
//   };

//   // --- Filter and group posts ---
//   const filteredPosts = posts.filter(
//     (p) =>
//       p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.content.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const groupedPosts = filteredPosts.reduce((acc, post) => {
//     const category = categorizePost(post.createdAt, new Date());
//     (acc[category] = acc[category] || []).push(post);
//     return acc;
//   }, {} as Record<string, Post[]>);

//   const order = ["Today", "Yesterday", "Last Week"];
//   const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
//     const ai = order.indexOf(a);
//     const bi = order.indexOf(b);
//     if (ai !== -1 && bi !== -1) return ai - bi;
//     if (ai !== -1) return -1;
//     if (bi !== -1) return 1;
//     return b.localeCompare(a);
//   });

//   if (loading) {
//     return (
//       <div className="d-flex h-100 justify-content-center align-items-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex h-100 bg-light">
//       {/* SIDEBAR */}
//       <div
//         className="bg-white border-start"
//         style={{
//           width: isOpen ? "380px" : "40px",
//           overflow: "hidden",
//           transition: "width 0.3s ease",
//         }}
//       >
//         {isOpen ? (
//           <div className="h-100 d-flex flex-column">
//             {/* Header */}
//             <div className="p-3 border-bottom d-flex align-items-center gap-2">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="btn btn-light p-1"
//               >
//                 <FiChevronRight size={20} className="text-secondary" />
//               </button>
//               <h2 className="m-0 fw-semibold text-dark">Posts</h2>
//             </div>

//             {/* New Post + Search */}
//             <div className="p-3 border-bottom">
//               <div className="mb-2">
//                 <NewPostButton onClick={handleNewPostClick} />
//               </div>
//               <SearchPostsField
//                 value={searchQuery}
//                 onChange={setSearchQuery}
//               />
//             </div>

//             {/* List of posts */}
//             <div className="flex-grow-1 overflow-auto">
//               {sortedCategories.length === 0 ? (
//                 <div className="p-3 text-center text-muted">
//                   No posts found
//                 </div>
//               ) : (
//                 sortedCategories.map((category) => (
//                   <CategoryAccordion
//                     key={category}
//                     title={category}
//                     posts={groupedPosts[category]}
//                     isOpen={openCategories.has(category)}
//                     onToggle={() => toggleCategory(category)}
//                     onPostClick={handlePostClick}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsOpen(true)}
//             className="w-100 h-100 btn btn-light d-flex align-items-center justify-content-center"
//           >
//             <FiChevronRight size={20} className="text-secondary" />
//           </button>
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-grow-1 p-4 overflow-auto">
//         {showNewPostForm ? (
//           <NewPostForm
//             onCancel={() => setShowNewPostForm(false)}
//             onPostCreated={handlePostCreated}
//           />
//         ) : selectedPost ? (
//           <PostScreen
//             post={selectedPost}
//             currentUserRole= {currentUser?.role}
//             currentUserName={currentUser?.username}
//           />
//         ) : (
//           <>
//             <ClassAtGlance
//               posts={posts}
//               studentsEnrolled={5}
//               currentUserId={currentUserId}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListOfPostsSidebar;
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FiChevronRight } from "react-icons/fi";
import NewPostButton from "./NewPostButton";
import SearchPostsField from "./SearchPostsField";
import CategoryAccordion from "./categoryAccordion";
import PostScreen from "../PostScreen/PostScreen";
import NewPostForm from "../NewPost/NewPostForm";
import { Post } from "./PostItem";
import ClassAtGlance from "./ClassAtGlance";
import * as client from "../../../client"; // Adjust path to your client.ts file
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

const ListOfPostsSidebar: React.FC = () => {
  const { cid } = useParams();
  const courseId = cid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["Today", "Yesterday", "Last Week"])
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Fetch posts on component mount
  useEffect(() => {
    if (courseId && currentUser) {
      fetchPosts();
    }
  }, [courseId, currentUser]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await client.findVisiblePostsForUser(
        courseId,
        currentUser._id,
        currentUser.role as string
      );
      
      // Transform API data to match Post interface
      const transformedPosts = data.map((post: Post) => ({
        _id: post._id,
        title: post.title,
        author: currentUser._id,
        authorRole: currentUser.role || "student",
        content: post.content,
        createdAt: new Date(post.createdAt),
        type: post.type,
        views: post.views || 0,
        folder: post.folder,
        users: post.users,
        to: post.to,
        studentAnswers: post.studentAnswers || [],
        instructorAnswers: post.instructorAnswers || [],
        readByUserIds: post.readByUserIds || [],
      }));

      setPosts(transformedPosts);
    } catch (error) {
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
          author: currentUser._id,
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
          readByUserIds: []
      });

      // Transform and add to posts list
      const transformedPost = {
        _id: createdPost._id,
        title: createdPost.title,
        author: createdPost.author,
        authorRole: createdPost.authorRole.toLowerCase() ,
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
      };

      setPosts([transformedPost, ...posts]);
      setShowNewPostForm(false);
      setSelectedPost(transformedPost);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  // --- Filter and group posts ---
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
        className="bg-white border-start"
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
                  No posts found
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
// // // // // import { useState } from "react";
// // // // // import DiscussionItem, { Discussion } from "./DiscussionItem";
// // // // // import AnswerItem, { Answer } from "./AnswerItem";
// // // // // import { BsFileText, BsQuestionCircle } from "react-icons/bs";
// // // // // import { FiEdit } from "react-icons/fi";
// // // // // import ActionDropdown from "./ActionDropdown";
// // // // // import Editor from "./editor";
// // // // // import { Post } from "../ListOfPostsSidebar/PostItem";



// // // // // interface PostScreenProps {
// // // // //   post: Post | null;
// // // // //   currentUserRole: string;
// // // // //   currentUserName: string;
// // // // // }

// // // // // export default function PostScreen({ 
// // // // //   post, 
// // // // //   currentUserRole,
// // // // //   currentUserName 
// // // // // }: PostScreenProps) {
// // // // //   const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
// // // // //   const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
// // // // //   const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
// // // // //   const [newStudentAnswer, setNewStudentAnswer] = useState('');
// // // // //   const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
// // // // //   const [newDiscussion, setNewDiscussion] = useState('');

// // // // //   if (!post) {
// // // // //     return (
// // // // //       <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
// // // // //         Select a post to view details
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const isAuthorOrInstructor = 
// // // // //     post.author === currentUserName || currentUserRole === 'instructor';

// // // // //   const handleSubmitStudentAnswer = () => {
// // // // //     if (newStudentAnswer.trim()) {
// // // // //       const newAnswer: Answer = {
// // // // //         id: Date.now().toString(),
// // // // //         author: currentUserName,
// // // // //         authorRole: 'student',
// // // // //         content: newStudentAnswer,
// // // // //         createdAt: new Date()
// // // // //       };
// // // // //       setStudentAnswers([...studentAnswers, newAnswer]);
// // // // //       setNewStudentAnswer('');
// // // // //     }
// // // // //   };

// // // // //   const handleSubmitInstructorAnswer = () => {
// // // // //     if (newInstructorAnswer.trim()) {
// // // // //       const newAnswer: Answer = {
// // // // //         id: Date.now().toString(),
// // // // //         author: currentUserName,
// // // // //         authorRole: 'instructor',
// // // // //         content: newInstructorAnswer,
// // // // //         createdAt: new Date()
// // // // //       };
// // // // //       setInstructorAnswers([...instructorAnswers, newAnswer]);
// // // // //       setNewInstructorAnswer('');
// // // // //     }
// // // // //   };

// // // // //   const handleSubmitDiscussion = () => {
// // // // //     if (newDiscussion.trim()) {
// // // // //       const discussion: Discussion = {
// // // // //         id: Date.now().toString(),
// // // // //         author: currentUserName,
// // // // //         authorRole: currentUserRole,
// // // // //         content: newDiscussion,
// // // // //         createdAt: new Date(),
// // // // //         isResolved: false,
// // // // //         replies: []
// // // // //       };
// // // // //       setDiscussions([...discussions, discussion]);
// // // // //       setNewDiscussion('');
// // // // //     }
// // // // //   };

// // // // //   const handleAddReply = (discussionId: string, replyContent: string) => {
// // // // //     setDiscussions(discussions.map(d => {
// // // // //       if (d.id === discussionId) {
// // // // //         return {
// // // // //           ...d,
// // // // //           replies: [
// // // // //             ...d.replies,
// // // // //             {
// // // // //               id: Date.now().toString(),
// // // // //               author: currentUserName,
// // // // //               authorRole: currentUserRole,
// // // // //               content: replyContent,
// // // // //               createdAt: new Date()
// // // // //             }
// // // // //           ]
// // // // //         };
// // // // //       }
// // // // //       return d;
// // // // //     }));
// // // // //   };

// // // // //   const toggleDiscussionResolved = (discussionId: string) => {
// // // // //     setDiscussions(discussions.map(d =>
// // // // //       d.id === discussionId ? { ...d, isResolved: !d.isResolved } : d
// // // // //     ));
// // // // //   };

// // // // //   return (
// // // // //     <div className="container-fluid bg-white vh-100 overflow-auto">
// // // // //       <div className="container py-4">
// // // // //         {/* Post Header */}
// // // // //         <div className="mb-4">
// // // // //           <div className="d-flex justify-content-between align-items-start mb-2">
// // // // //             <div className="d-flex align-items-center gap-2">
// // // // //               {post.type === 'question' ? (
// // // // //                 <BsQuestionCircle className="text-danger" />
// // // // //               ) : (
// // // // //                 <BsFileText className="text-primary" />
// // // // //               )}
// // // // //               <span className="text-muted">{post.type}</span>
// // // // //               <span className="text-muted">#{post.id}</span>
// // // // //               <span className="badge bg-light text-dark">
// // // // //                 {post.views} view{post.views !== 1 ? 's' : ''}
// // // // //               </span>
// // // // //             </div>

// // // // //             <div className="d-flex align-items-center gap-2">
// // // // //               {isAuthorOrInstructor && (
// // // // //                 <button className="btn btn-link text-primary d-flex align-items-center gap-1 p-0">
// // // // //                   <FiEdit />
// // // // //                   Edit
// // // // //                 </button>
// // // // //               )}
// // // // //               <ActionDropdown
// // // // //                 onEdit={() => console.log('Edit post')}
// // // // //                 onDelete={() => console.log('Delete post')}
// // // // //                 isAuthorOrInstructor={isAuthorOrInstructor}
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           <h1 className="h3 mb-2">{post.title}</h1>

// // // // //           <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
// // // // //             <span>{post.author}</span>
// // // // //             {post.authorRole === 'instructor' && (
// // // // //               <span className="badge bg-warning text-dark">Instructor</span>
// // // // //             )}
// // // // //             <span>•</span>
// // // // //             <span>{post.createdAt.toLocaleString()}</span>
// // // // //             {post.folder && (
// // // // //               <>
// // // // //                 <span>•</span>
// // // // //                 <span className="text-primary">{post.folder}</span>
// // // // //               </>
// // // // //             )}
// // // // //           </div>

// // // // //           <p className="text-secondary">{post.content}</p>
// // // // //         </div>

// // // // //         {/* Answers Section */}
// // // // //         {post.type === 'question' && (
// // // // //           <>
// // // // //             {/* Student Answers */}
// // // // //             <div className="mb-4">
// // // // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // // // //                 <span>Student Answers</span>
// // // // //                 <small className="text-muted">({studentAnswers.length})</small>
// // // // //               </h2>

// // // // //               {studentAnswers.length === 0 && currentUserRole === 'student' ? (
// // // // //                 <div className="mb-3">
// // // // //                   <p className="small text-muted">Be the first to answer this question!</p>
// // // // //                   <Editor
// // // // //                     value={newStudentAnswer}
// // // // //                     onChange={setNewStudentAnswer}
// // // // //                     onSubmit={handleSubmitStudentAnswer}
// // // // //                     placeholder="Write your answer..."
// // // // //                   />
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   {studentAnswers.map(answer => (
// // // // //                     <AnswerItem
// // // // //                       key={answer.id}
// // // // //                       answer={answer}
// // // // //                       currentUserName={currentUserName}
// // // // //                       currentUserRole={currentUserRole}
// // // // //                       onEdit={() => console.log('Edit answer', answer.id)}
// // // // //                       onDelete={() => console.log('Delete answer', answer.id)}
// // // // //                     />
// // // // //                   ))}
// // // // //                   {studentAnswers.length > 0 && currentUserRole === 'student' && (
// // // // //                     <div className="mt-2">
// // // // //                       <Editor
// // // // //                         value={newStudentAnswer}
// // // // //                         onChange={setNewStudentAnswer}
// // // // //                         onSubmit={handleSubmitStudentAnswer}
// // // // //                         placeholder="Add another answer..."
// // // // //                       />
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Instructor Answers */}
// // // // //             <div className="mb-4">
// // // // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // // // //                 <span>Instructor Answers</span>
// // // // //                 <small className="text-muted">({instructorAnswers.length})</small>
// // // // //               </h2>

// // // // //               {instructorAnswers.map(answer => (
// // // // //                 <AnswerItem
// // // // //                   key={answer.id}
// // // // //                   answer={answer}
// // // // //                   currentUserName={currentUserName}
// // // // //                   currentUserRole={currentUserRole}
// // // // //                   onEdit={() => console.log('Edit answer', answer.id)}
// // // // //                   onDelete={() => console.log('Delete answer', answer.id)}
// // // // //                 />
// // // // //               ))}
// // // // //               {currentUserRole === 'instructor' && (
// // // // //                 <div className="mt-2">
// // // // //                   <Editor
// // // // //                     value={newInstructorAnswer}
// // // // //                     onChange={setNewInstructorAnswer}
// // // // //                     onSubmit={handleSubmitInstructorAnswer}
// // // // //                     placeholder="Add another answer..."
// // // // //                   />
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </>
// // // // //         )}

// // // // //         {/* Follow-up Discussions */}
// // // // //         <div className="mb-4">
// // // // //           <h2 className="h5 mb-3">Follow-up Discussion</h2>

// // // // //           {discussions.map(d => (
// // // // //             <DiscussionItem
// // // // //               key={d.id}
// // // // //               discussion={d}
// // // // //               currentUserName={currentUserName}
// // // // //               currentUserRole={currentUserRole}
// // // // //               onToggleResolved={() => toggleDiscussionResolved(d.id)}
// // // // //               onEdit={() => console.log('Edit discussion', d.id)}
// // // // //               onDelete={() => console.log('Delete discussion', d.id)}
// // // // //               onAddReply={(content) => handleAddReply(d.id, content)}
// // // // //             />
// // // // //           ))}

// // // // //           <div className="mt-3">
// // // // //             <textarea
// // // // //               value={newDiscussion}
// // // // //               onChange={e => setNewDiscussion(e.target.value)}
// // // // //               placeholder="Start a new follow-up discussion..."
// // // // //               className="form-control mb-2"
// // // // //               rows={4}
// // // // //             />
// // // // //             <button
// // // // //               className="btn btn-primary"
// // // // //               onClick={handleSubmitDiscussion}
// // // // //             >
// // // // //               Post Discussion
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // import { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import DiscussionItem, { Discussion } from "./DiscussionItem";
// // import AnswerItem, { Answer } from "./AnswerItem";
// // import { BsFileText, BsQuestionCircle } from "react-icons/bs";
// // import { FiEdit } from "react-icons/fi";
// // import ActionDropdown from "./ActionDropdown";
// // import Editor from "./editor";
// // import { Post } from "../ListOfPostsSidebar/PostItem";
// // import * as client from "../../../client"; // Adjust path to your client.ts file
// // import { User } from "@/app/(Kambaz)/Account/reducer";

// // interface PostScreenProps {
// //   post: Post | null;
// //   currentUserRole: string;
// //   currentUserName: string;
// // }

// // interface RootState {
// //   accountReducer: {
// //     currentUser: User;
// //   };
// // }

// // export default function PostScreen({ 
// //   post, 
// //   currentUserRole,
// //   currentUserName 
// // }: PostScreenProps) {
// //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

// //   const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
// //   const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
// //   const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
// //   const [newStudentAnswer, setNewStudentAnswer] = useState('');
// //   const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
// //   const [newDiscussion, setNewDiscussion] = useState('');

// //   // Load answers when post changes
// //   useEffect(() => {
// //     if (post) {
// //       loadAnswers();
// //     }
// //   }, [post?._id]);

// //   const loadAnswers = async () => {
// //     if (!post) return;

// //     try {
// //       // Transform post answers to Answer format
// //       // Load student answers
// //         const studentAns = await client.getStudentAnswers(post._id);
// //         setStudentAnswers(studentAns.map(a => ({
// //           id: a._id,
// //           author: a.authorName,
// //           authorRole: a.authorType,
// //           content: a.text,
// //           createdAt: new Date(a.createdAt)
// //         })));
 
// // // Load instructor answers
// //         const instructorAns = await client.getInstructorAnswers(post._id);
// //         setInstructorAnswers(instructorAns.map(a => ({
// //           id: a._id,
// //           author: a.authorName,
// //           authorRole: a.authorType,
// //           content: a.text,
// //           createdAt: new Date(a.createdAt)
// //         })));
 
// //     } catch (error) {
// //       console.error("Error loading answers:", error);
// //     }
// //   };

// //   if (!post) {
// //     return (
// //       <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
// //         Select a post to view details
// //       </div>
// //     );
// //   }

// //   const isAuthorOrInstructor = 
// //     post.author === currentUserName || isFaculty;

// //   const handleSubmitStudentAnswer = async () => {
// //    if (!newStudentAnswer.trim() || !post) return;
// //    const name = `${currentUser.firstName} ${currentUser.lastName}`;
// //     try {
// //       const newAnswer = await client.createAnswer(
// //         post._id,
// //         newStudentAnswer,
// //         'student',
// //         currentUser._id,
// //         name
// //       );
      
// //       setStudentAnswers([...studentAnswers, {
// //         id: newAnswer._id,
// //         author: newAnswer.authorName,
// //         authorRole: newAnswer.authorType,
// //         content: newAnswer.text,
// //         createdAt: new Date(newAnswer.createdAt)
// //       }]);
// //       setNewStudentAnswer('');

// //       // Add answer via API
// //       await client.addAnswerToPost(post._id, newAnswer._id, false);
      
      
// //       setNewStudentAnswer('');
// //     } catch (error) {
// //       console.error("Error submitting student answer:", error);
// //       alert("Failed to submit answer. Please try again.");
// //     }
// //   };

// //   const handleSubmitInstructorAnswer = async () => {
// //     if (!newInstructorAnswer.trim() || !post) return;
// //     const name = `${currentUser.firstName} ${currentUser.lastName}`;
// //     try {
// //       const newAnswer = await client.createAnswer(
// //         post._id,
// //         newInstructorAnswer,
// //         'instructor',
// //         currentUser._id,
// //         name
// //       );
      
// //       setInstructorAnswers([...instructorAnswers, {
// //         id: newAnswer._id,
// //         author: newAnswer.authorName,
// //         authorRole: newAnswer.authorType,
// //         content: newAnswer.text,
// //         createdAt: new Date(newAnswer.createdAt)
// //       }]);
// //       setNewInstructorAnswer('');
      

// //       // Add answer via API
// //       await client.addAnswerToPost(post._id, newAnswer._id, true);
      
// //       setNewInstructorAnswer('');
// //     } catch (error) {
// //       console.error("Error submitting instructor answer:", error);
// //       alert("Failed to submit answer. Please try again.");
// //     }
// //   };

// //   const handleDeleteAnswer = async (answerId: string, isInstructor: boolean) => {
// //     try {
// //       await client.removeAnswerFromPost(post._id, answerId, isInstructor);
// //        await client.deleteAnswer(answerId);
    
// //         // Update local state - remove from appropriate list
// //         if (isInstructor) {
// //         setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
// //         } else {
// //         setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
// //         }
// //         } catch (error) {
// //         console.error("Error deleting answer:", error);
// //         alert("Failed to delete answer. Please try again.");
// //         }
// //   };

// //   const handleEditPost = () => {
// //     // TODO: Implement edit functionality
// //     console.log('Edit post');
// //   };

// //   const handleDeletePost = async () => {
// //     if (!confirm("Are you sure you want to delete this post?")) return;

// //     try {
// //       await client.deletePost(post._id);
// //       alert("Post deleted successfully!");
// //       // Redirect or update UI as needed
// //     } catch (error) {
// //       console.error("Error deleting post:", error);
// //       alert("Failed to delete post. Please try again.");
// //     }
// //   };

// //   const handleSubmitDiscussion = () => {
// //     if (newDiscussion.trim()) {
// //       const discussion: Discussion = {
// //         id: Date.now().toString(),
// //         author: currentUser?.username || currentUserName,
// //         authorRole: currentUserRole,
// //         content: newDiscussion,
// //         createdAt: new Date(),
// //         isResolved: false,
// //         replies: []
// //       };
// //       setDiscussions([...discussions, discussion]);
// //       setNewDiscussion('');
// //     }
// //   };

// //   const handleAddReply = (discussionId: string, replyContent: string) => {
// //     setDiscussions(discussions.map(d => {
// //       if (d.id === discussionId) {
// //         return {
// //           ...d,
// //           replies: [
// //             ...d.replies,
// //             {
// //               id: Date.now().toString(),
// //               author: currentUser?.username || currentUserName,
// //               authorRole: currentUserRole,
// //               content: replyContent,
// //               createdAt: new Date()
// //             }
// //           ]
// //         };
// //       }
// //       return d;
// //     }));
// //   };

// //   const toggleDiscussionResolved = (discussionId: string) => {
// //     setDiscussions(discussions.map(d =>
// //       d.id === discussionId ? { ...d, isResolved: !d.isResolved } : d
// //     ));
// //   };

// //   return (
// //     <div className="container-fluid bg-white vh-100 overflow-auto">
// //       <div className="container py-4">
// //         {/* Post Header */}
// //         <div className="mb-4">
// //           <div className="d-flex justify-content-between align-items-start mb-2">
// //             <div className="d-flex align-items-center gap-2">
// //               {post.type === 'question' ? (
// //                 <BsQuestionCircle className="text-danger" />
// //               ) : (
// //                 <BsFileText className="text-primary" />
// //               )}
// //               <span className="text-muted">{post.type}</span>
// //               <span className="text-muted">#{post._id}</span>
// //               <span className="badge bg-light text-dark">
// //                 {post.views} view{post.views !== 1 ? 's' : ''}
// //               </span>
// //             </div>

// //             <div className="d-flex align-items-center gap-2">
// //               {isAuthorOrInstructor && (
// //                 <button 
// //                   className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
// //                   onClick={handleEditPost}
// //                 >
// //                   <FiEdit />
// //                   Edit
// //                 </button>
// //               )}
// //               <ActionDropdown
// //                 onEdit={handleEditPost}
// //                 onDelete={handleDeletePost}
// //                 isAuthorOrInstructor={isAuthorOrInstructor}
// //               />
// //             </div>
// //           </div>

// //           <h1 className="h3 mb-2">{post.title}</h1>

// //           <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
// //             <span>{post.author}</span>
// //             {post.authorRole === 'instructor' && (
// //               <span className="badge bg-warning text-dark">Instructor</span>
// //             )}
// //             <span>•</span>
// //             <span>{post.createdAt.toLocaleString()}</span>
// //             {post.folder && post.folder.length > 0 && (
// //               <>
// //                 <span>•</span>
// //                 <span className="text-primary">{post.folder.join(", ")}</span>
// //               </>
// //             )}
// //           </div>

// //           <p className="text-secondary">{post.content}</p>
// //         </div>

// //         {/* Answers Section */}
// //         {post.type === 'question' && (
// //           <>
// //             {/* Student Answers */}
// //             <div className="mb-4">
// //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// //                 <span>Student Answers</span>
// //                 <small className="text-muted">({studentAnswers.length})</small>
// //               </h2>

// //               {studentAnswers.length === 0 && currentUserRole === 'student' ? (
// //                 <div className="mb-3">
// //                   <p className="small text-muted">Be the first to answer this question!</p>
// //                   <Editor
// //                     value={newStudentAnswer}
// //                     onChange={setNewStudentAnswer}
// //                     onSubmit={handleSubmitStudentAnswer}
// //                     placeholder="Write your answer..."
// //                   />
// //                 </div>
// //               ) : (
// //                 <>
// //                   {studentAnswers.map(answer => (
// //                     <AnswerItem
// //                       key={answer.id}
// //                       answer={answer}
// //                       currentUserName={currentUserName}
// //                       currentUserRole={currentUserRole}
// //                       onEdit={() => console.log('Edit answer', answer.id)}
// //                       onDelete={() => handleDeleteAnswer(answer.id, false)}
// //                     />
// //                   ))}
// //                   {studentAnswers.length > 0 && currentUserRole === 'student' && (
// //                     <div className="mt-2">
// //                       <Editor
// //                         value={newStudentAnswer}
// //                         onChange={setNewStudentAnswer}
// //                         onSubmit={handleSubmitStudentAnswer}
// //                         placeholder="Add another answer..."
// //                       />
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             {/* Instructor Answers */}
// //             <div className="mb-4">
// //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// //                 <span>Instructor Answers</span>
// //                 <small className="text-muted">({instructorAnswers.length})</small>
// //               </h2>

// //               {instructorAnswers.map(answer => (
// //                 <AnswerItem
// //                   key={answer.id}
// //                   answer={answer}
// //                   currentUserName={currentUser.username}
// //                   currentUserRole={currentUser.role as string } 
// //                   onEdit={() => console.log('Edit answer', answer.id)}
// //                   onDelete={() => handleDeleteAnswer(answer.id, true)}
// //                 />
// //               ))}
// //               {isFaculty && (
// //                 <div className="mt-2">
// //                   <Editor
// //                     value={newInstructorAnswer}
// //                     onChange={setNewInstructorAnswer}
// //                     onSubmit={handleSubmitInstructorAnswer}
// //                     placeholder="Add instructor answer..."
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </>
// //         )}

// //         {/* Follow-up Discussions */}
// //         <div className="mb-4">
// //           <h2 className="h5 mb-3">Follow-up Discussion</h2>

// //           {discussions.map(d => (
// //             <DiscussionItem
// //               key={d.id}
// //               discussion={d}
// //               currentUserName={currentUser.username}
// //               currentUserRole={currentUser.role || "student"}
// //               onToggleResolved={() => toggleDiscussionResolved(d.id)}
// //               onEdit={() => console.log('Edit discussion', d.id)}
// //               onDelete={() => console.log('Delete discussion', d.id)}
// //               onAddReply={(content) => handleAddReply(d.id, content)}
// //             />
// //           ))}

// //           <div className="mt-3">
// //             <textarea
// //               value={newDiscussion}
// //               onChange={e => setNewDiscussion(e.target.value)}
// //               placeholder="Start a new follow-up discussion..."
// //               className="form-control mb-2"
// //               rows={4}
// //             />
// //             <button
// //               className="btn btn-primary"
// //               onClick={handleSubmitDiscussion}
// //             >
// //               Post Discussion
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // import { useState, useEffect } from "react";
// // // import { useSelector } from "react-redux";
// // // import DiscussionItem, { Discussion } from "./DiscussionItem";
// // // import AnswerItem, { Answer } from "./AnswerItem";
// // // import { BsFileText, BsQuestionCircle } from "react-icons/bs";
// // // import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
// // // import ActionDropdown from "./ActionDropdown";
// // // import Editor from "./editor";
// // // import { Post } from "../ListOfPostsSidebar/PostItem";
// // // import * as client from "../../../client";
// // // import { User } from "@/app/(Kambaz)/Account/reducer";

// // // interface PostScreenProps {
// // //   post: Post | null;
// // //   currentUserRole: string;
// // //   currentUserName: string;
// // // }

// // // interface RootState {
// // //   accountReducer: {
// // //     currentUser: User;
// // //   };
// // // }

// // // export default function PostScreen({ 
// // //   post, 
// // //   currentUserRole,
// // //   currentUserName 
// // // }: PostScreenProps) {
// // //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// // //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

// // //   const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
// // //   const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
// // //   const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
// // //   const [newStudentAnswer, setNewStudentAnswer] = useState('');
// // //   const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
// // //   const [newDiscussion, setNewDiscussion] = useState('');
  
// // //   // Editing state
// // //   const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
// // //   const [editingContent, setEditingContent] = useState('');

// // //   // Load answers when post changes
// // //   useEffect(() => {
// // //     if (post) {
// // //       loadAnswers();
// // //     }
// // //   }, [post?._id]);

// // //   const loadAnswers = async () => {
// // //     if (!post) return;

// // //     try {
// // //       // Load student answers
// // //       const studentAns = await client.getStudentAnswers(post._id);
// // //       setStudentAnswers(studentAns.map(a => ({
// // //         id: a._id,
// // //         author: a.authorName,
// // //         authorRole: a.authorType,
// // //         content: a.text,
// // //         createdAt: new Date(a.createdAt)
// // //       })));

// // //       // Load instructor answers
// // //       const instructorAns = await client.getInstructorAnswers(post._id);
// // //       setInstructorAnswers(instructorAns.map(a => ({
// // //         id: a._id,
// // //         author: a.authorName,
// // //         authorRole: a.authorType,
// // //         content: a.text,
// // //         createdAt: new Date(a.createdAt)
// // //       })));
// // //     } catch (error) {
// // //       console.error("Error loading answers:", error);
// // //     }
// // //   };

// // //   if (!post) {
// // //     return (
// // //       <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
// // //         Select a post to view details
// // //       </div>
// // //     );
// // //   }

// // //   const isAuthorOrInstructor = 
// // //     post.author === currentUserName || isFaculty;

// // //   // ============================================
// // //   // ANSWER HANDLERS
// // //   // ============================================

// // //   const handleSubmitStudentAnswer = async () => {
// // //     if (!newStudentAnswer.trim() || !post) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;
    
// // //     try {
// // //       const newAnswer = await client.createAnswer(
// // //         post._id,
// // //         newStudentAnswer,
// // //         'student',
// // //         currentUser._id,
// // //         name
// // //       );
      
// // //       setStudentAnswers([...studentAnswers, {
// // //         id: newAnswer._id,
// // //         author: newAnswer.authorName,
// // //         authorRole: newAnswer.authorType,
// // //         content: newAnswer.text,
// // //         createdAt: new Date(newAnswer.createdAt)
// // //       }]);

// // //       await client.addAnswerToPost(post._id, newAnswer._id, false);
// // //       setNewStudentAnswer('');
// // //     } catch (error) {
// // //       console.error("Error submitting student answer:", error);
// // //       alert("Failed to submit answer. Please try again.");
// // //     }
// // //   };

// // //   const handleSubmitInstructorAnswer = async () => {
// // //     if (!newInstructorAnswer.trim() || !post) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;
    
// // //     try {
// // //       const newAnswer = await client.createAnswer(
// // //         post._id,
// // //         newInstructorAnswer,
// // //         'instructor',
// // //         currentUser._id,
// // //         name
// // //       );
      
// // //       setInstructorAnswers([...instructorAnswers, {
// // //         id: newAnswer._id,
// // //         author: newAnswer.authorName,
// // //         authorRole: newAnswer.authorType,
// // //         content: newAnswer.text,
// // //         createdAt: new Date(newAnswer.createdAt)
// // //       }]);

// // //       await client.addAnswerToPost(post._id, newAnswer._id, true);
// // //       setNewInstructorAnswer('');
// // //     } catch (error) {
// // //       console.error("Error submitting instructor answer:", error);
// // //       alert("Failed to submit answer. Please try again.");
// // //     }
// // //   };

// // //   const handleStartEdit = (answerId: string, currentContent: string) => {
// // //     setEditingAnswerId(answerId);
// // //     setEditingContent(currentContent);
// // //   };

// // //   const handleCancelEdit = () => {
// // //     setEditingAnswerId(null);
// // //     setEditingContent('');
// // //   };

// // //    const handleSaveEdit = async (answerId: string, isInstructor: boolean) => {
// // //     if (!editingContent.trim()) {
// // //       alert("Answer content cannot be empty");
// // //       return;
// // //     }

// // //     try {
// // //       await client.updateAnswer(answerId, editingContent);
      
// // //       // Update local state
// // //       if (isInstructor) {
// // //         setInstructorAnswers(instructorAnswers.map(a => 
// // //           a.id === answerId ? { ...a, content: editingContent } : a
// // //         ));
// // //       } else {
// // //         setStudentAnswers(studentAnswers.map(a => 
// // //           a.id === answerId ? { ...a, content: editingContent } : a
// // //         ));
// // //       }
      
// // //       setEditingAnswerId(null);
// // //       setEditingContent('');
// // //     } catch (error) {
// // //       console.error("Error updating answer:", error);
// // //       alert("Failed to update answer. Please try again.");
// // //     }
// // //   };

// // //   const handleDeleteAnswer = async (answerId: string, isInstructor: boolean) => {
// // //     if (!confirm("Are you sure you want to delete this answer?")) return;

// // //     try {
// // //       await client.removeAnswerFromPost(post._id, answerId, isInstructor);
// // //       await client.deleteAnswer(answerId);
    
// // //       if (isInstructor) {
// // //         setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
// // //       } else {
// // //         setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
// // //       }
// // //     } catch (error) {
// // //       console.error("Error deleting answer:", error);
// // //       alert("Failed to delete answer. Please try again.");
// // //     }
// // //   };

// // //   // ============================================
// // //   // POST HANDLERS
// // //   // ============================================

// // //   const handleEditPost = () => {
// // //     console.log('Edit post');
// // //   };

// // //   const handleDeletePost = async () => {
// // //     if (!confirm("Are you sure you want to delete this post?")) return;

// // //     try {
// // //       await client.deletePost(post._id);
// // //       alert("Post deleted successfully!");
// // //     } catch (error) {
// // //       console.error("Error deleting post:", error);
// // //       alert("Failed to delete post. Please try again.");
// // //     }
// // //   };

// // //   // ============================================
// // //   // DISCUSSION HANDLERS
// // //   // ============================================

// // //  const handleSubmitDiscussion = async () => {
// // //     if (!newDiscussion.trim() || !post) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;

// // //     try {
// // //       const newDiscussionData = await client.createDiscussion(
// // //         post._id,
// // //         newDiscussion,
// // //         currentUser._id,
// // //         name,
// // //         currentUser.role as string
// // //       );

// // //       const discussion: Discussion = {
// // //         id: newDiscussionData._id,
// // //         author: newDiscussionData.authorName,
// // //         authorRole: newDiscussionData.authorRole,
// // //         content: newDiscussionData.content,
// // //         createdAt: new Date(newDiscussionData.createdAt),
// // //         isResolved: newDiscussionData.isResolved,
// // //         replies: []
// // //       };

// // //       setDiscussions([discussion, ...discussions]);
// // //       setNewDiscussion('');
// // //     } catch (error) {
// // //       console.error("Error creating discussion:", error);
// // //       alert("Failed to create discussion. Please try again.");
// // //     }
// // //   };

// // //   const handleAddReply = async (discussionId: string, replyContent: string) => {
// // //     if (!replyContent.trim()) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;

// // //     try {
// // //       const newReply = await client.createReply(
// // //         discussionId,
// // //         replyContent,
// // //         currentUser._id,
// // //         name,
// // //         currentUser.role as string,
// // //         null
// // //       );

// // //       setDiscussions(discussions.map(d => {
// // //         if (d.id === discussionId) {
// // //           return {
// // //             ...d,
// // //             replies: [
// // //               ...d.replies,
// // //               {
// // //                 id: newReply._id,
// // //                 author: newReply.authorName,
// // //                 authorRole: newReply.authorRole,
// // //                 content: newReply.content,
// // //                 createdAt: new Date(newReply.createdAt)
// // //               }
// // //             ]
// // //           };
// // //         }
// // //         return d;
// // //       }));
// // //     } catch (error) {
// // //       console.error("Error adding reply:", error);
// // //       alert("Failed to add reply. Please try again.");
// // //     }
// // //   };

// // //   const toggleDiscussionResolved = async (discussionId: string) => {
// // //     try {
// // //       const updatedDiscussion = await client.toggleDiscussionResolved(discussionId);

// // //       setDiscussions(discussions.map(d =>
// // //         d.id === discussionId ? { ...d, isResolved: updatedDiscussion.isResolved } : d
// // //       ));
// // //     } catch (error) {
// // //       console.error("Error toggling discussion resolved:", error);
// // //       alert("Failed to update discussion status. Please try again.");
// // //     }
// // //   };

// // //   // ============================================
// // //   // ANSWER ITEM WITH INLINE EDIT
// // //   // ============================================

// // //   const renderAnswer = (answer: Answer, isInstructor: boolean) => {
// // //     const isAuthor = answer.author === `${currentUser.firstName} ${currentUser.lastName}`;
// // //     const canEdit = isAuthor || isFaculty;
// // //     const isEditing = editingAnswerId === answer.id;

// // //     return (
// // //       <div key={answer.id} className="border-bottom py-3">
// // //         {/* Header */}
// // //         <div className="d-flex justify-content-between align-items-start mb-2">
// // //           <div className="d-flex align-items-center gap-2">
// // //             <span className="fw-semibold">{answer.author}</span>
// // //             {answer.authorRole === 'instructor' && (
// // //               <span className="badge bg-warning text-dark">Instructor</span>
// // //             )}
// // //           </div>
// // //           <div className="d-flex align-items-center gap-2">
// // //             <small className="text-muted">{answer.createdAt.toLocaleString()}</small>
            
// // //             {canEdit && !isEditing && (
// // //               <>
// // //                 <button
// // //                   onClick={() => handleStartEdit(answer.id, answer.content)}
// // //                   className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
// // //                   title="Edit answer"
// // //                 >
// // //                   <FiEdit size={14} />
// // //                   Edit
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleDeleteAnswer(answer.id, isInstructor)}
// // //                   className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
// // //                   title="Delete answer"
// // //                 >
// // //                   <FiTrash2 size={14} />
// // //                   Delete
// // //                 </button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Content */}
// // //         {isEditing ? (
// // //           <div>
// // //             <textarea
// // //               value={editingContent}
// // //               onChange={(e) => setEditingContent(e.target.value)}
// // //               className="form-control mb-2"
// // //               rows={4}
// // //               autoFocus
// // //             />
// // //             <div className="d-flex gap-2">
// // //               <button
// // //                 onClick={() => handleSaveEdit(answer.id, isInstructor)}
// // //                 className="btn btn-sm btn-success d-flex align-items-center gap-1"
// // //               >
// // //                 <FiSave size={14} />
// // //                 Save
// // //               </button>
// // //               <button
// // //                 onClick={handleCancelEdit}
// // //                 className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
// // //               >
// // //                 <FiX size={14} />
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <p className="mb-0">{answer.content}</p>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   // ============================================
// // //   // RENDER
// // //   // ============================================

// // //   return (
// // //     <div className="container-fluid bg-white vh-100 overflow-auto">
// // //       <div className="container py-4">
// // //         {/* Post Header */}
// // //         <div className="mb-4">
// // //           <div className="d-flex justify-content-between align-items-start mb-2">
// // //             <div className="d-flex align-items-center gap-2">
// // //               {post.type === 'question' ? (
// // //                 <BsQuestionCircle className="text-danger" />
// // //               ) : (
// // //                 <BsFileText className="text-primary" />
// // //               )}
// // //               <span className="text-muted">{post.type}</span>
// // //               <span className="text-muted">#{post._id}</span>
// // //               <span className="badge bg-light text-dark">
// // //                 {post.views} view{post.views !== 1 ? 's' : ''}
// // //               </span>
// // //             </div>

// // //             <div className="d-flex align-items-center gap-2">
// // //               {isAuthorOrInstructor && (
// // //                 <button 
// // //                   className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
// // //                   onClick={handleEditPost}
// // //                 >
// // //                   <FiEdit />
// // //                   Edit
// // //                 </button>
// // //               )}
// // //               <ActionDropdown
// // //                 onEdit={handleEditPost}
// // //                 onDelete={handleDeletePost}
// // //                 isAuthorOrInstructor={isAuthorOrInstructor}
// // //               />
// // //             </div>
// // //           </div>

// // //           <h1 className="h3 mb-2">{post.title}</h1>

// // //           <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
// // //             <span>{post.author}</span>
// // //             {post.authorRole === 'instructor' && (
// // //               <span className="badge bg-warning text-dark">Instructor</span>
// // //             )}
// // //             <span>•</span>
// // //             <span>{post.createdAt.toLocaleString()}</span>
// // //             {post.folder && post.folder.length > 0 && (
// // //               <>
// // //                 <span>•</span>
// // //                 <span className="text-primary">{post.folder.join(", ")}</span>
// // //               </>
// // //             )}
// // //           </div>

// // //           <p className="text-secondary">{post.content}</p>
// // //         </div>

// // //         {/* Answers Section */}
// // //         {post.type === 'question' && (
// // //           <>
// // //             {/* Student Answers */}
// // //             <div className="mb-4">
// // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // //                 <span>Student Answers</span>
// // //                 <small className="text-muted">({studentAnswers.length})</small>
// // //               </h2>

// // //               {studentAnswers.map(answer => renderAnswer(answer, false))}

// // //               {currentUserRole === 'student' && (
// // //                 <div className="mt-3">
// // //                   <Editor
// // //                     value={newStudentAnswer}
// // //                     onChange={setNewStudentAnswer}
// // //                     onSubmit={handleSubmitStudentAnswer}
// // //                     placeholder={studentAnswers.length === 0 
// // //                       ? "Be the first to answer this question!" 
// // //                       : "Add another answer..."}
// // //                   />
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Instructor Answers */}
// // //             <div className="mb-4">
// // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // //                 <span>Instructor Answers</span>
// // //                 <small className="text-muted">({instructorAnswers.length})</small>
// // //               </h2>

// // //               {instructorAnswers.map(answer => renderAnswer(answer, true))}

// // //               {isFaculty && (
// // //                 <div className="mt-3">
// // //                   <Editor
// // //                     value={newInstructorAnswer}
// // //                     onChange={setNewInstructorAnswer}
// // //                     onSubmit={handleSubmitInstructorAnswer}
// // //                     placeholder="Add instructor answer..."
// // //                   />
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}

// // //         {/* Follow-up Discussions */}
// // //         <div className="mb-4">
// // //           <h2 className="h5 mb-3">Follow-up Discussion</h2>

// // //           {discussions.map(d => (
// // //             <DiscussionItem
// // //               key={d.id}
// // //               discussion={d}
// // //               currentUserName={currentUser.username}
// // //               currentUserRole={currentUser.role || "student"}
// // //               onToggleResolved={() => toggleDiscussionResolved(d.id)}
// // //               onEdit={() => console.log('Edit discussion', d.id)}
// // //               onDelete={() => console.log('Delete discussion', d.id)}
// // //               onAddReply={(content) => handleAddReply(d.id, content)}
// // //             />
// // //           ))}

// // //           <div className="mt-3">
// // //             <textarea
// // //               value={newDiscussion}
// // //               onChange={e => setNewDiscussion(e.target.value)}
// // //               placeholder="Start a new follow-up discussion..."
// // //               className="form-control mb-2"
// // //               rows={4}
// // //             />
// // //             <button
// // //               className="btn btn-primary"
// // //               onClick={handleSubmitDiscussion}
// // //             >
// // //               Post Discussion
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useState, useEffect } from "react";
// // // import { useSelector } from "react-redux";
// // // import DiscussionItem, { Discussion } from "./DiscussionItem";
// // // import AnswerItem, { Answer } from "./AnswerItem";
// // // import { BsFileText, BsQuestionCircle } from "react-icons/bs";
// // // import { FiEdit } from "react-icons/fi";
// // // import ActionDropdown from "./ActionDropdown";
// // // import Editor from "./editor";
// // // import { Post } from "../ListOfPostsSidebar/PostItem";
// // // import * as client from "../../../client"
// // // import { RootState } from "../../../../store";
// // // interface PostScreenProps {
// // //   post: Post | null;
// // //   currentUserRole: string;
// // //   currentUserName: string;
// // // }



// // // export default function PostScreen({ 
// // //   post, 
// // //   currentUserRole,
// // //   currentUserName 
// // // }: PostScreenProps) {
// // //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// // //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

// // //   const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
// // //   const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
// // //   const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
// // //   const [newStudentAnswer, setNewStudentAnswer] = useState('');
// // //   const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
// // //   const [newDiscussion, setNewDiscussion] = useState('');
// // //   const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
// // // const [editingContent, setEditingContent] = useState('');
// // // const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
// // // const [editingDiscussionContent, setEditingDiscussionContent] = useState('');

// // //   // Load answers when post changes
// // //   useEffect(() => {
// // //     if (post) {
// // //       loadAnswers();
// // //     }
// // //   }, [post?._id]);

// // //   const loadAnswers = async () => {
// // //     if (!post) return;

// // //     try {
// // //       // Transform post answers to Answer format
// // //       const studentAns = post.studentAnswers.map((answerId: string, index: number) => ({
// // //         id: answerId,
// // //         author: `Student ${index + 1}`,
// // //         authorRole: 'student' as const,
// // //         content: `Answer content ${answerId}`,
// // //         createdAt: new Date()
// // //       }));

// // //       const instructorAns = post.instructorAnswers.map((answerId: string, index: number) => ({
// // //         id: answerId,
// // //         author: `Instructor ${index + 1}`,
// // //         authorRole: 'instructor' as const,
// // //         content: `Answer content ${answerId}`,
// // //         createdAt: new Date()
// // //       }));

// // //       setStudentAnswers(studentAns);
// // //       setInstructorAnswers(instructorAns);
// // //     } catch (error) {
// // //       console.error("Error loading answers:", error);
// // //     }
// // //   };

// // //   if (!post) {
// // //     return (
// // //       <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
// // //         Select a post to view details
// // //       </div>
// // //     );
// // //   }

// // //   const isAuthorOrInstructor = 
// // //     post.author === currentUserName || isFaculty;

// // //   const handleSubmitStudentAnswer = async () => {
// // //     if (!newStudentAnswer.trim() || !currentUser) return;

// // //     try {
// // //       const newAnswer: Answer = {
// // //         id: Date.now().toString(),
// // //         author: currentUser.username || currentUserName,
// // //         authorRole: 'student',
// // //         content: newStudentAnswer,
// // //         createdAt: new Date()
// // //       };

// // //       // Add answer via API
// // //       await client.addAnswerToPost(post._id, newAnswer.id, false);
      
// // //       setStudentAnswers([...studentAnswers, newAnswer]);
// // //       setNewStudentAnswer('');
// // //     } catch (error) {
// // //       console.error("Error submitting student answer:", error);
// // //       alert("Failed to submit answer. Please try again.");
// // //     }
// // //   };

// // //   const handleSubmitInstructorAnswer = async () => {
// // //     if (!newInstructorAnswer.trim() || !currentUser) return;

// // //     try {
// // //       const newAnswer: Answer = {
// // //         id: Date.now().toString(),
// // //         author: currentUser.username || currentUserName,
// // //         authorRole: 'instructor',
// // //         content: newInstructorAnswer,
// // //         createdAt: new Date()
// // //       };

// // //       // Add answer via API
// // //       await client.addAnswerToPost(post._id, newAnswer.id, true);
      
// // //       setInstructorAnswers([...instructorAnswers, newAnswer]);
// // //       setNewInstructorAnswer('');
// // //     } catch (error) {
// // //       console.error("Error submitting instructor answer:", error);
// // //       alert("Failed to submit answer. Please try again.");
// // //     }
// // //   };

// // //   const handleDeleteAnswer = async (answerId: string, isInstructor: boolean) => {
// // //     try {
// // //       await client.removeAnswerFromPost(post._id, answerId, isInstructor);
      
// // //       if (isInstructor) {
// // //         setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
// // //       } else {
// // //         setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
// // //       }
// // //     } catch (error) {
// // //       console.error("Error deleting answer:", error);
// // //       alert("Failed to delete answer. Please try again.");
// // //     }
// // //   };

// // //   const handleEditPost = () => {
// // //     // TODO: Implement edit functionality
// // //     console.log('Edit post');
// // //   };

// // //   const handleDeletePost = async () => {
// // //     if (!confirm("Are you sure you want to delete this post?")) return;

// // //     try {
// // //       await client.deletePost(post._id);
// // //       alert("Post deleted successfully!");
// // //       // Redirect or update UI as needed
// // //     } catch (error) {
// // //       console.error("Error deleting post:", error);
// // //       alert("Failed to delete post. Please try again.");
// // //     }
// // //   };

// // //   const handleSubmitDiscussion = async () => {
// // //     if (!newDiscussion.trim() || !post || !currentUser) return;
// // //     if (!newDiscussion.trim() || !post) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;

// // //     try {
// // //       const newDiscussionData = await client.createDiscussion(
// // //         post._id,
// // //         newDiscussion,
// // //         currentUser._id,
// // //         name,
// // //         currentUser.role as string
// // //       );

// // //       const discussion: Discussion = {
// // //         id: newDiscussionData._id,
// // //         author: newDiscussionData.authorName,
// // //         authorRole: newDiscussionData.authorRole,
// // //         content: newDiscussionData.content,
// // //         createdAt: new Date(newDiscussionData.createdAt),
// // //         isResolved: newDiscussionData.isResolved,
// // //         replies: []
// // //       };

// // //       setDiscussions([discussion, ...discussions]);
// // //       setNewDiscussion('');

// // //       // Discussion is automatically added to post.discussions array in backend createDiscussion
// // //       // No need to call addDiscussionToPost separately
// // //     } catch (error) {
// // //       console.error("Error creating discussion:", error);
// // //       alert("Failed to create discussion. Please try again.");
// // //     }
// // //   };

// // //   const handleAddReply = async (discussionId: string, replyContent: string) => {
// // //     if (!replyContent.trim()) return;
// // //     if (!replyContent.trim() || !currentUser) return;
// // //     const name = `${currentUser.firstName} ${currentUser.lastName}`;

// // //     try {
// // //       const newReply = await client.createReply(
// // //         discussionId,
// // //         replyContent,
// // //         currentUser._id,
// // //         name,
// // //         currentUser.role as string,
// // //         null
// // //       );

// // //       setDiscussions(discussions.map(d => {
// // //         if (d.id === discussionId) {
// // //           return {
// // //             ...d,
// // //             replies: [
// // //               ...d.replies,
// // //               {
// // //                 id: newReply._id,
// // //                 author: newReply.authorName,
// // //                 authorRole: newReply.authorRole,
// // //                 content: newReply.content,
// // //                 createdAt: new Date(newReply.createdAt)
// // //               }
// // //             ]
// // //           };
// // //         }
// // //         return d;
// // //       }));
// // //     } catch (error) {
// // //       console.error("Error adding reply:", error);
// // //       alert("Failed to add reply. Please try again.");
// // //     }
// // //   };

// // //   const handleDeleteDiscussion = async (discussionId: string) => {
// // //     if (!confirm("Are you sure you want to delete this discussion and all its replies?")) return;

// // //     try {
// // //       await client.deleteDiscussion(discussionId);
      
// // //       setDiscussions(discussions.filter(d => d.id !== discussionId));
      
// // //       // Discussion is automatically removed from post.discussions array in backend
// // //     } catch (error) {
// // //       console.error("Error deleting discussion:", error);
// // //       alert("Failed to delete discussion. Please try again.");
// // //     }
// // //   };

// // //   const handleStartEditDiscussion = (discussionId: string, currentContent: string) => {
// // //     setEditingDiscussionId(discussionId);
// // //     setEditingDiscussionContent(currentContent);
// // //   };

// // //   const handleCancelEditDiscussion = () => {
// // //     setEditingDiscussionId(null);
// // //     setEditingDiscussionContent('');
// // //   };

// // //   const handleSaveEditDiscussion = async (discussionId: string) => {
// // //     if (!editingDiscussionContent.trim()) {
// // //       alert("Discussion content cannot be empty");
// // //       return;
// // //     }

// // //     try {
// // //       await client.updateDiscussion(discussionId, editingDiscussionContent);
      
// // //       setDiscussions(discussions.map(d =>
// // //         d.id === discussionId ? { ...d, content: editingDiscussionContent } : d
// // //       ));
      
// // //       setEditingDiscussionId(null);
// // //       setEditingDiscussionContent('');
// // //     } catch (error) {
// // //       console.error("Error updating discussion:", error);
// // //       alert("Failed to update discussion. Please try again.");
// // //     }
// // //   };

// // //   const handleEditDiscussion = async (discussionId: string) => {
// // //     // TODO: Implement edit discussion
// // //     console.log('Edit discussion', discussionId);
// // //   };

// // //   const toggleDiscussionResolved = async (discussionId: string) => {
// // //     try {
// // //       const updatedDiscussion = await client.toggleDiscussionResolved(discussionId);

// // //       setDiscussions(discussions.map(d =>
// // //         d.id === discussionId ? { ...d, isResolved: updatedDiscussion.isResolved } : d
// // //       ));
// // //     } catch (error) {
// // //       console.error("Error toggling discussion resolved:", error);
// // //       alert("Failed to update discussion status. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid bg-white vh-100 overflow-auto">
// // //       <div className="container py-4">
// // //         {/* Post Header */}
// // //         <div className="mb-4">
// // //           <div className="d-flex justify-content-between align-items-start mb-2">
// // //             <div className="d-flex align-items-center gap-2">
// // //               {post.type === 'question' ? (
// // //                 <BsQuestionCircle className="text-danger" />
// // //               ) : (
// // //                 <BsFileText className="text-primary" />
// // //               )}
// // //               <span className="text-muted">{post.type}</span>
// // //               <span className="text-muted">#{post._id}</span>
// // //               <span className="badge bg-light text-dark">
// // //                 {post.views} view{post.views !== 1 ? 's' : ''}
// // //               </span>
// // //             </div>

// // //             <div className="d-flex align-items-center gap-2">
// // //               {isAuthorOrInstructor && (
// // //                 <button 
// // //                   className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
// // //                   onClick={handleEditPost}
// // //                 >
// // //                   <FiEdit />
// // //                   Edit
// // //                 </button>
// // //               )}
// // //               <ActionDropdown
// // //                 onEdit={handleEditPost}
// // //                 onDelete={handleDeletePost}
// // //                 isAuthorOrInstructor={isAuthorOrInstructor}
// // //               />
// // //             </div>
// // //           </div>

// // //           <h1 className="h3 mb-2">{post.title}</h1>

// // //           <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
// // //             <span>{post.author}</span>
// // //             {post.authorRole === 'instructor' && (
// // //               <span className="badge bg-warning text-dark">Instructor</span>
// // //             )}
// // //             <span>•</span>
// // //             <span>{post.createdAt.toLocaleString()}</span>
// // //             {post.folder && post.folder.length > 0 && (
// // //               <>
// // //                 <span>•</span>
// // //                 <span className="text-primary">{post.folder.join(", ")}</span>
// // //               </>
// // //             )}
// // //           </div>

// // //           <p className="text-secondary">{post.content}</p>
// // //         </div>

// // //         {/* Answers Section */}
// // //         {post.type === 'question' && (
// // //           <>
// // //             {/* Student Answers */}
// // //             <div className="mb-4">
// // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // //                 <span>Student Answers</span>
// // //                 <small className="text-muted">({studentAnswers.length})</small>
// // //               </h2>

// // //               {studentAnswers.length === 0 && currentUserRole === 'student' ? (
// // //                 <div className="mb-3">
// // //                   <p className="small text-muted">Be the first to answer this question!</p>
// // //                   <Editor
// // //                     value={newStudentAnswer}
// // //                     onChange={setNewStudentAnswer}
// // //                     onSubmit={handleSubmitStudentAnswer}
// // //                     placeholder="Write your answer..."
// // //                   />
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   {studentAnswers.map(answer => (
// // //                     <AnswerItem
// // //                       key={answer.id}
// // //                       answer={answer}
// // //                       currentUserName={currentUserName}
// // //                       currentUserRole={currentUserRole}
// // //                       onEdit={() => console.log('Edit answer', answer.id)}
// // //                       onDelete={() => handleDeleteAnswer(answer.id, false)}
// // //                     />
// // //                   ))}
// // //                   {studentAnswers.length > 0 && currentUserRole === 'student' && (
// // //                     <div className="mt-2">
// // //                       <Editor
// // //                         value={newStudentAnswer}
// // //                         onChange={setNewStudentAnswer}
// // //                         onSubmit={handleSubmitStudentAnswer}
// // //                         placeholder="Add another answer..."
// // //                       />
// // //                     </div>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>

// // //             {/* Instructor Answers */}
// // //             <div className="mb-4">
// // //               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
// // //                 <span>Instructor Answers</span>
// // //                 <small className="text-muted">({instructorAnswers.length})</small>
// // //               </h2>

// // //               {instructorAnswers.map(answer => (
// // //                 <AnswerItem
// // //                   key={answer.id}
// // //                   answer={answer}
// // //                   currentUserName={currentUserName}
// // //                   currentUserRole={currentUserRole}
// // //                   onEdit={() => console.log('Edit answer', answer.id)}
// // //                   onDelete={() => handleDeleteAnswer(answer.id, true)}
// // //                 />
// // //               ))}
// // //               {isFaculty && (
// // //                 <div className="mt-2">
// // //                   <Editor
// // //                     value={newInstructorAnswer}
// // //                     onChange={setNewInstructorAnswer}
// // //                     onSubmit={handleSubmitInstructorAnswer}
// // //                     placeholder="Add instructor answer..."
// // //                   />
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}

// // //         {/* Follow-up Discussions */}
// // //         <div className="mb-4">
// // //           <h2 className="h5 mb-3">Follow-up Discussion</h2>

// // //           {discussions.map(d => (
// // //             <DiscussionItem
// // //               key={d.id}
// // //               discussion={d}
// // //               currentUserName={currentUserName}
// // //               currentUserRole={currentUserRole}
// // //               onToggleResolved={() => toggleDiscussionResolved(d.id)}
// // //               onEdit={() => console.log('Edit discussion', d.id)}
// // //               onDelete={() => console.log('Delete discussion', d.id)}
// // //               onAddReply={(content) => handleAddReply(d.id, content)}
// // //             />
// // //           ))}

// // //           <div className="mt-3">
// // //             <textarea
// // //               value={newDiscussion}
// // //               onChange={e => setNewDiscussion(e.target.value)}
// // //               placeholder="Start a new follow-up discussion..."
// // //               className="form-control mb-2"
// // //               rows={4}
// // //             />
// // //             <button
// // //               className="btn btn-primary"
// // //               onClick={handleSubmitDiscussion}
// // //             >
// // //               Post Discussion
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import DiscussionItem, { Discussion } from "./DiscussionItem";
// import AnswerItem, { Answer } from "./AnswerItem";
// import { BsFileText, BsQuestionCircle } from "react-icons/bs";
// import { FiEdit } from "react-icons/fi";
// import ActionDropdown from "./ActionDropdown";
// import Editor from "./editor";
// import { Post } from "../ListOfPostsSidebar/PostItem";
// import * as client from "../../../client";
// import { User } from "@/app/(Kambaz)/Account/reducer";

// interface PostScreenProps {
//   post: Post | null;
//   currentUserRole: string;
//   currentUserName: string;
// }

// interface RootState {
//   accountReducer: {
//     currentUser: User;
//   };
// }

// export default function PostScreen({ 
//   post, 
//   currentUserRole,
//   currentUserName 
// }: PostScreenProps) {
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

//   const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
//   const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
//   const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
//   const [newStudentAnswer, setNewStudentAnswer] = useState('');
//   const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
//   const [newDiscussion, setNewDiscussion] = useState('');

//   // Editing state
//   const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
//   const [editingDiscussionContent, setEditingDiscussionContent] = useState('');
//   const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
//   const [editingReplyContent, setEditingReplyContent] = useState('');

//   // Load answers and discussions when post changes
//   useEffect(() => {
//     if (post) {
//       loadAnswers();
//       loadDiscussions();
//     }
//   }, [post?._id]);

//   const loadAnswers = async () => {
//     if (!post) return;

//     try {
//       // Load student answers
//       const studentAns = await client.getStudentAnswers(post._id);
//       setStudentAnswers(studentAns.map(a => ({
//         id: a._id,
//         author: a.authorName,
//         authorRole: a.authorType,
//         content: a.text,
//         createdAt: new Date(a.createdAt)
//       })));

//       // Load instructor answers
//       const instructorAns = await client.getInstructorAnswers(post._id);
//       setInstructorAnswers(instructorAns.map(a => ({
//         id: a._id,
//         author: a.authorName,
//         authorRole: a.authorType,
//         content: a.text,
//         createdAt: new Date(a.createdAt)
//       })));
//     } catch (error) {
//       console.error("Error loading answers:", error);
//     }
//   };

//   const loadDiscussions = async () => {
//     if (!post) return;

//     try {
//       const discussionsData = await client.getDiscussionsForPost(post._id);
//       setDiscussions(discussionsData.map(d => ({
//         id: d._id,
//         author: d.authorName,
//         authorRole: d.authorRole,
//         content: d.content,
//         createdAt: new Date(d.createdAt),
//         isResolved: d.isResolved,
//         replies: d.replies?.map(r => ({
//           id: r._id,
//           author: r.authorName,
//           authorRole: r.authorRole,
//           content: r.content,
//           createdAt: new Date(r.createdAt)
//         })) || []
//       })));
//     } catch (error) {
//       console.error("Error loading discussions:", error);
//     }
//   };

//   if (!post) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
//         Select a post to view details
//       </div>
//     );
//   }

//   const isAuthorOrInstructor = 
//     post.author === currentUserName || isFaculty;

//   // ============================================
//   // ANSWER HANDLERS
//   // ============================================

//   const handleSubmitStudentAnswer = async () => {
//     if (!newStudentAnswer.trim() || !post || !currentUser) return;
//     const name = currentUser?.firstName && currentUser?.lastName
//       ? `${currentUser.firstName} ${currentUser.lastName}`
//       : currentUser?.username || "Anonymous";

//     try {
//       const newAnswer = await client.createAnswer(
//         post._id,
//         newStudentAnswer,
//         'student',
//         currentUser._id,
//         name
//       );
      
//       setStudentAnswers([...studentAnswers, {
//         id: newAnswer._id,
//         author: newAnswer.authorName,
//         authorRole: newAnswer.authorType,
//         content: newAnswer.text,
//         createdAt: new Date(newAnswer.createdAt)
//       }]);

//       await client.addAnswerToPost(post._id, newAnswer._id, false);
//       setNewStudentAnswer('');
//     } catch (error) {
//       console.error("Error submitting student answer:", error);
//       alert("Failed to submit answer. Please try again.");
//     }
//   };

//   const handleSubmitInstructorAnswer = async () => {
//     if (!newInstructorAnswer.trim() || !post || !currentUser) return;
//     const name = currentUser?.firstName && currentUser?.lastName
//       ? `${currentUser.firstName} ${currentUser.lastName}`
//       : currentUser?.username || "Anonymous";

//     try {
//       const newAnswer = await client.createAnswer(
//         post._id,
//         newInstructorAnswer,
//         'instructor',
//         currentUser._id,
//         name
//       );
      
//       setInstructorAnswers([...instructorAnswers, {
//         id: newAnswer._id,
//         author: newAnswer.authorName,
//         authorRole: newAnswer.authorType,
//         content: newAnswer.text,
//         createdAt: new Date(newAnswer.createdAt)
//       }]);

//       await client.addAnswerToPost(post._id, newAnswer._id, true);
//       setNewInstructorAnswer('');
//     } catch (error) {
//       console.error("Error submitting instructor answer:", error);
//       alert("Failed to submit answer. Please try again.");
//     }
//   };

//   const handleDeleteAnswer = async (answerId: string, isInstructor: boolean) => {
//     if (!confirm("Are you sure you want to delete this answer?")) return;

//     try {
//       await client.removeAnswerFromPost(post._id, answerId, isInstructor);
//       await client.deleteAnswer(answerId);
    
//       if (isInstructor) {
//         setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
//       } else {
//         setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
//       }
//     } catch (error) {
//       console.error("Error deleting answer:", error);
//       alert("Failed to delete answer. Please try again.");
//     }
//   };

//   // ============================================
//   // POST HANDLERS
//   // ============================================

//   const handleEditPost = () => {
//     console.log('Edit post');
//   };

//   const handleDeletePost = async () => {
//     if (!confirm("Are you sure you want to delete this post?")) return;

//     try {
//       await client.deletePost(post._id);
//       alert("Post deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       alert("Failed to delete post. Please try again.");
//     }
//   };

//   // ============================================
//   // DISCUSSION HANDLERS
//   // ============================================

//   const handleSubmitDiscussion = async () => {
//     if (!newDiscussion.trim() || !post || !currentUser) return;
//     const name = currentUser?.firstName && currentUser?.lastName
//       ? `${currentUser.firstName} ${currentUser.lastName}`
//       : currentUser?.username || "Anonymous";

//     try {
//       const newDiscussionData = await client.createDiscussion(
//         post._id,
//         newDiscussion,
//         currentUser._id,
//         name,
//         currentUser.role as string
//       );

//       const discussion: Discussion = {
//         id: newDiscussionData._id,
//         author: newDiscussionData.authorName,
//         authorRole: newDiscussionData.authorRole,
//         content: newDiscussionData.content,
//         createdAt: new Date(newDiscussionData.createdAt),
//         isResolved: newDiscussionData.isResolved,
//         replies: []
//       };

//       setDiscussions([discussion, ...discussions]);
//       setNewDiscussion('');
//     } catch (error) {
//       console.error("Error creating discussion:", error);
//       alert("Failed to create discussion. Please try again.");
//     }
//   };

//   const handleStartEditDiscussion = (discussionId: string, content: string) => {
//     setEditingDiscussionId(discussionId);
//     setEditingDiscussionContent(content);
//   };

//   const handleCancelEditDiscussion = () => {
//     setEditingDiscussionId(null);
//     setEditingDiscussionContent('');
//   };

//   const handleSaveEditDiscussion = async (discussionId: string) => {
//     if (!editingDiscussionContent.trim()) {
//       alert("Discussion content cannot be empty");
//       return;
//     }

//     try {
//       await client.updateDiscussion(discussionId, editingDiscussionContent);
      
//       setDiscussions(discussions.map(d =>
//         d.id === discussionId ? { ...d, content: editingDiscussionContent } : d
//       ));
      
//       setEditingDiscussionId(null);
//       setEditingDiscussionContent('');
//     } catch (error) {
//       console.error("Error updating discussion:", error);
//       alert("Failed to update discussion. Please try again.");
//     }
//   };

//   const handleDeleteDiscussion = async (discussionId: string) => {
//     if (!confirm("Are you sure you want to delete this discussion and all its replies?")) return;

//     try {
//       await client.deleteDiscussion(discussionId);
//       setDiscussions(discussions.filter(d => d.id !== discussionId));
//     } catch (error) {
//       console.error("Error deleting discussion:", error);
//       alert("Failed to delete discussion. Please try again.");
//     }
//   };

//   const toggleDiscussionResolved = async (discussionId: string) => {
//     try {
//       const updatedDiscussion = await client.toggleDiscussionResolved(discussionId);
//       setDiscussions(discussions.map(d =>
//         d.id === discussionId ? { ...d, isResolved: updatedDiscussion.isResolved } : d
//       ));
//     } catch (error) {
//       console.error("Error toggling discussion resolved:", error);
//       alert("Failed to update discussion status. Please try again.");
//     }
//   };

//   // ============================================
//   // REPLY HANDLERS
//   // ============================================

//   const handleAddReply = async (discussionId: string, replyContent: string, parentReplyId?: string) => {
//     if (!replyContent.trim() || !currentUser) return;
//     const name = currentUser?.firstName && currentUser?.lastName
//       ? `${currentUser.firstName} ${currentUser.lastName}`
//       : currentUser?.username || "Anonymous";

//     try {
//       const newReply = await client.createReply(
//         discussionId,
//         replyContent,
//         currentUser._id,
//         name,
//         currentUser.role as string,
//         parentReplyId || null
//       );

//       setDiscussions(discussions.map(d => {
//         if (d.id === discussionId) {
//           return {
//             ...d,
//             replies: [
//               ...d.replies,
//               {
//                 id: newReply._id,
//                 author: newReply.authorName,
//                 authorRole: newReply.authorRole,
//                 content: newReply.content,
//                 createdAt: new Date(newReply.createdAt)
//               }
//             ]
//           };
//         }
//         return d;
//       }));
//     } catch (error) {
//       console.error("Error adding reply:", error);
//       alert("Failed to add reply. Please try again.");
//     }
//   };

//   const handleStartEditReply = (replyId: string, content: string) => {
//     setEditingReplyId(replyId);
//     setEditingReplyContent(content);
//   };

//   const handleCancelEditReply = () => {
//     setEditingReplyId(null);
//     setEditingReplyContent('');
//   };

//   const handleSaveEditReply = async (replyId: string) => {
//     if (!editingReplyContent.trim()) {
//       alert("Reply content cannot be empty");
//       return;
//     }

//     try {
//       await client.updateReply(replyId, editingReplyContent);
      
//       setDiscussions(discussions.map(d => ({
//         ...d,
//         replies: d.replies.map(r =>
//           r.id === replyId ? { ...r, content: editingReplyContent } : r
//         )
//       })));
      
//       setEditingReplyId(null);
//       setEditingReplyContent('');
//     } catch (error) {
//       console.error("Error updating reply:", error);
//       alert("Failed to update reply. Please try again.");
//     }
//   };

//   const handleDeleteReply = async (replyId: string) => {
//     if (!confirm("Are you sure you want to delete this reply?")) return;

//     try {
//       await client.deleteReply(replyId);
      
//       setDiscussions(discussions.map(d => ({
//         ...d,
//         replies: d.replies.filter(r => r.id !== replyId)
//       })));
//     } catch (error) {
//       console.error("Error deleting reply:", error);
//       alert("Failed to delete reply. Please try again.");
//     }
//   };

//   return (
//     <div className="container-fluid bg-white vh-100 overflow-auto">
//       <div className="container py-4">
//         {/* Post Header */}
//         <div className="mb-4">
//           <div className="d-flex justify-content-between align-items-start mb-2">
//             <div className="d-flex align-items-center gap-2">
//               {post.type === 'question' ? (
//                 <BsQuestionCircle className="text-danger" />
//               ) : (
//                 <BsFileText className="text-primary" />
//               )}
//               <span className="text-muted">{post.type}</span>
//               <span className="text-muted">#{post._id}</span>
//               <span className="badge bg-light text-dark">
//                 {post.views} view{post.views !== 1 ? 's' : ''}
//               </span>
//             </div>

//             <div className="d-flex align-items-center gap-2">
//               {isAuthorOrInstructor && (
//                 <button 
//                   className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
//                   onClick={handleEditPost}
//                 >
//                   <FiEdit />
//                   Edit
//                 </button>
//               )}
//               <ActionDropdown
//                 onEdit={handleEditPost}
//                 onDelete={handleDeletePost}
//                 isAuthorOrInstructor={isAuthorOrInstructor}
//               />
//             </div>
//           </div>

//           <h1 className="h3 mb-2">{post.title}</h1>

//           <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
//             <span>{post.author}</span>
//             {post.authorRole?.toLowerCase() === 'faculty' && (
//               <span className="badge bg-warning text-dark">Instructor</span>
//             )}
//             <span>•</span>
//             <span>{post.createdAt.toLocaleString()}</span>
//             {post.folder && post.folder.length > 0 && (
//               <>
//                 <span>•</span>
//                 <span className="text-primary">{post.folder.join(", ")}</span>
//               </>
//             )}
//           </div>

//           <p className="text-secondary">{post.content}</p>
//         </div>

//         {/* Answers Section */}
//         {post.type === 'question' && (
//           <>
//             {/* Student Answers */}
//             <div className="mb-4">
//               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
//                 <span>Student Answers</span>
//                 <small className="text-muted">({studentAnswers.length})</small>
//               </h2>

//               {studentAnswers.length === 0 && currentUserRole?.toLowerCase() === 'student' ? (
//                 <div className="mb-3">
//                   <p className="small text-muted">Be the first to answer this question!</p>
//                   <Editor
//                     value={newStudentAnswer}
//                     onChange={setNewStudentAnswer}
//                     onSubmit={handleSubmitStudentAnswer}
//                     placeholder="Write your answer..."
//                   />
//                 </div>
//               ) : (
//                 <>
//                   {studentAnswers.map(answer => (
//                     <AnswerItem
//                       key={answer.id}
//                       answer={answer}
//                       currentUserName={currentUserName}
//                       currentUserRole={currentUserRole}
//                       onEdit={() => console.log('Edit answer', answer.id)}
//                       onDelete={() => handleDeleteAnswer(answer.id, false)}
//                     />
//                   ))}
//                   {studentAnswers.length > 0 && currentUserRole?.toLowerCase() === 'student' && (
//                     <div className="mt-2">
//                       <Editor
//                         value={newStudentAnswer}
//                         onChange={setNewStudentAnswer}
//                         onSubmit={handleSubmitStudentAnswer}
//                         placeholder="Add another answer..."
//                       />
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Instructor Answers */}
//             <div className="mb-4">
//               <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
//                 <span>Instructor Answers</span>
//                 <small className="text-muted">({instructorAnswers.length})</small>
//               </h2>

//               {instructorAnswers.map(answer => (
//                 <AnswerItem
//                   key={answer.id}
//                   answer={answer}
//                   currentUserName={currentUser?.username || ""}
//                   currentUserRole={currentUser?.role || "student"}
//                   onEdit={() => console.log('Edit answer', answer.id)}
//                   onDelete={() => handleDeleteAnswer(answer.id, true)}
//                 />
//               ))}
//               {isFaculty && (
//                 <div className="mt-2">
//                   <Editor
//                     value={newInstructorAnswer}
//                     onChange={setNewInstructorAnswer}
//                     onSubmit={handleSubmitInstructorAnswer}
//                     placeholder="Add instructor answer..."
//                   />
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Follow-up Discussions */}
//         <div className="mb-4">
//           <h2 className="h5 mb-3">Follow-up Discussion</h2>

//           {discussions.map(d => (
//             <DiscussionItem
//               key={d.id}
//               discussion={d}
//               currentUserName={currentUser?.username || ""}
//               currentUserRole={currentUser?.role || "student"}
//               onToggleResolved={() => toggleDiscussionResolved(d.id)}
//               onEdit={(discussionId, content) => handleStartEditDiscussion(discussionId, content)}
//               onDelete={(discussionId) => handleDeleteDiscussion(discussionId)}
//               onAddReply={(content, parentReplyId) => handleAddReply(d.id, content, parentReplyId)}
//               onSaveEdit={(discussionId : string) => handleSaveEditDiscussion(discussionId)}
//               isEditing={editingDiscussionId === d.id}
//               editContent={editingDiscussionContent}
//               onEditContentChange={setEditingDiscussionContent}
//               onCancelEdit={handleCancelEditDiscussion}
//               onEditReply={handleStartEditReply}
//               onDeleteReply={handleDeleteReply}
//               onSaveEditReply={handleSaveEditReply}
//               editingReplyId={editingReplyId}
//               editingReplyContent={editingReplyContent}
//               onEditReplyContentChange={setEditingReplyContent}
//               onCancelEditReply={handleCancelEditReply}
//             />
//           ))}

//           <div className="mt-3">
//             <textarea
//               value={newDiscussion}
//               onChange={e => setNewDiscussion(e.target.value)}
//               placeholder="Start a new follow-up discussion..."
//               className="form-control mb-2"
//               rows={4}
//             />
//             <button
//               className="btn btn-primary"
//               onClick={handleSubmitDiscussion}
//             >
//               Post Discussion
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DiscussionItem, { Discussion } from "./DiscussionItem";
import AnswerItem, { Answer } from "./AnswerItem";
import { BsFileText, BsQuestionCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";
import Editor from "./editor";
import { Post } from "../ListOfPostsSidebar/PostItem";
import * as client from "../../../client";
import { User } from "@/app/(Kambaz)/Account/reducer";

interface PostScreenProps {
  post: Post | null;
  currentUserRole: string;
  currentUserName: string;
}

interface RootState {
  accountReducer: {
    currentUser: User;
  };
}

export default function PostScreen({ 
  post, 
  currentUserRole,
  currentUserName 
}: PostScreenProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
  const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
  const [newStudentAnswer, setNewStudentAnswer] = useState('');
  const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
  const [newDiscussion, setNewDiscussion] = useState('');

  // Editing state for discussions
  const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
  const [editingDiscussionContent, setEditingDiscussionContent] = useState('');
  
  // Editing state for replies
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState('');

  // Load answers and discussions when post changes
  useEffect(() => {
    if (post) {
      loadAnswers();
      loadDiscussions();
    }
  }, [post?._id]);

  const loadAnswers = async () => {
    if (!post) return;

    try {
      const studentAns = await client.getStudentAnswers(post._id);
      setStudentAnswers(studentAns.map(a => ({
        id: a._id,
        author: a.authorName,
        authorRole: a.authorType,
        content: a.text,
        createdAt: new Date(a.createdAt)
      })));

      const instructorAns = await client.getInstructorAnswers(post._id);
      setInstructorAnswers(instructorAns.map(a => ({
        id: a._id,
        author: a.authorName,
        authorRole: a.authorType,
        content: a.text,
        createdAt: new Date(a.createdAt)
      })));
    } catch (error) {
      console.error("Error loading answers:", error);
    }
  };

  const loadDiscussions = async () => {
    if (!post) return;

    try {
      const discussionsData = await client.getDiscussionsForPost(post._id);
      setDiscussions(discussionsData.map(d => ({
        id: d._id,
        author: d.authorName,
        authorRole: d.authorRole,
        content: d.content,
        createdAt: new Date(d.createdAt),
        isResolved: d.isResolved,
        replies: d.replies?.map(r => ({
          id: r._id,
          author: r.authorName,
          authorRole: r.authorRole,
          content: r.content,
          createdAt: new Date(r.createdAt)
        })) || []
      })));
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  };

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
        Select a post to view details
      </div>
    );
  }

  const isAuthorOrInstructor = 
    post.author === currentUserName || isFaculty;

  const getUserDisplayName = () => {
    return currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser?.username || "Anonymous";
  };

  // ============================================
  // ANSWER HANDLERS
  // ============================================

  const handleSubmitStudentAnswer = async () => {
    if (!newStudentAnswer.trim() || !post || !currentUser) return;
    const name = getUserDisplayName();

    try {
      const newAnswer = await client.createAnswer(
        post._id,
        newStudentAnswer,
        'student',
        currentUser._id,
        name
      );
      
      setStudentAnswers([...studentAnswers, {
        id: newAnswer._id,
        author: newAnswer.authorName,
        authorRole: newAnswer.authorType,
        content: newAnswer.text,
        createdAt: new Date(newAnswer.createdAt)
      }]);

      await client.addAnswerToPost(post._id, newAnswer._id, false);
      setNewStudentAnswer('');
    } catch (error) {
      console.error("Error submitting student answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleSubmitInstructorAnswer = async () => {
    if (!newInstructorAnswer.trim() || !post || !currentUser) return;
    const name = getUserDisplayName();

    try {
      const newAnswer = await client.createAnswer(
        post._id,
        newInstructorAnswer,
        'instructor',
        currentUser._id,
        name
      );
      
      setInstructorAnswers([...instructorAnswers, {
        id: newAnswer._id,
        author: newAnswer.authorName,
        authorRole: newAnswer.authorType,
        content: newAnswer.text,
        createdAt: new Date(newAnswer.createdAt)
      }]);

      await client.addAnswerToPost(post._id, newAnswer._id, true);
      setNewInstructorAnswer('');
    } catch (error) {
      console.error("Error submitting instructor answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleDeleteAnswer = async (answerId: string, isInstructor: boolean) => {
    if (!confirm("Are you sure you want to delete this answer?")) return;

    try {
      await client.removeAnswerFromPost(post._id, answerId, isInstructor);
      await client.deleteAnswer(answerId);
    
      if (isInstructor) {
        setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
      } else {
        setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Failed to delete answer. Please try again.");
    }
  };

  // ============================================
  // POST HANDLERS
  // ============================================

  const handleEditPost = () => {
    console.log('Edit post');
  };

  const handleDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await client.deletePost(post._id);
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  // ============================================
  // DISCUSSION HANDLERS
  // ============================================

  const handleSubmitDiscussion = async () => {
    if (!newDiscussion.trim() || !post || !currentUser) return;
    const name = getUserDisplayName();

    try {
      const newDiscussionData = await client.createDiscussion(
        post._id,
        newDiscussion,
        currentUser._id,
        name,
        currentUser.role as string
      );

      const discussion: Discussion = {
        id: newDiscussionData._id,
        author: newDiscussionData.authorName,
        authorRole: newDiscussionData.authorRole,
        content: newDiscussionData.content,
        createdAt: new Date(newDiscussionData.createdAt),
        isResolved: newDiscussionData.isResolved,
        replies: []
      };

      setDiscussions([discussion, ...discussions]);
      setNewDiscussion('');
    } catch (error) {
      console.error("Error creating discussion:", error);
      alert("Failed to create discussion. Please try again.");
    }
  };

  const handleStartEditDiscussion = (discussionId: string, content: string) => {
    setEditingDiscussionId(discussionId);
    setEditingDiscussionContent(content);
  };

  const handleCancelEditDiscussion = () => {
    setEditingDiscussionId(null);
    setEditingDiscussionContent('');
  };

  const handleSaveEditDiscussion = async (discussionId: string) => {
    if (!editingDiscussionContent.trim()) {
      alert("Discussion content cannot be empty");
      return;
    }

    try {
      await client.updateDiscussion(discussionId, editingDiscussionContent);
      
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? { ...d, content: editingDiscussionContent } : d
      ));
      
      setEditingDiscussionId(null);
      setEditingDiscussionContent('');
    } catch (error) {
      console.error("Error updating discussion:", error);
      alert("Failed to update discussion. Please try again.");
    }
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    if (!confirm("Are you sure you want to delete this discussion and all its replies?")) return;

    try {
      await client.deleteDiscussion(discussionId);
      setDiscussions(discussions.filter(d => d.id !== discussionId));
    } catch (error) {
      console.error("Error deleting discussion:", error);
      alert("Failed to delete discussion. Please try again.");
    }
  };

  const toggleDiscussionResolved = async (discussionId: string) => {
    try {
      const updatedDiscussion = await client.toggleDiscussionResolved(discussionId);
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? { ...d, isResolved: updatedDiscussion.isResolved } : d
      ));
    } catch (error) {
      console.error("Error toggling discussion resolved:", error);
      alert("Failed to update discussion status. Please try again.");
    }
  };

  // ============================================
  // REPLY HANDLERS
  // ============================================

  const handleAddReply = async (discussionId: string, replyContent: string, parentReplyId?: string) => {
    if (!replyContent.trim() || !currentUser) return;
    const name = getUserDisplayName();

    try {
      const newReply = await client.createReply(
        discussionId,
        replyContent,
        currentUser._id,
        name,
        currentUser.role as string,
        parentReplyId || null
      );

      setDiscussions(discussions.map(d => {
        if (d.id === discussionId) {
          return {
            ...d,
            replies: [
              ...d.replies,
              {
                id: newReply._id,
                author: newReply.authorName,
                authorRole: newReply.authorRole,
                content: newReply.content,
                createdAt: new Date(newReply.createdAt)
              }
            ]
          };
        }
        return d;
      }));
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("Failed to add reply. Please try again.");
    }
  };

  const handleStartEditReply = (replyId: string, content: string) => {
    setEditingReplyId(replyId);
    setEditingReplyContent(content);
  };

  const handleCancelEditReply = () => {
    setEditingReplyId(null);
    setEditingReplyContent('');
  };

  const handleSaveEditReply = async (replyId: string) => {
    if (!editingReplyContent.trim()) {
      alert("Reply content cannot be empty");
      return;
    }

    try {
      await client.updateReply(replyId, editingReplyContent);
      
      setDiscussions(discussions.map(d => ({
        ...d,
        replies: d.replies.map(r =>
          r.id === replyId ? { ...r, content: editingReplyContent } : r
        )
      })));
      
      setEditingReplyId(null);
      setEditingReplyContent('');
    } catch (error) {
      console.error("Error updating reply:", error);
      alert("Failed to update reply. Please try again.");
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!confirm("Are you sure you want to delete this reply?")) return;

    try {
      await client.deleteReply(replyId);
      
      setDiscussions(discussions.map(d => ({
        ...d,
        replies: d.replies.filter(r => r.id !== replyId)
      })));
    } catch (error) {
      console.error("Error deleting reply:", error);
      alert("Failed to delete reply. Please try again.");
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="container-fluid bg-white vh-100 overflow-auto">
      <div className="container py-4">
        {/* Post Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              {post.type === 'question' ? (
                <BsQuestionCircle className="text-danger" />
              ) : (
                <BsFileText className="text-primary" />
              )}
              <span className="text-muted">{post.type}</span>
              <span className="text-muted">#{post._id}</span>
              <span className="badge bg-light text-dark">
                {post.views} view{post.views !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {isAuthorOrInstructor && (
                <button 
                  className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
                  onClick={handleEditPost}
                >
                  <FiEdit />
                  Edit
                </button>
              )}
              <ActionDropdown
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                isAuthorOrInstructor={isAuthorOrInstructor}
              />
            </div>
          </div>

          <h1 className="h3 mb-2">{post.title}</h1>

          <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
            <span>{post.author}</span>
            {post.authorRole?.toLowerCase() === 'faculty' && (
              <span className="badge bg-warning text-dark">Instructor</span>
            )}
            <span>•</span>
            <span>{post.createdAt.toLocaleString()}</span>
            {post.folder && post.folder.length > 0 && (
              <>
                <span>•</span>
                <span className="text-primary">{post.folder.join(", ")}</span>
              </>
            )}
          </div>

          <p className="text-secondary">{post.content}</p>
        </div>

        {/* Answers Section */}
        {post.type === 'question' && (
          <>
            {/* Student Answers */}
            <div className="mb-4">
              <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
                <span>Student Answers</span>
                <small className="text-muted">({studentAnswers.length})</small>
              </h2>

              {studentAnswers.length === 0 && currentUserRole?.toLowerCase() === 'student' ? (
                <div className="mb-3">
                  <p className="small text-muted">Be the first to answer this question!</p>
                  <Editor
                    value={newStudentAnswer}
                    onChange={setNewStudentAnswer}
                    onSubmit={handleSubmitStudentAnswer}
                    placeholder="Write your answer..."
                  />
                </div>
              ) : (
                <>
                  {studentAnswers.map(answer => (
                    <AnswerItem
                      key={answer.id}
                      answer={answer}
                      currentUserName={currentUserName}
                      currentUserRole={currentUserRole}
                      onEdit={() => console.log('Edit answer', answer.id)}
                      onDelete={() => handleDeleteAnswer(answer.id, false)}
                    />
                  ))}
                  {studentAnswers.length > 0 && currentUserRole?.toLowerCase() === 'student' && (
                    <div className="mt-2">
                      <Editor
                        value={newStudentAnswer}
                        onChange={setNewStudentAnswer}
                        onSubmit={handleSubmitStudentAnswer}
                        placeholder="Add another answer..."
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Instructor Answers */}
            <div className="mb-4">
              <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
                <span>Instructor Answers</span>
                <small className="text-muted">({instructorAnswers.length})</small>
              </h2>

              {instructorAnswers.map(answer => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  currentUserName={currentUser?.username || ""}
                  currentUserRole={currentUser?.role || "student"}
                  onEdit={() => console.log('Edit answer', answer.id)}
                  onDelete={() => handleDeleteAnswer(answer.id, true)}
                />
              ))}
              {isFaculty && (
                <div className="mt-2">
                  <Editor
                    value={newInstructorAnswer}
                    onChange={setNewInstructorAnswer}
                    onSubmit={handleSubmitInstructorAnswer}
                    placeholder="Add instructor answer..."
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Follow-up Discussions Section */}
        <div className="mb-4">
          <h2 className="h5 mb-3">
            <span className="text-secondary">followup discussions</span>
            <span className="small text-muted ms-2">for lingering questions and comments</span>
          </h2>

          {/* Existing Discussions */}
          {discussions.map(d => (
            <DiscussionItem
              key={d.id}
              discussion={d}
              currentUserName={currentUser?.username || ""}
              currentUserRole={currentUser?.role || "student"}
              onToggleResolved={() => toggleDiscussionResolved(d.id)}
              onEdit={(discussionId, content) => handleStartEditDiscussion(discussionId, content)}
              onDelete={(discussionId) => handleDeleteDiscussion(discussionId)}
              onAddReply={(content, parentReplyId) => handleAddReply(d.id, content, parentReplyId)}
              onSaveEdit={(discussionId) => handleSaveEditDiscussion(discussionId)}
              isEditing={editingDiscussionId === d.id}
              editContent={editingDiscussionContent}
              onEditContentChange={setEditingDiscussionContent}
              onCancelEdit={handleCancelEditDiscussion}
              onEditReply={handleStartEditReply}
              onDeleteReply={handleDeleteReply}
              onSaveEditReply={handleSaveEditReply}
              editingReplyId={editingReplyId}
              editingReplyContent={editingReplyContent}
              onEditReplyContentChange={setEditingReplyContent}
              onCancelEditReply={handleCancelEditReply}
            />
          ))}

          {/* Start a New Discussion */}
          <div className="mt-3">
            <label className="form-label fw-semibold">Start a new followup discussion</label>
            <textarea
              value={newDiscussion}
              onChange={e => setNewDiscussion(e.target.value)}
              placeholder="Compose a new followup discussion"
              className="form-control mb-2"
              rows={4}
            />
            <button
              className="btn btn-primary"
              onClick={handleSubmitDiscussion}
              disabled={!newDiscussion.trim()}
            >
              Post Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
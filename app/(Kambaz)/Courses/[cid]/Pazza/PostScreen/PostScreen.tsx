
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

//   // Editing state for answers
//   const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
//   const [editingAnswerContent, setEditingAnswerContent] = useState('');

//   // Editing state for discussions
//   const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
//   const [editingDiscussionContent, setEditingDiscussionContent] = useState('');
  
//   // Editing state for replies
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
//       const studentAns = await client.getStudentAnswers(post._id);
//       setStudentAnswers(studentAns.map(a => ({
//         id: a._id,
//         author: a.authorName,
//         authorRole: a.authorType,
//         content: a.text,
//         createdAt: new Date(a.createdAt)
//       })));

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

//   const getUserDisplayName = () => {
//     return currentUser?.firstName && currentUser?.lastName
//       ? `${currentUser.firstName} ${currentUser.lastName}`
//       : currentUser?.username || "Anonymous";
//   };

//   // ============================================
//   // ANSWER HANDLERS
//   // ============================================

//   const handleSubmitStudentAnswer = async () => {
//     if (!newStudentAnswer.trim() || !post || !currentUser) return;
//     const name = getUserDisplayName();

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
//     const name = getUserDisplayName();

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

//   const handleStartEditAnswer = (answerId: string, content: string) => {
//     setEditingAnswerId(answerId);
//     setEditingAnswerContent(content);
//   };

//   const handleCancelEditAnswer = () => {
//     setEditingAnswerId(null);
//     setEditingAnswerContent('');
//   };

//   const handleSaveEditAnswer = async (answerId: string, isInstructor: boolean) => {
//     if (!editingAnswerContent.trim()) {
//       alert("Answer content cannot be empty");
//       return;
//     }

//     try {
//       await client.updateAnswer(answerId, editingAnswerContent);
      
//       // Update local state
//       if (isInstructor) {
//         setInstructorAnswers(instructorAnswers.map(a => 
//           a.id === answerId ? { ...a, content: editingAnswerContent } : a
//         ));
//       } else {
//         setStudentAnswers(studentAnswers.map(a => 
//           a.id === answerId ? { ...a, content: editingAnswerContent } : a
//         ));
//       }
      
//       setEditingAnswerId(null);
//       setEditingAnswerContent('');
//     } catch (error) {
//       console.error("Error updating answer:", error);
//       alert("Failed to update answer. Please try again.");
//     }
//   };

//   // ============================================
//   // POST HANDLERS
//   // ============================================

//   const handleEditPost = () => {
//     console.log('Edit post');
//   };

//   const handleDeletePost = async () => {

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
//     const name = getUserDisplayName();

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
//     const name = getUserDisplayName();

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

//   // ============================================
//   // RENDER
//   // ============================================

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
//                       onEdit={(answerId:string, content:string) => handleStartEditAnswer(answerId, content)}
//                       onDelete={(answerId) => handleDeleteAnswer(answerId, false)}
//                       isEditing={editingAnswerId === answer.id}
//                       editContent={editingAnswerContent}
//                       onEditContentChange={setEditingAnswerContent}
//                       onSaveEdit={(answerId) => handleSaveEditAnswer(answerId, false)}
//                       onCancelEdit={handleCancelEditAnswer}
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
//                   onEdit={(answerId, content) => handleStartEditAnswer(answerId, content)}
//                   onDelete={(answerId) => handleDeleteAnswer(answerId, true)}
//                   isEditing={editingAnswerId === answer.id}
//                   editContent={editingAnswerContent}
//                   onEditContentChange={setEditingAnswerContent}
//                   onSaveEdit={(answerId) => handleSaveEditAnswer(answerId, true)}
//                   onCancelEdit={handleCancelEditAnswer}
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

//         {/* Follow-up Discussions Section */}
//         <div className="mb-4">
//           <h2 className="h5 mb-3">
//             <span className="text-secondary">followup discussions</span>
//             <span className="small text-muted ms-2">for lingering questions and comments</span>
//           </h2>

//           {/* Existing Discussions */}
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
//               onSaveEdit={(discussionId) => handleSaveEditDiscussion(discussionId)}
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

//           {/* Start a New Discussion */}
//           <div className="mt-3">
//             <label className="form-label fw-semibold">Start a new followup discussion</label>
//             <textarea
//               value={newDiscussion}
//               onChange={e => setNewDiscussion(e.target.value)}
//               placeholder="Compose a new followup discussion"
//               className="form-control mb-2"
//               rows={4}
//             />
//             <button
//               className="btn btn-primary"
//               onClick={handleSubmitDiscussion}
//               disabled={!newDiscussion.trim()}
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
import { useParams } from "next/navigation";

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
  const {cid} = useParams()
  const courseId = cid as string
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
  const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
  const [newStudentAnswer, setNewStudentAnswer] = useState('');
  const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
  const [newDiscussion, setNewDiscussion] = useState('');

  // Editing state for post
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');

  // Editing state for answers
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editingAnswerContent, setEditingAnswerContent] = useState('');

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

  const handleStartEditAnswer = (answerId: string, content: string) => {
    setEditingAnswerId(answerId);
    setEditingAnswerContent(content);
  };

  const handleCancelEditAnswer = () => {
    setEditingAnswerId(null);
    setEditingAnswerContent('');
  };

  const handleSaveEditAnswer = async (answerId: string, isInstructor: boolean) => {
    if (!editingAnswerContent.trim()) {
      alert("Answer content cannot be empty");
      return;
    }

    try {
      await client.updateAnswer(answerId, editingAnswerContent);
      
      // Update local state
      if (isInstructor) {
        setInstructorAnswers(instructorAnswers.map(a => 
          a.id === answerId ? { ...a, content: editingAnswerContent } : a
        ));
      } else {
        setStudentAnswers(studentAnswers.map(a => 
          a.id === answerId ? { ...a, content: editingAnswerContent } : a
        ));
      }
      
      setEditingAnswerId(null);
      setEditingAnswerContent('');
    } catch (error) {
      console.error("Error updating answer:", error);
      alert("Failed to update answer. Please try again.");
    }
  };

  // ============================================
  // POST HANDLERS
  // ============================================

  const handleStartEditPost = () => {
    setIsEditingPost(true);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
  };

  const handleCancelEditPost = () => {
    setIsEditingPost(false);
    setEditPostTitle('');
    setEditPostContent('');
  };

  const handleSaveEditPost = async () => {
    if (!editPostTitle.trim() || !editPostContent.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    try {
      const updatedPost = {
        ...post,
        title: editPostTitle,
        content: editPostContent
      };
      
      await client.updatePost(post._id, updatedPost);
      
      // Update local post data
      post.title = editPostTitle;
      post.content = editPostContent;
      
      setIsEditingPost(false);
      setEditPostTitle('');
      setEditPostContent('');
      
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post? This will also delete all answers and discussions.")) return;

    try {
      await client.deletePost(post._id);
      alert("Post deleted successfully!");
      // You might want to redirect to the posts list here
      window.location.href = `/Courses/${cid}/Pazza`;
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

            {!isEditingPost && isAuthorOrInstructor && (
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-link text-primary d-flex align-items-center gap-1 p-0"
                  onClick={handleStartEditPost}
                >
                  <FiEdit />
                  Edit
                </button>
                <ActionDropdown
                  onEdit={handleStartEditPost}
                  onDelete={handleDeletePost}
                  isAuthorOrInstructor={isAuthorOrInstructor}
                />
              </div>
            )}
          </div>

          {isEditingPost ? (
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  value={editPostTitle}
                  onChange={(e) => setEditPostTitle(e.target.value)}
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Content</label>
                <textarea
                  value={editPostContent}
                  onChange={(e) => setEditPostContent(e.target.value)}
                  className="form-control"
                  rows={6}
                />
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={handleSaveEditPost}
                  className="btn btn-success d-flex align-items-center gap-1"
                >
                  <FiEdit size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEditPost}
                  className="btn btn-secondary d-flex align-items-center gap-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
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
              <div   className="small text-secondary m-0"   
                style={{     display: "-webkit-box",    
                WebkitLineClamp: 2,    
                WebkitBoxOrient: "vertical",     
                overflow: "hidden",   }}   
                dangerouslySetInnerHTML={{ __html: post.content }} />

            </>
          )}
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
                      onEdit={(answerId, content) => handleStartEditAnswer(answerId, content)}
                      onDelete={(answerId) => handleDeleteAnswer(answerId, false)}
                      isEditing={editingAnswerId === answer.id}
                      editContent={editingAnswerContent}
                      onEditContentChange={setEditingAnswerContent}
                      onSaveEdit={(answerId) => handleSaveEditAnswer(answerId, false)}
                      onCancelEdit={handleCancelEditAnswer}
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
                  onEdit={(answerId, content) => handleStartEditAnswer(answerId, content)}
                  onDelete={(answerId) => handleDeleteAnswer(answerId, true)}
                  isEditing={editingAnswerId === answer.id}
                  editContent={editingAnswerContent}
                  onEditContentChange={setEditingAnswerContent}
                  onSaveEdit={(answerId) => handleSaveEditAnswer(answerId, true)}
                  onCancelEdit={handleCancelEditAnswer}
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
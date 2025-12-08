// // // import { useState } from "react";
// // // import ReplyItem, { Reply } from "./ReplyItem";
// // // import { FiMessageSquare } from "react-icons/fi";
// // // import ActionDropdown from "./ActionDropdown";

// // // export interface Discussion {
// // //   id: string;
// // //   author: string;
// // //   authorRole: 'student' | 'instructor';
// // //   content: string;
// // //   createdAt: Date;
// // //   isResolved: boolean;
// // //   replies: Reply[];
// // // }

// // // export default function DiscussionItem({
// // //   discussion,
// // //   currentUserName,
// // //   currentUserRole,
// // //   onToggleResolved,
// // //   onEdit,
// // //   onDelete,
// // //   onAddReply
// // // }: {
// // //   discussion: Discussion;
// // //   currentUserName: string;
// // //   currentUserRole: 'student' | 'instructor';
// // //   onToggleResolved: () => void;
// // //   onEdit: () => void;
// // //   onDelete: () => void;
// // //   onAddReply: (replyContent: string, parentReplyId?: string) => void;
// // // }) {
// // //   const [showReplyEditor, setShowReplyEditor] = useState(false);
// // //   const [replyContent, setReplyContent] = useState('');
// // //   const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);

// // //   const isAuthorOrInstructor = 
// // //     discussion.author === currentUserName || currentUserRole === 'instructor';

// // //   const handleSubmitReply = () => {
// // //     if (replyContent.trim()) {
// // //       onAddReply(replyContent, replyToReplyId || undefined);
// // //       setReplyContent('');
// // //       setShowReplyEditor(false);
// // //       setReplyToReplyId(null);
// // //     }
// // //   };

// // //   const handleReplyToReply = (replyId: string) => {
// // //     setReplyToReplyId(replyId);
// // //     setShowReplyEditor(true);
// // //   };

// // //   return (
// // //     <div className="card mb-3">
// // //       <div className="card-body">
// // //         {/* Header */}
// // //         <div className="d-flex justify-content-between align-items-start mb-2">
// // //           <div className="d-flex align-items-center gap-2">
// // //             <button
// // //               onClick={onToggleResolved}
// // //               className={`btn btn-sm ${
// // //                 discussion.isResolved ? "btn-success" : "btn-secondary"
// // //               }`}
// // //             >
// // //               {discussion.isResolved ? 'Resolved' : 'Unresolved'}
// // //             </button>
// // //             <span className="fw-semibold">{discussion.author}</span>
// // //             {discussion.authorRole === 'instructor' && (
// // //               <span className="badge bg-warning text-dark">Instructor</span>
// // //             )}
// // //           </div>
// // //           <div className="d-flex align-items-center gap-2">
// // //             <small className="text-muted">{discussion.createdAt.toLocaleString()}</small>
// // //             <ActionDropdown
// // //               onEdit={onEdit}
// // //               onDelete={onDelete}
// // //               isAuthorOrInstructor={isAuthorOrInstructor}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Content */}
// // //         <p className="mb-3">{discussion.content}</p>

// // //         {/* Replies */}
// // //         {discussion.replies.map((reply) => (
// // //           <ReplyItem
// // //             key={reply.id}
// // //             reply={reply}
// // //             currentUserName={currentUserName}
// // //             currentUserRole={currentUserRole}
// // //             onEdit={() => console.log('Edit reply', reply.id)}
// // //             onDelete={() => console.log('Delete reply', reply.id)}
// // //             onReply={() => handleReplyToReply(reply.id)}
// // //           />
// // //         ))}

// // //         {/* Reply Input */}
// // //         <div className="mt-2">
// // //           {!showReplyEditor ? (
// // //             <button
// // //               onClick={() => setShowReplyEditor(true)}
// // //               className="btn btn-link btn-sm text-primary d-flex align-items-center gap-1"
// // //             >
// // //               <FiMessageSquare />
// // //               Reply
// // //             </button>
// // //           ) : (
// // //             <div className="mt-2">
// // //               <textarea
// // //                 value={replyContent}
// // //                 onChange={(e) => setReplyContent(e.target.value)}
// // //                 placeholder="Write a reply..."
// // //                 className="form-control mb-2"
// // //                 style={{ minHeight: "80px", resize: "none" }}
// // //               />
// // //               <div className="d-flex gap-2">
// // //                 <button
// // //                   onClick={handleSubmitReply}
// // //                   className="btn btn-primary btn-sm"
// // //                 >
// // //                   Submit
// // //                 </button>
// // //                 <button
// // //                   onClick={() => {
// // //                     setShowReplyEditor(false);
// // //                     setReplyContent('');
// // //                     setReplyToReplyId(null);
// // //                   }}
// // //                   className="btn btn-secondary btn-sm"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import { useSelector } from "react-redux";
// // import ReplyItem, { Reply } from "./ReplyItem";
// // import { FiMessageSquare } from "react-icons/fi";
// // import ActionDropdown from "./ActionDropdown";
// // import { User } from "@/app/(Kambaz)/Account/reducer";

// // export interface Discussion {
// //   id: string;
// //   author: string;
// //   authorRole: string;
// //   content: string;
// //   createdAt: Date;
// //   isResolved: boolean;
// //   replies: Reply[];
// // }

// // interface RootState {
// //   accountReducer: {
// //     currentUser: User;
// //   };
// // }

// // export default function DiscussionItem({
// //   discussion,
// //   currentUserName,
// //   currentUserRole,
// //   onToggleResolved,
// //   onEdit,
// //   onDelete,
// //   onAddReply
// // }: {
// //   discussion: Discussion;
// //   currentUserName: string;
// //   currentUserRole: string;
// //   onToggleResolved: () => void;
// //   onEdit: () => void;
// //   onDelete: () => void;
// //   onAddReply: (replyContent: string, parentReplyId?: string) => void;
// // }) {
// //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

// //   const [showReplyEditor, setShowReplyEditor] = useState(false);
// //   const [replyContent, setReplyContent] = useState('');
// //   const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);

// //   const isAuthorOrInstructor = 
// //     discussion.author === currentUser._id || isFaculty;

// //   const handleSubmitReply = () => {
// //     if (replyContent.trim()) {
// //       onAddReply(replyContent, replyToReplyId || undefined);
// //       setReplyContent('');
// //       setShowReplyEditor(false);
// //       setReplyToReplyId(null);
// //     }
// //   };

// //   const handleReplyToReply = (replyId: string) => {
// //     setReplyToReplyId(replyId);
// //     setShowReplyEditor(true);
// //   };

// //   return (
// //     <div className="card mb-3">
// //       <div className="card-body">
// //         {/* Header */}
// //         <div className="d-flex justify-content-between align-items-start mb-2">
// //           <div className="d-flex align-items-center gap-2">
// //             <button
// //               onClick={onToggleResolved}
// //               className={`btn btn-sm ${
// //                 discussion.isResolved ? "btn-success" : "btn-secondary"
// //               }`}
// //             >
// //               {discussion.isResolved ? 'Resolved' : 'Unresolved'}
// //             </button>
// //             <span className="fw-semibold">{discussion.author}</span>
// //             {discussion.authorRole === 'instructor' && (
// //               <span className="badge bg-warning text-dark">Instructor</span>
// //             )}
// //           </div>
// //           <div className="d-flex align-items-center gap-2">
// //             <small className="text-muted">{discussion.createdAt.toLocaleString()}</small>
// //             <ActionDropdown
// //               onEdit={onEdit}
// //               onDelete={onDelete}
// //               isAuthorOrInstructor={isAuthorOrInstructor}
// //             />
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <p className="mb-3">{discussion.content}</p>

// //         {/* Replies */}
// //         {discussion.replies.map((reply) => (
// //           <ReplyItem
// //             key={reply.id}
// //             reply={reply}
// //             currentUserName={currentUserName}
// //             currentUserRole={currentUserRole}
// //             onEdit={() => console.log('Edit reply', reply.id)}
// //             onDelete={() => console.log('Delete reply', reply.id)}
// //             onReply={() => handleReplyToReply(reply.id)}
// //           />
// //         ))}

// //         {/* Reply Input */}
// //         <div className="mt-2">
// //           {!showReplyEditor ? (
// //             <button
// //               onClick={() => setShowReplyEditor(true)}
// //               className="btn btn-link btn-sm text-primary d-flex align-items-center gap-1"
// //             >
// //               <FiMessageSquare />
// //               Reply
// //             </button>
// //           ) : (
// //             <div className="mt-2">
// //               <textarea
// //                 value={replyContent}
// //                 onChange={(e) => setReplyContent(e.target.value)}
// //                 placeholder="Write a reply..."
// //                 className="form-control mb-2"
// //                 style={{ minHeight: "80px", resize: "none" }}
// //               />
// //               <div className="d-flex gap-2">
// //                 <button
// //                   onClick={handleSubmitReply}
// //                   className="btn btn-primary btn-sm"
// //                 >
// //                   Submit
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowReplyEditor(false);
// //                     setReplyContent('');
// //                     setReplyToReplyId(null);
// //                   }}
// //                   className="btn btn-secondary btn-sm"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import ReplyItem, { Reply } from "./ReplyItem";
// import { FiMessageSquare } from "react-icons/fi";
// import ActionDropdown from "./ActionDropdown";
// import { RootState } from "../../../../store";
// export interface Discussion {
//   id: string;
//   author: string;
//   authorRole: string;
//   content: string;
//   createdAt: Date;
//   isResolved: boolean;
//   replies: Reply[];
// }



// export default function DiscussionItem({
//   discussion,
//   currentUserName,
//   currentUserRole,
//   onToggleResolved,
//   onEdit,
//   onDelete,
//   onAddReply
// }: {
//   discussion: Discussion;
//   currentUserName: string;
//   currentUserRole: string;
//   onToggleResolved: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
//   onAddReply: (replyContent: string, parentReplyId?: string) => void;
// }) {
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

//   const [showReplyEditor, setShowReplyEditor] = useState(false);
//   const [replyContent, setReplyContent] = useState('');
//   const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);

//   const isAuthorOrInstructor = 
//     discussion.author === currentUserName || isFaculty;

//   const handleSubmitReply = () => {
//     if (replyContent.trim()) {
//       onAddReply(replyContent, replyToReplyId || undefined);
//       setReplyContent('');
//       setShowReplyEditor(false);
//       setReplyToReplyId(null);
//     }
//   };

//   const handleReplyToReply = (replyId: string) => {
//     setReplyToReplyId(replyId);
//     setShowReplyEditor(true);
//   };

//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-start mb-2">
//           <div className="d-flex align-items-center gap-2">
//             <button
//               onClick={onToggleResolved}
//               className={`btn btn-sm ${
//                 discussion.isResolved ? "btn-success" : "btn-secondary"
//               }`}
//             >
//               {discussion.isResolved ? 'Resolved' : 'Unresolved'}
//             </button>
//             <span className="fw-semibold">{discussion.author}</span>
//             {discussion.authorRole === 'instructor' && (
//               <span className="badge bg-warning text-dark">Instructor</span>
//             )}
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <small className="text-muted">{discussion.createdAt.toLocaleString()}</small>
//             <ActionDropdown
//               onEdit={onEdit}
//               onDelete={() => onDelete(discussion.id)}
//               isAuthorOrInstructor={isAuthorOrInstructor}
//             />
//           </div>
//         </div>

//         {/* Content */}
//         {isEditing ? (
//           <div className="mb-3">
//             <textarea
//               value={editContent}
//               onChange={(e) => onEditContentChange?.(e.target.value)}
//               className="form-control mb-2"
//               rows={4}
//               autoFocus
//             />
//             <div className="d-flex gap-2">
//               <button
//                 onClick={() => onSaveEdit?.(discussion.id)}
//                 className="btn btn-sm btn-success d-flex align-items-center gap-1"
//               >
//                 <FiSave size={14} />
//                 Save
//               </button>
//               <button
//                 onClick={onCancelEdit}
//                 className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
//               >
//                 <FiX size={14} />
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="d-flex justify-content-between align-items-start mb-3">
//               <p className="mb-0 flex-grow-1">{discussion.content}</p>
//               {isAuthorOrInstructor && (
//                 <button
//                   onClick={() => onEdit(discussion.id, discussion.content)}
//                   className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 ms-2"
//                 >
//                   <FiEdit size={14} />
//                   Edit
//                 </button>
//               )}
//             </div>
//           </>
//         )}

//         {/* Replies */}
//         {discussion.replies.map((reply) => (
//           <ReplyItem
//             key={reply.id}
//             reply={reply}
//             currentUserName={currentUserName}
//             currentUserRole={currentUserRole}
//             onEdit={(replyId, content) => onEditReply?.(replyId, content)}
//             onDelete={(replyId) => onDeleteReply?.(replyId)}
//             onReply={() => handleReplyToReply(reply.id)}
//             isEditing={editingReplyId === reply.id}
//             editContent={editingReplyContent}
//             onEditContentChange={onEditReplyContentChange}
//             onSaveEdit={(replyId) => onSaveEditReply?.(replyId)}
//             onCancelEdit={onCancelEditReply}
//           />
//         ))}

//         {/* Reply Input */}
//         <div className="mt-2">
//           {!showReplyEditor ? (
//             <button
//               onClick={() => setShowReplyEditor(true)}
//               className="btn btn-link btn-sm text-primary d-flex align-items-center gap-1"
//             >
//               <FiMessageSquare />
//               Reply
//             </button>
//           ) : (
//             <div className="mt-2">
//               <textarea
//                 value={replyContent}
//                 onChange={(e) => setReplyContent(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="form-control mb-2"
//                 style={{ minHeight: "80px", resize: "none" }}
//               />
//               <div className="d-flex gap-2">
//                 <button
//                   onClick={handleSubmitReply}
//                   className="btn btn-primary btn-sm"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowReplyEditor(false);
//                     setReplyContent('');
//                     setReplyToReplyId(null);
//                   }}
//                   className="btn btn-secondary btn-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useSelector } from "react-redux";
import ReplyItem, { Reply } from "./ReplyItem";
import { FiMessageSquare, FiEdit, FiSave, FiX } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";
import { User } from "@/app/(Kambaz)/Account/reducer";

export interface Discussion {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: Date;
  isResolved: boolean;
  replies: Reply[];
}

interface RootState {
  accountReducer: {
    currentUser: User;
  };
}

interface DiscussionItemProps {
  discussion: Discussion;
  currentUserName: string;
  currentUserRole: string;
  onToggleResolved: () => void;
  onEdit: (discussionId: string, content: string) => void;
  onDelete: (discussionId: string) => void;
  onAddReply: (replyContent: string, parentReplyId?: string) => void;
  onSaveEdit?: (discussionId: string) => void;
  isEditing?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onCancelEdit?: () => void;
  onEditReply?: (replyId: string, content: string) => void;
  onDeleteReply?: (replyId: string) => void;
  onSaveEditReply?: (replyId: string) => void;
  editingReplyId?: string | null;
  editingReplyContent?: string;
  onEditReplyContentChange?: (content: string) => void;
  onCancelEditReply?: () => void;
}

export default function DiscussionItem({
  discussion,
  currentUserName,
  currentUserRole,
  onToggleResolved,
  onEdit,
  onDelete,
  onAddReply,
  onSaveEdit,
  isEditing,
  editContent,
  onEditContentChange,
  onCancelEdit,
  onEditReply,
  onDeleteReply,
  onSaveEditReply,
  editingReplyId,
  editingReplyContent,
  onEditReplyContentChange,
  onCancelEditReply
}: DiscussionItemProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);

  const isAuthorOrInstructor = 
    discussion.author === currentUserName || isFaculty;

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onAddReply(replyContent, replyToReplyId || undefined);
      setReplyContent('');
      setShowReplyEditor(false);
      setReplyToReplyId(null);
    }
  };

  const handleReplyToReply = (replyId: string) => {
    setReplyToReplyId(replyId);
    setShowReplyEditor(true);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={onToggleResolved}
              className={`btn btn-sm ${
                discussion.isResolved ? "btn-success" : "btn-secondary"
              }`}
              disabled={!isFaculty}
            >
              {discussion.isResolved ? '✓ Resolved' : '○ Unresolved'}
            </button>
            <span className="fw-semibold">{discussion.author}</span>
            {discussion.authorRole?.toLowerCase() === 'faculty' && (
              <span className="badge bg-warning text-dark">Instructor</span>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">{discussion.createdAt.toLocaleString()}</small>
            {isAuthorOrInstructor && (
              <ActionDropdown
                onEdit={() => onEdit(discussion.id, discussion.content)}
                onDelete={() => onDelete(discussion.id)}
                isAuthorOrInstructor={isAuthorOrInstructor}
              />
            )}
          </div>
        </div>

        {/* Content */}
        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editContent}
              onChange={(e) => onEditContentChange?.(e.target.value)}
              className="form-control mb-2"
              rows={4}
              autoFocus
            />
            <div className="d-flex gap-2">
              <button
                onClick={() => onSaveEdit?.(discussion.id)}
                className="btn btn-sm btn-success d-flex align-items-center gap-1"
              >
                <FiSave size={14} />
                Save
              </button>
              <button
                onClick={onCancelEdit}
                className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
              >
                <FiX size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mb-3">{discussion.content}</p>
        )}

        {/* Replies */}
        {discussion.replies && discussion.replies.length > 0 && (
          <div className="mb-3">
            {discussion.replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                currentUserName={currentUserName}
                currentUserRole={currentUserRole}
                onEdit={(replyId, content) => onEditReply?.(replyId, content)}
                onDelete={(replyId) => onDeleteReply?.(replyId)}
                onReply={(replyId) => handleReplyToReply(replyId)}
                isEditing={editingReplyId === reply.id}
                editContent={editingReplyContent}
                onEditContentChange={onEditReplyContentChange}
                onSaveEdit={(replyId) => onSaveEditReply?.(replyId)}
                onCancelEdit={onCancelEditReply}
              />
            ))}
          </div>
        )}

        {/* Reply Input */}
        <div className="mt-2">
          {!showReplyEditor ? (
            <button
              onClick={() => setShowReplyEditor(true)}
              className="btn btn-link btn-sm text-primary d-flex align-items-center gap-1 p-0"
            >
              <FiMessageSquare />
              Reply
            </button>
          ) : (
            <div className="mt-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={replyToReplyId ? "Reply to this comment..." : "Write a reply..."}
                className="form-control mb-2"
                style={{ minHeight: "80px", resize: "none" }}
              />
              <div className="d-flex gap-2">
                <button
                  onClick={handleSubmitReply}
                  className="btn btn-primary btn-sm"
                >
                  Submit Reply
                </button>
                <button
                  onClick={() => {
                    setShowReplyEditor(false);
                    setReplyContent('');
                    setReplyToReplyId(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
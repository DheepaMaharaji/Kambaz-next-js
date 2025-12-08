
// // import { useSelector } from "react-redux";
// // import { FiMessageSquare } from "react-icons/fi";
// // import ActionDropdown from "./ActionDropdown";
// // import { User } from "@/app/(Kambaz)/Account/reducer";

// // export interface Reply {
// //   id: string; 
// //   author: string; 
// //   authorRole: string; 
// //   content: string; 
// //   createdAt: Date; 
// // }

// // interface RootState {
// //   accountReducer: {
// //     currentUser: User;
// //   };
// // }

// // export default function ReplyItem({
// //   reply,
// //   currentUserName,
// //   currentUserRole,
// //   onEdit,
// //   onDelete,
// //   onReply
// // }: {
// //   reply: Reply;
// //   currentUserName: string;
// //   currentUserRole: string;
// //   onEdit: () => void;
// //   onDelete: () => void;
// //   onReply: () => void;
// // }) {
// //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

// //   const isAuthorOrInstructor = 
// //     reply.author === currentUser._id || isFaculty;

// //   return (
// //     <div className="ms-4 border-start ps-3 py-3">
// //       <div className="d-flex justify-content-between align-items-start mb-2">
// //         <div className="d-flex align-items-center gap-2">
// //           <span className="fw-semibold small">{reply.author}</span>
// //           {reply.authorRole?.toLowerCase() === 'instructor' && (
// //             <span className="badge bg-warning text-dark small">
// //               Instructor
// //             </span>
// //           )}
// //         </div>
// //         <div className="d-flex align-items-center gap-2">
// //           <span className="text-muted small">{reply.createdAt.toLocaleString()}</span>
// //           <ActionDropdown
// //             onEdit={onEdit}
// //             onDelete={onDelete}
// //             isAuthorOrInstructor={isAuthorOrInstructor}
// //           />
// //         </div>
// //       </div>
// //       <div className="small mb-2">{reply.content}</div>
// //       <button
// //         onClick={onReply}
// //         className="btn btn-link btn-sm p-0 text-primary d-flex align-items-center gap-1"
// //       >
// //         <FiMessageSquare size={14} />
// //         Reply
// //       </button>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { FiMessageSquare, FiEdit, FiSave, FiX, FiTrash2 } from "react-icons/fi";
// import ActionDropdown from "./ActionDropdown";
// import { User } from "@/app/(Kambaz)/Account/reducer";

// export interface Reply {
//   id: string; 
//   author: string; 
//   authorRole: string; 
//   content: string; 
//   createdAt: Date; 
// }

// interface RootState {
//   accountReducer: {
//     currentUser: User;
//   };
// }

// export default function ReplyItem({
//   reply,
//   currentUserName,
//   currentUserRole,
//   onEdit,
//   onDelete,
//   onReply,
//   isEditing,
//   editContent,
//   onEditContentChange,
//   onSaveEdit,
//   onCancelEdit
// }: {
//   reply: Reply;
//   currentUserName: string;
//   currentUserRole: string;
//   onEdit: (replyId: string, content: string) => void | Promise<void>;
//   onDelete: (replyId: string) => void | Promise<void>;
//   onReply: (replyId: string) => void | Promise<void>;
//   isEditing?: boolean;
//   editContent?: string;
//   onEditContentChange?: (content: string) => void;
//   onSaveEdit?: (replyId: string) => void | Promise<void>;
//   onCancelEdit?: () => void;
// }) {
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

//   const isAuthorOrInstructor = 
//     reply.author === currentUserName || isFaculty;

//   return (
//     <div className="ms-4 border-start ps-3 py-3">
//       <div className="d-flex justify-content-between align-items-start mb-2">
//         <div className="d-flex align-items-center gap-2">
//           <span className="fw-semibold small">{reply.author}</span>
//           {reply.authorRole?.toLowerCase() === 'instructor' && (
//             <span className="badge bg-warning text-dark small">
//               Instructor
//             </span>
//           )}
//         </div>
//         <div className="d-flex align-items-center gap-2">
//           <span className="text-muted small">{reply.createdAt.toLocaleString()}</span>
//           {isAuthorOrInstructor && !isEditing && (
//             <>
//               <button
//                 onClick={() => onEdit(reply.id, reply.content)}
//                 className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 p-1"
//                 title="Edit reply"
//               >
//                 <FiEdit size={12} />
//               </button>
//               <button
//                 onClick={() => onDelete(reply.id)}
//                 className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 p-1"
//                 title="Delete reply"
//               >
//                 <FiTrash2 size={12} />
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       {isEditing ? (
//         <div className="mb-2">
//           <textarea
//             value={editContent}
//             onChange={(e) => onEditContentChange?.(e.target.value)}
//             className="form-control mb-2"
//             rows={3}
//             autoFocus
//           />
//           <div className="d-flex gap-2">
//             <button
//               onClick={() => onSaveEdit?.(reply.id)}
//               className="btn btn-sm btn-success d-flex align-items-center gap-1"
//             >
//               <FiSave size={12} />
//               Save
//             </button>
//             <button
//               onClick={onCancelEdit}
//               className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
//             >
//               <FiX size={12} />
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="small mb-2">{reply.content}</div>
//       )}

//       {/* Reply to Reply Button */}
//       {!isEditing && (
//         <button
//           onClick={() => onReply(reply.id)}
//           className="btn btn-link btn-sm p-0 text-primary d-flex align-items-center gap-1"
//         >
//           <FiMessageSquare size={14} />
//           Reply
//         </button>
//       )}
//     </div>
//   );
// }

import { useSelector } from "react-redux";
import { FiMessageSquare, FiEdit, FiSave, FiX, FiTrash2 } from "react-icons/fi";
import { User } from "@/app/(Kambaz)/Account/reducer";

export interface Reply {
  id: string; 
  author: string; 
  authorRole: string; 
  content: string; 
  createdAt: Date; 
}

interface RootState {
  accountReducer: {
    currentUser: User;
  };
}

interface ReplyItemProps {
  reply: Reply;
  currentUserName: string;
  currentUserRole: string;
  onEdit: (replyId: string, content: string) => void | Promise<void>;
  onDelete: (replyId: string) => void | Promise<void>;
  onReply: (replyId: string) => void | Promise<void>;
  isEditing?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onSaveEdit?: (replyId: string) => void | Promise<void>;
  onCancelEdit?: () => void;
}

export default function ReplyItem({
  reply,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete,
  onReply,
  isEditing,
  editContent,
  onEditContentChange,
  onSaveEdit,
  onCancelEdit
}: ReplyItemProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const isAuthorOrInstructor = 
    reply.author === currentUserName || isFaculty;

  return (
    <div className="ms-4 border-start border-2 ps-3 py-3 mb-2">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold small">{reply.author}</span>
          {reply.authorRole?.toLowerCase() === 'faculty' && (
            <span className="badge bg-warning text-dark small">
              Instructor
            </span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">{reply.createdAt.toLocaleString()}</span>
          {isAuthorOrInstructor && !isEditing && (
            <div className="d-flex gap-1">
              <button
                onClick={() => onEdit(reply.id, reply.content)}
                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 py-0 px-2"
                title="Edit reply"
              >
                <FiEdit size={12} />
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this reply?")) {
                    onDelete(reply.id);
                  }
                }}
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 py-0 px-2"
                title="Delete reply"
              >
                <FiTrash2 size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="mb-2">
          <textarea
            value={editContent}
            onChange={(e) => onEditContentChange?.(e.target.value)}
            className="form-control mb-2"
            rows={3}
            autoFocus
          />
          <div className="d-flex gap-2">
            <button
              onClick={() => onSaveEdit?.(reply.id)}
              className="btn btn-sm btn-success d-flex align-items-center gap-1"
            >
              <FiSave size={12} />
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="btn btn-sm btn-secondary d-flex align-items-center gap-1"
            >
              <FiX size={12} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="small mb-2">{reply.content}</div>
      )}

      {/* Reply to Reply Button */}
      {!isEditing && (
        <button
          onClick={() => onReply(reply.id)}
          className="btn btn-link btn-sm p-0 text-primary d-flex align-items-center gap-1"
          style={{ fontSize: "0.875rem" }}
        >
          <FiMessageSquare size={14} />
          Reply
        </button>
      )}
    </div>
  );
}
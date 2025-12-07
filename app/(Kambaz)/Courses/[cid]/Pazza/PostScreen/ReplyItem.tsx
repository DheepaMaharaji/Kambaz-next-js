import { FiMessageSquare } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";

export interface Reply {
  id: string; 
  author: string; 
  authorRole: 'student' | 'instructor'; 
  content: string; 
  createdAt: Date; 
}

export default function ReplyItem({
  reply,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete,
  onReply
}: {
  reply: Reply;
  currentUserName: string;
  currentUserRole: 'student' | 'instructor';
  onEdit: () => void;
  onDelete: () => void;
  onReply: () => void;
}) {
  const isAuthorOrInstructor = 
    reply.author === currentUserName || currentUserRole === 'instructor';

  return (
    <div className="ms-4 border-start ps-3 py-3">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold small">{reply.author}</span>
          {reply.authorRole === 'instructor' && (
            <span className="badge bg-warning text-dark small">
              Instructor
            </span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">{reply.createdAt.toLocaleString()}</span>
          <ActionDropdown
            onEdit={onEdit}
            onDelete={onDelete}
            isAuthorOrInstructor={isAuthorOrInstructor}
          />
        </div>
      </div>
      <div className="small mb-2">{reply.content}</div>
      <button
        onClick={onReply}
        className="btn btn-link btn-sm p-0 text-primary d-flex align-items-center gap-1"
      >
        <FiMessageSquare size={14} />
        Reply
      </button>
    </div>
  );
}

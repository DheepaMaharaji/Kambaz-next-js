// import { useSelector } from "react-redux";
import { FiEdit, FiSave, FiX, FiTrash2 } from "react-icons/fi";
import { User } from "@/app/(Kambaz)/Account/reducer";
import { useSelector } from "react-redux";

export interface Answer {
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

interface AnswerItemProps {
  answer: Answer;
  currentUserName: string;
  currentUserRole: string;
  onEdit: (answerId: string, content: string) => void;
  onDelete: (answerId: string) => void;
  isEditing?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onSaveEdit?: (answerId: string) => void;
  onCancelEdit?: () => void;
}

export default function AnswerItem({
  answer,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete,
  isEditing,
  editContent,
  onEditContentChange,
  onSaveEdit,
  onCancelEdit
}: AnswerItemProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const isAuthorOrInstructor = 
    answer.author === currentUserName || isFaculty;

  return (
    <div className="border-bottom py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold">{answer.author}</span>
          {answer.authorRole?.toLowerCase() === 'faculty' && (
            <span className="badge bg-warning text-dark">Instructor</span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">{answer.createdAt.toLocaleString()}</small>
          {isAuthorOrInstructor && !isEditing && (
            <div className="d-flex gap-1">
              <button
                onClick={() => onEdit(answer.id, answer.content)}
                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                title="Edit answer"
              >
                <FiEdit size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this answer?")) {
                    onDelete(answer.id);
                  }
                }}
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                title="Delete answer"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => onEditContentChange?.(e.target.value)}
            className="form-control mb-2"
            rows={4}
            autoFocus
          />
          <div className="d-flex gap-2">
            <button
              onClick={() => onSaveEdit?.(answer.id)}
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
        <p className="mb-0">{answer.content}</p>
      )}
    </div>
  );
}
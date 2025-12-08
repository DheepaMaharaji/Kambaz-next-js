import ActionDropdown from "./ActionDropdown"

export interface Answer {
  id: string;
  author: string;
  authorRole: 'student' | 'instructor';
  content: string;
  createdAt: Date;
}

export default function AnswerItem({
  answer,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete
}: {
  answer: Answer;
  currentUserName: string;
  currentUserRole: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isAuthorOrInstructor = 
    answer.author === currentUserName || currentUserRole === 'instructor';

  return (
    <div className="border-bottom py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold">{answer.author}</span>
          {answer.authorRole === 'instructor' && (
            <span className="badge bg-warning text-dark">Instructor</span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">{answer.createdAt.toLocaleString()}</small>
          {isAuthorOrInstructor && (
            <button 
              type="button" 
              onClick={onEdit} 
              className="btn btn-link btn-sm text-primary p-0"
            >
              Edit
            </button>
          )}
          <ActionDropdown
            onEdit={onEdit}
            onDelete={onDelete}
            isAuthorOrInstructor={isAuthorOrInstructor}
          />
        </div>
      </div>

      {/* Content */}
      <p className="mb-0">{answer.content}</p>
    </div>
  );
}

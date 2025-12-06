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
    <div className="ml-8 border-l-2 border-gray-200 pl-4 py-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{reply.author}</span>
          {reply.authorRole === 'instructor' && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
              Instructor
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {reply.createdAt.toLocaleString()}
          </span>
          <ActionDropdown
            onEdit={onEdit}
            onDelete={onDelete}
            isAuthorOrInstructor={isAuthorOrInstructor}
          />
        </div>
      </div>
      <div className="text-sm text-gray-700 mb-2">{reply.content}</div>
      <button
        onClick={onReply}
        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
      >
        <FiMessageSquare className="w-3 h-3" />
        Reply
      </button>
    </div>
  );
}
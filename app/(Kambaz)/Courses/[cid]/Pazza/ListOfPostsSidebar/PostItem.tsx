// interface Post {
//   id: string;
//   title: string;
//   author: "student" | "instructor";
//   content: string;
//   createdAt: Date;
//   type: "note" | "question";
// }
export type Post = {
  _id: string;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: Date;
  type: 'note' | 'question' | 'poll';
  views: number;
  folder?: string[];
  users?: string[];
  to?: 'Entire Class' | 'Individual Students/Instructors';
  studentAnswers: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instructorAnswers: string[];
  readByUserIds: string[];
  isSelected : boolean
};
interface PostItemProps {
  post: Post;
  onClick: () => void;
  isSelected:boolean
}

export default function PostItem({ post, onClick , isSelected}: PostItemProps) {
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${ampm}`;
  };

  const getDayLabel = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return formatTime(date);
    if (diffDays === 1) return formatTime(date);
    if (diffDays <= 7)
      return date.toLocaleDateString("en-US", { weekday: "long" });
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
  <div
    onClick={onClick}
    className={`p-3 border-bottom hover-bg-light ${
      isSelected ? 'bg-primary bg-opacity-10' : ''
    }`}
    style={{ cursor: "pointer" }}
  >
    <div className="d-flex justify-content-between align-items-start mb-1">
      <div className="d-flex align-items-center gap-2 flex-grow-1">
        {(post.authorRole === "instructor" || post.authorRole === "faculty") && (
          <span 
            className="badge small fw-medium"
            style={{
              backgroundColor: "#f5c842",
              color: "#000000",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem"
            }}
          >
            Instructor
          </span>
        )}
        <h3 className="fw-semibold small text-dark m-0">
          {post.title}
        </h3>
      </div>
      <span className="text-muted small ms-2">{getDayLabel(post.createdAt)}</span>
    </div>

    <div className="d-flex align-items-start gap-2">
      <p
        className="small text-secondary m-0"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
      </p>
    </div>
  </div>
);
}

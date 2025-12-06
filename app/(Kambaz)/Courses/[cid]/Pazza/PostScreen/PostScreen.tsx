import { useState } from "react";
import DiscussionItem, { Discussion } from "./DiscussionItem";
import AnswerItem, { Answer } from "./AnswerItem";
import { BsFileText, BsQuestionCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";
import Editor from "./editor";

export interface Post {
  id: string;
  title: string;
  author: string;
  authorRole: 'student' | 'instructor';
  content: string;
  createdAt: Date;
  type: 'note' | 'question';
  views: number;
  folder?: string;
}

interface PostScreenProps {
  post: Post | null;
  currentUserRole: 'student' | 'instructor';
  currentUserName: string;
}

export default function PostScreen({ 
  post, 
  currentUserRole,
  currentUserName 
}: PostScreenProps) {
  const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
  const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  
  const [newStudentAnswer, setNewStudentAnswer] = useState('');
  const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
  const [newDiscussion, setNewDiscussion] = useState('');

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
        Select a post to view details
      </div>
    );
  }

  const isAuthorOrInstructor = 
    post.author === currentUserName || currentUserRole === 'instructor';

  const handleSubmitStudentAnswer = () => {
    if (newStudentAnswer.trim()) {
      const newAnswer: Answer = {
        id: Date.now().toString(),
        author: currentUserName,
        authorRole: 'student',
        content: newStudentAnswer,
        createdAt: new Date()
      };
      setStudentAnswers([...studentAnswers, newAnswer]);
      setNewStudentAnswer('');
    }
  };

  const handleSubmitInstructorAnswer = () => {
    if (newInstructorAnswer.trim()) {
      const newAnswer: Answer = {
        id: Date.now().toString(),
        author: currentUserName,
        authorRole: 'instructor',
        content: newInstructorAnswer,
        createdAt: new Date()
      };
      setInstructorAnswers([...instructorAnswers, newAnswer]);
      setNewInstructorAnswer('');
    }
  };

  const handleSubmitDiscussion = () => {
    if (newDiscussion.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        author: currentUserName,
        authorRole: currentUserRole,
        content: newDiscussion,
        createdAt: new Date(),
        isResolved: false,
        replies: []
      };
      setDiscussions([...discussions, discussion]);
      setNewDiscussion('');
    }
  };

  const handleAddReply = (discussionId: string, replyContent: string) => {
    setDiscussions(discussions.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          replies: [
            ...d.replies,
            {
              id: Date.now().toString(),
              author: currentUserName,
              authorRole: currentUserRole,
              content: replyContent,
              createdAt: new Date()
            }
          ]
        };
      }
      return d;
    }));
  };

  const toggleDiscussionResolved = (discussionId: string) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, isResolved: !d.isResolved } : d
    ));
  };

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
              <span className="text-muted">#{post.id}</span>
              <span className="badge bg-light text-dark">
                {post.views} view{post.views !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {isAuthorOrInstructor && (
                <button className="btn btn-link text-primary d-flex align-items-center gap-1 p-0">
                  <FiEdit />
                  Edit
                </button>
              )}
              <ActionDropdown
                onEdit={() => console.log('Edit post')}
                onDelete={() => console.log('Delete post')}
                isAuthorOrInstructor={isAuthorOrInstructor}
              />
            </div>
          </div>

          <h1 className="h3 mb-2">{post.title}</h1>

          <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
            <span>{post.author}</span>
            {post.authorRole === 'instructor' && (
              <span className="badge bg-warning text-dark">Instructor</span>
            )}
            <span>•</span>
            <span>{post.createdAt.toLocaleString()}</span>
            {post.folder && (
              <>
                <span>•</span>
                <span className="text-primary">{post.folder}</span>
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

              {studentAnswers.length === 0 && currentUserRole === 'student' ? (
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
                      onDelete={() => console.log('Delete answer', answer.id)}
                    />
                  ))}
                  {studentAnswers.length > 0 && currentUserRole === 'student' && (
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
                  currentUserName={currentUserName}
                  currentUserRole={currentUserRole}
                  onEdit={() => console.log('Edit answer', answer.id)}
                  onDelete={() => console.log('Delete answer', answer.id)}
                />
              ))}
              {currentUserRole === 'instructor' && (
                <div className="mt-2">
                  <Editor
                    value={newInstructorAnswer}
                    onChange={setNewInstructorAnswer}
                    onSubmit={handleSubmitInstructorAnswer}
                    placeholder="Add another answer..."
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Follow-up Discussions */}
        <div className="mb-4">
          <h2 className="h5 mb-3">Follow-up Discussion</h2>

          {discussions.map(d => (
            <DiscussionItem
              key={d.id}
              discussion={d}
              currentUserName={currentUserName}
              currentUserRole={currentUserRole}
              onToggleResolved={() => toggleDiscussionResolved(d.id)}
              onEdit={() => console.log('Edit discussion', d.id)}
              onDelete={() => console.log('Delete discussion', d.id)}
              onAddReply={(content) => handleAddReply(d.id, content)}
            />
          ))}

          <div className="mt-3">
            <textarea
              value={newDiscussion}
              onChange={e => setNewDiscussion(e.target.value)}
              placeholder="Start a new follow-up discussion..."
              className="form-control mb-2"
              rows={4}
            />
            <button
              className="btn btn-primary"
              onClick={handleSubmitDiscussion}
            >
              Post Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

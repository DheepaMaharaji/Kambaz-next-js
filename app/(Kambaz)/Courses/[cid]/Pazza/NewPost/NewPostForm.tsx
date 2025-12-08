
'use client';
 
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
 
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaQuoteRight,
  FaHeading,
  FaChevronLeft,
  FaCog
} from 'react-icons/fa';
import { Post } from '../ListOfPostsSidebar/PostItem';
import { User } from '@/app/(Kambaz)/Account/reducer';
import { useParams } from 'next/navigation';
import * as client from "../../../client"
import { useSelector } from 'react-redux';
 import { RootState } from "../../../../store";
// --- Types ---
interface NewPostFormProps {
  onCancel?: () => void;
  onPostCreated?: (post: Post) => void;
  onManageFolders?: () => void;
  folders?: string[];
}
 
const FormRow = ({ label, children, required = false, alignTop = false }: { label: string, children: React.ReactNode, required?: boolean, alignTop?: boolean }) => (
  <div className={`d-flex mb-4 ${alignTop ? 'align-items-start' : 'align-items-center'}`}>
    <div className="flex-shrink-0" style={{ width: 140, paddingTop: alignTop ? 8 : 0 }}>
      <span className="fw-bold text-secondary" style={{ fontSize: '14px' }}>{label}</span>
      {required && <span className="text-danger ms-1">*</span>}
    </div>
    <div className="flex-grow-1">{children}</div>
  </div>
);
 
export default function NewPostForm({ 
  onCancel, 
  onPostCreated, 
  onManageFolders,
  folders = []
}: NewPostFormProps) {
  const {cid} = useParams()
  const courseId = cid as string
  const [postType, setPostType] = useState<Post['type']>('question');
  const [postTo, setPostTo] = useState<Post['to']>('Entire Class');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === 'faculty';
  // Use folders from props, filter out "All"
  const allFolders = folders.filter(f => f !== 'All');
  
  // Initialize with first folder if available
  const [selectedFolders, setSelectedFolders] = useState<string[]>(
    allFolders.length > 0 ? [allFolders[0]] : []
  );
  
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [details, setDetails] = useState('');
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);  
  const [loadingUsers, setLoadingUsers] = useState(true);
 
  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        setLoadingUsers(true);
        const enrollments = await client.findUsersForCourse(courseId);
        // Filter out any invalid users (null, undefined, or missing _id)
        const validUsers = Array.isArray(enrollments) 
          ? enrollments.filter(user => user && user._id) 
          : [];
        setEnrolledUsers(validUsers);
      } catch (error) {
        console.error('Error fetching enrolled users:', error);
        setEnrolledUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };
    
    if (courseId) {
      fetchEnrolledUsers();
    }
  }, [courseId]);
  
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: details,
    onUpdate: ({ editor }) => setDetails(editor.getHTML()),
    editorProps: {
      attributes: {
        style: 'min-height: 250px; padding: 12px; outline: none; color: #333;',
      },
    },
    immediatelyRender: false,
  });
  
  useEffect(() => {
    if (editor && details !== editor.getHTML()) {
      editor.commands.setContent(details, { emitUpdate: false });
    }
  }, [details, editor]);
 
  const toggleUser = (u: string) => {
    setSelectedUsers((s) => (s.includes(u) ? s.filter((x) => x !== u) : [...s, u]));
  };
 
  const toggleFolder = (f: string) => {
    setSelectedFolders((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
  };
 
  const validate = () => {
    const e: Record<string, string> = {};
    if (!summary.trim()) e.summary = 'Summary is required.';
    else if (summary.length > 100) e.summary = 'Summary must be 100 characters or less.';
 
    const plainText = details.replace(/<[^>]+>/g, '').trim();
    if (!plainText) e.details = 'Details are required.';
 
    if (!selectedFolders || selectedFolders.length === 0) e.folders = 'Select at least one folder.';
    if (postTo === 'Individual Students/Instructors' && selectedUsers.length === 0)
      e.users = 'Select at least one user.';
 
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const handlePost = () => {
    if (!validate()) return;
    const newPost: Post = {
      _id: Date.now().toString(),
      title: summary,
      author: "Current User", // replace with dynamic user
      authorRole: "student", // replace with dynamic role
      content: details,
      createdAt: new Date(),
      type: postType.toLowerCase() as 'note' | 'question' | 'poll',
      views: 0,
      folder: selectedFolders,
      users: selectedUsers,
      to: postTo,
      studentAnswers: [],
      instructorAnswers: [],
      readByUserIds: [],
      isSelected: false
    };
    
    setSummary('');
    setDetails('');
    setSelectedFolders(allFolders.length > 0 ? [allFolders[0]] : []);
    setSelectedUsers([]);
    setErrors({});
    editor?.commands.clearContent();
    
    if (onPostCreated) {
        onPostCreated(newPost);
    } else {
        alert("Post created! (Check console for object)");
        console.log(newPost);
    }
  };
 
  const handleBack = () => {
    if (onCancel) {
        onCancel();
    } else {
        console.log("Back button clicked - pass an onCancel prop to handle routing");
    }
  }
  
  const handleManageFolders = () => {
    if (onManageFolders) {
      onManageFolders();
    } else {
      console.log("Manage folders clicked - pass an onManageFolders prop to handle routing");
    }
  }
 
  return (
    <div className="container" style={{ maxWidth: 960, fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* HEADER WITH BACK BUTTON */}
      <div className="d-flex align-items-center border-bottom border-primary border-2 pb-2 mb-4 mt-3">
        <button
            onClick={handleBack}
            className="btn btn-link text-primary text-decoration-none d-flex align-items-center fw-semibold p-0 pe-3 me-3 border-end"
            style={{ fontSize: 16 }}
        >
            <FaChevronLeft className="me-1" style={{ fontSize: 14 }} />
            Back
        </button>
 
        <h2 className="m-0 text-dark" style={{ fontSize: 24 }}>New Post</h2>
      </div>
 
      <div>
        
        {/* Post Type */}
        <FormRow label="Post Type" required>
          <div className="d-flex gap-2">
            {(['question', 'note', 'poll'] as const).map((t) => {
              const isActive = postType === t;
              return (
                <button
                  key={t}
                  onClick={() => setPostType(t)}
                  className={`btn fw-semibold px-4 py-2 ${
                    isActive
                      ? 'btn-primary shadow-sm'
                      : 'btn-outline-secondary'
                  }`}
                  style={{
                    transition: 'all 0.2s'
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </FormRow>
 
        {/* Post To */}
        <FormRow label="Post to" required alignTop>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="entireClass"
                checked={postTo === 'Entire Class'}
                onChange={() => setPostTo('Entire Class')}
              />
              <label className="form-check-label" htmlFor="entireClass" style={{ cursor: 'pointer' }}>
                Entire Class
              </label>
            </div>
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="individual"
                checked={postTo === 'Individual Students/Instructors'}
                onChange={() => setPostTo('Individual Students/Instructors')}
              />
              <label className="form-check-label" htmlFor="individual" style={{ cursor: 'pointer' }}>
                Individual Students / Instructors
              </label>
            </div>
 
            {postTo === 'Individual Students/Instructors' && (   
              <div className="mt-2 p-3 bg-light border rounded">    
                <div className="text-muted fw-bold mb-2 small">
                  SELECT RECIPIENTS:
                </div>    
                
                {loadingUsers ? (
                  <div className="text-muted small">Loading users...</div>
                ) : enrolledUsers.length === 0 ? (
                  <div className="text-muted small">No users found in this course.</div>
                ) : (
                  <div className="d-flex flex-wrap gap-2">        
                    {enrolledUsers
                      .filter(enrollment => enrollment && enrollment._id)
                      .map(enrollment => (          
                        <button            
                          key={enrollment._id}            
                          onClick={() => toggleUser(enrollment._id)}            
                          className={`btn btn-sm ${
                            selectedUsers.includes(enrollment._id)
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                        >           
                          <small>              
                            {enrollment.firstName || 'Unknown'} {enrollment.lastName || 'User'}            
                          </small>   
                        </button>         
                      ))}     
                  </div>
                )}
                
                {errors.users && <div className="text-danger mt-2 small">{errors.users}</div>}
              </div>
            )}
          </div>
        </FormRow>

        {/* Folders */}
        <FormRow label="Select Folder(s)" required alignTop>
          <div className="bg-light border rounded p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted fw-bold small">FOLDERS:</div>
              {isFaculty && (
              <button
                onClick={handleManageFolders}
                className="btn btn-sm btn-link text-primary d-flex align-items-center p-0 text-decoration-none small"
              >
                <FaCog className="me-1" size={12} />
                Manage and reorder folders
              </button>
            )}
            </div>
            
            <div className="d-flex flex-wrap gap-2">
              {allFolders.map(f => {
                const isSelected = selectedFolders.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFolder(f)}
                    className={`btn btn-sm fw-semibold rounded-pill ${
                      isSelected
                        ? 'btn-primary bg-primary bg-opacity-10 text-primary border-primary'
                        : 'btn-light border-0'
                    }`}
                  >
                    <small>{f}</small>
                  </button>
                )
              })}
            </div>
            {errors.folders && <div className="text-danger mt-2 small">{errors.folders}</div>}
          </div>
        </FormRow>
 
        {/* Summary */}
        <FormRow label="Summary" required>
          <div>
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
              className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
              placeholder="Enter a one-line summary..."
            />
            {errors.summary && <div className="invalid-feedback d-block">{errors.summary}</div>}
          </div>
        </FormRow>
 
        {/* Details (Editor) */}
        <FormRow label="Details" alignTop>
          <div className={`border rounded ${errors.details ? 'border-danger' : ''}`}>
            {/* Toolbar */}
            <div className="d-flex flex-wrap gap-1 p-2 bg-light border-bottom">
              {[
                { icon: FaBold, action: () => editor?.chain().focus().toggleBold().run(), active: 'bold', title: 'Bold' },
                { icon: FaItalic, action: () => editor?.chain().focus().toggleItalic().run(), active: 'italic', title: 'Italic' },
                { icon: FaUnderline, action: () => editor?.chain().focus().toggleUnderline().run(), active: 'underline', title: 'Underline' },
                { separator: true },
                { icon: FaListUl, action: () => editor?.chain().focus().toggleBulletList().run(), active: 'bulletList', title: 'Bullet List' },
                { icon: FaListOl, action: () => editor?.chain().focus().toggleOrderedList().run(), active: 'orderedList', title: 'Ordered List' },
                { separator: true },
                { icon: FaHeading, action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(), active: 'heading', level: 1, label: 'H1' },
                { icon: FaHeading, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading', level: 2, label: 'H2' },
                { icon: FaQuoteRight, action: () => editor?.chain().focus().toggleBlockquote().run(), active: 'blockquote', title: 'Quote' },
                { icon: FaLink, action: () => {
                    const url = prompt('Enter URL');
                    if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }, active: 'link', title: 'Link' },
              ].map((btn, i) => {
                if (btn.separator) return <div key={i} className="border-start mx-1" />;
                
                const Icon = btn.icon!;
                const active = btn.level
                  ? editor?.isActive(btn.active!, { level: btn.level })
                  : editor?.isActive(btn.active!);
                  
                return (
                  <button
                    key={i}
                    onClick={btn.action}
                    title={btn.title}
                    className={`btn btn-sm d-flex align-items-center justify-content-center ${
                      active ? 'btn-light active' : 'btn-link text-secondary'
                    }`}
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      border: active ? '1px solid #dee2e6' : '1px solid transparent',
                      backgroundColor: active ? '#d1e3f3' : 'transparent'
                    }}
                  >
                    <Icon size={12} />
                    {btn.label && <span className="fw-bold ms-1" style={{ fontSize: 9 }}>{btn.label}</span>}
                  </button>
                );
              })}
            </div>
 
            <EditorContent editor={editor} style={{ minHeight: 250 }} />
          </div>
          {errors.details && <div className="text-danger mt-1" style={{ fontSize: 12 }}>{errors.details}</div>}
        </FormRow>
 
        {/* Action Bar */}
        <div className="mt-4 pt-3 border-top d-flex gap-3">
          <button
            onClick={handlePost}
            className="btn btn-primary fw-bold shadow-sm"
          >
            Post My {postType === 'note' ? 'note' : 'question'}
          </button>
          
          <button
            onClick={handleBack}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        </div>
 
      </div>
    </div>
  );
}
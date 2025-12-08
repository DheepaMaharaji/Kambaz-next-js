//import { Module } from "@reduxjs/toolkit/query";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { Post } from "./[cid]/Pazza/ListOfPostsSidebar/PostItem";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const POSTS_API = `${HTTP_SERVER}/api/posts`;

interface Course {
  _id?: string;
  name: string;
  description: string;
}

interface Module {
  _id?: string;
  name: string;
  course?: string;
}
interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: number;
}
interface User {
  _id: string;
  username: string;
  password: string;
  // Add other fields as needed, e.g. email?: string;
} 

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
  return data;
};

export const findMyCourses = async (user: User) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
  return data;
};


export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// export const findModulesForCourse = async (courseId: string) => {
//   const response = await axiosWithCredentials
//     .get(`${COURSES_API}/${courseId}/modules`);
//   return response.data;
// };

// export const createModuleForCourse = async (courseId: string, module: Module) => {
//   const response = await axiosWithCredentials.post(
//     `${COURSES_API}/${courseId}/modules`,
//     module
//   );
//   return response.data;
// };




// export const updateModule = async (courseId: string,module: Module) => {
//   const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/${MODULES_API}/${module._id}`, module);
//   return data;
// };
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: Module) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};
export const fetchAllAssignments = async (courseId : ParamValue) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const addAssignmentToCourse = async (courseId: ParamValue, assignment: Assignment) => {
  const { data } = await axiosWithCredentials.post(
    `${ASSIGNMENTS_API}/${courseId}/assignments`,
    assignment
  );
  return data;
}

export const updateAssignmentInCourse = async (assignment: Assignment) => {
    const { data } = await axiosWithCredentials.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
    );
    return data;
}

export const deleteAssignmentFromCourse = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${ASSIGNMENTS_API}/${assignmentId}`
    );
    return data;
}


export const enroll = async (user:User,courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${user._id}/courses/${courseId}`
  );
  return data;
}

export const unenroll = async (user:User,courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${user._id}/courses/${courseId}`
  );
  return data;
}

export const findEnrollmentsForUser = async (user: User) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${user._id}/courses`
  );
  return data;
}

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

// export const deleteModule = async (courseId: string, moduleId: string) => {
//  const response = await axios.delete(
//    `${COURSES_API}/${courseId}/modules/${moduleId}`
//  );
//  return response.data;
// };

export const findPostsByCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/posts`);
  return data;
};

// Get posts visible to a specific user
export const findVisiblePostsForUser = async (
  courseId: string,
  userId: string,
  userRole: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/visible`,
    { params: { userId, userRole } }
  );
  return data;
};

// Get posts with filters
export const getPostsWithFilters = async (filters: {
  courseId: string;
  userId?: string;
  userRole?: string;
  type?: string;
  folderIds?: string[];
  authorId?: string;
  searchQuery?: string;
  limit?: number;
  skip?: number;
}) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${filters.courseId}/posts/filter`,
    {
      params: {
        userId: filters.userId,
        userRole: filters.userRole,
        type: filters.type,
        folderIds: filters.folderIds?.join(","),
        authorId: filters.authorId,
        searchQuery: filters.searchQuery,
        limit: filters.limit,
        skip: filters.skip,
      },
    }
  );
  return data;
};

// Get posts by type
export const findPostsByType = async (courseId: string, type: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/type/${type}`
  );
  return data;
};

// Get posts by folder
export const findPostsByFolder = async (courseId: string, folderIds: string[]) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/folder`,
    { params: { folderIds: folderIds.join(",") } }
  );
  return data;
};

// Get posts by author
export const findPostsByAuthor = async (courseId: string, authorId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/author/${authorId}`
  );
  return data;
};

// Search posts
export const searchPosts = async (courseId: string, searchQuery: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/search`,
    { params: { q: searchQuery } }
  );
  return data;
};

// Get post count
export const getPostCount = async (
  courseId: string,
  filters?: {
    type?: string;
    folderIds?: string[];
  }
) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/count`,
    {
      params: {
        type: filters?.type,
        folderIds: filters?.folderIds?.join(","),
      },
    }
  );
  return data;
};

// Get a single post by ID
export const findPostById = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
  return data;
};

// Create a new post
export const createPost = async (courseId: string, post: Post) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/posts`,
    post
  );
  return data;
};

// Update a post
export const updatePost = async (postId: string, post: Post) => {
  const { data } = await axiosWithCredentials.put(
    `${POSTS_API}/${postId}`,
    post
  );
  return data;
};

// Delete a post
export const deletePost = async (postId: string) => {
  const { data } = await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
  return data;
};

// Increment view count
export const incrementViews = async (postId: string, userId: string) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/view`, {
    userId,
  });
  return data;
};

// Add an answer to a post
export const addAnswerToPost = async (
  postId: string,
  answerId: string,
  isInstructor: boolean
) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/answers`, {
    answerId,
    isInstructor,
  });
  return data;
};

// Remove an answer from a post
export const removeAnswerFromPost = async (
  postId: string,
  answerId: string,
  isInstructor: boolean
) => {
  const { data } = await axiosWithCredentials.delete(
    `${POSTS_API}/${postId}/answers/${answerId}`,
    { params: { isInstructor: isInstructor.toString() } }
  );
  return data;
};


export interface Folder {
  _id: string;
  name: string;
  courseId: string;
  createdBy: string;
  createdAt: string;
  order: number;
}
 
// Get all folders for a course
export const getFoldersForCourse = async (courseId: string): Promise<Folder[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/folders`);
  return response.data;
};
 
// Create a new folder
export const createFolder = async (courseId: string, name: string, order?: number): Promise<Folder> => {
  
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/folders`, {
    name,
    order,
  });
  return response.data;
};
 
// Update a folder
export const updateFolder = async (folderId: string, name: string, order?: number): Promise<Folder> => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/api/folders/${folderId}`, {
    name,
    order,
  });
  return response.data;
};
 
// Delete a single folder
export const deleteFolder = async (folderId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${HTTP_SERVER}/api/folders/${folderId}`);
};
 
// Delete multiple folders
export const deleteFolders = async (courseId: string, folderIds: string[]): Promise<void> => {
  await axiosWithCredentials.post(`${COURSES_API}/${courseId}/folders/delete`, {
    folderIds,
  });
};

export interface Answer {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorType: 'student' | 'instructor';
  text: string;
  createdAt: string;
  updatedAt: string;
}
 
// Get all answers for a post
export const getAnswersForPost = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/posts/${postId}/answers`);
  return response.data;
};
 
// Get student answers for a post
export const getStudentAnswers = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/posts/${postId}/answers/student`);
  return response.data;
};
 
// Get instructor answers for a post
export const getInstructorAnswers = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/posts/${postId}/answers/instructor`);
  return response.data;
};
 
// Create an answer
export const createAnswer = async (
  postId: string,
  text: string,
  authorType: 'student' | 'instructor',
  authorId : string,
  authorName : string
): Promise<Answer> => {
  const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/posts/${postId}/ans/answers`, {
    text,
    authorType,
    authorId,
    authorName
  });
  return response.data;
};
 
// Update an answer
export const updateAnswer = async (answerId: string, text: string): Promise<Answer> => {
  const response = await axiosWithCredentials.put(`${HTTP_SERVER}/api/answers/${answerId}`, {
    text,
  });
  return response.data;
};
 
// Delete an answer
export const deleteAnswer = async (answerId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${HTTP_SERVER}/api/answers/${answerId}`);
};

export interface Discussion {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  isResolved: boolean;
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
}

// Get all discussions for a post
export const getDiscussionsForPost = async (postId: string): Promise<Discussion[]> => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/posts/${postId}/discussions`);
  return data;
};

// Get a single discussion
export const getDiscussion = async (discussionId: string): Promise<Discussion> => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/discussions/${discussionId}`);
  return data;
};

// Create a new discussion
export const createDiscussion = async (
  postId: string,
  content: string,
  authorId: string,
  authorName: string,
  authorRole: string
): Promise<Discussion> => {
  const { data } = await axiosWithCredentials.post(`${HTTP_SERVER}/api/posts/${postId}/discussions`, {
    content,
    authorId,
    authorName,
    authorRole,
  });
  return data;
};

// Update a discussion
export const updateDiscussion = async (
  discussionId: string,
  content: string
): Promise<Discussion> => {
  const { data } = await axiosWithCredentials.put(`${HTTP_SERVER}/api/discussions/${discussionId}`, {
    content,
  });
  return data;
};

// Toggle discussion resolved status
export const toggleDiscussionResolved = async (discussionId: string): Promise<Discussion> => {
  const { data } = await axiosWithCredentials.patch(`${HTTP_SERVER}/api/discussions/${discussionId}/resolve`);
  return data;
};

// Delete a discussion
export const deleteDiscussion = async (discussionId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${HTTP_SERVER}/api/discussions/${discussionId}`);
};


// Add a discussion to a post
export const addDiscussionToPost = async (
  postId: string,
  discussionId: string
) => {
  const { data } = await axiosWithCredentials.post(
    `${POSTS_API}/${postId}/discussions/${discussionId}`
  );
  return data;
};

// Remove a discussion from a post
export const removeDiscussionFromPost = async (
  postId: string,
  discussionId: string
) => {
  const { data } = await axiosWithCredentials.delete(
    `${POSTS_API}/${postId}/discussions/${discussionId}`
  );
  return data;
};

// ============================================
// REPLIES
// ============================================

export interface Reply {
  _id: string;
  discussionId: string;
  parentReplyId: string | null;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Get all replies for a discussion
export const getRepliesForDiscussion = async (discussionId: string): Promise<Reply[]> => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/discussions/${discussionId}/replies`);
  return data;
};

// Get a single reply
export const getReply = async (replyId: string): Promise<Reply> => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/replies/${replyId}`);
  return data;
};

// Create a new reply
export const createReply = async (
  discussionId: string,
  content: string,
  authorId: string,
  authorName: string,
  authorRole: string,
  parentReplyId?: string | null
): Promise<Reply> => {
  const { data } = await axiosWithCredentials.post(`${HTTP_SERVER}/api/discussions/${discussionId}/replies`, {
    content,
    authorId,
    authorName,
    authorRole,
    parentReplyId: parentReplyId || null,
  });
  return data;
};

// Update a reply
export const updateReply = async (
  replyId: string,
  content: string
): Promise<Reply> => {
  const { data } = await axiosWithCredentials.put(`${HTTP_SERVER}/api/replies/${replyId}`, {
    content,
  });
  return data;
};

// Delete a reply
export const deleteReply = async (replyId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${HTTP_SERVER}/api/replies/${replyId}`);
};

export const findPostsByFolderName = async (
  courseId: string,
  folderName: string,
  userId: string,
  userRole: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/posts/by-folder`,  
    { 
      params: { 
        folderName, 
        userId, 
        userRole 
      } 
    }
  );
  return data;
};
export const findUsersForCourse = async (courseId: string): Promise<User[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};
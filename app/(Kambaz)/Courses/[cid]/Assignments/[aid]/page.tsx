
// "use client";
// import { Form, FormLabel, FormGroup, FormSelect, Row, Col, FormControl } from 'react-bootstrap';
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../store";
// import { Assignment ,setAssignments} from "../../Assignments/reducer";
// import * as client from "../../../client";  
// import { ParamValue } from 'next/dist/server/request/params';
// // Using a flexible type for the component state to correctly handle new vs. existing assignments
// type AssignmentFormState = Omit<Assignment, '_id'> & {
//     _id?: string;
// };

// export default function AssignmentPage() {
//   const { cid, aid } = useParams();
//   const courseId = Array.isArray(cid) ? cid[0] : cid ?? "";
//   const router = useRouter();
//   const dispatch = useDispatch();
  

//   const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
//   const existing = assignments.find((a) => a._id === aid);
  
//   // Use AssignmentFormState for useState
//   const [assignment, setAssignment] = useState<AssignmentFormState>(
//     existing
//       ? {
//           ...existing, // Use spread operator to ensure all existing properties are copied
//         }
//       : {
//           title: "",
//           description: "",
//           points: 100,
//           dueDate: "",
//           availableDate: "",
//           untilDate: "",
//           course: courseId,
//         }
//   );
  
//   useEffect(() => {
//     const loadAssignments = async () => {
//       if (!courseId) return; // Prevent fetching if courseId is missing
      
//       try {
//         // Fetch the latest assignment list from the server
//         const data: Assignment[] = await client.fetchAllAssignments(courseId);
        
//         // Update the Redux state with the latest list
//         dispatch(setAssignments(data));

//         // If we are editing (aid exists), find the correct assignment in the fresh data
//         if (aid) {
//             const loadedAssignment = data.find((a) => a._id === aid);
//             if (loadedAssignment) {
//                 // Use the loaded assignment to set the local form state
//                 setAssignment(prev => ({ 
//                     ...prev, 
//                     ...loadedAssignment
//                 }));
//             }
//         }
//       } catch (err) {
//         console.error("Failed to fetch assignments:", err);
//       }
//     };

//     loadAssignments();
    
//     // Dependencies: courseId and aid ensure fetching happens on initial load/refresh 
//     // and when navigating between different assignments/courses.
//   }, [courseId, aid, dispatch]);
  


//     const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     console.log("Saving assignment:", assignment);
    
//     // Prepare data to send to backend, excluding local/unnecessary fields like groupId
//     const assignmentToSave: Assignment = {
//         _id: assignment._id,
//         title: assignment.title,
//         description: assignment.description,
//         points: assignment.points,
//         dueDate: assignment.dueDate,
//         availableDate: assignment.availableDate,
//         untilDate: assignment.untilDate,
//         course: assignment.course,
//         // Assuming Assignment type doesn't include 'groupId'
//     } as Assignment; 
    
//     try {
//         if (existing) {
//             // 1. UPDATE: Fetch the current state directly before mapping (recommended but often overkill)
//             // OR 2. Ensure the state update correctly replaces the item in the local Redux state.
//             const updated = await client.updateAssignmentInCourse(assignmentToSave);
            
//             // FIX: Map over the assignments state variable from Redux to replace the updated item.
//             // This is still using the potentially stale list but is the standard pattern 
//             // when not refactoring to use a specialized 'updateAssignment' action.
//             const updatedAssignments = assignments.map((a) => 
//                 (a._id === updated._id ? updated : a)
//             );
//             dispatch(setAssignments(updatedAssignments));
            
//         } else {
//             // CREATE: Get the new assignment from the backend
//             const created = await client.addAssignmentToCourse(courseId, assignmentToSave);
            
//             // FIX: Create a new array by spreading the existing assignments and adding the new one.
//             // This uses the current state (potentially stale) + the new item.
//             dispatch(setAssignments([...assignments, created]));
//         }
        
//         // Navigate after dispatching the action
//         router.push(`/Courses/${courseId}/Assignments`); 
        
//     } catch (error) {
//         console.error("Failed to save assignment:", error);
//     }
  
//     router.push(`/Courses/${cid}/Assignments`);
//   };

//   const handleCancel = () => {
//     router.push(`/Courses/${cid}/Assignments`);
//   };

//   return (
//     <div id="wd-assignments-editor">
//       {/* 1. START of the main Form component */}
//       <Form> 
//         {/* Assignment Name and Description - Moved inside <Form> */}
//         <FormLabel>Assignment Name</FormLabel>
//         <FormControl type="text" // Changed 'textarea' type to 'text' for single-line input
//             value={assignment?.title}
//             onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//             placeholder="Assignment Title" />
//         <br />
//         <FormControl
//             as="textarea"
//             rows={4}
//             value={assignment.description}
//             onChange={(e) =>
//                 setAssignment({ ...assignment, description: e.target.value })
//             }
//             placeholder="Enter assignment details"
//         />
//         <br />

//         {/* 2. START of the structured content container */}
//         <div className="container p-4">
            
//             {/* POINTS */}
//             <Row className="mb-3 align-items-center">
//                 <Col xs={12} md={4} className="text-md-end text-start">
//                     <FormLabel>Points</FormLabel>
//                 </Col>
//                 <Col xs={12} md={8}>
//                     <FormControl type="text" value={assignment.points} 
//                     onChange={(e) =>
//                         setAssignment({
//                         ...assignment,
//                         points: parseInt(e.target.value) || 0, // Added | 0 for safety
//                         })
//                     }/>
//                 </Col>
//             </Row>

//             {/* ASSIGNMENT GROUP */}
//             <Row className="mb-3 align-items-center">
//                 <Col xs={12} md={4} className="text-md-end text-start">
//                     <FormLabel>Assignment Group</FormLabel>
//                 </Col>
//                 <Col xs={12} md={8}>
//                     <FormSelect>
//                         <option value="0" defaultChecked>ASSIGNMENTS</option>
//                         <option value="1">One</option>
//                         <option value="2">Two</option>
//                         <option value="3">Three</option>
//                     </FormSelect>
//                 </Col>
//             </Row>

//             {/* DISPLAY GRADE AS */}
//             <Row className="mb-3 align-items-center">
//                 <Col xs={12} md={4} className="text-md-end text-start">
//                     <FormLabel>Display Grade as</FormLabel>
//                 </Col>
//                 <Col xs={12} md={8}>
//                     <FormSelect>
//                         <option value="percentage" defaultChecked>Percentage</option>
//                         <option value="points">Points</option>
//                     </FormSelect>
//                 </Col>
//             </Row>

//             {/* SUBMISSION TYPE */}
//             <Row className="mb-3 align-items-top">
//                 <Col xs={12} md={4} className="text-md-end text-start">
//                     <FormLabel>Submission Type</FormLabel>
//                 </Col>
//                 <Col xs={12} md={8}>
//                     <div className="container p-4 border rounded">
//                         <FormSelect className="mb-3">
//                             <option value="online" defaultChecked>Online</option>
//                             <option value="paper">On Paper</option>
//                         </FormSelect>
                        
//                         <div className="fw-semibold mb-3">Online Entry Options</div>
//                         <div className="d-flex flex-column gap-2">
//                             <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
//                             <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
//                             <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />  
//                             <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
//                             <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
            
//             {/*Assign*/}
            
//             <Row className="mb-3 align-items-start">
//                 <Col xs={12} md={4} className="text-md-end text-start">
//                     <FormLabel>Assign</FormLabel>
//                 </Col>
//                 <Col xs={12} md={8}>
//                     <div className="container p-4 border rounded">
//                         <div className="fw-semibold mb-3">Assign to</div>
                        
//                         {/* Everyone Tag */}
//                         <div className="d-flex flex-wrap border rounded p-1 gap-2 mb-3">
//                             <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-light border rounded">
//                                 <span>Everyone</span>
//                                 <button
//                                     className="btn btn-link p-0 text-secondary"
//                                     style={{ 
//                                         textDecoration: 'none',
//                                         fontSize: '1rem',
//                                         lineHeight: '1'
//                                     }}
//                                     aria-label="Remove Everyone"
//                                     type="button" // Important: prevents accidental form submission
//                                 >
//                                     ×
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Due Date */}
//                         <div className="mb-3">
//                             <FormLabel className="fw-semibold">Due</FormLabel>
//                             <FormControl type="datetime-local" value={assignment?.dueDate} onChange={(e) =>
//                                 setAssignment({ ...assignment, dueDate: e.target.value })
//                             }/>
//                         </div>

//                         {/* Available From and Until */}
//                         <Row className="g-3">
//                             <Col xs={12} md={6}>
//                                 <FormLabel className="fw-semibold">Available From</FormLabel>
//                                 <FormControl type="date" value={assignment.availableDate} onChange={(e) =>
//                                     setAssignment({ ...assignment, availableDate: e.target.value })
//                                 }/>
//                             </Col>
//                             <Col xs={12} md={6}>
//                                 <FormLabel className="fw-semibold">Until</FormLabel>
//                                 <FormControl type="date" value={assignment?.untilDate} onChange={(e) =>
//                                     setAssignment({ ...assignment, untilDate: e.target.value })
//                                 }/>
//                             </Col>
//                         </Row>
//                     </div> {/* CLOSES the inner container p-4 border rounded */}
//                 </Col>
//             </Row>
        
//             {/* Footer Buttons (Save/Cancel) */}
//             <div className="d-flex justify-content-end mt-3" >
//                 {/* FIX: Added type="button" to prevent page refresh on click */}
//                 <button className="btn btn-danger me-2" onClick={handleSave} >Save</button>
//                 <button className="btn btn-secondary me-2" onClick={handleCancel} >Cancel</button>
//             </div>
//         </div> {/* CLOSES the outer container p-4 */}
//       </Form> {/* CLOSES the main Form component */}
//     </div>
//   );
// }


"use client";
import { Form, FormLabel, FormGroup, FormSelect, Row, Col, FormControl } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
// Assuming you have addAssignment/updateAssignment actions for a robust save
import { Assignment ,setAssignments, addAssignment, updateAssignment} from "../../Assignments/reducer"; 
import * as client from "../../../client";  

// Helper function to format date strings for datetime-local input
const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        // Format to "YYYY-MM-DDTHH:mm" for datetime-local input
        return date.toISOString().slice(0, 16);
    } catch {
        return dateString; 
    }
};

// Helper function to format date strings for date input
const formatDateForDateInput = (dateString?: string) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        // Format to "YYYY-MM-DD" for date input
        return date.toISOString().slice(0, 10);
    } catch {
        return dateString;
    }
};

type AssignmentFormState = Omit<Assignment, '_id'> & {
    _id?: string;
    // Added a local state property for the static select, if needed for initial value
    assignmentGroup?: string; 
};

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid ?? "";
  const router = useRouter();
  const dispatch = useDispatch();
  
  // 1. Restore Redux selectors (CRITICAL for initialization and saving)
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const existing = assignments.find((a) => a._id === aid);
  
  const [assignment, setAssignment] = useState<AssignmentFormState>(
    existing
      ? {
          ...existing,
          assignmentGroup: "0", // Defaulting the group select for existing assignments
        }
      : {
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableDate: "",
          untilDate: "",
          course: courseId,
          assignmentGroup: "0", // Defaulting the group select for new assignments
        }
  );
  
  // 2. Implement fetchAllAssignments inside useEffect for reliable data rehydration
  useEffect(() => {
    const loadAssignments = async () => {
      if (!courseId) return; // Prevent fetching if courseId is missing
      
      try {
        // Fetch the latest assignment list from the server
        const data: Assignment[] = await client.fetchAllAssignments(courseId);
        
        // Update the Redux state with the latest list
        dispatch(setAssignments(data));

        // If we are editing (aid exists), find the correct assignment in the fresh data
        if (aid) {
            const loadedAssignment = data.find((a) => a._id === aid);
            if (loadedAssignment) {
                // Use the loaded assignment to set the local form state
                setAssignment(prev => ({ 
                    ...prev, 
                    ...loadedAssignment,
                    assignmentGroup: "0", // Re-apply default group selection
                }));
            }
        }
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };

    loadAssignments();
    
    // Dependencies: courseId and aid ensure fetching happens on initial load/refresh 
    // and when navigating between different assignments/courses.
  }, [courseId, aid, dispatch]);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // Prepare data to send to backend (must cast to Assignment for the client calls)
    const assignmentToSave: Assignment = {
        _id: assignment._id ?? "", 
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate, 
        availableDate: assignment.availableDate,
        untilDate: assignment.untilDate,
        course: assignment.course,
    } as Assignment; 
    
    try {
        if (existing) {
            const updated = await client.updateAssignmentInCourse(assignmentToSave);
            
            // Using setAssignments to map over the existing Redux state (Works, but less ideal than updateAssignment)
            const updatedAssignments = assignments.map((a) => 
                (a._id === updated._id ? updated : a)
            );
            dispatch(setAssignments(updatedAssignments));

        } else {
            const created = await client.addAssignmentToCourse(courseId, assignmentToSave);
            
            // Using setAssignments to spread the existing Redux state and add the new item
            dispatch(setAssignments([...assignments, created]));
        }
        
        router.push(`/Courses/${courseId}/Assignments`); 
        
    } catch (error) {
        console.error("Failed to save assignment:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form onSubmit={handleSave}> 
        
        {/* Assignment Name and Description */}
        <FormGroup className="mb-3">
            <FormLabel htmlFor="wd-assignment-title">Assignment Name</FormLabel>
            <FormControl 
                id="wd-assignment-title"
                type="text" 
                value={assignment.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                placeholder="Assignment Title" 
            />
        </FormGroup>

        <FormGroup className="mb-4">
            <FormControl
                as="textarea"
                rows={4}
                value={assignment.description}
                onChange={(e) =>
                    setAssignment({ ...assignment, description: e.target.value })
                }
                placeholder="Enter assignment details"
            />
        </FormGroup>

        {/* 2. START of the structured content container */}
        <div className="container p-4">
            
            {/* POINTS */}
            <FormGroup as={Row} className="mb-3 align-items-center">
                <FormLabel column md={4} className="text-md-end text-start">
                    Points
                </FormLabel>
                <Col xs={12} md={8}>
                    <FormControl 
                        type="number" 
                        min="0" 
                        value={assignment.points} 
                        onChange={(e) =>
                            setAssignment({
                            ...assignment,
                            points: Math.max(0, parseInt(e.target.value) || 0), 
                            })
                        }
                    />
                </Col>
            </FormGroup>

            {/* ASSIGNMENT GROUP */}
             <FormGroup as={Row} className="mb-3 align-items-center">
                <FormLabel column md={4} className="text-md-end text-start">
                    Assignment Group
                </FormLabel>
                <Col xs={12} md={8}>
                    <FormSelect 
                        value={assignment.assignmentGroup}
                        onChange={(e) => setAssignment({...assignment, assignmentGroup: e.target.value})}
                    >
                        <option value="0">ASSIGNMENTS</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            {/* DISPLAY GRADE AS */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Display Grade as</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <FormSelect>
                        <option value="percentage">Percentage</option>
                        <option value="points">Points</option>
                    </FormSelect>
                </Col>
            </Row>

            {/* SUBMISSION TYPE */}
            <Row className="mb-3 align-items-top">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Submission Type</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <div className="container p-4 border rounded">
                        <FormSelect className="mb-3">
                            <option value="online">Online</option>
                            <option value="paper">On Paper</option>
                        </FormSelect>
                        
                        <div className="fw-semibold mb-3">Online Entry Options</div>
                        <div className="d-flex flex-column gap-2">
                            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                            <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
                            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />  
                            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                        </div>
                    </div>
                </Col>
            </Row>
            
            {/*Assign*/}
            
            <Row className="mb-3 align-items-start">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Assign</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <div className="container p-4 border rounded">
                        <div className="fw-semibold mb-3">Assign to</div>
                        
                        {/* Everyone Tag */}
                        <div className="d-flex flex-wrap border rounded p-1 gap-2 mb-3">
                            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-light border rounded">
                                <span>Everyone</span>
                                <button
                                    className="btn btn-link p-0 text-secondary"
                                    style={{ 
                                        textDecoration: 'none',
                                        fontSize: '1rem',
                                        lineHeight: '1'
                                    }}
                                    aria-label="Remove Everyone"
                                    type="button" 
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <FormLabel className="fw-semibold">Due</FormLabel>
                            <FormControl 
                                type="datetime-local" 
                                value={formatDateForInput(assignment.dueDate)} 
                                onChange={(e) =>
                                    setAssignment({ ...assignment, dueDate: e.target.value })
                                }
                            />
                        </div>

                        {/* Available From and Until */}
                        <Row className="g-3">
                            <Col xs={12} md={6}>
                                <FormLabel className="fw-semibold">Available From</FormLabel>
                                <FormControl 
                                    type="date" 
                                    value={formatDateForDateInput(assignment.availableDate)} 
                                    onChange={(e) =>
                                        setAssignment({ ...assignment, availableDate: e.target.value })
                                    }
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className="fw-semibold">Until</FormLabel>
                                <FormControl 
                                    type="date" 
                                    value={formatDateForDateInput(assignment.untilDate)} 
                                    onChange={(e) =>
                                        setAssignment({ ...assignment, untilDate: e.target.value })
                                    }
                                />
                            </Col>
                        </Row>
                    </div> 
                </Col>
            </Row>
        
            {/* Footer Buttons (Save/Cancel) */}
            <div className="d-flex justify-content-end mt-3" >
                <button className="btn btn-danger me-2" type="submit">Save</button>
                <button className="btn btn-secondary me-2" type="button" onClick={handleCancel} >Cancel</button>
            </div>
        </div> 
      </Form> 
    </div>
  );
}
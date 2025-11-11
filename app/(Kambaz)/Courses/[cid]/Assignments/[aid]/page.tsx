
"use client";
import { Form, FormLabel, FormGroup, FormSelect, Row, Col, FormControl } from 'react-bootstrap';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment, Assignment } from "../../Assignments/reducer";

// Using a flexible type for the component state to correctly handle new vs. existing assignments
type AssignmentFormState = Omit<Assignment, '_id'> & {
    _id?: string;
};

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid ?? "";
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const existing = assignments.find((a) => a._id === aid);
  
  // Use AssignmentFormState for useState
  const [assignment, setAssignment] = useState<AssignmentFormState>(
    existing
      ? existing
      : {
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableDate: "",
          untilDate: "",
          course: courseId,
        }
  );

  // Added (e: React.FormEvent) to handle potential default submit behavior,
  // though setting type="button" on the button is the main fix.
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Good practice to explicitly prevent default form submission
    console.log("Saving assignment:", assignment);
    if (existing) {
      dispatch(updateAssignment(assignment as Assignment));
    } else {
      dispatch(addAssignment(assignment as Omit<Assignment, "_id">));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      {/* 1. START of the main Form component */}
      <Form> 
        {/* Assignment Name and Description - Moved inside <Form> */}
        <FormLabel>Assignment Name</FormLabel>
        <FormControl type="text" // Changed 'textarea' type to 'text' for single-line input
            value={assignment?.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            placeholder="Assignment Title" />
        <br />
        <FormControl
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment details"
        />
        <br />

        {/* 2. START of the structured content container */}
        <div className="container p-4">
            
            {/* POINTS */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Points</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <FormControl type="text" value={assignment.points} 
                    onChange={(e) =>
                        setAssignment({
                        ...assignment,
                        points: parseInt(e.target.value) || 0, // Added | 0 for safety
                        })
                    }/>
                </Col>
            </Row>

            {/* ASSIGNMENT GROUP */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Assignment Group</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <FormSelect>
                        <option value="0" defaultChecked>ASSIGNMENTS</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </FormSelect>
                </Col>
            </Row>

            {/* DISPLAY GRADE AS */}
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end text-start">
                    <FormLabel>Display Grade as</FormLabel>
                </Col>
                <Col xs={12} md={8}>
                    <FormSelect>
                        <option value="percentage" defaultChecked>Percentage</option>
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
                            <option value="online" defaultChecked>Online</option>
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
                                    type="button" // Important: prevents accidental form submission
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <FormLabel className="fw-semibold">Due</FormLabel>
                            <FormControl type="datetime-local" value={assignment?.dueDate} onChange={(e) =>
                                setAssignment({ ...assignment, dueDate: e.target.value })
                            }/>
                        </div>

                        {/* Available From and Until */}
                        <Row className="g-3">
                            <Col xs={12} md={6}>
                                <FormLabel className="fw-semibold">Available From</FormLabel>
                                <FormControl type="date" value={assignment.availableDate} onChange={(e) =>
                                    setAssignment({ ...assignment, availableDate: e.target.value })
                                }/>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className="fw-semibold">Until</FormLabel>
                                <FormControl type="date" value={assignment?.untilDate} onChange={(e) =>
                                    setAssignment({ ...assignment, untilDate: e.target.value })
                                }/>
                            </Col>
                        </Row>
                    </div> {/* CLOSES the inner container p-4 border rounded */}
                </Col>
            </Row>
        
            {/* Footer Buttons (Save/Cancel) */}
            <div className="d-flex justify-content-end mt-3" >
                {/* FIX: Added type="button" to prevent page refresh on click */}
                <button className="btn btn-danger me-2" onClick={handleSave} >Save</button>
                <button className="btn btn-secondary me-2" onClick={handleCancel} >Cancel</button>
            </div>
        </div> {/* CLOSES the outer container p-4 */}
      </Form> {/* CLOSES the main Form component */}
    </div>
  );
}
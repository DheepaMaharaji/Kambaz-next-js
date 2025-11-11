"use client"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Image from "next/image";

import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Form, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse,  } from "../Courses/reducer";
import { RootState } from "../store";

 import { useRouter } from "next/navigation";
import { toggleEnrollment } from "./reducer";
// Define the Course type
type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  //image: string;
  description: string;
  // Add other fields as needed
};

export default function Dashboard() {
        const { courses } = useSelector((state: RootState) => state.coursesReducer);
        const dispatch = useDispatch();

        const [showAll, setShowAll] = useState(false);
        const { enrollments } = useSelector((state: RootState) => state.enrollmentReducer);

        const [course, setCourse] = useState<Course>({
          _id: "0", name: "New Course", number: "New Number",
          startDate: "2023-09-10", endDate: "2023-12-15",
           description: "New Description"
        });
        const { currentUser } = useSelector((state: RootState) => state.accountReducer);
       

        const router = useRouter();
        if (!currentUser) return null; 
         const resetForm = () => {
          setCourse({
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            description: "New Description",
          });
        };
        
        

      
        const enrolledSet = new Set(
          enrollments
            .filter((e) => e.user === currentUser?._id)
            .map((e) => e.course)
        );

        const filteredCourses = showAll
          ? courses
          : courses.filter((c) => enrolledSet.has(c._id));
              
          const handleToggleEnroll = (courseId: string) => {
            dispatch(toggleEnrollment({ userId: currentUser._id, courseId }));
          };
 
  return (
    
    <div id="wd-dashboard">
    <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {/*  NEW BUTTON PLACEMENT (Top Right) */}
        <Button
          variant="primary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />

    <div className="d-flex align-items-center justify-content-between mb-3">
        <h5>New Course</h5>
         
          <div> 
          <button className="btn btn-primary me-2"
                  id="wd-add-new-course-click"
                  onClick={() =>{
                   
                   dispatch(addNewCourse(course))
                   resetForm();} }> Add </button>
                 
           <button className="btn btn-warning"
                          onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
                    Update </button>
         </div> 
    </div>
  <Form.Control
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        className="mb-2"
        placeholder="Course Name"
      />

      
  <Form.Control
        as="textarea"
        rows={3}
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        placeholder="Course Description"
      />


   <hr />

 <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
 <div id="wd-dashboard-courses">
   

  {<Row xs={1} md={5} className="g-4">
  {filteredCourses.map((course) => {
    const isEnrolled = enrolledSet.has(course._id);

            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                 {/* <Card.Body>
                  
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>

                    
                    {(isEnrolled || currentUser.role?.toLowerCase() === "faculty") && (
                      <Link href={`/Courses/${course._id}/Home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    )}

                  
                    {currentUser.role?.toLowerCase() === "faculty" && (
                      <>
                        <Button variant="warning" className="me-2 float-end" onClick={() => setCourse(course)}>
                          Edit
                        </Button>
                        <Button variant="danger" className="float-end" onClick={() => dispatch(deleteCourse(course._id))}>
                          Delete
                        </Button>
                      </>
                    )}

                    <br />
                    {currentUser.role?.toLowerCase() === "faculty" && (
                      isEnrolled ? (
                        <Button variant="danger" className="float-end" onClick={() => dispatch(toggleEnrollment({ userId: currentUser._id, courseId: course._id }))}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" className="float-end" onClick={() => dispatch(toggleEnrollment({ userId: currentUser._id, courseId: course._id }))}>
                          Enroll
                        </Button>
                      )
                    )}
                  </Card.Body>*/}
                  <Card.Body>
  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
    {course.name}
  </Card.Title>
  <Card.Text
    className="wd-dashboard-course-description overflow-hidden"
    style={{ height: "100px" }}
  >
    {course.description}
  </Card.Text>

  {/* Navigation (Go Button) */}
  {(isEnrolled || currentUser.role?.toLowerCase() === "faculty") && (
    <Link href={`/Courses/${course._id}/Home`}>
      <Button variant="primary" className="w-100 mb-2">
        Go
      </Button>
    </Link>
  )}

  {/* Faculty controls */}
  {currentUser.role?.toLowerCase() === "faculty" && (
    <div className="d-flex justify-content-between mt-2">
      <Button
        variant="warning"
        size="sm"
        onClick={() => setCourse(course)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => dispatch(deleteCourse(course._id))}
      >
        Delete
      </Button>
    </div>
  )}

  {/* Enrollment controls */}
  {currentUser.role?.toLowerCase() !== "faculty" && (
    <div className="d-flex justify-content-end mt-2">
      {isEnrolled ? (
        <Button
          variant="danger"
          size="sm"
          onClick={() =>
            dispatch(toggleEnrollment({ userId: currentUser._id, courseId: course._id }))
          }
        >
          Unenroll
        </Button>
      ) : (
        <Button
          variant="success"
          size="sm"
          onClick={() =>
            dispatch(toggleEnrollment({ userId: currentUser._id, courseId: course._id }))
          }
        >
          Enroll
        </Button>
      )}
    </div>
  )}
</Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
          
          }

        </div></div>

);}

"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Form, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  setCourses } from "../Courses/reducer";
import { RootState } from "../store";

 import { useRouter } from "next/navigation";
import { toggleEnrollment , setEnrollments} from "./reducer";

import * as client from "../Courses/client";


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
        const [enrolledSet, setEnrolledSet] = useState<Set<string>>(new Set());

        const [course, setCourse] = useState<Course>({
          _id: "0", name: "New Course", number: "New Number",
          startDate: "2023-09-10", endDate: "2023-12-15",
           description: "New Description"
        });
        const { currentUser } = useSelector((state: RootState) => state.accountReducer);
       

      const fetchCourses = async () => {
        if (!currentUser) return;
        try {
            let courseList;
            if (showAll) {
              // 1. Fetch ALL courses using the new client function
              courseList = await client.fetchAllCourses(); 
            } else {
              // 2. Fetch only the current user's courses
              courseList = await client.findMyCourses(currentUser);
            }
            dispatch(setCourses(courseList));
          } catch (error) {
            console.error("Error fetching courses:", error);
          }
      };
      useEffect(() => {
        fetchCourses();
      }, [currentUser,showAll]);

      useEffect(() => {
        if (currentUser) enrollmentsForUser();
      }, [currentUser]);
      
      const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        await client.enroll(currentUser!, newCourse._id );
        await enrollmentsForUser();
        dispatch(setCourses([ ...courses, newCourse ]));

      };

       const onDeleteCourse = async (courseId: string) => {
        const status = await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
      };
      
      const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })));};


        const enrollmentsForUser = async () => {
          if (!currentUser) return;
          const enrollments = await client.findEnrollmentsForUser(currentUser);
          dispatch(setEnrollments(enrollments));
          // You might want to dispatch these enrollments to Redux store
        }
  
        const router = useRouter();
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

        useEffect(() => {
          if (currentUser && enrollments) {
            const newEnrolledSet = new Set(
              enrollments
                .filter((e) => e.user === currentUser._id)
                .map((e) => e.course)
            );
            setEnrolledSet(newEnrolledSet);
          } else {
            setEnrolledSet(new Set());
          }
        }, [enrollments, currentUser]);

        if (!currentUser) return null; 

              
          const handleToggleEnroll = (courseId: string) => {
            dispatch(toggleEnrollment({ userId: currentUser._id, courseId }));
          };

          const onEnroll = async (courseId: string) => {
            await client.enroll(currentUser, courseId);
            await enrollmentsForUser();
          };
          
          const onUnenroll = async (courseId: string) => { 
            await client.unenroll(currentUser, courseId);
            await enrollmentsForUser();
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

    {currentUser.role?.toLowerCase() === "faculty" &&
    (<div>
    <div className="d-flex align-items-center justify-content-between mb-3">
        <h5>New Course</h5>
         
          <div> 
          <button className="btn btn-primary me-2"
                  id="wd-add-new-course-click"
                  onClick={onAddNewCourse}> Add </button>
                 
           <button className="btn btn-warning"
                          onClick={onUpdateCourse}  id="wd-update-course-click">
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

  </div>)}
   <hr />

 <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
 <div id="wd-dashboard-courses">
   

  {<Row xs={1} md={5} className="g-4">
  {courses.map((course) => {
    const isEnrolled = enrolledSet.has(course._id);

            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                 
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
        onClick={(event) => {
              event.preventDefault();
              onDeleteCourse(course._id);
            }}
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
          onClick={() => onUnenroll(course._id)
          }
        >
          Unenroll
        </Button>
      ) : (
        <Button
          variant="success"
          size="sm"
          onClick={() => onEnroll(course._id)
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

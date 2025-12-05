


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, CardImg, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "./reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  modules?: Module[];
  
};
type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

type Module = {
  editing: boolean;
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
};
type Enrollment = {
  user: string;
  course: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    description: "",
    credits: 0,
    department: "",
  });

  if (!currentUser) return null;

  const isFaculty = currentUser.role?.toLowerCase() === "faculty";

  // -----------------------------
  // Fetch & Sync
  // -----------------------------
  const fetchCourses = async () => {
    const courseList = showAll
      ? await client.fetchAllCourses()
      : await client.findMyCourses(currentUser);
    dispatch(setCourses(courseList));
  };

  const fetchEnrollments = async () => {
    const data = await client.findEnrollmentsForUser(currentUser);

    // Only keep the fields we need
    const cleaned = data.map((e : Course )=> ({
      user: currentUser._id,
      course: e._id,
    }));

    dispatch(setEnrollments(cleaned));
  };

  const fullSync = async () => {
    await fetchCourses();
    await fetchEnrollments();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fullSync();
  }, [currentUser, showAll]);

  // -----------------------------
  // Actions
  // -----------------------------
  const onAddNewCourse = async () => {
    await client.createCourse(course);
    await fullSync();
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    await fullSync();
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    await fullSync();
  };

  const onEnroll = async (courseId: string) => {
    await client.enroll(currentUser, courseId);
    await fullSync();
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenroll(currentUser, courseId);
    await fullSync();
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>Dashboard</h1>
        <Button variant="primary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>

      {/* Faculty: Add/Update Courses */}
      {isFaculty && (
        <div className="mb-4">
          <h5>New Course</h5>
          <div className="mb-2">
            <Button className="me-2" variant="primary" onClick={onAddNewCourse}>Add</Button>
            <Button variant="warning" onClick={onUpdateCourse}>Update</Button>
          </div>
          <Form.Control
            className="mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <Form.Control
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course Description"
          />
        </div>
      )}

      <Row xs={1} md={5} className="g-4">
        {courses.map((c) => {
          const isEnrolled = enrollments.some(
            (e) => e.user === currentUser._id && e.course === c._id
          );

          return (
            <Col key={c._id}>
              <Card className="shadow-sm rounded-4 h-100">
                <CardImg src="/images/reactjs.jpg" variant="top" height={150} style={{ objectFit: "cover" }} />
                <Card.Body className="d-flex flex-column">
                  <h5 className="text-truncate">{c.name}</h5>
                  <p style={{ height: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.description}
                  </p>

                  {(isEnrolled || isFaculty) && (
                    <Link href={`/Courses/${c._id}/Home`} className="mt-auto mb-2">
                      <Button variant="primary" className="w-100">Go</Button>
                    </Link>
                  )}

                  {isFaculty && (
                    <div className="d-flex justify-content-between mt-1">
                      <Button variant="warning" size="sm" onClick={() => setCourse(c)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => onDeleteCourse(c._id)}>Delete</Button>
                    </div>
                  )}

                  {!isFaculty && (
                    <Button
                      variant={isEnrolled ? "danger" : "success"}
                      size="sm"
                      className="w-100 mt-2"
                      onClick={() => isEnrolled ? onUnenroll(c._id) : onEnroll(c._id)}
                    >
                      {isEnrolled ? "Unenroll" : "Enroll"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Debug
      <div className="mt-4">
        <pre>{JSON.stringify(enrollments, null, 2)}</pre>
      </div>
      <div className="mt-4">
  <h5>Enrollment Debug:</h5>
 <pre>
{courses.map(course => {
  const isEnrolled = enrollments.some(
    e => String(e.user) === String(currentUser._id) 
  );
  console.log("currentUser._id:", currentUser._id, typeof currentUser._id);
enrollments.forEach((e) => {
  console.log( "enrollment.course:", e.course, typeof e.course);
});
  return `${course.name} (${course._id}): ${isEnrolled}\n`;
})}
</pre>
</div> */}
    </div>
  );
}

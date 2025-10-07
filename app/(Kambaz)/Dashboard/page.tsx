import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    // <div id="wd-dashboard">
    //   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    //   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
    //   <div id="wd-dashboard-courses">
    //     <div className="wd-dashboard-course">
    //       <Link href="/Courses/1234" className="wd-dashboard-course-link">
    //         <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS course" />
    //         <div>
    //           <h5> CS1234 React JS </h5>
    //           <p className="wd-dashboard-course-title">
    //             Full Stack software developer
    //           </p>
    //           <button> Go </button>
    //         </div>
    //       </Link>
    //     </div>
    //     <br />
    //     <div className="wd-dashboard-course">
    //         <Link href="/Courses/1234" className="wd-dashboard-course-link">
    //         <Image src="/images/dbms.jpg" width={200} height={150} alt="DBMS" />
    //         <div>
    //           <h5> CS1235 DBMS </h5>
    //           <p className="wd-dashboard-course-title">
    //             Full Stack software developer
    //           </p>
    //           <button> Go </button>
    //         </div>
    //       </Link>
    //     </div>
    //     <br />
    //     <div className="wd-dashboard-course"> 
    //         <Link href="/Courses/1234" className="wd-dashboard-course-link">
    //         <Image src="/images/cloud.jpg" width={200} height={150} alt="cloud computing" />
    //         <div>
    //           <h5> CS1236 cloud computing </h5>
    //           <p className="wd-dashboard-course-title">
    //             Full Stack software developer
    //           </p>
    //           <button> Go </button>
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div id="wd-dashboard">
 <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
 <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
 <div id="wd-dashboard-courses">
  <Row xs={1} md={5} className="g-4">
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/dbms.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1235 DBMS </CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/cloud.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 cloud computing</CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/cloud.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 cloud computing</CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/dbms.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1235 DBMS </CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   <Col className="wd-dashboard-course" style={{ width: "300px" }}>
    <Card>
     <Link href="/Courses/1234/Home"
           className="wd-dashboard-course-link text-decoration-none text-dark">
      <CardImg variant="top" src="/images/cloud.jpg" width="100%" height={160}/>
      <CardBody>
       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1236 cloud computing</CardTitle>
       <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
        Full Stack software developer</CardText>
       <Button variant="primary">Go</Button>
      </CardBody>
     </Link>
    </Card>
   </Col>
   
  </Row>
</div></div>

);}

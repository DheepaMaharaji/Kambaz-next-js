// export default function Modules() {
//   return (
//     <div>
//         <div style={{ textAlign: "right" }}>
//         <button>Collapse All</button>
//         <button>View Progress</button>
//         <select id="publish-all-select">

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

                
//                 <option value="Publish All">Publish All</option>
//                 <option value="Unpublish All">Unpublish All</option>
//         </select>
//         <button>+ Module</button>
//         </div>
//       {/* Implement Collapse All button, View Progress button, etc. */}
//       <ul id="wd-modules">
//         <li className="wd-module">
//           <div className="wd-title">Week 1</div>
//           <ul className="wd-lessons">
//             <li className="wd-lesson">
//               <span className="wd-title">LEARNING OBJECTIVES</span>
//               <ul className="wd-content">
//                 <li className="wd-content-item">Introduction to the course</li>
//                 <li className="wd-content-item">Learn what is Web Development</li>
//               </ul>
//               </li>
//              <li className="wd-lesson"> 
//               <span className="wd-title">READING</span>
//               <ul className="wd-content">
//                 <li className="wd-content-item">FULL-STACK-DEVELOPER- Chapter1-Introduction</li>
//                 <li className="wd-content-item">FULL-STACK-DEVELOPER- Chapter2-CreatingUser</li>
//               </ul>
//             </li>
//             <li className="wd-lesson">
//               <span className="wd-title">SLIDES</span>
//               <ul className="wd-content">
//                 <li className="wd-content-item">Introduction to the course</li>
//                 <li className="wd-content-item">Learn what is Web Development</li>
//                 <li className="wd-content-item">Creating an HTTP server with Nodejs</li>
//               </ul>
//             </li>
            
//           </ul>
//         </li>
//         <li className="wd-module">
//           <div className="wd-title">Week 2</div>
//           <ul className="wd-lessons">
//             <li className="wd-lesson">
//               <span className="wd-title">LEARNING OBJECTIVES</span>
//               <ul className="wd-content">
//                 <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
//                 <li className="wd-content-item">Deploy the assignment to NETLIFY</li>
//               </ul>
//               </li>
//           </ul>    
//         </li>
        
//       </ul>
//     </div>
// );}

import ModuleControls from "./ModuleControls";
import LessonControlButtons from "./LessonControlButton";
import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
  return (
    <div>
    <ModuleControls /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
      </div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
        </ListGroupItem>
        
      </ListGroup>
    </ListGroupItem>
  </ListGroup>
  </div>
  );
} 




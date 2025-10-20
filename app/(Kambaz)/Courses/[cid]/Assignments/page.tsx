
"use client";
import ControlButtons from "./ControlButtons";
import SearchBar from "./SearchBar";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPencil, BsTrash } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../../styles.css";
import GreenCheckmark from "../Modules/GreenCheckMark";
import { assignments } from  "../../../Database";
import { useParams } from "next/navigation";

export default function Assignments() {
  const {cid} = useParams();
  const assignmentslist = assignments.filter(a => a.course === cid);
  return (
    <div>
      <SearchBar />
      <ControlButtons /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className=" me-2 fs-3" /> <IoMdArrowDropdown className=" me-2 fs-3" />Assignments
            <div className="float-end me-2 d-flex align-items-center gap-3">
                  <button className="btn btn-secondary rounded-pill bg-light text-dark">40% Of Total</button>
                  <FaPlusCircle className="text-dark fs-4" />
                  <IoEllipsisVertical className="text-dark fs-4" />
            </div>

          </div>
        </ListGroupItem>
        {assignmentslist.map((assignment) =>  (
            <ListGroupItem 
            key = {assignment._id}
            className="d-flex justify-content-between align-items-center wd-assignment-list-item">
          {/* Text content */}
          <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
            {/* Icon */}
            <SlNote className="me-2 fs-4 text-secondary" />

            <div className="wd-assignment-text">
              <a 
              href={`./Assignments/${assignment._id}`}
              className="d-flex align-items-start flex-grow-1 wd-assignment-text text-decoration-none text-dark"
              >
              <span className="fw-bold"><h5>{assignment.title}</h5></span>{" "}
              </a>
              <small>
                Multiple Modules | <b>Not Available until</b> {assignment.availableDate} | <b>Due</b> {assignment.dueDate} | {assignment.points} pts
              </small>
            </div>
          </div>

          {/* Icons */}
            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
        </ListGroupItem>
        ))}
        
        
      </ListGroup>
    </div>
  );
}
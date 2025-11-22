"use client";
import React, { use, useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;


export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module,setModule] = useState({
    name: "Web Development",
    credits: 3,
    code: "CSCI 3916",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
       <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>

      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Retrieving Modules</h4>
        <a id="wd-retrieve-module" className="btn btn-primary"
            href={`${HTTP_SERVER}/lab5/module`}>
            Get Module
        </a>
      <hr />    
      <h4>Retrieving Module Name</h4>
        <a id="wd-retrieve-module-name" className="btn btn-primary"
            href={`${HTTP_SERVER}/lab5/module/name`}>
            Get Module Title
        </a>
      <hr />
      <a id="wd-update-module-name" className="btn btn-primary float-end"
            href={`${HTTP_SERVER}/lab5/module/name/${module.name}`}>
            Update Module Title </a>
      <FormControl className="w-75" id="wd-module-title"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />
      <h4>Update Score</h4>
        <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
        </a>
        <FormControl className="w-75" type="number" id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value)  })} />
        <hr />

      
        <h4>Update Completed</h4>
        <label className="float">
        <input className="me-2"
        type="checkbox"
        id="wd-assignment-completed"
        checked={assignment.completed}
        
        onChange={(e) => {
            const completed = e.target.checked;
            setAssignment({ ...assignment, completed });

            window.location.href = `${ASSIGNMENT_API_URL}/completed/${completed}`;
        }}
        />
         Completed
        </label>
        <hr />
    </div>
);}

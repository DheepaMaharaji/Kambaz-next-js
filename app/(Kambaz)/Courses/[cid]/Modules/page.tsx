"use client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModuleControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButton";
import { useParams } from "next/navigation";
import {modules as initialModules} from "../../../Database";
import { useEffect, useState } from "react";
import { setModules,addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

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

export default function Modules() {
  const { cid } = useParams();
const courseId = cid as string;
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid as string };
    const modulecreated = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, modulecreated]));
  };

  const fetchModules = async () => {
      const modules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    useEffect(() => {
      fetchModules();
    }, []);

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: Module) => {
    await client.updateModule(module);
    const newModules = modules.map((m: Module) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  
 

  return (
    <div>
      
      {isFaculty && (
        <div >
        <ModulesControls 
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      </div>
      )}
      
      <br /><br /><br /><br />
      
      
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-4 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center flex-grow-1">
                  <BsGripVertical className="me-4 fs-3" />
                  {!module.editing && module.name}
                  { module.editing && (
                    <FormControl className="d-inline-block"
                          onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                               onUpdateModule({ ...module, editing: false });
                            }
                          }}
                          defaultValue={module.name}/>
                  )}
                  </div>
               {isFaculty && (
              
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                  
                )}
               
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
     
  );

}

   

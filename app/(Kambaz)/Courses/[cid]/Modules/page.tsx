// // "use client";
// // import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
// // import { BsGripVertical } from "react-icons/bs";
// // import ModulesControls from "./ModuleControls";
// // import ModuleControlButtons from "./ModuleControlButtons";
// // import LessonControlButtons from "./LessonControlButton";
// // import { useParams } from "next/navigation";
// // import {modules as initialModules} from "../../../Database";
// // import { useEffect, useState } from "react";
// // import { setModules,addModule, editModule, updateModule, deleteModule }
// //   from "./reducer";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState } from "../../../store";
// // import * as client from "../../client";


// // type Lesson = {
// //   _id: string;
// //   name: string;
// //   description?: string;
// //   module: string;
// // };

// // type Module = {
// //   editing?: boolean;
// //   _id?: string;
// //   name: string;
// //   description: string;
// //   course?: string;
// //   lessons?: Lesson[];
// // };

// // export default function Modules() {
// //   const { cid } = useParams();
// // const courseId = cid as string;
// //   const [moduleName, setModuleName] = useState("");
// //   const { modules } = useSelector((state: RootState) => state.modulesReducer);
// //   const dispatch = useDispatch();
  
// //   const onCreateModuleForCourse = async () => {
// //   if (!cid) return;

// //   const newModuleData = { name: moduleName , description: "" };

// //   try {
// //     const moduleCreated = await client.createModuleForCourse(cid as string, newModuleData as Module);

// //     console.log("New module ID:", moduleCreated._id); // <--- here’s the module_id

// //     // Update state with new module
// //     dispatch(setModules([...modules, moduleCreated]));

// //     setModuleName(""); // reset input
// //   } catch (err) {
// //     console.error("Failed to create module:", err);
// //   }
// // };

// //   const fetchModules = async () => {
// //       const modules = await client.findModulesForCourse(cid as string);
// //       dispatch(setModules(modules));
// //     };
// //     useEffect(() => {
// //       fetchModules();
// //     }, []);

// //   const onRemoveModule = async (moduleId: string) => {
// //     await client.deleteModule(courseId,moduleId, );
// //     dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
// //   };

// //   const onUpdateModule = async (module: Module) => {
// //     await client.updateModule(courseId,module);
// //     const newModules = modules.map((m: Module) => m._id === module._id ? module : m );
// //     dispatch(setModules(newModules));
// //   };
  
// //   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
// //   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  
 

// //   return (
// //     <div>
      
// //       {isFaculty && (
// //         <div >
// //         <ModulesControls 
// //           moduleName={moduleName}
// //           setModuleName={setModuleName}
// //           addModule={onCreateModuleForCourse}
// //         />
// //       </div>
// //       )}
      
// //       <br /><br /><br /><br />
      
      
// //       <ListGroup id="wd-modules" className="rounded-0">
// //         {modules
// //           .map((module: Module) => (
// //             <ListGroupItem
// //               key={module._id}
// //               className="wd-module p-0 mb-4 fs-5 border-gray"
// //             >
// //               <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
// //                 <div className="d-flex align-items-center flex-grow-1">
// //                   <BsGripVertical className="me-4 fs-3" />
// //                   {!module.editing && module.name}
// //                   { module.editing && (
// //                     <FormControl className="d-inline-block"
// //                           onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
// //                           onKeyDown={(e) => {
// //                             if (e.key === "Enter") {
// //                                onUpdateModule({ ...module, editing: false });
// //                             }
// //                           }}
// //                           defaultValue={module.name}/>
// //                   )}
// //                   </div>
// //                {isFaculty && (
              
// //                   <ModuleControlButtons
// //                     moduleId={module._id}
// //                     deleteModule={(moduleId) => onRemoveModule(moduleId)}
// //                     editModule={(moduleId) => dispatch(editModule(moduleId))}
// //                   />
                  
// //                 )}
               
// //               </div>
// //               {module.lessons && (
// //                 <ListGroup className="wd-lessons rounded-0">
// //                   {module.lessons.map((lesson: Lesson) => (
// //                     <ListGroupItem
// //                       key={lesson._id}
// //                       className="wd-lesson p-3 ps-1"
// //                     >
// //                       <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
// //                       <LessonControlButtons />
// //                     </ListGroupItem>
// //                   ))}
// //                 </ListGroup>
// //               )}
// //             </ListGroupItem>
// //           ))}
// //       </ListGroup>
// //     </div>
     
// //   );

// // }

   
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";

// import ModulesControls from "./ModuleControls";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButton";
// import { RootState } from "../../../store";
// import * as client from "../../client";
// import { setModules, editModule, updateModule } from "./reducer";

// type Lesson = {
//   _id: string;
//   name: string;
//   description?: string;
//   module: string;
// };

// type Module = {
//   _id: string;
//   name: string;
//   description?: string;
//   editing?: boolean;
//   lessons?: Lesson[];
// };

// export default function Modules() {
//   const { cid } = useParams();
//   const courseId = cid as string;

//   const dispatch = useDispatch();
//   const { modules } = useSelector((state: RootState) => state.modulesReducer);
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

//   const [moduleName, setModuleName] = useState("");

//   /** Fetch modules for the course */
//   const fetchModules = async () => {
//   if (!courseId) return; // ensure we have a valid courseId
//   try {
//     console.log("Searching for courseId =", courseId);
//     const fetchedModules = await client.findModulesForCourse(courseId);
//     dispatch(setModules(fetchedModules));
//   } catch (err) {
//     console.error("Failed to fetch modules:", err);
//   }
// };

// useEffect(() => {
//   fetchModules(); // no arguments
// }, [courseId]);

//   /** Create a new module */
//   const onCreateModule = async () => {
//     if (!moduleName.trim()) return;
//     try {
//       const newModule = await client.createModuleForCourse(courseId, { name: moduleName });
//       dispatch(setModules([...modules, newModule]));
//       setModuleName("");
//     } catch (err) {
//       console.error("Failed to create module:", err);
//     }
//   };

//   /** Delete a module */
//   const onDeleteModule = async (moduleId: string) => {
//     try {
//       await client.deleteModule(courseId, moduleId);
//       dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
//     } catch (err) {
//       console.error("Failed to delete module:", err);
//     }
//   };

//   /** Update module */
//   const onUpdateModule = async (module: Module) => {
//     try {
//       // Optimistic update
//       dispatch(setModules(modules.map((m) => (m._id === module._id ? module : m))));
//       await client.updateModule(courseId, module);
//     } catch (err) {
//       console.error("Failed to update module:", err);
//       fetchModules(); // rollback on error
//     }
//   };

//   return (
//     // <div>
//     //   {isFaculty && (
//     //     <div className="mb-4">
//     //       <ModulesControls
//     //         moduleName={moduleName}
//     //         setModuleName={setModuleName}
//     //         addModule={onCreateModule}
//     //       />
//     //     </div>
//     //   )}

//     //   <ListGroup className="rounded-0">
//     //     {modules.map((module) => (
//     //       <ListGroupItem key={module._id} className="p-0 mb-4 fs-5 border-gray">
//     //         <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
//     //           <div className="d-flex align-items-center flex-grow-1">
//     //             <BsGripVertical className="me-4 fs-3" />
//     //             {!module.editing ? (
//     //               module.name
//     //             ) : (
//     //               <FormControl
//     //                 className="d-inline-block"
//     //                 value={module.name}
//     //                 onChange={(e) =>
//     //                   dispatch(updateModule({ ...module, name: e.target.value }))
//     //                 }
//     //                 onKeyDown={(e) => {
//     //                   if (e.key === "Enter") {
//     //                     onUpdateModule({ ...module, editing: false });
//     //                   }
//     //                 }}
//     //               />
//     //             )}
//     //           </div>

//     //           {isFaculty && (
//     //             <ModuleControlButtons
//     //               moduleId={module._id}
//     //               deleteModule={onDeleteModule}
//     //               editModule={() => dispatch(editModule(module._id))}
//     //             />
//     //           )}
//     //         </div>

//     //         {module.lessons && module.lessons.length > 0 && (
//     //           <ListGroup className="rounded-0">
//     //             {module.lessons.map((lesson) => (
//     //               <ListGroupItem
//     //                 key={lesson._id}
//     //                 className="p-3 ps-1 d-flex align-items-center"
//     //               >
//     //                 <BsGripVertical className="me-2 fs-3" />
//     //                 {lesson.name}
//     //                 <LessonControlButtons  />
//     //               </ListGroupItem>
//     //             ))}
//     //           </ListGroup>
//     //         )}
//     //       </ListGroupItem>
//     //     ))}
//     //   </ListGroup>
//     // </div>
   
//   <div>
//     {isFaculty && (
//       <div className="mb-5"> {/* increased margin-bottom for more spacing */}
//         <ModulesControls
//           moduleName={moduleName}
//           setModuleName={setModuleName}
//           addModule={onCreateModule}
//         />
//       </div>
//     )}

//     {/* Modules list */}
//     <div className="mt-4"> {/* top margin to separate from buttons */}
//       <ListGroup className="rounded-0">
//         {modules.map((module) => (
//           <ListGroupItem key={module._id} className="p-0 mb-4 fs-5 border-gray">
//             <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center flex-grow-1">
//                 <BsGripVertical className="me-4 fs-3" />
//                 {!module.editing ? (
//                   module.name
//                 ) : (
//                   <FormControl
//                     className="d-inline-block"
//                     value={module.name}
//                     onChange={(e) =>
//                       dispatch(updateModule({ ...module, name: e.target.value }))
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         onUpdateModule({ ...module, editing: false });
//                       }
//                     }}
//                   />
//                 )}
//               </div>

//               {isFaculty && (
//                 <ModuleControlButtons
//                   moduleId={module._id}
//                   deleteModule={onDeleteModule}
//                   editModule={() => dispatch(editModule(module._id))}
//                 />
//               )}
//             </div>

//             {module.lessons && module.lessons.length > 0 && (
//               <ListGroup className="rounded-0">
//                 {module.lessons.map((lesson) => (
//                   <ListGroupItem
//                     key={lesson._id}
//                     className="p-3 ps-1 d-flex align-items-center"
//                   >
//                     <BsGripVertical className="me-2 fs-3" />
//                     {lesson.name}
//                     <LessonControlButtons />
//                   </ListGroupItem>
//                 ))}
//               </ListGroup>
//             )}
//           </ListGroupItem>
//         ))}
//       </ListGroup>
//     </div>
//   </div>


//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModuleControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButton";
import { RootState } from "../../../store";
import * as client from "../../client";
import { setModules, editModule, updateModule } from "./reducer";

type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

type Module = {
  _id: string;
  name: string;
  description?: string;
  editing?: boolean;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams();
  const courseId = cid as string;

  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role?.toLowerCase() === "faculty";

  const [moduleName, setModuleName] = useState("");

  /** Fetch modules for the course */
  const fetchModules = async () => {
    if (!courseId) return;
    try {
      const fetchedModules = await client.findModulesForCourse(courseId);
      dispatch(setModules(fetchedModules));
    } catch (err) {
      console.error("Failed to fetch modules:", err);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  /** Create a new module */
  const onCreateModule = async () => {
    if (!moduleName.trim()) return;
    try {
      const newModule = await client.createModuleForCourse(courseId, { name: moduleName });
      dispatch(setModules([...modules, newModule]));
      setModuleName("");
    } catch (err) {
      console.error("Failed to create module:", err);
    }
  };

  /** Delete a module */
  const onDeleteModule = async (moduleId: string) => {
    try {
      await client.deleteModule(courseId, moduleId);
      dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  /** Update module */
  const onUpdateModule = async (module: Module) => {
    try {
      dispatch(setModules(modules.map((m) => (m._id === module._id ? module : m))));
      await client.updateModule(courseId, module);
    } catch (err) {
      console.error("Failed to update module:", err);
      fetchModules(); // rollback on error
    }
  };

  return (
    <div>
      {/* Module controls (Add module) */}
      {isFaculty && (
        <div className="mb-4">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={onCreateModule}
          />
        </div>
      )}
      <br />
      <br />
      {/* Modules list */}
      <div className="mt-4">
        <ListGroup className="rounded-0" id="wd-modules">
          {modules.map((module) => (
            <ListGroupItem key={module._id} className="p-0 mb-4 fs-5 border-gray wd-module">
              {/* Module header */}
              <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center wd-title">
                <div className="d-flex align-items-center flex-grow-1">
                  <BsGripVertical className="me-4 fs-3" />
                  {!module.editing ? (
                    module.name
                  ) : (
                    <FormControl
                      className="d-inline-block"
                      value={module.name}
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateModule({ ...module, editing: false });
                        }
                      }}
                    />
                  )}
                </div>

                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={onDeleteModule}
                    editModule={() => dispatch(editModule(module._id))}
                  />
                )}
              </div>

              {/* Lessons */}
              {module.lessons && module.lessons.length > 0 && (
                <ListGroup className="rounded-0 wd-lessons ">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="p-3 ps-1 d-flex align-items-center wd-lesson justify-content-between"
                    >
                      <div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      </div>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

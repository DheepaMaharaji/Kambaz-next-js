import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckMark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { addModule } from "./reducer";

export default function ModuleControlButtons({ moduleId, deleteModule,editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void }) {
  return (
    <div className="float-end d-flex align-items-center gap-3">
       <FaPencil onClick={() => editModule(moduleId)} className="text-primary" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckmark />
      <FaPlusCircle
        className="text-dark fs-4"
        onClick={() =>
          addModule({
            name: "",
            description: "",
            course: "",
          })
        }
      />
      <IoEllipsisVertical className="text-dark fs-4" />
    </div>
  );
}
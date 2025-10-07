import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckMark";

export default function LessonControlButtons() {
  return (
    <div className="float-end me-2 d-flex align-items-center gap-3">
      <GreenCheckmark />
      <FaPlusCircle className="text-dark fs-4" />
      <IoEllipsisVertical className="text-dark fs-4" />
    </div>
  );
}
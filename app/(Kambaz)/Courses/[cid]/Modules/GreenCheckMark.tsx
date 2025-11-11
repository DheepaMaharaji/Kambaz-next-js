// import { FaCheckCircle, FaCircle } from "react-icons/fa";
// export default function GreenCheckmark() {
//   return (
//     <span className="me-1 position-relative">
//       <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
//       <FaCircle className="text-white me-1 fs-6" />
//     </span>);}
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
  return (
    <span
      className="position-relative d-inline-block"
      style={{ width: "1.2em", height: "1.2em" }} // make the container square
    >
      <FaCircle
        className="text-white"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <FaCheckCircle
        className="text-success"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </span>
  );
}
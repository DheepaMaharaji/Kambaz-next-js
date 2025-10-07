import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem } from "react-bootstrap";
import GreenCheckmark from "./GreenCheckMark";
import { FaPlus } from "react-icons/fa6";

export default function ModulesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Module
     </Button>
     <Dropdown className="float-end me-2">
       <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </DropdownToggle>
       <DropdownMenu>
         <DropdownItem id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </DropdownItem>
         <DropdownItem id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-publish-modules-only">
           <GreenCheckmark /> Publish modules only
         </DropdownItem>
         <DropdownItem id="wd-unpublish-all-modules-and-items">
           <GreenCheckmark /> Unpublish all modules and items
         </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <GreenCheckmark /> Unpublish modules only
          </DropdownItem>
         
       </DropdownMenu>
     </Dropdown>
     <button id="wd-collapse-all" className="float-end me-2 btn btn-secondary btn-lg"  >
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      Collapse All
    </button>

    <button id="wd-view-progress" className="float-end me-2 btn btn-secondary btn-lg">
      View Progress
    </button>
    
   </div>
);}
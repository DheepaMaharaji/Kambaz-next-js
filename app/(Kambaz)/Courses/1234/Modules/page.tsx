export default function Modules() {
  return (
    <div>
        <div style={{ textAlign: "right" }}>
        <button>Collapse All</button>
        <button>View Progress</button>
        <select id="publish-all-select">
                
                <option selected value="Publish All">Publish All</option>
                <option value="Unpublish All">Unpublish All</option>
        </select>
        <button>+ Module</button>
        </div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
              </li>
             <li className="wd-lesson"> 
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">FULL-STACK-DEVELOPER- Chapter1-Introduction</li>
                <li className="wd-content-item">FULL-STACK-DEVELOPER- Chapter2-CreatingUser</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
                <li className="wd-content-item">Creating an HTTP server with Nodejs</li>
              </ul>
            </li>
            
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy the assignment to NETLIFY</li>
              </ul>
              </li>
          </ul>    
        </li>
        
      </ul>
    </div>
);}

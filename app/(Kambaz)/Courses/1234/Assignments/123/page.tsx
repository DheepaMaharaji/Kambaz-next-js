export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />

      <input id="wd-name"  defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea
        id="wd-description" rows={6} cols={60}
        defaultValue="The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, links to Kambaz application, links to all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page."
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
            
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option selected value="Assignments">Assignments</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                <option selected value="">Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">

                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                <option selected value="online">Online</option>
              </select>
              <div>Online Entry Options</div>
              
                

                <input type="checkbox" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox"  id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox"  id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                <input type="checkbox"  id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                <input type="checkbox"  id="wd-file-upload"/>
                <label htmlFor="wd-file-upload">File Uploads</label><br/>  
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type= "date" defaultValue="2024-05-13T23:59" />
            </td>
          </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-available-from">Available From</label>
                </td>
                <td>
                    <input id="wd-available-from"
                    type="date" defaultValue="2024-05-06"></input>
                    <label htmlFor="wd-available-until"> Until </label>
                    <input id="wd-available-until"
                    type="date" defaultValue="2024-05-20"></input>
                </td>
                </tr>
        </tbody>
      </table>

      <button>Save</button>
      <button>Cancel</button>
    </div>
);}

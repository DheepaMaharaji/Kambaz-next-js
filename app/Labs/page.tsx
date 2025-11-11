import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
     <h1>Dheepa Maharaji Sankara Subramanian</h1><br/>
     <h1>https://github.com/DheepaMaharaji/Kambaz-next-js/tree/assg2</h1><br/>
     <h1>Section 4</h1><br/>

     <h3>Labs</h3>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
         <Link href="/Labs/Lab4" id="wd-lab4-link">
           Lab 4: Maintaining States in React Application </Link>
       </li>
     </ul>
   </div>
);}

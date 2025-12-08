// "use client"
// import { useState } from "react";
// import ListOfPostsSidebar from "./ListOfPostsSidebar/lisOfPostsSidebar";
// import PazzaNavigation from "./P&B/PazzaNavigation";
// import ManageFoldersScreen from "./ManageFolders";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store";

// export default function Pazza() {
//     const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//     const [activeTab, setActiveTab] = useState<'Q&A' | 'Manage Class'>('Q&A');
//     const [selectedFolder, setSelectedFolder] = useState('hw1');
//     const folders = [
//     'hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6',
//     'project', 'exam', 'logistics', 'other', 'office_hours'
//   ];
//     return (
//         <div className="flex h-screen">
      
//         <PazzaNavigation
//             courseName={`CS 5610`}
//             currentUser={currentUser?.firstName + " "+currentUser?.lastName as string}
//             folders={folders}
//             activeTab={activeTab}
//             selectedFolder={selectedFolder}
//             onTabChange={setActiveTab}
//             onFolderChange={setSelectedFolder}
//         />
//         {/* <ListOfPostsSidebar /> */}
//         <div className="d-flex flex-grow-1 overflow-hidden">
//                 {activeTab === 'Q&A' ? (
//                     <ListOfPostsSidebar/>
//                 ) : currentUser?.role?.toLowerCase() === 'faculty' ? (
//                     <div className="flex-grow-1 overflow-auto p-4">
//                         <ManageFoldersScreen  />
//                     </div>
//                 ) : null}
//             </div>
//     </div>
//     );
// }       
"use client"
import { useState, useEffect } from "react";
import ListOfPostsSidebar from "./ListOfPostsSidebar/lisOfPostsSidebar";
import PazzaNavigation from "./P&B/PazzaNavigation";
import ManageFoldersScreen from "./ManageFolders";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "next/navigation";
import * as client from "../../client";

export default function Pazza() {
    const { cid } = useParams();
    const courseId = cid as string;
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    
    const [activeTab, setActiveTab] = useState<'Q&A' | 'Manage Class'>('Q&A');
    const [selectedFolder, setSelectedFolder] = useState('All');
    const [folders, setFolders] = useState<string[]>(['All']);
    const handleNavigateToManageFolders = () => {
        setActiveTab('Manage Class');
    }
    // Fetch folders from backend
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const foldersData = await client.getFoldersForCourse(courseId);
                const folderNames = foldersData.map(f => f.name);
                setFolders(['All', ...folderNames]);
            } catch (error) {
                console.error("Error fetching folders:", error);
                setFolders(['All']);
            }
        };

        if (courseId) {
            fetchFolders();
        }
    }, [courseId]);

    return (
        <div className="flex h-screen">
            <PazzaNavigation
                courseName={courseId}
                currentUser={currentUser?.firstName + " " + currentUser?.lastName as string}
                userRole = {currentUser?.role as string}
                folders={folders}
                activeTab={activeTab}
                selectedFolder={selectedFolder}
                onTabChange={setActiveTab}
                onFolderChange={setSelectedFolder}
            />
            
            <div className="d-flex flex-grow-1 overflow-hidden">
                {activeTab === 'Q&A' ? (
                    <ListOfPostsSidebar 
                        selectedFolder={selectedFolder}
                        onFolderChange={setSelectedFolder}
                        folders={folders}
                        onNavigateToManageFolders={handleNavigateToManageFolders}

                    />
                ) : currentUser?.role?.toLowerCase() === 'faculty' ? (
                    <div className="flex-grow-1 overflow-auto p-4">
                        <ManageFoldersScreen />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

   
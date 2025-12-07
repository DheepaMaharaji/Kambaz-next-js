"use client"
import { useState } from "react";
import ListOfPostsSidebar from "./ListOfPostsSidebar/lisOfPostsSidebar";
import PazzaNavigation from "./P&B/PazzaNavigation";


export default function Pazza() {
    const [activeTab, setActiveTab] = useState<'Q&A' | 'Manage Class'>('Q&A');
    const [selectedFolder, setSelectedFolder] = useState('hw1');
    const folders = [
    'hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6',
    'project', 'exam', 'logistics', 'other', 'office_hours'
  ];
    return (
        <div className="flex h-screen">
      
        <PazzaNavigation
            courseName={`CS 5610`}
            currentUser="John Doe"
            folders={folders}
            activeTab={activeTab}
            selectedFolder={selectedFolder}
            onTabChange={setActiveTab}
            onFolderChange={setSelectedFolder}
        />
        <ListOfPostsSidebar />
    </div>
    );
}       


   
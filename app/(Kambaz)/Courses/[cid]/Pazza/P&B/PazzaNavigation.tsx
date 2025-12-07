import PazzaNavBar from './PazzaNavbar';
import FolderFilters from './FolderFilter';
 
type PazzaNavigationProps = {
  courseName: string;
  currentUser: string;
  folders: string[];
  activeTab: 'Q&A' | 'Manage Class';
  selectedFolder: string;
  onTabChange: (tab: 'Q&A' | 'Manage Class') => void;
  onFolderChange: (folder: string) => void;
};
 
export default function PazzaNavigation({
  courseName,
  currentUser,
  folders,
  activeTab,
  selectedFolder,
  onTabChange,
  onFolderChange
}: PazzaNavigationProps) {
  return (
    <div>
      <PazzaNavBar
        courseName={courseName}
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <FolderFilters
        folders={folders}
        selectedFolder={selectedFolder}
        onFolderChange={onFolderChange}
      />
    </div>
  );
}
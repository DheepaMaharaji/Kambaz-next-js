type PiazzaNavBarProps = {
  courseName: string;
  currentUser: string;
  activeTab: 'Q&A' | 'Manage Class';
  onTabChange: (tab: 'Q&A' | 'Manage Class') => void;
};
 
export default function PazzaNavBar({ courseName, currentUser, activeTab, onTabChange }: PiazzaNavBarProps) {
  return (
    <nav className="navbar navbar-expand" style={{ backgroundColor: '#4a7c9e' }}>
      <div className="container-fluid px-4">
        {/* Application Logo */}
        <a className="navbar-brand text-white fw-bold" href="#" style={{ fontSize: 24 }}>
          pazza
        </a>
 
        {/* Course Name */}
        <span className="text-white fw-semibold mx-4" style={{ fontSize: 16 }}>
          {courseName}
        </span>
 
        {/* Navigation Tabs */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === 'Q&A' ? 'fw-bold border-bottom border-white border-2' : ''}`}
              onClick={() => onTabChange('Q&A')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Q & A
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === 'Manage Class' ? 'fw-bold border-bottom border-white border-2' : ''}`}
              onClick={() => onTabChange('Manage Class')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Manage Class
            </button>
          </li>
        </ul>
 
        {/* Current User */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-white rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold"
            style={{ width: 32, height: 32, fontSize: 14 }}
          >
            {currentUser.charAt(0).toUpperCase()}
          </div>
          <span className="text-white">{currentUser}</span>
        </div>
      </div>
    </nav>
  );
}
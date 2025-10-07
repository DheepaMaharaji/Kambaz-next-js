import { ReactNode } from "react";
import AccountNavigation from "./Navigation"; // Keeping AccountNavigation as requested

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      
      <div className="d-flex">
        
        
        <div className="d-none d-md-block">
          <AccountNavigation />
        </div>
        
        
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}

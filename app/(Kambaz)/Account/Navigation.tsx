"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";
 
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();
 
  let links = [];
 
  if (currentUser) {
    // User is logged in
    links.push({ href: "Profile", label: "Profile" });

    // 🔑 2. CONDITIONALLY ADD "Users" LINK
    if (currentUser.role === "ADMIN") {
      links.push({ href: "Users", label: "Users" });
    }
  }else{
    // User is not logged in
    links = [
      { href: "Signin", label: "Signin" },
      { href: "Signup", label: "Signup" },
    ];
  }
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.endsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            id={`wd-account-${link.label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive
                ? "active border-start border-3 border-dark"
                : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
 
 
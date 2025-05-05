
import { DesktopNavProps, navLinks } from "../../types/navbar";
import { NavLink } from "./NavLink";

export const DesktopNav: React.FC<DesktopNavProps> = ({ 
  activeSection, 
  isChangingSection, 
  handleScrollToSection 
}) => {
  return (
    <div className="hidden md:flex space-x-10 mr-4">
      {navLinks.map((link, index) => (
        <NavLink
          key={link.id}
          link={link}
          isActive={activeSection === link.id}
          isChangingSection={isChangingSection}
          onClick={handleScrollToSection}
          custom={index}
        />
      ))}
    </div>
  );
};

export interface NavLink {
  name: string;
  id: string;
}

export interface LogoProps {
  isOpen?: boolean;
}

export interface NavLinkProps {
  link: NavLink;
  isActive: boolean;
  isChangingSection: boolean;
  onClick: (id: string) => void;
  isMobile?: boolean;
  hoveredLink?: string | null;
  onHover?: (id: string | null) => void;
  custom?: number;
}

export interface DesktopNavProps {
  activeSection: string;
  isChangingSection: boolean;
  handleScrollToSection: (id: string) => void;
}

export interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isChangingSection: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection: string;
  isChangingSection: boolean;
  handleScrollToSection: (id: string) => void;
}

// Shared data across navbar components
export const navLinks: NavLink[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Portfolio", id: "portfolio" },
  { name: "Contact", id: "contact" },
]; 
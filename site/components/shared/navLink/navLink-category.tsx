import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ href, children, isActive, onClick }) => {
  return (
    <Link
      prefetch={true}
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={`px-4 py-2 flex items-center text-[#4B5C66]  mr-4  my-auto screen1400:px-0 ${
          isActive ? "text-[#4B5C66]" : "text-[#929BA0]"
        }`}
      >
        {isActive ? (
          <Image
            src="/images/indicator.svg"
            alt="indicator"
            width={21}
            height={21}
            className="ml-2"
          />
        ) : (
          <Image
            src="/images/bullet  point.svg"
            alt="indicator"
            width={20}
            height={20}
            className="ml-2"
          />
        )}
        {children}
      </div>
    </Link>
  );
};

export default NavLink;

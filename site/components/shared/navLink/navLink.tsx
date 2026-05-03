// "use client";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link prefetch={true} href={href}>
      <div className="px-4 py-2 flex items-center text-[#4B5C66]">
        {isActive && (
          <Image
            src="/images/indicator.svg"
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

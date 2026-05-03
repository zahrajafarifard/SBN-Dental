import React from "react";

import style from "./header.module.css";

interface HeaderProps {
  header: string;
}
const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <div className={style.backgroundImage}>
      <h1 className="text-[#264490] text-[64px] screen750:text-4xl ">
        {header}
      </h1>
    </div>
  );
};

export default Header;

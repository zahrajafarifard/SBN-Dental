import React from "react";

import styles from "./title.module.css";

const Titles = () => {
  return (
    <div className="w-[80%] mx-auto flex flex-row justify-between my-8 screen750:w-[92%] screen450:w-[98%]  ">
      <div
        className={`font-Quicksand text-lg ${styles.backGroundText} screen750:text-sm screen450:text-xs screen400:text-[11px] text-center`}
      >
        <span className="font-bold text-xl screen750:text-lg screen450:text-sm">
          S
        </span>
        trong enamel
      </div>
      <div
        className={`${styles.backGround} w-1.5 h-1.5  rounded-[3px] my-auto  screen750:w-1 screen750:h-1`}
      ></div>
      <div
        className={`font-Quicksand text-lg ${styles.backGroundText} screen750:text-sm screen450:text-xs screen400:text-[11px] text-center`}
      >
        <span className="font-bold text-xl screen750:text-lg screen450:text-sm">
          B
        </span>
        right teeth
      </div>
      <div
        className={`${styles.backGround} w-1.5 h-1.5  rounded-[3px] my-auto  screen750:w-1 screen750:h-1`}
      ></div>
      <div
        className={`font-Quicksand text-lg ${styles.backGroundText} screen750:text-sm screen450:text-xs screen400:text-[11px] text-center`}
      >
        <span className="font-bold text-xl screen750:text-lg screen450:text-sm">
          N
        </span>
        atural ingredient
      </div>
    </div>
  );
};

export default Titles;

import Archive from "@/components/articles/archive/page";
import Newest from "@/components/articles/newest/page";
import Header from "@/components/shared/header/header";
import Titles from "@/components/shared/title/titles";

import React from "react";

const Articles = () => {
  return (
    <div>
      <Header header="مقالات" />
      <Titles />
      <Newest />
      <Archive />
    </div>
  );
};

export default Articles;

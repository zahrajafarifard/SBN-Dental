import React from "react";
import Header from "@/components/shared/header/header";
import Titles from "@/components/shared/title/titles";
import PrivacyCmp from "@/components/privacy/page";

const Privacy = () => {
  return (
    <div>
      <Header header="حریم خصوصی" />
      <Titles />
      <PrivacyCmp />
    </div>
  );
};

export default Privacy;

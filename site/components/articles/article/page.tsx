import React from "react";

import dynamic from "next/dynamic";

const RealtedArticles = dynamic(() => import("./realtedArticles"));
const Spinner = dynamic(() => import("@/components/shared/spinner/page"));

import Main from "./main";
// import RealtedArticles from "./realtedArticles";
// import Spinner from "@/components/shared/spinner/page";

interface ArticleBody {
  sectionOneTitle: string;
  sectionOneText: string;
  sectionTwoTitle: string;
  sectionTwoText: string;
  sectionThreeTitle: string;
  sectionThreeText: string;
  sectionFourTitle: string;
  sectionFourText: string;
  sectionFiveTitle: string;
  sectionFiveText: string;
  sectionSixTitle: string;
  sectionSixText: string;
  sectionTwoImage: string | null;
  sectionFourImage: string | null;
  sectionFiveImage: string | null;
  date: string;
  authorName: string;
  CategoryId: number;
}
interface HeaderProps {
  body: ArticleBody;
  articleId: number;
}
const Artricle: React.FC<HeaderProps> = ({ articleId, body }) => {
  return (
    <div className="w-[80%] mx-auto flex flex-row-reverse justify-between screen1150:w-[90%]  screen1100:flex-col-reverse screen1100:w-full ">
      {!articleId ? (
        <div className="mt-20">
          <Spinner />
        </div>
      ) : (
        <RealtedArticles articleId={articleId} CategoryId={body?.CategoryId} />
      )}
      <Main articleId={articleId} body={body} />
    </div>
  );
};

export default Artricle;

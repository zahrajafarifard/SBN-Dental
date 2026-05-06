import React from "react";
import moment from "moment-jalaali";


import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  mainImage: string;
  articleTitle: string;
  createdAt: string;
  sectionOneText: string;
}

interface ArticleDetailsProps {
  article: Article;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article }) => {
  return (
    <Link prefetch={true} href={`/articles/${article?.id}`}>
      <div className="rounded-[20px] shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] ">
        <div>
          <Image
            src={`http://backend:4000/uploads/${article?.mainImage}`} 
            width={500}
            height={200}
            alt="عکس مقاله"
            className="rounded-t-[20px] "
          />
        </div>

        <div className="p-4 ">
          <div className="flex flex-row justify-between">
            <div className="text-[#16293] text-base mb-2 ">
              {article?.articleTitle}
            </div>
            <div className="text-[#929BA0] text-sm">
              {moment(article?.createdAt).format("jYYYY/jM/jD")}
            </div>
          </div>
          <div
            style={{ direction: "rtl" }}
            className="text-[#4B5C66] text-sm text-right leading-[22px] line-clamp-2 "
          >
            {article?.sectionOneText}
          </div>

          <div className="flex flex-row-reverse mt-5 mb-2">
            <Image
              src={"/images/arrow-left-blue.svg"}
              alt="ادامه مطلب"
              width={20}
              height={5}
              className="mr-2"
            />
            <div className="text-[#264490] text-sm">ادامه مطلب</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleDetails;

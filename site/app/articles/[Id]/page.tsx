// app/articles/[Id]/page.js
import Header from "@/components/articles/article/header";
import Artricle from "@/components/articles/article/page";
import Spinner from "@/components/shared/spinner/page";

interface ArticlePageProps {
  params: {
    Id: number;
  };
}

interface ArticleHeader {
  articleTitle: string;
  shortDescription: string;
  authorName: string;
  mainImage: string | null;
  readingTime: string;
}

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

async function fetchArticleData(Id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sbn/article/${Id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // prevents caching if you need fresh data each time
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article data");
  }

  return response.json();
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { Id } = params;

  // Fetch the article data on the server
  const _data = await fetchArticleData(Id);

  const header: ArticleHeader = {
    articleTitle: _data?.articleTitle || "",
    shortDescription: _data?.shortDescription || "",
    authorName: _data?.authorName || "",
    mainImage: _data?.mainImage || null,
    readingTime: _data?.readingTime || "",
  };

  const body: ArticleBody = {
    sectionOneTitle: _data?.sectionOneTitle || "",
    sectionOneText: _data?.sectionOneText || "",
    sectionTwoTitle: _data?.sectionTwoTitle || "",
    sectionTwoText: _data?.sectionTwoText || "",
    sectionThreeTitle: _data?.sectionThreeTitle || "",
    sectionThreeText: _data?.sectionThreeText || "",
    sectionFourTitle: _data?.sectionFourTitle || "",
    sectionFourText: _data?.sectionFourText || "",
    sectionFiveTitle: _data?.sectionFiveTitle || "",
    sectionFiveText: _data?.sectionFiveText || "",
    sectionSixTitle: _data?.sectionSixTitle || "",
    sectionSixText: _data?.sectionSixText || "",
    sectionTwoImage: _data?.sectionTwoImage || null,
    sectionFourImage: _data?.sectionFourImage || null,
    sectionFiveImage: _data?.sectionFiveImage || null,
    date: _data?.createdAt || "",
    authorName: _data?.authorName || "",
    CategoryId: _data?.CategoryId || 0,
  };

  return (
    <div className="w-full mx-auto">
      {!body.CategoryId ? (
        <Spinner />
      ) : (
        <>
          <Header header={header} />
          <Artricle articleId={Id} body={body} />
        </>
      )}
    </div>
  );
};

export default ArticlePage;

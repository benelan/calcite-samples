import type { GetStaticProps, NextPage } from "next";
import { prerender } from "../utils/prerender-component";
import Calcite from "../components/Calcite";

interface IndexProps {
  prerenderHTML?: string;
  prerenderData?: { [key: string]: any };
}

const Index: NextPage<IndexProps> = (props) => {
  return (
    <main className="p-5">
      <div dangerouslySetInnerHTML={{ __html: props.prerenderHTML }} />
    </main>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const res = await prerender(Calcite());
  return {
    props: {
      prerenderHTML: res.prerenderHTML,
      prerenderData: res.prerenderData,
    },
    revalidate: 10,
  };
};

export default Index;

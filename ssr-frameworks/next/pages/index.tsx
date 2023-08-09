// "use client";

import type { GetStaticProps } from "next";
import { prerender } from "../utils/prerender-component";
import Calcite from "../components/Calcite";

const Index = ({ prerenderHTML }) => {
  return (
    <main className="p-5">
      <div dangerouslySetInnerHTML={{ __html: prerenderHTML }} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await prerender(Calcite());
  return {
    props: { prerenderHTML: res.prerenderHTML },
    revalidate: 10,
  };
};

export default Index;

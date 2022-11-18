import Hero from "components/Hero";
import { DefaultLayout } from "components/layouts/Default";
import { Paper } from "components/Paper";
import type { MarkdownMetadata } from "lib/mdx";
import { getMarkdownContent, getMarkdownFilesByType } from "lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type BlogPostPageProps = {
  code: string;
  meta: MarkdownMetadata;
};

export default function BlogPostPage({ code, meta }: BlogPostPageProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <DefaultLayout>
      <div className="prose">
        <Hero>
          <Hero.Title>{meta.title || "Blog Post"}</Hero.Title>
          <Hero.Caption>{meta.description || "Blog Description"}</Hero.Caption>
        </Hero>

        <Paper className="bg-zinc-900 p-6">
          <Component />
        </Paper>
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const { code, meta } = await getMarkdownContent("posts", slug);

  return {
    props: {
      code,
      meta,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const folder = getMarkdownFilesByType("posts");

  return {
    paths: folder.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

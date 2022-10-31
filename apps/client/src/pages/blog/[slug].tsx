import type { GetStaticPaths, GetStaticProps } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import React from 'react';
import { DefaultLayout } from 'layouts/Default';
import type { MarkdownMetadata } from 'lib/mdx';
import { getMarkdownContent, getMarkdownFilesByType } from 'lib/mdx';
import { Paper } from 'components/common/Paper';
import Hero from 'components/Hero';

export interface BlogPostPageProps {
  code: string
  meta: MarkdownMetadata
}

export default function BlogPostPage({ code, meta }: BlogPostPageProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <DefaultLayout>
      <div className="prose">
        <Hero>
          <Hero.Title>{meta.title || 'Blog Post'}</Hero.Title>
          <Hero.Caption>{meta.description || 'Blog Description' }</Hero.Caption>
        </Hero>

        <Paper className="p-6 bg-zinc-900">
          <Component />
        </Paper>
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const { code, meta } = await getMarkdownContent('posts', slug);

  return {
    props: {
      code,
      meta,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const folder = getMarkdownFilesByType('posts');

  return {
    paths: folder.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

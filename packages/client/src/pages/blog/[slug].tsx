import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { BLOG_POST_FILES, getBlogPost } from 'lib/utils/mdx';
import { DefaultLayout } from 'layouts/Default';

export interface BlogPostPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: Record<string, any>;
}

export default function BlogPostPage({ source }: BlogPostPageProps) {
  return (
    <DefaultLayout>
      <MDXRemote {...source} />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { source, metadata } = await getBlogPost(params!.slug as string);

  return {
    props: {
      source,
      metadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOG_POST_FILES.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

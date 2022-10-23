import type { GetStaticProps } from 'next';
import { DefaultLayout } from 'layouts/Default';
import type { BlogPost } from 'lib/utils/mdx';
import { getBlogPosts } from 'lib/utils/mdx';
import Card from 'components/Card';
import Link from 'components/Link';

export interface BlogIndexPageProps {
  posts: BlogPost[]
}

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <DefaultLayout>
      <div>
        {posts.map(({ slug }) => (
          <Card key={slug}>
            <Link to={`/blog/${slug}`}>{slug}</Link>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const posts = getBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

import type { GetStaticProps } from 'next';
import { DefaultLayout } from 'layouts/Default';
import type { MarkdownMetadata } from 'lib/mdx';
import { getMarkdownMetadataByType } from 'lib/mdx';
import Hero from 'components/Hero';
import Card from 'components/Card';
import Button from 'components/Button';
import Link from 'components/Link';

export interface BlogIndexPageProps {
  posts: MarkdownMetadata[]
}

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>Recent<span className="inline-block @jump|1s|infinite font-color:crimson-60">*</span> Blog Posts</Hero.Title>
        <Hero.Caption>*Relative to the insufferable vastness of time, anyway.</Hero.Caption>
      </Hero>

      <main className="grid grid-cols:3 gap:30">
        {posts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="font-color:purple-74!:hover_.title">
            <Card className="group">
              <Card.Title>{post.title}</Card.Title>
              <Card.Caption>{post.description}</Card.Caption>

              <Button>Read More</Button>
            </Card>
          </Link>),
        )}
      </main>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getMarkdownMetadataByType('posts');

  return {
    props: {
      posts,
    },
  };
};

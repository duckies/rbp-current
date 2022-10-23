import Card from 'components/Card';
import Link from 'components/Link';
import type { BlogPost } from 'lib/utils/mdx';

export interface BlogPostProps extends BlogPost {}

export default function BlogPostCard({ slug, metadata }: BlogPostProps) {
  return (
    <Card className="rounded-md bg-gray-800 shadow-md">
      <article>
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-bold">{metadata.title}</h3>
          <span>{metadata.description}</span>
        </Link>
      </article>
    </Card>
  );
}

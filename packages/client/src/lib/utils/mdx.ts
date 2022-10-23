import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export interface MarkdownMetadata {
  title: string;
  description: string;
  date: Date;
}

export interface BlogPost {
  slug: string;
  metadata: MarkdownMetadata;
}

export const BLOG_POST_FOLDER = path.join(process.cwd(), './src/content/blog');
export const BLOG_POST_FILES = fs
  .readdirSync(BLOG_POST_FOLDER)
  .filter((fileName) => /\.mdx?$/.test(fileName))
  .map((fileName) => ({
    slug: fileName.replace(/\.mdx?$/, ''),
    fileName,
  }));

export function getBlogPosts() {
  return BLOG_POST_FILES.map(({ fileName, slug }) => {
    const source = fs.readFileSync(path.join(BLOG_POST_FOLDER, fileName));
    const { data } = matter(source);

    return {
      slug,
      metadata: data,
    };
  });
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(BLOG_POST_FOLDER, `${slug}.mdx`);
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    source: mdxSource,
    metadata: data,
  };
}

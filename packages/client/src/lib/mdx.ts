import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';

export interface MarkdownMetadata {
  title: string
  slug: string
  description: string
  date: Date
}

export interface MarkdownFile {
  name: string
  slug: string
  path: string
}

export type MarkdownType = 'posts' | 'pages';

/**
 * Collects all markdown file names in the directory
 * associated with its type, e.g. posts or pages.
 */
export function getMarkdownFilesByType(type: MarkdownType): MarkdownFile[] {
  const folder = path.join(process.cwd(), `./src/content/${type}`);

  return fs.readdirSync(folder)
    .filter(fileName => /\.mdx?$/.test(fileName))
    .map(fileName => ({
      name: fileName,
      slug: fileName.replace(/\.mdx?$/, ''),
      path: path.join(process.cwd(), `./src/content/${type}/${fileName}`),
    }));
}

/**
 * Collects the frontmatter of a type of markdown file.
 */
export function getMarkdownMetadataByType(type: MarkdownType) {
  const files = getMarkdownFilesByType(type);

  return files.map((file) => {
    const source = fs.readFileSync(file.path, 'utf8');
    const { data } = matter(source);

    // TODO: Should validate and discard malformed mdx files.
    return { slug: file.slug, ...data } as MarkdownMetadata;
  });
}

export async function getMarkdownContent(type: MarkdownType, slug: string) {
  const filePath = path.join(process.cwd(), './src/content', type, `${slug}.mdx`);

  const { code, frontmatter } = await bundleMDX({
    file: filePath,
    cwd: path.join(process.cwd(), `./src/content/${type}`),
  });

  return {
    meta: frontmatter,
    code,
  };
}

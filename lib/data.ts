import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import { Post, PostWithContent } from '../types/Post';

type Matter = Omit<GrayMatterFile<string>, 'data' | 'excerpt'> & {
  data: { title: string; date: Date };
  excerpt: string;
};

const contentFolder = () => path.join(process.cwd(), '_content');

const readFile = (file: string) => fs.readFileSync(path.join(contentFolder(), file), 'utf-8');

const extractPost = (fileContent: string, fileName: string): Post => {
  const {
    content,
    data: { title, date },
    excerpt,
  } = matter(fileContent, { excerpt: true }) as Matter;

  return {
    title,
    content: content.split('---\n')[1],
    excerpt: excerpt!,
    slug: fileName.slice(0, -3),
    date: date.toISOString(),
  };
};

const loadPost = (fileName: string): Post => {
  const content = readFile(fileName);
  return extractPost(content, fileName);
};

export const getPosts = (): Post[] => {
  const files = fs.readdirSync(contentFolder());
  return files.map((file) => loadPost(file));
};

export const getSlugs = (): string[] =>
  fs.readdirSync(contentFolder()).map((fileName) => fileName.slice(0, -3));

export const getPostBySlug = async (slug: string): Promise<PostWithContent> => {
  const fileName = `${slug}.md`;
  const post = loadPost(fileName);
  const content = await renderToString(post.content);
  return {
    ...post,
    content,
  };
};

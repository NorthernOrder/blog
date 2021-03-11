import { MdxRemote } from 'next-mdx-remote/types';

export interface Post {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
}

export type PostWithContent = Omit<Post, 'content'> & { content: MdxRemote.Source };

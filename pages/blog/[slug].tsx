import hydrate from 'next-mdx-remote/hydrate';
import { parseISO, format } from 'date-fns';
import Head from 'next/head';
import { getPostBySlug, getSlugs } from '../../lib/data';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PostWithContent } from '../../types/Post';

export default function BlogPostPage(props: PostWithContent) {
  const { title, content, date } = props;

  const hydrated = hydrate(content);

  return (
    <>
      <Head>
        <title>{title} - NRTH Blog</title>
      </Head>
      <header>
        <h2>{title}</h2>
        <p>{format(parseISO(date), 'dd.MM.yyyy HH:mm')}</p>
      </header>
      <article>{hydrated}</article>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostWithContent> = async (ctx) => {
  const post = await getPostBySlug(ctx.params?.['slug'] as string);

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths: slugs,
    fallback: false,
  };
};

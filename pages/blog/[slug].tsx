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
      <div className="rounded-md p-4 dark:bg-gray-800 bg-gray-50 space-y-2">
        <header>
          <h2 className="text-4xl font-bold dark:text-gray-300">{title}</h2>
          <p className="dark:text-gray-500">{format(parseISO(date), 'dd.MM.yyyy HH:mm')}</p>
        </header>
        <hr className="border-gray-500" />
        <article className="prose dark:prose-light max-w-none flex-grow">{hydrated}</article>
      </div>
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

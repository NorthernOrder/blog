import { parseISO, format } from 'date-fns';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPosts } from '../lib/data';
import { Post } from '../types/Post';

interface IndexPageProps {
  posts: Post[];
}

const PostOverview = ({ title, date, excerpt, slug }: Post) => {
  return (
    <section>
      <Link href={`/blog/${slug}`}>
        <a>{title}</a>
      </Link>
      <p>{format(parseISO(date), 'dd.MM.yyyy HH:mm')}</p>
      <p>{excerpt}</p>
    </section>
  );
};

export default function IndexPage({ posts }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>NRTH Blog</title>
      </Head>
      <article>
        {posts.map((post) => (
          <PostOverview {...post} key={post.slug} />
        ))}
      </article>
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
};

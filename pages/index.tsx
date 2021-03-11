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
    <Link href={`/blog/${slug}`}>
      <a>
        <section className="rounded-md p-4 leading-4 shadow-md transition ease-linear hover:shadow-lg border bg-gray-200 border-gray-100 dark:bg-gray-700 dark:border-gray-600 transform hover:scale-105">
          <span className="text-2xl font-bold leading-4 dark:text-gray-300">{title}</span>
          <p className="leading-6 dark:text-gray-500">
            {format(parseISO(date), 'dd.MM.yyyy HH:mm')}
          </p>
          <p className="leading-6 dark:text-gray-300">
            {excerpt.split('\\n').map((line) => (
              <>
                <span className="block leading-tight">{line}</span>
              </>
            ))}
          </p>
        </section>
      </a>
    </Link>
  );
};

export default function IndexPage({ posts }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>NRTH Blog</title>
      </Head>
      <div>
        <article className="flex flex-col space-y-4 lg:space-y-6">
          {posts.map((post) => (
            <PostOverview {...post} key={post.slug} />
          ))}
        </article>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const posts = getPosts();
  posts.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};

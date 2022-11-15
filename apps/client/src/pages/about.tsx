import type { GetStaticProps } from 'next';
import { getMarkdownContent } from 'lib/mdx';
import Hero from 'components/Hero';
import { DefaultLayout } from 'components/layouts/Default';

export default function AboutPage() {
  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>About the Guild</Hero.Title>
        <Hero.Caption>The sacred texts</Hero.Caption>
      </Hero>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getMarkdownContent('pages', 'about');

  return {
    props: {
      page,
    },
  };
};

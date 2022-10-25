import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { DefaultLayout } from 'layouts/Default';
import Card from 'components/Card';
import Container from 'components/Container';
import Textfield from 'components/forms/Textfield';
import Hero from 'components/Hero';
import { getForm, useForm } from 'hooks/stores/useForm';

export default function ApplyPage() {
  const { data } = useForm(1);

  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>Application</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      <Container>
        {data?.fields.map(field => (
          <Card key={field.id}>
            <Textfield id={field.id} label={field.label} />
          </Card>
        ))}
      </Container>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['form', 1], () => getForm(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

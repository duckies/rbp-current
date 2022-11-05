import { QueryClient, dehydrate } from '@tanstack/react-query';
import Paper from 'components/common/Paper';
import Hero from 'components/Hero';
import { getForm, getFieldComponent as getFormFieldComponent, useForm } from 'hooks/stores/useForm';
import { DefaultLayout } from 'layouts/Default';
import type { GetServerSideProps } from 'next';

export default function ApplyPage() {
  const { data } = useForm(1);

  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>Application</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      <Paper >
        {data?.fields.map((field) => {
          const Component = getFormFieldComponent(field as any);
          return (
            <div key={field.id} className="mb:30">
              <Component id={field.id} label={field.label} />
            </div>
          );
        })}
      </Paper>
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

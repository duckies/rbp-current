import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import type { FormFieldEntityDTO } from '@rbp/server';
import CharacterSelector from 'components/forms/Character';
import { DefaultLayout } from 'layouts/Default';
import Textfield from 'components/forms/Textfield';
import Hero from 'components/Hero';
import { getForm, useForm } from 'hooks/stores/useForm';
import Textarea from 'components/forms/Textarea';
import Paper from 'components/common/Paper';

function getFieldComponent(field: FormFieldEntityDTO) {
  switch (field.type) {
    case 'Text':
      if (field.options?.multiline) {
        return Textarea;
      }
      return Textfield;
    case 'Select':
      throw new Error('Select field NYI.');
    case 'Combobox':
      throw new Error('Combobox field NYI.');
    case 'Checkbox':
      throw new Error('Checkbox field NYI.');
    case 'Character':
      return CharacterSelector;
  }
}

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
          const Component = getFieldComponent(field);
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

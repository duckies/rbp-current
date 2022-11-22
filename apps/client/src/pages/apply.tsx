import { dehydrate, QueryClient } from "@tanstack/react-query";
import Button from "components/Button";
import Hero from "components/Hero";
import { DefaultLayout } from "components/layouts/Default";
import Paper from "components/Paper";
import { getFieldComponent as getFormFieldComponent, getForm, useForm } from "hooks/stores/useForm";
import { getMe } from "lib/auth";
import type { GetServerSideProps } from "next";
import { FormProvider, useForm as useFormHook } from "react-hook-form";

export default function ApplyPage() {
  const { data } = useForm(1);
  const form = useFormHook();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>Application</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      {/* REMOVE */}
      {/* <DevTool control={form.control} /> */}

      <Paper className="flex flex-col gap-y-7">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {data?.fields.map((field) => {
              const Component = getFormFieldComponent(field as any);
              return (
                <div key={field.id} className="mb-5">
                  <Component id={field.id} name={field.id} label={field.label} form={form} />
                </div>
              );
            })}

            <div className="flex justify-end gap-3">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormProvider>
      </Paper>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const token = ctx.req.cookies.token;

  await queryClient.prefetchQuery(["form", 1], () => getForm(1));

  if (token) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        user: await getMe(token),
        token,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

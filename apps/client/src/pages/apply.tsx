import { dehydrate, QueryClient } from "@tanstack/react-query";
import Button from "components/Button";
import Paper from "components/common/Paper";
import Hero from "components/Hero";
import { DefaultLayout } from "components/layouts/Default";
import { Stepper } from "components/Stepper";
import { getFieldComponent as getFormFieldComponent, getForm, useForm } from "hooks/stores/useForm";
import { useStepper } from "hooks/useStepper";
import { getMe } from "lib/auth";
import type { GetServerSideProps } from "next";
import type { FormEvent } from "react";

const steps = [
  { step: 1, label: "Character Selection" },
  { step: 2, label: "Application" },
  { step: 3, label: "Review" },
];

export default function ApplyPage() {
  const { currentStep, next, previous } = useStepper({ steps });
  const { data } = useForm(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.debug(e);
    next();
  };

  return (
    <DefaultLayout>
      <Hero>
        <Hero.Title>Application</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      <Paper className="flex flex-col gap-y-7">
        <Stepper steps={steps} currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          {data?.fields.map((field) => {
            const Component = getFormFieldComponent(field as any);
            return (
              <div key={field.id} className="mb-5">
                <Component id={field.id} label={field.label} />
              </div>
            );
          })}

          <div className="flex justify-end gap-3">
            <Button type="button" onPress={previous}>
              Previous Step
            </Button>
            <Button type="submit">{currentStep >= steps.length ? "Submit" : "Next"}</Button>
          </div>
        </form>
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

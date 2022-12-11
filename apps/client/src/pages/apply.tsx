import { dehydrate, QueryClient } from "@tanstack/react-query"
import Hero from "components/Hero"
import Paper from "components/Paper"
import { getForm } from "hooks/stores/useForm"
import { getMe } from "lib/auth"
import type { GetServerSideProps } from "next"
import Image from "next/image"

export default function ApplyPage() {
  // const { data } = useForm(1)
  // const form = useFormHook()

  // const onSubmit = (data: any) => {
  //   console.log(data)
  // }

  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Maintenance</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>
      <Paper className="relative overflow-hidden shadow-xl">
        <h2 className="mb-3 text-2xl font-bold">Application Offline 🚧</h2>

        <p>
          Our application is temporarily offline for upgrades to support Dragonflight. If you are
          interested in applying to join our guild contact our recruiter through Discord at{" "}
          <code className="rounded-md bg-yellow/70 px-1.5 py-1">Azzekal#6909</code>.
        </p>

        <Image
          className="pointer-events-none absolute bottom-[-10px] right-0 rotate-[-35deg]"
          src="/images/doodads/duck.png"
          width="62"
          height="62"
          alt="WoW duck"
        />
      </Paper>
    </>
  )

  // return (
  //   <>
  //     <Hero>
  //       <Hero.Title>Application</Hero.Title>
  //       <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
  //     </Hero>

  //     <Paper className="flex flex-col gap-y-7">
  //       <FormProvider {...form}>
  //         <form onSubmit={form.handleSubmit(onSubmit)}>
  //           {data?.fields.map((field) => {
  //             const Component = getFormFieldComponent(field as any)
  //             return (
  //               <div key={field.id} className="mb-5">
  //                 <Component
  //                   disabled
  //                   id={field.id}
  //                   name={field.id}
  //                   label={field.label}
  //                   form={form}
  //                 />
  //               </div>
  //             )
  //           })}

  //           <div className="flex justify-end gap-3">
  //             <Button type="submit">Submit</Button>
  //           </div>
  //         </form>
  //       </FormProvider>
  //     </Paper>
  //   </>
  // )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const token = ctx.req.cookies.token

  await queryClient.prefetchQuery(["form", 1], () => getForm(1))

  if (token) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        user: await getMe(token),
        token,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

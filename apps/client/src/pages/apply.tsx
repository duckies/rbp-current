import type { DiscriminatedFormField } from "@rbp/server"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import Button from "components/Button"
import { Error } from "components/Error"
import Hero from "components/Hero"
import Paper from "components/Paper"
import { getForm } from "features/application/api"
import { useForm } from "features/application/useForm"
import { getFieldComponent } from "features/application/utils"
import { getMe } from "lib/auth"
import type { GetServerSideProps } from "next"

export default function ApplyPage() {
  const { data, status, form } = useForm(1)
  const fields = data?.fields as DiscriminatedFormField[]

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Hero>
        <Hero.Title>Application</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      {(!data && (
        <Paper className="relative mb-5 h-[200px]">
          <div className="absolute inset-3 flex animate-fade-in items-center justify-center rounded-md bg-surface-500">
            {status === "loading" && <div>Loading...</div>}
            {status === "error" && (
              <Error message="Unable to retrieve application form. Try again later." />
            )}
          </div>
        </Paper>
      )) || (
        <Paper className="flex flex-col gap-y-7">
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error(errors))}>
            {fields.map((field) => (
              <div key={field.id} className="my-4">
                {getFieldComponent(form, field)}
              </div>
            ))}

            <div className="flex justify-end gap-3">
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </Paper>
      )}

      <Paper className="mt-4">
        <div className="prose">
          <pre>{JSON.stringify({ values: form.getValues() }, null, 2)}</pre>
        </div>
      </Paper>
    </>
  )
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

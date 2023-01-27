import type { Form } from "@rbp/server"
import { useQuery } from "@tanstack/react-query"
import { getForm } from "features/application/api"
import { useMemo } from "react"
import { useForm as _useForm } from "react-hook-form"

export const useForm = (id: number) => {
  const { data, status, error } = useQuery<Form>(["form", id], () => getForm(id), { retry: false })
  const form = _useForm()

  return useMemo(
    () => ({
      data,
      status,
      error,
      form,
    }),
    [data, status, error, form, id]
  )
}

export type UseFormReturn = ReturnType<typeof useForm>["form"]

import type { Form } from "@rbp/server"
import { useQuery } from "@tanstack/react-query"
import { getForm } from "features/application/api"
import { useMemo } from "react"
import type { UseFormReturn } from "react-hook-form"
import { useForm as _useForm } from "react-hook-form"

export type FieldProps = {
  id: string
  form: UseFormReturn<any, any>
}

export const useForm = (id: number) => {
  const { data, status, error } = useQuery<Form>(["form", id], () => getForm(id))
  const form = _useForm()

  return useMemo(() => ({ data, status, error, form }), [data, status, error, form, id])
}

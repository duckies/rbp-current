import type { Form } from "@rbp/server"
import { useQuery } from "@tanstack/react-query"
import { getForm } from "hooks/queries/form"
import { useMemo } from "react"
import { useForm as useHookForm } from "react-hook-form"

export function useForm(id: number) {
  const { data, status, error } = useQuery<Form>(["form", id], () => getForm(id))
  const hookForm = useHookForm()

  return useMemo(
    () => ({ data, status, error, form: hookForm }),
    [data, status, error, hookForm, id]
  )
}

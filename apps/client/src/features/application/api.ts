import type { Form } from "@rbp/server"
import { $get } from "lib/utils/fetch"

export function getForm(id: number) {
  return $get<Form>(`/form/${id}`)
}

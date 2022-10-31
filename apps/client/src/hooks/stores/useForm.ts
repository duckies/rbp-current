import type { Form, FormField, FormFieldEntityDTO } from '@rbp/server';
import { useQuery } from '@tanstack/react-query';
import { $get } from 'lib/utils/fetch';

export function getForm(id: number) {
  return $get<Form & { fields: FormFieldEntityDTO[] }>(`/form/${id}`);
}

export function useForm(id: number) {
  return useQuery(['form', id], () => getForm(id));
}

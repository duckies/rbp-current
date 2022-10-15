import type { Form, FormField } from '@rbp/server';
import { useQuery } from '@tanstack/react-query';
import { $get } from 'lib/utils/fetch';

export function getForm(id: number) {
  return $get<Form & { fields: FormField[] }>(`/form/${id}`);
}

export function useForm(id: number) {
  return useQuery(['form', id], () => getForm(id));
}

import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, TaskFormData } from '../types';

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project['_id'];
};
export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPIType, 'formData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

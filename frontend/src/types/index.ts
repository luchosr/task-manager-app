import { z } from 'zod';

type TaskStatus =
  | 'pending'
  | 'on hold'
  | 'in progress'
  | 'under review'
  | 'completed';

export const taskStatusSchema = z.enum([
  'pending',
  'on hold',
  'in progress',
  'under review',
  'completed',
]);

export type Task = z.infer<typeof taskSchema>;

export type TaskFormData = Pick<Task, 'name' | 'description'>;
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: z.string(),
});
/** Projects */

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  status: z.string(),
});

export const dashBoardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;

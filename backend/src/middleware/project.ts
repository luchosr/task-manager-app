import type { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project';

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}
export async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error('Cannot find the project');
      res.status(404).json({ error: error.message });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Ups! Something went wrong' });
  }
}
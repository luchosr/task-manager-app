import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.send('Project Created');
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error('Cannot find the project');
        res.status(400).json({ error: error.message });
        return;
      }

      res.json(project); // Enviar la respuesta pero no devolverla
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const project = await Project.findByIdAndUpdate(id, req.body);

      if (!project) {
        const error = new Error('Cannot find the project');
        res.status(400).json({ error: error.message });
        return;
      }
      await project.save();
      res.send('Project Updated');
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error('Cannot find the project');
        res.status(400).json({ error: error.message });
        return;
      }
      await project.deleteOne();

      res.send('Project Removed');
    } catch (error) {
      console.log(error);
    }
  };
}

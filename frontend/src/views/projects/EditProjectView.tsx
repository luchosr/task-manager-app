import { getProjectById } from '@/api/ProjectAPI';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import EditProjectForm from './EditProjectForm';

export default function EditProjectView() {
  const params = useParams();

  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (isError) return <Navigate to={'/404'} />;

  if (data) return <EditProjectForm data={data} projectId={projectId} />;
}

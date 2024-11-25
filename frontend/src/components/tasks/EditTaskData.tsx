import { useLocation } from 'react-router-dom'

export default function EditTaskData() {
  const location = useLocation();
  const queryParamas = new URLSearchParams(location.search);
  const editTask = queryParamas.get('editTask');
  console.log(editTask);
  return (
    <div>EditTaskData</div>
  )
}

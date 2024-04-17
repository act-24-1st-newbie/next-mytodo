import TaskItem from "./TaskItem";

/**
 * TaskList Component
 *
 * @param {{
 * onDelete: (formData: FormData) => void,
 * onUpdateCheck: (formData: FormData) => void
 * }} param0
 */
export default function TaskList({ tasks, onDelete, onUpdateCheck }) {
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdateCheck={onUpdateCheck} />
      ))}
    </ul>
  );
}

import TaskItem from "./TaskItem";

/**
 * TaskList Component
 *
 * @param {{
 *  tasks: any[]
 * }} param0
 */
export default function TaskList({ tasks }) {
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteAll } from "@/lib/actions";
import TaskList from "./TaskList";

/**
 * TaskWrapper component
 * @param {{tasks: any[]}} param0
 */
export default function TaskWrapper({ tasks }) {
  const [order, setOrder] = useState("Oldest");

  /** @param {{id: number}[]} list  */
  function sorted() {
    if (order === "Latest") {
      return tasks.toSorted((a, b) => b.id - a.id);
    }
    return tasks.toSorted((a, b) => a.id - b.id);
  }

  return (
    <div>
      <div className="container flex justify-between items-center mt-4">
        <Select value={order} onValueChange={setOrder}>
          <SelectTrigger className="w-[120px]">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Oldest">Oldest</SelectItem>
            <SelectItem value="Latest">Latest</SelectItem>
          </SelectContent>
        </Select>
        <form action={deleteAll}>
          <SubmitButton variant="outline">Clear All</SubmitButton>
        </form>
      </div>
      <div className="container mt-4">
        <TaskList tasks={sorted()} />
      </div>
    </div>
  );
}

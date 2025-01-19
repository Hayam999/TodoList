import { makeTask } from "./task";
import { projectStore } from "./store.js";
export function project(name, id, tasks) {
  return {
    name: name,
    id: id,
    tasks: tasks,
    addTask(title, description, dueDate, priority, notes, check) {
      const newTask = makeTask(
        title,
        description,
        dueDate,
        priority,
        notes,
        check,
      );
      this.tasks.push(newTask);
      projectStore.addTask(this.id, newTask);
      return newTask;
    },
    changeName(newName) {
      this.name = newName;
      projectStore.updateOne(this);
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks = this.tasks.splice(index, 1);
      projectStore.removeTask(this.id, index);
    },
    updateTask(newTask) {
      const index = this.tasks.indexOf(newTask);
      projectStore.updateTask(this.id, index, newTask);
    },
    removeProject() {
      projectStore.deleteOne(this.id);
    },
  };
}

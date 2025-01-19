import { project } from "./project.js";
import { makeTask } from "./task.js";

// load and reconstruct tasks
function loadTasks(tasks) {
  return tasks.map((task) =>
    makeTask(
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      task.notes,
      task.check,
    ),
  );
}

const projectStore = {
  storageKey: "projects",

  serialize(proj) {
    return {
      id: proj.id,
      name: proj.name,
      tasks: proj.tasks.map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        notes: task.notes,
        check: task.check,
      })),
    };
  },

  // Save projects
  save(projects) {
    const data = projects.map((proj) => this.serialize(proj));
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  },

  // Load and reconstruct projects
  load() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return data.map((proj) =>
      project(proj.name, proj.id, loadTasks(proj.tasks)),
    );
  },
  // Update projects
  update(updatedProjects) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const dataMap = new Map(currentData.map((proj) => [proj.id, proj]));

    updatedProjects.forEach((proj) => {
      const serializedProj = this.serialize(proj);
      dataMap.set(proj.id, serializedProj);
    });

    const updatedData = Array.from(dataMap.values());

    localStorage.setItem(this.storageKey, JSON.stringify(updatedData));

    return updatedData.map((proj) =>
      project(proj.name, proj.id, loadTasks(proj.tasks)),
    );
  },

  // Update a single Project
  updateOne(updatedProject) {
    return this.update([updatedProject]);
  },

  // Add a task to a specific projects Array
  addTask(projId, newTask) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetProject = currentData.find((item) => item.id === projId);

    if (targetProject) {
      targetProject.tasks.push({
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        notes: newTask.notes,
        check: newTask.check,
      });

      return this.update([
        project(targetProject.name, projId, loadTasks(targetProject.tasks)),
      ]);
    }
    return this.load();
  },

  // Remove a task from a project project's array
  removeTask(projId, taskIndex) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetProject = currentData.find((item) => item.id === projId);

    if (targetProject && targetProject.tasks[taskIndex]) {
      targetProject.tasks.splice(taskIndex, 1);

      return this.update([
        project(targetProject.name, projId, loadTasks(targetProject.tasks)),
      ]);
    }
    return this.load();
  },

  // Update a specific task in the array
  updateTask(projId, taskIndex, newTask) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const targetProject = currentData.find((item) => item.id === projId);

    if (targetProject && targetProject.tasks[taskIndex]) {
      targetProject.tasks[taskIndex] = {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        notes: newTask.notes,
        check: newTask.check,
      };
      return this.update([
        project(targetProject.name, projId, loadTasks(targetProject.tasks)),
      ]);
    }
    return this.load();
  },

  // delete all projects
  delete(ids) {
    const currentData = JSON.parse(
      localStorage.getItem(this.storageKey) || "[]",
    );
    const updatedData = currentData.filter((item) => !ids.includes(item.id));
    localStorage.setItem(this.storageKey, JSON.stringify(updatedData));
    return updatedData.map((item) =>
      project(item.name, item.id, loadTasks(item.tasks)),
    );
  },

  deleteOne(id) {
    return this.delete([id]);
  },

  clear() {
    localStorage.removeItem(this.storageKey);
    return [];
  },
};

export { projectStore };

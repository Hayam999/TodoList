import { makeTask } from "./task";

export function project(name) {
    const tasks = [];
    
    return {
        name: name,
        tasks,
        addTask(title, description, dueDate,
            priority, notes, check) {
            const newTask = makeTask(title, description,
                                     dueDate,priority,
                                     notes, check);
            this.tasks.push(newTask);
            return newTask;
        },
        changeName(newName) {
            this.name = newName;
        }
    }
}



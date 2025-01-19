import { project } from "./project.js";

export function makeTask(title, description, dueDate, priority, notes, check) {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    notes: notes,
    check: check,
    editTitle(newTitle, proj) {
      this.title = newTitle;
      proj.updateTask(this);
    },
    editDescription(newDes, proj) {
      this.description = newDes;
      proj.updateTask(this);
    },
    editDueDate(newDate, proj) {
      this.dueDate = newDate;
      proj.updateTask(this);
    },
    editPriority(newPri, proj) {
      this.priority = newPri;
      proj.updateTask(this);
    },
    editNotes(newNotes, proj) {
      this.notes = newNotes;
      proj.updateTask(this);
    },
    editCheck(proj) {
      this.check = !this.check;
      proj.updateTask(this);
    },
    prioColor() {
      switch (this.priority) {
        case "urgent":
          return "#FF6361";
        case "high":
          return "#BC5090";
        case "medium":
          return "#6F975C";
        case "low":
          return "#494CA2";
        default:
          return "#2F2F2F";
      }
    },
  };
}

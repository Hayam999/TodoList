export function makeTask(title, description, dueDate,
    priority, notes, check)
 {
    return {

        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        check: check,

        change: {

            title(newTitle) {
                this.title = newTitle;
            },
            description(newDes) {
                this.description = newDes;
            },
            dueDate(newDate) {
                this.dueDate = newDate;
            },
            priority(newPri) {
                this.priority = newPri;
            },
            notes(newNotes) {
                this.notes = newNotes;
            },
            check() {
                this.check = !(this.check);
            }
            
        }
    }
}

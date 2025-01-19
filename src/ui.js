import { projArr, removeProject } from "./data.js";
import { submitTask } from "./logic-flow.js";

//Fetch data from template.html
const content = document.getElementById("content");
const sidebar = document.getElementById("sidebar");
const mainArea = document.getElementById("main-area");

let currentProj;

// loop through the array of projects and display them on screen
export function addProjectsToSideBar() {
  for (const proj of projArr) {
    const project = document.createElement("div");
    const deleteProj = document.createElement("button");
    deleteProj.textContent = "Delete Project";
    deleteProj.addEventListener("click", () => {
      removeProject(proj);
      project.remove();
    });
    const projectName = document.createElement("div");
    projectName.textContent = "# " + proj.name;
    projectName.addEventListener("click", () => {
      displayProj(proj);
    });

    project.append(projectName, deleteProj);
    sidebar.appendChild(project);
  }
  content.appendChild(sidebar);
}

// add fresh projects "which weren't in projArr" to the sidebar
export function addToSideBar(proj) {
  const projDiv = document.createElement("div");
  const projName = document.createElement("div");
  projName.textContent = "# " + proj.name;

  const deleteProj = document.createElement("button");
  deleteProj.textContent = "Delete Project";
  deleteProj.addEventListener("click", () => {
    removeProject(proj);
    projDiv.remove();
  });

  projName.addEventListener("click", () => {
    displayProj(proj);
  });
  projDiv.append(projName, deleteProj);

  sidebar.append(projDiv);
}

// display a project and it's tasks to the main area
function displayProj(proj) {
  if (currentProj != proj) {
    const taskDialog = document.getElementById("add-task-dialog");

    currentProj = proj;
    mainArea.textContent = "";
    const projName = document.createElement("h3");
    projName.textContent = proj.name;

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add-task-btn";
    addTaskBtn.textContent = "+  Add Task";
    addTaskBtn.addEventListener("click", () => {
      submitTask(proj);
      taskDialog.showModal();
    });

    mainArea.append(projName, addTaskBtn);
    console.log(proj);
    for (const task of proj.tasks) {
      displayTask(task, proj);
    }

    content.appendChild(mainArea);
  }
}

export function displayTask(task, proj) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  // task name div with functionality to expand and show task details
  const clickable = document.createElement("div");
  clickable.className = "clickable-task-div";
  const taskName = document.createElement("h5");
  taskName.textContent = "• " + task.title;
  taskName.style.color = task.prioColor();

  const showTask = document.createElement("button");
  showTask.textContent = "Show Task";
  showTask.addEventListener("click", () => {
    showTask.remove();
    expandTask();
  });
  clickable.append(taskName, showTask);

  // Show due date
  const date = document.createElement("h6");
  date.className = "date-header";
  date.textContent = task.dueDate;

  // add checkbox for task with functionality
  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.check;
  checkbox.addEventListener("change", () => {
    task.editCheck(proj);
  });

  // delete button
  const delBtn = document.createElement("button");
  delBtn.className = "delete-task-btn";
  delBtn.textContent = "Remove";
  delBtn.addEventListener("click", () => {
    proj.removeTask(task);
    taskDiv.remove();
  });

  // append divs
  taskDiv.append(checkbox, clickable, date, delBtn);
  mainArea.appendChild(taskDiv);

  function expandTask() {
    const expandedTask = document.createElement("div");
    expandedTask.className = "expanded-task-space";

    // Description space
    const desDiv = document.createElement("div");
    desDiv.className = "description-div";
    const desH = document.createElement("h4");
    desH.className = "description-header";
    desH.textContent = "Description:";
    const deSpace = document.createElement("textarea");
    deSpace.className = "description-content";
    deSpace.textContent = task.description;

    // Description functionality
    deSpace.addEventListener("input", () => {
      deSpace.style.backgroundColor = "#E7EAEF";
    });
    const deSave = document.createElement("button");
    deSave.className = "save-description-btn";
    deSave.textContent = "Save Description";
    deSave.addEventListener("click", () => {
      task.editDescription(deSpace.value, proj);
    });
    desDiv.append(desH, deSpace, deSave);

    // Notes space
    const notesDiv = document.createElement("div");
    notesDiv.className = "notes-div";
    const notesH = document.createElement("h4");
    notesH.className = "notes-header";
    notesH.textContent = "Notes:";
    const noteSpace = document.createElement("textarea");
    noteSpace.className = "notes-content";
    noteSpace.textContent = task.notes;

    // notes functionality
    noteSpace.addEventListener("input", () => {
      noteSpace.style.backgroundColor = "#E7EAEF";
    });
    const noteSave = document.createElement("button");
    noteSave.className = "save-notes-btn";
    noteSave.textContent = "Save Notes";
    noteSave.addEventListener("click", () => {
      task.editNotes(noteSpace.value, proj);
    });
    notesDiv.append(notesH, noteSpace, noteSave);

    // 3 buttons for editing title, priority and dueDate
    const editTitleBtn = document.createElement("button");
    editTitleBtn.className = "edit-title-btn";
    editTitleBtn.textContent = "Change Title";
    editTitleBtn.addEventListener("click", () => {
      const getTitleExistence = document.getElementById("get-title");
      if (getTitleExistence == null) {
        const getTitle = document.createElement("input");
        getTitle.id = "get-title";
        getTitle.className = "title-input";
        const dontGetTitle = document.createElement("button");
        dontGetTitle.id = "cancel-get-title";
        dontGetTitle.textContent = "X";
        dontGetTitle.addEventListener("click", () => {
          getTitle.remove();
          dontGetTitle.remove();
        });
        getTitle.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            task.editTitle(getTitle.value, proj);
            taskName.textContent = "• " + task.title;
            getTitle.remove();
            dontGetTitle.remove();
          } else if (e.key === "Escape") {
            getTitle.remove();
            dontGetTitle.remove();
          }
        });

        taskDiv.append(getTitle, dontGetTitle);
      }
    });

    const editPrioBtn = document.createElement("button");
    editPrioBtn.className = "edit-priority-btn";
    editPrioBtn.textContent = "Change Priority";
    editPrioBtn.addEventListener("click", () => {
      makePrioField();
    });

    const editDateBtn = document.createElement("button");
    editDateBtn.className = "edit-date-btn";
    editDateBtn.textContent = "Change due date";
    editDateBtn.addEventListener("click", () => {
      const newDateExistence = document.getElementById("newDate");
      if (newDateExistence == null) {
        const newDate = document.createElement("input");
        newDate.id = "newDate";
        newDate.type = "date";
        const dontGetDate = document.createElement("button");
        dontGetDate.id = "cancel-get-date";
        dontGetDate.textContent = "X";
        dontGetDate.addEventListener("click", () => {
          newDate.remove();
          dontGetDate.remove();
        });
        const submitDateBtn = document.createElement("button");
        submitDateBtn.textContent = "Submit Date";

        submitDateBtn.addEventListener("click", () => {
          task.editDueDate(newDate.value, proj);
          date.textContent = task.dueDate;
          newDate.remove();
          submitDateBtn.remove();
          dontGetDate.remove();
        });

        taskDiv.append(newDate, dontGetDate, submitDateBtn);
      }
    });

    // fold the task
    const foldTaskBtn = document.createElement("button");
    foldTaskBtn.id = "fold-task-btn";
    foldTaskBtn.textContent = "fold Task";
    foldTaskBtn.addEventListener("click", () => {
      expandedTask.remove();
      const showTask = document.createElement("button");
      showTask.textContent = "Show Task";
      clickable.appendChild(showTask);
      showTask.addEventListener("click", () => {
        showTask.remove();
        expandTask();
      });
    });

    expandedTask.append(
      desDiv,
      notesDiv,
      editTitleBtn,
      editPrioBtn,
      editDateBtn,
      foldTaskBtn,
    );
    taskDiv.appendChild(expandedTask);

    // make priorities options and submit the change
    function makePrioField() {
      const fieldExistence = document.getElementById("prio-field-options");
      if (fieldExistence === null) {
        const field = document.createElement("fieldset");
        field.id = "prio-field-options";
        field.className = "edit-prio-field";

        const prioArr = ["to-urgent", "to-high", "to-meidum", "to-low"];
        for (const p of prioArr) {
          makePrioOption(p);
        }

        function makePrioOption(p) {
          const pValue = p.substring(3);
          const label = document.createElement("label");
          label.textContent = pValue;
          label.for = p;
          label.className = "proi-label-opt";
          const input = document.createElement("input");
          input.className = "prio-input-opt";
          input.type = "radio";
          input.id = p;
          input.name = p;
          input.value = pValue;
          field.append(label, input);
        }
        const submitOption = document.createElement("button");
        submitOption.textContent = "submit";
        submitOption.id = "submit-prio-Btn";
        submitOption.addEventListener("click", () => {
          const options = field.querySelectorAll('input[type="radio"]');
          for (const opt of options) {
            if (opt.checked) {
              task.editPriority(opt.value, proj);
              taskName.style.color = task.prioColor();
              field.remove();
              submitOption.remove();
            }
          }
        });
        const dontGetPrio = document.createElement("button");
        dontGetPrio.textContent = "X";
        dontGetPrio.addEventListener("click", () => {
          field.remove();
          submitOption.remove();
          dontGetPrio.remove();
        });
        expandedTask.append(field, dontGetPrio, submitOption);
      }
    }
  }
}

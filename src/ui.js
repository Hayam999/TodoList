import { add } from "date-fns";
import { projArr } from "./data.js";
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
    project.textContent = "# " + proj.name;
    project.addEventListener("click", () => {
        displayProj(proj);
    })
    sidebar.appendChild(project);
}
content.appendChild(sidebar);
}

// add fresh projects "which weren't in projArr" to the sidebar
export function addToSideBar(proj) {
    const project = document.createElement("div");
    project.textContent = "# " + proj.name;

    project.addEventListener("click", () => {
        displayProj(proj);
    })

    sidebar.appendChild(project);
}



function displayProj(project) {
    if (currentProj != project) {
        const taskDialog = document.getElementById("add-task-dialog");

        currentProj = project;
        mainArea.textContent = "";
        const projName = document.createElement("h3");
        projName.textContent = project.name;
        console.log(project.name);

        const addTaskBtn = document.createElement("button");
        addTaskBtn.id = "add-task-btn";
        addTaskBtn.textContent = "+  Add Task";
        addTaskBtn.addEventListener("click", () => {
            submitTask(project);
            taskDialog.showModal();
        })

        mainArea.append(projName, addTaskBtn);

        for (task in project.tasks) {
            displayTask(task);
        }

        content.appendChild(mainArea);
}
}

export function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";

    // add checkbox for task 
    const checkbox = document.createElement("input");
    checkbox.id = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.check = "false";
    checkbox.addEventListener("change", () => {
        task.change.check;
        console.log(task.check);
    })

    const clickable = document.createElement("div");
    clickable.id = "clickable-task-div";
    const taskName = document.createElement("h5");
    console.log(task.name);
    taskName.textContent = task.title;
    clickable.appendChild(taskName);

    // append clickable and check square to taskDiv
    taskDiv.append(checkbox, clickable);
    mainArea.appendChild(taskDiv);
}


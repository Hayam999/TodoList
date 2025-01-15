import { addProject } from "./data.js";
import { addProjectsToSideBar, displayTask} from "./ui.js";
import "./style.css";




// functionality for adding projects
const addProjBtn = document.getElementById("add-project-btn");
const addProjDialog = document.getElementById("add-project-dialog");
const addProjForm = document.getElementById("add-project-form");
const cancelProjBtn = document.getElementById("cancel-project");

addProjBtn.addEventListener("click", () => {
    addProjDialog.showModal();
})

addProjForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addProjForm);
    const newProj = addProject(formData.get("name"));
    addProjForm.reset();
    addProjDialog.close();
})

cancelProjBtn.addEventListener("click", () => {
    addProjForm.reset();
    addProjDialog.close();
})






// functionality for adding tasks
const addTaskDialog = document.getElementById("add-task-dialog");
const addTaskForm = document.getElementById("add-task-form");
const cancelTaskBtn = document.getElementById("cancel-form");
const prioTrigger = document.getElementById("priority-trigger");
const prioFieldset = document.getElementById("priority-fieldset");
let prioVisibility = false;

export function submitTask(project) {

    addTaskForm.onsubmit = (e) => { 
        e.preventDefault();
        const formData = new FormData(addTaskForm);
        const newTask = project.addTask(formData.get("title"),
                        formData.get("description"), 
                        formData.get("dueDate"),
                        formData.get("priority"),
                        formData.get("notes"),
                        formData.get("check"));
        addTaskDialog.close();
        addTaskForm.reset();
        displayTask(newTask);
    };
    
    cancelTaskBtn.onclick = () => { 
        addTaskDialog.close();
        addTaskForm.reset();
    };

    prioTrigger.onclick = () => {
        prioVisibility = !prioVisibility;
        if (prioVisibility) {
            prioFieldset.style.display = prioVisibility ? 'block' : 'none';
        }
    }
}


// display initial projects when the dom is loading
addProjectsToSideBar();

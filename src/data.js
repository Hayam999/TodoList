import { project } from "./project.js";
import { addToSideBar } from "./ui.js";

const projArr = [];

const inbox = project("inbox");
projArr.push(inbox);

function addProject(name) {
    const newProj = project(name);
    projArr.push(newProj);
    addToSideBar(newProj);
}

export { projArr, addProject };
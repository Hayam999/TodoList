import { project } from "./project.js";
import { addToSideBar } from "./ui.js";
import { projectStore } from "./store.js";

let projArr = projectStore.load();

function addProject(name) {
  const newProj = project(name, projArr.length + 1, []);
  projArr.push(newProj);
  addToSideBar(newProj);
  projectStore.updateOne(newProj);
}
function removeProject(p) {
  p.removeProject();
  const index = projArr.indexOf(p);
  projArr = projArr.splice(index, 1);
}

export { projArr, addProject, removeProject };

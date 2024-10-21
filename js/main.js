let tasks = [
    {
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        title: "Répondre à mes emails",
        priority: 3
    }
];
const section = document.querySelector("#liste");
const tableau = document.querySelectorAll("#liste li label");
const addTaskForm = document.querySelector("#add-task-form");
const removeTaskBtn = document.querySelector('#remove');

let i = 0;

for (let li of tableau) {
    li.innerHTML = '<input type="checkbox"></input>' + tasks[i].title;
    if (tasks[i].priority == 1) {
        li.classList.add("élevée");
    } else if (tasks[i].priority == 2) {
        li.classList.add("normale");
    } else {
        li.classList.add("faible");
    }
    i++;
}


/*-----ADD TASK ----*/

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("add");
    // on recupere le formulaire
    const formData = new FormData(addTaskForm);
    const taskContent = [formData.get("task_title"), formData.get("task_priority")];
    // on crée la task
    const newTask = document.createElement('li');
    const newInput = document.createElement('input');
    newInput.type = 'checkbox';
    const newLabel = document.createElement('label');
    newLabel.append(document.createTextNode(taskContent[0]));
    //on organise les élements
    newTask.append(newInput, newLabel);
    section.append(newTask);
    //changer la priorité
    if(taskContent[1] == 1){
        newLabel.classList.add("élevée");
    }else if(taskContent[1] == 2){
        newLabel.classList.add("normale");
    }else{
        newLabel.classList.add("faible");
    }
    tasks.push({title: taskContent[0], priority: taskContent[1]});
    console.log(tasks);
})


/*----- REMOVE TASK ----- */

removeTaskBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("remove");
    const checkboxs = document.querySelectorAll("input[type='checkbox']:checked")
    for(let box of checkboxs){
        const label = box.closest('label').textContent;
        console.log(label);
        tasks.splice(tasks.findIndex(label,1));
        console.log(tasks);
        box.closest('li').remove();
    }
})




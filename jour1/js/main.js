// Constantes pour les priorités
const PRIORITY_HIGH = 1;
const PRIORITY_NORMAL = 2;
const PRIORITY_LOW = 3;
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
// // // Correction
function refreshTasks() {
    // On vide la liste préccédente
    element.taskList.innerHTML = '';
    //Creation de la task
    for (let task of tasks) {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const labelContent = document.createElement(task.title);
        input.type = checkboxs;
        //on met a jour la prop inCompleted lorque la tache est coché
        input.addEventListener('change',(e)=>{
            task.isCompleted = input.checked;
        })

        // Gestion de la priorité  
        label.append(input, labelContent);
        li.append(label);
        Element.taskList.append(li);
    }
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
    if (taskContent[1] == 1) {
        newLabel.classList.add("élevée");
    } else if (taskContent[1] == 2) {
        newLabel.classList.add("normale");
    } else {
        newLabel.classList.add("faible");
    }
    tasks.push({ title: taskContent[0], priority: taskContent[1] });
    console.log(tasks);
})

// // // Corection non fini
// elements.taskForm.addEventListener('submit', (e)=>{
//     e.preventDefault();

//     const formData = FormData(elements.taskForm);
    
//     refreshTasks();
// })


/*----- REMOVE TASK ----- */

removeTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("remove");
    const checkboxs = document.querySelectorAll("input[type='checkbox']:checked")
    for (let box of checkboxs) {
        const label = box.closest('label').textContent;
        console.log(label);
        tasks.splice(tasks.findIndex(label, 1));
        console.log(tasks);
        box.closest('li').remove();
    }
})

// // Corection
// // le bouton n'est pas dans un formulaire donc pas besoin de prevent default
// elements.removeTaskBtn.addEventListener('click', ()=>{
//     // on supprime tout les isCompleted
//     tasks = tasks.filter(task => !task.isCompleted);
//     //=> on recupere un tab de toute les tache non complété
//     //on met a jour l'affichage
//     refreshTasks();
// })


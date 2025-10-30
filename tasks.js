class Task {
    id;
    details;
    deadlineDate;
    deadlineTime;

    constructor(cId, cDetails, cDeadlineDate, cDeadlineTime) {
        this.id = cId;
        this.details = cDetails;
        this.deadlineDate = cDeadlineDate;
        this.deadlineTime = cDeadlineTime;
    }
}

function addTask(event) {
    event.preventDefault();
    const taskForm = event.target;
    const details = taskForm.details.value;
    const deadlineDate = (new Date(taskForm.deadlineDate.value)).toLocaleDateString('en-GB');
    const deadlineTime = taskForm.deadlineTime.value;
    const task = new Task(id, details, deadlineDate, deadlineTime);
    tasksList.push(task);
    console.log("taskList after adding a task------>", tasksList);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    createCards();
    id++;
    taskForm.reset();
}

function createCards() {
    const mainDiv = document.querySelector("#div-main-id");

    mainDiv.innerHTML = "";
    for (let i=0 ; i<tasksList.length ; i++) {
        const task = tasksList[i];
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "div-card-class position-relative");
        cardDiv.setAttribute("id", "div-card-id-"+i);
        mainDiv.appendChild(cardDiv);

        const card = document.querySelector("#div-card-id-"+i);

        const delButton = document.createElement("button");
        delButton.setAttribute("class", "delete-button");
        delButton.setAttribute("id", "delete-button-id-"+i);
        delButton.setAttribute("onclick", "deleteTask('" + task.id + "')");
        
        const taskDetails = document.createElement("p");
        taskDetails.setAttribute("class", "details-class");
        taskDetails.innerText = task.details;

        const taskDateTime = document.createElement("p");
        taskDateTime.setAttribute("class", "date-time-class mb-0");
        taskDateTime.innerText = task.deadlineDate + "\n" + task.deadlineTime;

        card.append(delButton, taskDetails, taskDateTime);

        const deleteButton = document.querySelector("#delete-button-id-"+i);
        const icon = document.createElement("i");
        icon.setAttribute("class", "bi bi-x-square-fill delete-button-i");
        deleteButton.appendChild(icon);
    }
}

function deleteTask(taskId) {
    for (let i=0 ; i<tasksList.length ; i++) {
        if (tasksList[i].id === +taskId) {
            tasksList.splice(i,1);            
            break;
        }
    }
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    createCards();
}

let tasksList = [];
const now = new Date();
let id=1;

tasksListFromLocal = localStorage.getItem("tasksList");
if (tasksListFromLocal) {
    const tasksListArray = JSON.parse(tasksListFromLocal);
    if (tasksListArray.length > 0) {
        id = tasksListArray[tasksListArray.length-1].id + 1;
    }
    for (let i = 0; i < tasksListArray.length; i++) {
        const task = tasksListArray[i];

        const customDateString = task.deadlineDate + " " + task.deadlineTime;
        const parts = customDateString.split(/[\/\s:]/);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const hours = parseInt(parts[3], 10);
        const minutes = parseInt(parts[4], 10);
        const deadLineDateObject = new Date(year, month, day, hours, minutes);

        if (now < deadLineDateObject){
            const newTask = new Task(task.id, task.details, task.deadlineDate, task.deadlineTime);
            tasksList.push(newTask);
        }
    }
}

console.log(tasksList);

localStorage.setItem("tasksList", JSON.stringify(tasksList));

createCards();


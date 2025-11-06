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
    const id = getLastId() + 1;
    const details = taskForm.details.value;
    const deadlineDate = (new Date(taskForm.deadlineDate.value)).toLocaleDateString('en-GB');
    const deadlineTime = taskForm.deadlineTime.value;
    const task = new Task(id, details, deadlineDate, deadlineTime);
    tasksList.push(task);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    createOneCard();
    taskForm.reset();
}

function createOneCard() {
    const mainDiv = document.querySelector("#div-main-id");
    const task = tasksList[tasksList.length-1];
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "div-card-class fade-in-element position-relative");
    cardDiv.setAttribute("id", "div-card-id-" + (tasksList.length-1));
    mainDiv.prepend(cardDiv);

    const card = document.querySelector("#div-card-id-" + (tasksList.length-1));

    const delButton = document.createElement("button");
    delButton.setAttribute("class", "delete-button");
    delButton.setAttribute("id", "delete-button-id-" + (tasksList.length-1));
    delButton.setAttribute("onclick", "deleteTask('" + task.id + "')");
    
    const taskDetails = document.createElement("p");
    taskDetails.setAttribute("class", "details-class");
    taskDetails.innerText = task.details;

    const taskDateTime = document.createElement("p");
    taskDateTime.setAttribute("class", "date-time-class mb-0");
    taskDateTime.innerText = task.deadlineDate + "\n" + task.deadlineTime;

    card.append(delButton, taskDetails, taskDateTime);

    const deleteButton = document.querySelector("#delete-button-id-" + (tasksList.length-1));
    const icon = document.createElement("i");
    icon.setAttribute("class", "bi bi-x-square-fill delete-button-i");
    deleteButton.appendChild(icon);
}

function createCards() {
    const mainDiv = document.querySelector("#div-main-id");

    mainDiv.innerHTML = "";
    for (let i=0 ; i<tasksList.length ; i++) {
        const task = tasksList[i];
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "div-card-class position-relative");
        cardDiv.setAttribute("id", "div-card-id-"+i);
        mainDiv.prepend(cardDiv);

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

function getLastId() {
    if (tasksList.length > 0) {
        return tasksList[tasksList.length-1].id;
    }
    return 0;
}

let tasksList = [];

tasksListFromLocal = localStorage.getItem("tasksList");
if (tasksListFromLocal) {
    const tasksListArray = JSON.parse(tasksListFromLocal);
    for (let i = 0; i < tasksListArray.length; i++) {
        const task = tasksListArray[i];
        const newTask = new Task(task.id, task.details, task.deadlineDate, task.deadlineTime);
        tasksList.push(newTask);
    }
}

createCards();

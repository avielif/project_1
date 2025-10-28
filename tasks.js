class Task {
    details;
    deadlineDate;
    deadlineTime;

    constructor(cDetails, cDeadlineDate, cDeadlineTime) {
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
    const task = new Task(details, deadlineDate, deadlineTime);
    tasksList.push(task);
    console.log("taskList after adding a task------>", tasksList);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    createCard();
    taskForm.reset();
}

function createCard() {
    const mainDiv = document.querySelector("#div-main-id");

    mainDiv.innerHTML = "";
    for (let i=0 ; i<tasksList.length ; i++) {
        const task = tasksList[i];
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "div-card-class position-relative");
        cardDiv.setAttribute("id", "div-card-id-"+i);
        mainDiv.appendChild(cardDiv);

        const card = document.querySelector("#div-card-id-"+i);

        // divFirst = document.createElement("div");
        // divFirst.setAttribute("id", "div-first-id");
        // divSecond = document.createElement("div");
        // divSecond.setAttribute("id", "div-second-id");
        // cardDiv.append(divFirst, divSecond);

        // const div1 = document.querySelector("#div-first-id");
        const taskDetails = document.createElement("p");
        taskDetails.setAttribute("class", "details-class");
        taskDetails.innerText = task.details;
        // div1.appendChild(taskDtails);

        const taskDateTime = document.createElement("p");
        taskDateTime.setAttribute("class", "date-time-class mb-0");
        taskDateTime.innerText = task.deadlineDate + "\n" + task.deadlineTime;

        // const taskTime = document.createElement("p");
        // taskTime.setAttribute("class", "date-time-class mb-0");
        // taskTime.innerText = task.deadlineTime;

        card.append(taskDetails, taskDateTime);

        // const div2 = document.querySelector("#div-second-id");
        // const taskDateTime = document.createElement("ul");
        // taskDateTime.setAttribute("id", "task-date-time-id-"+i);
        // taskDateTime.setAttribute("class", "date-time-class");
        // cardDiv.append(taskDtails,taskDateTime);

        // const taskListItem = document.querySelector("#task-date-time-id-"+i);
        // const taskDate = document.createElement("li");
        // taskDate.setAttribute("class", "no-bullet");
        // taskDate.innerText = task.deadlineDate;

        // const taskTime = document.createElement("li");
        // taskTime.setAttribute("class", "no-bullet");
        // taskTime.innerText = task.deadlineTime;

        // taskListItem.append(taskDate, taskTime);


    }
}

function formatDate(date) {


}

let tasksList = [];
tasksListFromLocal = localStorage.getItem("tasksList");
if (tasksListFromLocal) {
    const tasksListArray = JSON.parse(tasksListFromLocal);
    for (let i = 0; i < tasksListArray.length; i++) {
        const task = tasksListArray[i];
        const newTask = new Task(task.details, task.deadlineDate, task.deadlineTime);
        tasksList.push(newTask);
    }
}

console.log(tasksList);

createCard();






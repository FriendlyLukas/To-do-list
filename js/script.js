{
  let tasks = [];
  let hideDoneTasksParameter = false;

  const addNewTask = () => {
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskText = newTaskInput.value.trim();
    let newTask = { content: newTaskText, done: false };
    if (newTaskText !== "") tasks = [...tasks, newTask];
    newTaskInput.focus();
    newTaskInput.value = "";
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((_, index) => index !== taskIndex);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const bindTasksEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };
  const tasksRender = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
                <li 
                class="list__item ${task.done ? "list__item--done" : ""}">
                    <button class="list__taskButton js-done">
                    ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__taskContent">
                    ${task.content}
                    </span>
                    <button class="list__taskButton list__taskButton--remove js-remove">
                    🗑
                    </button>
                </li>
            `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const toggleHideShowButton = () => {
    hideDoneTasksParameter = !hideDoneTasksParameter;
  };

  const ifSomeTaskDone = () => {
    tasks.some(({ done }) => done);
  };

  const hideDoneTasks = () => {
    tasks.forEach((task) => {
      task.done.style.display = "none";
    });
    render();
  };
  const showDoneTasks = () => {
    tasks.forEach((task) => {
      task.done.style.display = "block";
    });
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const bindButtonsEvents = () => {
    const hideShowTasks = document.querySelector(".js-hideShowTasks");
    if (showAllTasks) {
      hideShowTasks.addEventListener("click", () => {
        if (ifSomeTaskDone()) {
          hideDoneTasks();
          toggleHideShowButton();
        } else if ((hideDoneTasksParameter = true)) {
          showDoneTasks();
          toggleHideShowButton();
        }
      });
    }
    const markDoneAll = document.querySelector(".js-markDoneAll");
    if (markDoneAll) {
      markDoneAll.addEventListener("click", () => {
        markAllTasksDone();
      });
    }
  };

  const buttonsRender = () => {
    const allTasksDone = tasks.every((task) => task.done === true);
    let htmlString2 = "";
    htmlString2 += `
            <div class = "list__text">
            Lista zadań
            </div>
            <button class = "list__manageButton js-hideShowTasks">
            ${hideDoneTasksParameter ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button ${
              allTasksDone ? "disabled" : ""
            } class = "list__manageButton js-markDoneAll">
            Ukończ wszystkie
            </button>
          `;
    document.querySelector(".js-buttons").innerHTML = htmlString2;
  };

  const emptyRender = () => {
    let htmlString3 = "";
    htmlString3 += `
    <div class = "list_text">
    Lista zadań
    </div>
    `;
    document.querySelector(".js-emptyRender").innerHTML = htmlString3;
  };

  const render = () => {
    tasksRender();
    if (tasks.length === 0) {
      emptyRender();
    } else {
      buttonsRender();
    }
    bindTasksEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}

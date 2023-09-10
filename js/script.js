    
{
    let tasks = [];

    const addNewTask = () => {
        const newTaskInput = document.querySelector( ".js-newTask" );
        const newTaskText = newTaskInput.value.trim();
        let newTask = { content:newTaskText, done:false };
        if (newTaskText !== "") tasks = [...tasks, newTask];
        newTaskInput.focus();
        newTaskInput.value="";
        render();
    }
    
    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_,index) => index !== taskIndex);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
            tasks = [
            ...tasks.slice(0,taskIndex),
            { ...tasks[taskIndex], done : !tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1)
            ]
        render();
    }
    
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach( (removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach( (toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index); 
            });
        });
    }
    
    const render = () => {
        let htmlString ="";
        for (const task of tasks) {
            htmlString += `
                <li 
                class="list__item ${task.done ? "list__item--done" : ""}"
                >
                    <button class="list__button js-done">
                    ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__taskContent">
                    ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">
                    🗑
                    </button>
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }          
        addNewTask(newTaskContent);
        }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}
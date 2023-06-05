    
{
    const tasks = [];

    const addNewTask = () =>{

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskText=newTaskInput.value.trim()

        if(newTaskText !== "") tasks.push({content:newTaskText, done:false,});

        newTaskInput.focus();
        newTaskInput.value="";
        
        render();
    }

    const removeTask = (taskIndex) => {

        tasks.splice(taskIndex,1);
        
        render();
    }

    const toggleTaskDone = (taskIndex) => {

        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    }

    const bindEvents = () => {

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
                symboltaskDone(index);

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
                    <button class="list__button js-done">${task.done ? "✔" : ""}</button>
                    <span class="list_taskContent">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                    
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
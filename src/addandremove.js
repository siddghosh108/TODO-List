const taskContainer = document.querySelector('.list-Container');

class CreatetodoList {
  constructor(description, completed, id) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }

  static displayTasks = (task, oneTwo, three) => {
    const listItem = document.createElement('li');
    listItem.id = task.id;
    listItem.className = 'lists';
    listItem.innerHTML = `
          <div class="list-Container">
          <input type="checkbox" name="" id="${task.id}" class="checkbox" ${oneTwo}>
          <p class="${three}" id="${task.id}">${task.description}</p>
          </div>
          
          <div class="trash">
          
          <i id="pen" class="fa-solid fa-pen"></i>
          <i id="delete" class="fa-solid fa-trash-can"></i>
          </div>
          `;

    taskContainer.appendChild(listItem);
  };

  static loadFromLocalStorage() {
    let tasks;

    if (localStorage.getItem('TasksInfo')) {
      tasks = JSON.parse(localStorage.getItem('TasksInfo'));
    } else {
      tasks = [];
    }
    return tasks;
  }

  static displayTasksOnPage() {
    const tasks = CreatetodoList.loadFromLocalStorage();
    tasks.forEach((task) => {
      if (task.completed === true) {
        CreatetodoList.displayTasks(task, 'checked', 'tickedItem');
      } else {
        CreatetodoList.displayTasks(task, '/', 'none');
      }
    });
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('trash')) {
      target.parentElement.remove();
      const listItems = document.querySelectorAll('.lists');
      listItems.forEach((item, id) => {
        item.id = id + 1;
      });
    }
  }

  static removeFromLocalStorage(element) {
    let k = 0;
    const tasks = CreatetodoList.loadFromLocalStorage();

    const idd = element.parentElement.id;
    const newID = Number(idd);
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].id === newID) {
        k = i;
        break;
      }
    }
    tasks.splice(k, 1);
    let X = 1;
    tasks.forEach((task) => {
      task.id = X;
      X += 1;
    });
    localStorage.setItem('tasksInfo', JSON.stringify(tasks));
  }
}

export const removeItem = (e) => {
  CreatetodoList.removeBookFromPage(e.target.parentElement);
  CreatetodoList.removeFromLocalStorage(e.target.parentElement);
};

export const displayTasksOnWebPage = () => {
  CreatetodoList.displayTasksOnPage();
};

export const addItem = () => {
  const addInput = document.querySelector('.add-input');

  if (addInput.value) {
    const complete = false;

    const loadTasks = CreatetodoList.loadFromLocalStorage();
    const count = loadTasks.length + 1;
    const newTask = new CreatetodoList(addInput.value, complete, count);

    loadTasks.push(newTask);

    CreatetodoList.displayTasks(newTask);
    localStorage.setItem('TasksInfo', JSON.stringify(loadTasks));

    // Reset input fields
    addInput.value = '';
  }
};

export const storageInfo = CreatetodoList.loadFromLocalStorage;
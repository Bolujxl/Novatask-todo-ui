// Sidebar toggle for mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const addTaskBtn = document.getElementById('add-task-btn')
const cancelModalBtn = document.getElementById('cancelModalBtn')
const modalOverlay = document.getElementById('modalOverlay')
const form = document.getElementById('taskForm')
const nameofTask = document.getElementById('taskTitle')
const descriptionOfTask = document.getElementById('taskDesc')
const dueDateOfTask = document.getElementById('taskDate')
const categoryOfTask = document.getElementById('taskCategory')
const typeOfTask = document.getElementById('taskType')
const contributorsOfTask = document.getElementById('taskContributors')
const closeModalBtn = document.getElementById('closeModalBtn');
const taskGrid = document.querySelector('.task-upcoming-grid');


// this is for the sidebar toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// this is for the opening and closing of the modal overlay.


// this is for the opening of the modal overlay.
addTaskBtn.addEventListener('click', revealModal)

function revealModal() {
  modalOverlay.classList.remove('modal-overlay')
  modalOverlay.classList.add('modal-overlay-active')
  nameofTask.focus()
  form.reset()
}


cancelModalBtn.addEventListener('click', closeModal)
closeModalBtn.addEventListener('click', closeModal)

function closeModal() {
  modalOverlay.classList.remove('modal-overlay-active')
  modalOverlay.classList.add('modal-overlay')
  form.reset()
}

// Close when clicking only the overlay (not the modal itself)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
    form.reset()
  }
});

let taskStore = []

form.addEventListener('submit', handleTaskData)

function handleTaskData(event) {
  event.preventDefault()

  // taskStore = JSON.parse(localStorage.getItem("novataskEntries")) || taskStore;

  // WE STORE THE DATA INTO AN OBJECT BEFORE STORING INTO AN ARRAY THEN INTO LS.
  // let taskName = nameofTask.value;
  // let taskDesc = descriptionOfTask.value;
  // let taskDuedate = dueDateOfTask.value;
  // let taskCategory = categoryOfTask.value;
  // let taskType = typeOfTask.value;
  // let taskContributors = contributorsOfTask.value;

  const taskData = {
    taskNAME: nameofTask.value,
    taskDESC: descriptionOfTask.value,
    taskDUEDATE: dueDateOfTask.value,
    taskCATEGORY: categoryOfTask.value,
    taskTYPE: typeOfTask.value,
    taskCONTRIBUTORS: contributorsOfTask.value
  }

  // console.log(taskData)
  taskStore.push(taskData)
  localStorage.setItem('novataskEntries', JSON.stringify(taskStore))

  form.reset()
  closeModal()
  retrieveTaskData()
}

function retrieveTaskData() {
  if (localStorage.getItem('novataskEntries')) {
    taskStore = JSON.parse(localStorage.getItem('novataskEntries'))
  }

  addTaskCard()
}

window.addEventListener('DOMContentLoaded', retrieveTaskData);

function addTaskCard() {
  // Grab the grid container and empty it completely before we loop!
  const taskGrid = document.querySelector('.task-upcoming-grid');
  taskGrid.innerHTML = '';

  taskStore.forEach((task) => {

    // let taskNametoShow = task.taskNAME;
    // let taskDesctoShow = task.taskDESC;
    // let taskDuetoShow = task.taskDUEDATE;
    // let taskCategorytoShow = task.taskCATEGORY;
    // let taskTypeToShow = task.taskTYPE;
    // let taskContributorToShow = task.taskCONTRIBUTORS;

    // let taskCard = document.createElement('div')
    // taskCard.classList.add('task-card')

    // let innerTaskCard = document.createElement('div')
    // innerTaskCard.classList.add('pdu-inner-card')

    // let statuspillTextcontent = document.createElement('div')
    // statuspillTextcontent.classList.add('statuspill-textcontent')

    // let cardHeaderTop = document.createElement('div')
    // cardHeaderTop.classList.add('card-header-top')

    // let statuspill = document.createElement('div')
    // statuspill.classList.add('status-pill-pf')

    // let statuspillText = document.createElement('p')
    // statuspillText.classList.add('status-text')

    // let deleteTaskBtn = document.createElement('button')
    // deleteTaskBtn.classList.add('delete-task-btn')

    let taskCard = document.createElement('div')
    taskCard.classList.add('task-card')

    taskCard.innerHTML = `
              <div class="pdu-inner-card">

                <div class="statuspill-textcontent">
                  <div class="card-header-top">
                    <div class="status-pill-pf">
                      <span class="material-symbols-outlined">circle</span>
                      <p class="status-text">Pending</p>
                    </div>

                    <button class="delete-task-btn">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>

                  <div class="text-content">
                    <h2>${task.taskNAME}</h2>
                    <p>${task.taskDESC}</p>
                  </div>

                </div>

                <div class="datechip-collabs">
                  <div class="date-chip2"> <span class="material-symbols-outlined">calendar_today</span> <span>${task.taskDUEDATE}</span>
                  </div>

                  <div class="collaborators">
                    <img src="imgs/sigmund-jzz_3jWMzHA-unsplash.jpg" alt="User Avatar" class="avatar-sm">
                    <img src="imgs/alex-suprun-ZHvM3XIOHoE-unsplash.jpg" alt="User Avatar" class="avatar-sm">
                    <img src="imgs/leio-mclaren-L2dTmhQzx4Q-unsplash.jpg" alt="User Avatar" class="avatar-sm">
                  </div>

                </div>

              </div>
        `

    taskCard.addEventListener('click', (e) => {
      if (e.target.closest('.delete-task-btn')) {
        taskCard.remove()

        // Find the exact index of the task we want to delete
        let indexToDelete = taskStore.findIndex(savedTask => savedTask.taskNAME === task.taskNAME);

        // If we found it (it doesn't equal -1), splice it out!
        if (indexToDelete !== -1) {
          taskStore.splice(indexToDelete, 1);
        }

        localStorage.setItem('novataskEntries', JSON.stringify(taskStore));
      }
    })

    taskGrid.appendChild(taskCard)
  })
}
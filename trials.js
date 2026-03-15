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
                  </div>

                </div>

              </div>
        `


let taskNametoShow = task.taskNAME;
    let taskDesctoShow = task.taskDESC;
    let taskDuetoShow = task.taskDUEDATE;
    let taskCategorytoShow = task.taskCATEGORY;
    let taskTypeToShow = task.taskTYPE;
    let taskContributorToShow = task.taskCONTRIBUTORS;

    let taskCard = document.createElement('div')
    taskCard.classList.add('task-card')

    let innerTaskCard = document.createElement('div')
    innerTaskCard.classList.add('pdu-inner-card')

    let statuspillTextcontent = document.createElement('div')
    statuspillTextcontent.classList.add('statuspill-textcontent')

    let cardHeaderTop = document.createElement('div')
    cardHeaderTop.classList.add('card-header-top')

    let statuspill = document.createElement('div')
    statuspill.classList.add('status-pill-pf')

    let statuspillText = document.createElement('p')
    statuspillText.classList.add('status-text')

    let deleteTaskBtn = document.createElement('button')
    deleteTaskBtn.classList.add('delete-task-btn')


// --- Contributors Dropdown Logic ---
dropdownHeader.addEventListener('click', (e) => {
  contributorsDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!contributorsDropdown.contains(e.target)) {
    contributorsDropdown.classList.remove('open');
  }
});

contributorCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const selected = Array.from(contributorCheckboxes)
      .filter(i => i.checked)
      .map(i => i.value);

    if (selected.length === 0) {
      dropdownHeaderTitle.textContent = 'Select Contributors...';
    } else if (selected.length === 1) {
      dropdownHeaderTitle.textContent = selected[0];
    } else {
      dropdownHeaderTitle.textContent = `${selected.length} selected`;
    }
  });
});

form.addEventListener('reset', () => {
  dropdownHeaderTitle.textContent = 'Select Contributors...';
  contributorsDropdown.classList.remove('open');
});
// ------------------------------------
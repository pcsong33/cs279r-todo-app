"use strict";

// define initial task input and list query selectors
const taskInput = document.querySelector('input.task');
const lists = document.querySelector('.lists');

// define favorites section query selectors
const favsSection = document.querySelector('.favs');
const favTitle = document.querySelector('.favs h3');
const favs = document.querySelector('.favs ul');
const favsItems = favs.children;

// define task section query selectors
const tasksSection = document.querySelector('.tasks');
const tasksTitle = document.querySelector('.tasks h3');
const tasks = document.querySelector('.tasks ul');
const taskItems = tasks.children;

// if no tasks have been inputted, hide the tasks/favorites section
if ( favsItems.length === 0 ) {
  favsSection.style.display = 'none';
};

if ( taskItems.length === 0 ) {
  tasksSection.style.display = "none";
};

// Add initial task
taskInput.addEventListener('keyup', (e) => {
  // If the key pressed is the enter key
  if (e.keyCode === 13) {
    let li = document.createElement('li');
    // If no task was entered, alert the user to enter a task
    if (taskInput.value === "") {
      alert("Please add a task");
    } else {
      // Save user inputted value to a variable
      li.textContent = taskInput.value;
      attachButton(li);
      tasks.appendChild(li);
      tasksTitle.style.display = '';
      taskInput.value = '';

      // Display Current Tasks header
      tasksTitle.textContent = "Current Tasks";
      tasksSection.style.display = "";
    }
  }
});

// Update task lists
lists.addEventListener('click', (event) => {

  const tag = event.target.tagName;
  const basevalue = event.target.className.baseVal;

  const clickArea1 = event.target.parentNode.parentNode.parentNode.parentNode.className;
  const clickArea2 = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.className;
  const clickArea3 = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;

  // Checking if buttons inside tasks section is clicked
  if ( clickArea1 === 'tasks' || clickArea2 === 'tasks' || clickArea3 === 'tasks' ) {
    if (tag === 'path') {

      // if the trash icon is clicked, remove the task from the list
      if (basevalue  === 'delete' || basevalue  === 'can' || basevalue  === 'cap' || basevalue  === 'bin') {
        let li = event.target.parentNode.parentNode.parentNode.parentNode;
        let ul = li.parentNode;
        ul.removeChild(li);

      // if the favorite icon is clicked, move the task to the favorites section
      } else if ( basevalue === 'favPath') {
        let li = event.target.parentNode.parentNode.parentNode;
        favsSection.style.display = '';
        favs.appendChild(li);
        favTitle.textContent = "Favorites";
      }

      // if no more tasks remain, remove tasks header
      if ( taskItems.length === 0 ) {
        tasksSection.style.display = "none";
      };
    }

  // Checking if buttons inside favs section is clicked
  } else if ( clickArea1 === 'favs' || clickArea2 === 'favs' || clickArea3 === 'favs' ) {
    if (tag === 'path') {

      // if the trash icon is clicked, remove the task from the favorites list
      if (basevalue  === 'delete' || basevalue  === 'can' || basevalue  === 'cap' || basevalue  === 'bin') {
        let li = event.target.parentNode.parentNode.parentNode.parentNode;
        let ul = li.parentNode;
        ul.removeChild(li);
        
      // if the favorite icon is unclicked, remove task from favorites section, and move to the general tasks section
      } else if ( basevalue === 'favPath') {
        let li = event.target.parentNode.parentNode.parentNode;
        tasksSection.style.display = '';
        tasks.appendChild(li);
        tasksTitle.textContent = "Current Tasks";
      }

      // if no more favorites remain, remove favorites header
      if ( favsItems.length === 0 ) {
        favsSection.style.display = 'none';
      };
    }
  }
});

//selector variables
const taskBox = document.getElementById('taskBox');
const modal_ele = document.getElementById('modal');
const overlay_ele = document.getElementById('overlay');

async function getTasks() {
  try {
    const res = await fetch('https://6763fe4c17ec5852caeac112.mockapi.io/tasks');
    if (!res.ok) {
      throw new Error('connection is failed');
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function createTask(name, description, status) {
  const response = await fetch('https://6763fe4c17ec5852caeac112.mockapi.io/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      status,
    }),
  });
}

let data = [];

function renderTasks() {
  getTasks()
    .then((res) => {
      data = res;
      taskBox.innerHTML = '';
      data.forEach((item) => {
        taskBox.innerHTML += `
                    <tr>
                    <td class="border border-black">${item.name}</td>
                    <td class="border border-black">${item.description}</td>
                    <td class="border border-black">${item.status}</td>
                    <td class="border border-black p-4 ">
                        <div class="flex gap-5 justify-center">
                            <button class="bg-red-500 rounded-md p-1" onclick="deleteTask(${item.id})">delete</button>
                            <button class="bg-green-500 rounded-md p-1" onclick="editTask(${item.id})">edit</button>
                            <button class="bg-yellow-500 rounded-md p-1" onclick="viewTask(${item.id})">view</button>
                        </div>

                    </td>
                </tr>
                `;
      });
    })
    .catch((err) => {
      //   alert('not found');
      console.log(err);
    });
}

renderTasks();

async function deleteTask(id) {
  const res = await fetch(`https://6763fe4c17ec5852caeac112.mockapi.io/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  renderTasks();
}

function toggleModal() {
  modal_ele.classList.toggle('hidden');
  overlay_ele.classList.toggle('hidden');
}

function addTaskModalShow() {
  modal_ele.innerHTML = `
    <form name="addTaskForm" class="flex flex-col gap-5">
    <h2 class="border-b-2 border-purple-500 text-center">add task modal</h2>
    <div class="flex">
      <label for="taskName" class="w-1/4">task name</label>
      <input
        type="text"
        id="taskName"
        name="taskName"
        placeholder="Please Enter Your Task Name"
        class="focus:border-none border border-blue-400 w-3/4"
      />
    </div>
    <div class="flex gap-2">
      <label for="taskName" class="w-1/4">description</label>
      <input
        type="text"
        name="description"
        placeholder="Please Enter Your Task Name"
        class="focus:border-none border border-blue-400 w-3/4"
      />
    </div>
    <div class="flex gap-2">
      <label for="taskName" class="w-1/4">status</label>
      <input
        type="text"
        name="status"
        placeholder="Please Enter Your Task Name"
        class="focus:border-none border border-blue-400 w-3/4"
      />
    </div>
    <button type="submit" class="bg-gray-400 text-white p-2" onclick="addTaskFormHandler(event)">submit</button>
  </form>
    `;
  toggleModal();
}

async function addTaskFormHandler(e) {
  e.preventDefault();
  const addTaskForm = document.forms['addTaskForm'];
  const taskNameValue = addTaskForm.taskName.value;
  const descriptionValue = addTaskForm.description.value;
  const statusValue = addTaskForm.status.value;
  await createTask(taskNameValue, descriptionValue, statusValue);
  toggleModal();
  renderTasks();
}

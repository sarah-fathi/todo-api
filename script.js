const taskBox = document.getElementById('taskBox');

async function getTasks(){

    try{
        const res = await fetch('https://6763fe4c17ec5852caeac112.mockapi.io/tasks');        
        if(!res.ok){
            throw new Error('connection is failed')
        }
        const result = await res.json() 
        return result;
    }catch(err){
        console.log(err)        
    }    
}

let data = []

function renderTasks(){
    getTasks()
        .then(res => {
            data = res
            taskBox.innerHTML = '' ;
            data.forEach(item => {
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
                `
            });
        })
        .catch(err => {
            alert('not found')
        })
};

renderTasks();




async function deleteTask(id){
    const res = await fetch(`https://6763fe4c17ec5852caeac112.mockapi.io/tasks/${id}`,{
        method : 'DELETE',
        headers : {
            "Content-Type" : "application/json" 
        },
    });
    renderTasks();
}
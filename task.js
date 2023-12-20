let btnTaskEl = document.querySelector('button')
let taskNameEl = document.querySelector('#content')
let tasks = getTaskFromLocalStorage()
renderTask(tasks)

btnTaskEl.addEventListener(('click'),function() {
    if(!taskNameEl.value) {
        alert('Nhập công việc')
        return false
    }
    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = {name:taskNameEl.value}

    if (taskId==0 | taskId) {
        tasks[taskId]= task
        this.removeAttribute('id')
    }
    else {
        tasks.push(task)
    }
    
    taskNameEl.value=''
    localStorage.setItem('tasks',JSON.stringify(tasks))
    renderTask(tasks)
})  

function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if (tasks.length>0) {
        taskNameEl.value = tasks[id].name
        btnTaskEl.setAttribute('id',id)
    }
}
function deleteTask(id) {
    if (confirm('Bạn có muốn xóa task này không?')) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id,1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(tasks)
    }
}
function renderTask(task=[]) {
    let content = '<ul>'
    task.forEach((task,index)=>{
        content += `<li>
            <div class="taskName">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Sửa</a>
            <a href="#" onclick="deleteTask(${index})">Xóa</a>
        </li>`
    })
    content += '</ul>'
    document.querySelector('#result').innerHTML=content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

async function listAll() {
    try {
        var response = await fetch('http://localhost:3000/todo_list', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }

    const todo = await response.json()
        
    const tam = todo.length
    let output = ''
    if (tam > 0) {
        for (let i = 0; i < todo.length; i++) {
            const todoName = todo[i].name
            const todoId = todo[i].id
            output += `
            <li class="" data-id="${todoId}">
                <div class="view">
                    <input class="toggle" type="checkbox"  onclick="markAsCompleted(${todoId})">
                    <label>${todoName}</label>
                </div>
            </li>
            `
        }
        document.getElementById("todo-list").innerHTML = output
        var main = document.getElementById("main")
        var footer = document.getElementById("footer")
        main.style.display = "block"
        footer.style.display = "block"
        
    } else {
        var main = document.getElementById("main")
        var footer = document.getElementById("footer")
        main.style.display = "none"
        footer.style.display = "none"
    }
}

async function createTask(name) {
    try {
        const response = await fetch('http://localhost:3000/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({name: name})
        })
    } catch (error) {
        console.error(error);
    }
    listAll()
}

document.addEventListener("keyup", (e) =>{
    if (e.keyCode === 13) {
        const new_todo = document.getElementById('new-todo')

        
        if (new_todo.value.trim()) {
            createTask(new_todo.value)
            
        }
        new_todo.value = ''
    }
    
})

async function listActive() {
    try {
        var responseActive = await fetch('http://localhost:3000/active', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoActive = await responseActive.json()

    const tam = todoActive.length
    let outputActive = ''
    if (tam > 0) {
        for (let i = 0; i < todoActive.length; i++) {
            const todoName = todoActive[i].name
            const todoId = todoActive[i].id
            outputActive += `
            <li class="" data-id="${todoId}">
                <div class="view">
                    <input class="toggle" type="checkbox" onclick="markAsCompleted(${todoId})">
                    <label>${todoName}</label>
                </div>
            </li>
            `
        }

    }else{
        outputActive = ''
    }
    const active = document.querySelector('#active')
    active.classList.add('selected')
    const all = document.querySelector('#all')
    all.classList.remove('selected')
    const completed = document.querySelector('#completed')
    completed.classList.remove('selected')    
    document.getElementById("todo-list").innerHTML = outputActive
}

async function listCompleted() {
    try {
        var responseCompleted = await fetch('http://localhost:3000/completed', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoCompleted = await responseCompleted.json()

    const tam = todoCompleted.length
    let outputCompleted = ''
    if (tam > 0) {
        for (let i = 0; i < todoCompleted.length; i++) {
            const todoName = todoCompleted[i].name
            const todoId = todoCompleted[i].id
            outputCompleted += `
            <li   class="" data-id="${todoId} >
                <div class="view">
                    <input href="${todoId}" class="toggle" type="checkbox" onclick="markAsCompleted(${todoId})"">
                    <label>${todoName}</label>
                </div>
            </li>
            `
        }
        
    }else{
        outputCompleted = ''
    }
    const active = document.querySelector('#active')
    active.classList.remove('selected')
    const all = document.querySelector('#all')
    all.classList.remove('selected')
    const completed = document.querySelector('#completed')
    completed.classList.add('selected')
    document.getElementById("todo-list").innerHTML = outputCompleted
}

listAll()

async function markAsCompleted(id) {
    try {
        var responseMark = await fetch(`http://localhost:3000/${id}`,{
            method: 'put',
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({completed: true})

        })
    } catch (error) {
        console.error(error);
    }
    console.log(id);
}
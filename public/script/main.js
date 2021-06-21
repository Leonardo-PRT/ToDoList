var local = ''
var qnt = 0
var completed = false
var temCompleted = 0
var tam = 0
var show = ''
var deletcompleted = document.getElementById('deletCompleted')
async function listAll() {
    local = 'all'
    try {
        var response = await fetch('http://localhost:3000/todo_list', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    try {
        var responseActive = await fetch('http://localhost:3000/active', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoActive = await responseActive.json()
    qnt = todoActive.length

    const todo = await response.json()

    tam = todo.length
    let output = ''
    let outputLeft = ''
    if (tam > 0) {
        for (let i = 0; i < todo.length; i++) {
            const todoName = todo[i].name
            const todoId = todo[i].id
            if (todo[i].completed == true) {
                output += `
                <li class="completed" id="todo" data-id="${todoId}">
                    <div class="view">
                        <input class="toggle" type="checkbox" checked="" onclick="markAsCompleted(${todoId})" ">
                        <label ondblclick="renameTask()">${todoName}</label>
                        <button class="destroy" onclick="removeTask(${todoId})"></button>
                    </div>
                </li>
                `
                completed = true

            } else {
                output += `
                    <li class="" data-id="${todoId}">
                        <div class="view">
                            <input class="toggle" type="checkbox"  onclick="markAsCompleted(${todoId})"  >
                            <label ondblclick="renameTask()">${todoName}</label>
                            <button class="destroy"onclick="removeTask(${todoId})"></button>
                        </div>
                    </li>
                `
                completed = false
            }


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
    outputLeft += `
        <span class="todo-count">
            <strong>${qnt}</strong>
                item left
        </span>
        <ul class="filters">
				<li>
					<a href="/" class="selected" id="all">All</a>
				</li>
				<li>
					<a href="/#/active" id="active" onclick="listActive()" >Active</a>
				</li>
				<li>
					<a href="/#/completed" id="completed" onclick="listCompleted()">Completed</a>
				</li>
			</ul>
			<button id="deletCompleted" class="clear-completed" onclick="clearCompleted()" >Clear completed</button>
		</footer>
    `
    document.getElementById('footer').innerHTML = outputLeft

    if(showClearCompleted()){
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'block'
    }else{
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'none'
    }
    
}

async function createTask(name) {
    try {
        const response = await fetch('http://localhost:3000/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name })
        })
    } catch (error) {
        console.error(error);
    }

    try {
        var responseActive = await fetch('http://localhost:3000/active', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoActive = await responseActive.json()
    qnt = todoActive.length
    console.log(qnt);
    if (local == 'all') {
        listAll()
    }else if (local == 'active') {
        listActive()
    }else if (local == 'completed') {
        listCompleted()
    }
}

document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        const new_todo = document.getElementById('new-todo')


        if (new_todo.value.trim()) {
            createTask(new_todo.value)

        }
        new_todo.value = ''
    }

})

async function listActive() {
    local = 'active'
    try {
        var responseActive = await fetch('http://localhost:3000/active', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoActive = await responseActive.json()

    const tam = todoActive.length
    qnt = tam
    console.log(tam);
    let outputActive = ''
    let outputLeft = ''
    if (tam > 0) {
        for (let i = 0; i < todoActive.length; i++) {
            const todoName = todoActive[i].name
            const todoId = todoActive[i].id
            outputActive += `
                    <li class="" data-id="${todoId}">
                        <div class="view">
                            <input class="toggle" type="checkbox"  onclick="markAsCompleted(${todoId})" >
                            <label ondblclick="renameTask()">${todoName}</label>
                            <button class="destroy" onclick="removeTask(${todoId})"></button>
                        </div>
                    </li>
                `

        }

    } else {
        outputActive = ''
    }
    outputLeft += `
        <span class="todo-count">
            <strong>${qnt}</strong>
                item left
        </span>
        <ul class="filters">
				<li>
					<a href="/" class="selected" id="all">All</a>
				</li>
				<li>
					<a href="/#/active" id="active" onclick="listActive()" >Active</a>
				</li>
				<li>
					<a href="/#/completed" id="completed" onclick="listCompleted()">Completed</a>
				</li>
			</ul>
			<button id="deletCompleted" class="clear-completed" onclick="clearCompleted()";">Clear completed</button>
		</footer>
    `
    
    document.getElementById("todo-list").innerHTML = outputActive
    document.getElementById('footer').innerHTML = outputLeft
    const active = document.querySelector('#active')
    active.classList.add('selected')
    const all = document.querySelector('#all')
    all.classList.remove('selected')
    const completed = document.querySelector('#completed')
    completed.classList.remove('selected')

    if(showClearCompleted()){
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'block'
    }else{
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'none'
    }
}

async function listCompleted() {
    local = 'completed'
    try {
        var responseCompleted = await fetch('http://localhost:3000/completed', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    try {
        var responseActive = await fetch('http://localhost:3000/active', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }
    const todoActive = await responseActive.json()
    qnt = todoActive.length
    const todoCompleted = await responseCompleted.json()

    const tam = todoCompleted.length
    temCompleted = tam
    let outputCompleted = ''
    let outputLeft = ''
    if (tam > 0) {
        for (let i = 0; i < todoCompleted.length; i++) {
            const todoName = todoCompleted[i].name
            const todoId = todoCompleted[i].id
            if (todoCompleted[i].completed == true) {
                outputCompleted += `
                <li class="completed" id="todo" data-id="${todoId}">
                    <div class="view">
                        <input class="toggle" type="checkbox" checked="" onclick="markAsCompleted(${todoId})"  >
                        <label ondblclick="renameTask()">${todoName}</label>
                        <button class="destroy" onclick="removeTask(${todoId})"></button>
                    </div>
                </li>
                `

            } else {
                outputCompleted += `
                    <li class="" data-id="${todoId}">
                        <div class="view">
                            <input class="toggle" type="checkbox"  onclick="markAsCompleted(${todoId})">
                            <label>${todoName}</label>
                        </div>
                    </li>
                `
            }
        }

    } else {
        outputCompleted = ''
    }
    outputLeft += `
        <span class="todo-count">
            <strong>${qnt}</strong>
                item left
        </span>
        <ul class="filters">
				<li>
					<a href="/" class="selected" id="all">All</a>
				</li>
				<li>
					<a href="/#/active" id="active" onclick="listActive()" >Active</a>
				</li>
				<li>
					<a href="/#/completed" id="completed" onclick="listCompleted()">Completed</a>
				</li>
			</ul>
			<button id="deletCompleted" class="clear-completed" onclick="clearCompleted()">Clear completed</button>
		</footer>
    `
    document.getElementById("todo-list").innerHTML = outputCompleted
    document.getElementById('footer').innerHTML = outputLeft
    const active = document.querySelector('#active')
    active.classList.remove('selected')
    const all = document.querySelector('#all')
    all.classList.remove('selected')
    const completed = document.querySelector('#completed')
    completed.classList.add('selected')

    if(showClearCompleted()){
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'block'
    }else{
        var deletcompleted = document.getElementById('deletCompleted')
        deletcompleted.style.display = 'none'
    }
}


async function markAsCompleted(id) {
    try {
        var responseMark = await fetch(`http://localhost:3000/${id}`, {
            method: 'put'

        })
    } catch (error) {
        console.error(error);
    }
    const todo = await responseMark.json()
    statusTodo = todo[0].completed

    if (statusTodo == true) {
        try {
            var responseMark = await fetch(`http://localhost:3000/${id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: false })
    
            })
        } catch (error) {
            console.error(error);
        }
        qnt += 1
        console.log(qnt);
    }else{
        try {
            var responseMark = await fetch(`http://localhost:3000/${id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: true })
    
            })
        } catch (error) {
            console.error(error);
        }
        qnt -= 1
    }

    if (local == 'all') {
        listAll()
    }else if (local == 'active') {
        listActive()
    }else{
        listCompleted()
    }

}

async function markAllAsCompleted() {
    try {
        var responseMark = await fetch(`http://localhost:3000/`, {
            method: 'put'

        })
    } catch (error) {
        console.error(error);
    }
    if (local == 'all') {
        listAll()
    }else if (local == 'active') {
        listActive()
    }else if (local == 'completed') {
        listCompleted()
    }
        
    
}

function showClearCompleted() {
    if (tam == qnt) {
        return false
    }else{
        return true
    }
}

async function clearCompleted() {
    try {
        var responseCompleted = await fetch('http://localhost:3000/delete', {
            method: 'delete'
        })
    } catch (error) {
        console.error(error);
    }
    
    try {
        var response = await fetch('http://localhost:3000/todo_list', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }

    const todo = await response.json()
    const qnt = todo.length
    if (qnt == 0) {
        listAll()
    }else if (local == 'all') {
        listAll()
    }else if (local == 'active') {
        listActive()
    }else if (local == 'completed') {
        listCompleted()
    }
}

async function removeTask(id) {
    try {
        var responseCompleted = await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'delete'
        })
    } catch (error) {
        console.error(error);
    }
    
    try {
        var response = await fetch('http://localhost:3000/todo_list', {
            method: 'post'
        })
    } catch (error) {
        console.error(error);
    }

    const todo = await response.json()
    const qnt = todo.length
    if (qnt == 0) {
        listAll()
    }else if (local == 'all') {
        listAll()
    }else if (local == 'active') {
        listActive()
    }else if (local == 'completed') {
        listCompleted()
    }
}

async function renameTask(id) {
    var todo = document.querySelector('#todo')
    todo.classList.add('editing')
}
listAll()
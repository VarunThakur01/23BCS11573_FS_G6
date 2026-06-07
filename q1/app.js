let todos = [];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const leftDiv = document.createElement('div');
        leftDiv.className = 'todo-left';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        leftDiv.appendChild(checkbox);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';
        
        if (todo.isEditing) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'edit-input';
            input.value = todo.text;
            leftDiv.appendChild(input);
            
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'action-btn save-btn';
            saveBtn.addEventListener('click', () => saveEdit(todo.id, input.value));
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit(todo.id, input.value);
                }
            });
            
            actionsDiv.appendChild(saveBtn);
        } else {
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            leftDiv.appendChild(span);
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'action-btn edit-btn';
            editBtn.addEventListener('click', () => startEdit(todo.id));
            
            actionsDiv.appendChild(editBtn);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        actionsDiv.appendChild(deleteBtn);
        
        li.appendChild(leftDiv);
        li.appendChild(actionsDiv);
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    todos.push({
        id: Date.now(),
        text,
        completed: false,
        isEditing: false
    });
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
}

function startEdit(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, isEditing: true };
        }
        return { ...todo, isEditing: false };
    });
    renderTodos();
    const activeInput = todoList.querySelector('.edit-input');
    if (activeInput) {
        activeInput.focus();
        activeInput.setSelectionRange(activeInput.value.length, activeInput.value.length);
    }
}

function saveEdit(id, newText) {
    const text = newText.trim();
    if (!text) return;
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, text, isEditing: false };
        }
        return todo;
    });
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = '';
    }
});

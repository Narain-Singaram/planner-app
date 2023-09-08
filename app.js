document.addEventListener('DOMContentLoaded', function () {
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');

    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');

    // Function to add a new note
    addNoteButton.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = noteText;
            
            // Add a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            
            // Add an update button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('update-button');
            
            // Append buttons to the note item
            listItem.appendChild(deleteButton);
            listItem.appendChild(updateButton);
            
            // Add event listener for delete
            deleteButton.addEventListener('click', function () {
                notesList.removeChild(listItem);
                saveNotes();
            });
            
            // Add event listener for update
            updateButton.addEventListener('click', function () {
                const updatedNoteText = prompt('Edit the note:', noteText);
                if (updatedNoteText !== null) {
                    listItem.textContent = updatedNoteText;
                    saveNotes();
                }
            });
            
            notesList.appendChild(listItem);
            noteInput.value = '';
            
            // Add animation
            listItem.classList.add('fade-in');
            
            // Store notes in local storage
            saveNotes();
        }
    });

    // Function to add a new todo item
    addTodoButton.addEventListener('click', function () {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = todoText;
            
            // Add a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            
            // Add an update button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('update-button');
            
            // Append buttons to the todo item
            listItem.appendChild(deleteButton);
            listItem.appendChild(updateButton);
            
            // Add event listener for delete
            deleteButton.addEventListener('click', function () {
                todoList.removeChild(listItem);
                saveTodos();
            });
            
            // Add event listener for update
            updateButton.addEventListener('click', function () {
                const updatedTodoText = prompt('Edit the todo:', todoText);
                if (updatedTodoText !== null) {
                    listItem.textContent = updatedTodoText;
                    saveTodos();
                }
            });
            
            todoList.appendChild(listItem);
            todoInput.value = '';
            
            // Add animation
            listItem.classList.add('fade-in');
            
            // Store todos in local storage
            saveTodos();
        }
    });

    // Load notes and todos from local storage on page load
    loadNotes();
    loadTodos();

    // Function to save notes in local storage
    function saveNotes() {
        const notes = Array.from(notesList.children).map((item) => item.textContent);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((noteText) => {
            const listItem = createListItem(noteText);
            notesList.appendChild(listItem);
        });
    }

    // Function to save todos in local storage
    function saveTodos() {
        const todos = Array.from(todoList.children).map((item) => item.textContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to load todos from local storage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach((todoText) => {
            const listItem = createListItem(todoText);
            todoList.appendChild(listItem);
        });
    }
    
    // Helper function to create a list item with delete and update buttons
    function createListItem(text) {
        const listItem = document.createElement('li');
        listItem.textContent = text;

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        // Add an update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update-button');

        // Append buttons to the item
        listItem.appendChild(deleteButton);
        listItem.appendChild(updateButton);

        // Add event listener for delete
        deleteButton.addEventListener('click', function () {
            listItem.parentNode.removeChild(listItem);
            if (notesList.contains(listItem)) {
                saveNotes();
            } else if (todoList.contains(listItem)) {
                saveTodos();
            }
        });

        // Add event listener for update
        updateButton.addEventListener('click', function () {
            const updatedText = prompt('Edit the item:', text);
            if (updatedText !== null) {
                listItem.textContent = updatedText;
                if (notesList.contains(listItem)) {
                    saveNotes();
                } else if (todoList.contains(listItem)) {
                    saveTodos();
                }
            }
        });

        return listItem;
    }
});

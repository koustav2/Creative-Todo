import { createSlice } from '@reduxjs/toolkit';

const getTodoList = () => {
    const todoList = window.localStorage.getItem('todoList');
    return todoList ? JSON.parse(todoList) : [];
};

const updateLocalStorageAndState = (state, updatedTodoList) => {
    window.localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    state.todoList = updatedTodoList;
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        filterStatus: 'all',
        todoList: getTodoList(),
    },
    reducers: {
        addTodo: (state, action) => {
            const { payload } = action;
            state.todoList.push(payload);
            updateLocalStorageAndState(state, state.todoList);
        },
        updateTodo: (state, action) => {
            const { payload } = action;
            const updatedTodoList = state.todoList.map(todo =>
                todo.id === payload.id ? { ...todo, ...payload } : todo
            );
            updateLocalStorageAndState(state, updatedTodoList);
        },
        deleteTodo: (state, action) => {
            const updatedTodoList = state.todoList.filter(todo => todo.id !== action.payload);
            updateLocalStorageAndState(state, updatedTodoList);
        },
        filterTodo: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, filterTodo } = todoSlice.actions;
export default todoSlice.reducer;

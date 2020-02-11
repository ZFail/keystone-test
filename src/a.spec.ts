import { Todo, TodoStore } from "./todo"

test('todo creation', () => {
    const todo1 = new Todo({ text: "asd", done: true })
    expect(todo1.text).toBe('asd');
    expect(todo1.done).toBe(true);
})

test('todo creation optional done', () => {
    const todo1 = new Todo({ text: "asd" })
    expect(todo1.text).toBe('asd');
    expect(todo1.done).toBe(false);
})

test('todo store add todo', () => {
    const store = new TodoStore({})
    expect(store.todos.length).toBe(0);
    store.addTodo({text: 'asd'})
    expect(store.todos.length).toBe(1);
    expect(store.todos[0].text).toBe('asd');
    expect(store.todos[0].done).toBe(false);
})

test('select todo', () => {
    const store = new TodoStore({})
    store.addTodo({text: 'asd', id: '0'})

    expect(store.selectedTodo).not.toBeTruthy()
    store.selectTodoById('0')
    expect(store.selectedTodo).toBeTruthy()
    expect(store.selectedRef).toBeTruthy()
    // if (store.selectedRef) {
        expect(store.selectedRef.isValid).toBeTruthy()
    // }
    store.clear()
    expect(store.selectedRef).toBeTruthy()
    // if (store.selectedRef) {
        expect(store.selectedRef.isValid).not.toBeTruthy()
    // }
    store.addTodo({text: 'asd', id: '0'})
    // store.selectTodo(store.todos[0])
    expect(store.selectedRef).toBeTruthy()
    // if (store.selectedRef) {
        expect(store.selectedRef.isValid).toBeTruthy()
        expect(store.selectedRef.current.text).toBe('asd');
        expect(store.selectedRef.current.done).toBe(false);
    // }
})

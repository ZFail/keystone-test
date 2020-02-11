import { model, Model, modelAction, prop, ModelCreationData, ModelData, tProp, types, rootRef, detach, Ref } from 'mobx-keystone'
import { computed } from 'mobx'

const todoRef = rootRef<Todo>("myApp/TodoRef", {
    // this works, but we will use getRefId() from the Todo class instead
    // getId(maybeTodo) {
    //   return maybeTodo instanceof Todo ? maybeTodo.id : undefined
    // },
    onResolvedValueChange(ref, newTodo, oldTodo) {
        if (oldTodo && !newTodo) {
            // if the todo value we were referencing disappeared then remove the reference
            // from its parent
            // detach(ref)
        }
    },
})

let maxId = 0

@model("Todo")
export class Todo extends Model({
    text: prop<string>(),
    done: prop(false),
    id: prop<string>(() => `${maxId++}`),
}) {
    getRefId() {
        // when getId is not specified in the custom reference it will use this as id
        return this.id
    }
    @modelAction
    setDone(done: boolean) {
        this.done = done
    }
    @modelAction
    setText(text: string) {
        this.text = text
    }
}

type TodoCreation = ModelCreationData<Todo>
type TodoSnapshot = ModelData<Todo>


@model("TodoStore")
export class TodoStore extends Model({
    todos: prop<Todo[]>(() => []),
    selectedRef: prop<Ref<Todo> | undefined>(),
}) {
    @modelAction
    addTodo(todo: ModelCreationData<Todo>) {
        this.todos.push(new Todo(todo))
    }
    @computed
    get selectedTodo() {
        return this.selectedRef ? this.selectedRef.current : undefined
    }
    @modelAction
    selectTodo(todo: Todo | undefined) {
        if (todo && !this.todos.includes(todo)) throw new Error("unknown todo")
        this.selectedRef = todo ? todoRef(todo) : undefined
    }
    @modelAction
    selectTodoById(id: string) {
        this.selectedRef = todoRef(id)
    }
    @modelAction
    clear() {
        this.todos = []
    }
}

// const store = new TodoStore({})
// store.addTodo({text: 'asd', id: '0'})
// store.selectTodo(store.todos[0])
// expect(store.selectedTodo).toBeTruthy()
// expect(store.selectedRef.isValid).toBeTruthy()

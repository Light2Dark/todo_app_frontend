import axios from "axios"
import { useEffect, useState } from "react"
import { userLoggedIn } from "../Auth/AuthFuncs"
import TodoItem from "./TodoItem"

export interface TodoProps {
    id: number
    item: string
}

const getAxiosConfig = () => {
    let config = {
        headers: {
            "user_id": sessionStorage.getItem("user_id") || false
        }
    }
    return config
}

const Todo = () => {
    const [todos, setTodos] = useState<TodoProps[] | []>([])
    const [todoIndex, setTodoIndex] = useState(1)

    useEffect(() => {
        if (userLoggedIn()) { // oni pull from server when the user is logged in
            getTodosFromServer()
        }
    }, [])

    // TOP LEVEL SERVER FUNCTIONS ARE HERE SO THAT WE CHECK IF USER IS LOGGED IN BEFORE WE CALL SERVER FUNCS

    async function getTodosFromServer() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo`, getAxiosConfig()).then(res => {
            if (res.data === null) {
                setTodos([])
                return
            }
            let todos: any = Object.values(res.data)
            setTodos(todos)
        })
    }

    async function addTodo(todo: TodoProps) {
        let duplicate: boolean = false
        todos.forEach(todoLocal => {
            if (todoLocal.item === todo.item) { // duplicate
                duplicate = true
            }
        })
        if (!duplicate) {
            setTodos([...todos, todo]) // updating local state instead of fetching from server for performance
        } else {
            return alert("Todo already exists")
        }

        if (userLoggedIn()) {
            postTodoToServer(todo)
        }
    }

    async function postTodoToServer(todo: TodoProps) {
        // server code
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`, todo, getAxiosConfig()).then(res => {
            // getTodosFromServer()
        }).catch(err => {
            if (err.response.status === 400) { // bad request
                console.log("Error creating to-do")
            }
        })
    }

    // when user adds a to-do
    const handleSubmit = (event: any) => {
        event.preventDefault()
        let input = event.target.todo_input
        let todo: TodoProps = {
            id: todoIndex,
            item: input.value
        }
        addTodo(todo)

        setTodoIndex((prev) => prev + 1)
        event.target.reset() // reset the form
    }

    async function updateTodo({ id, item }: TodoProps) {
        let todo: TodoProps = {
            id: id,
            item: item
        }
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.item = item
            }
            return todo
        }))

        if (userLoggedIn()) {
            updateTodoInServer(todo)
        }
    }

    // when user finishes editing / clicks on the check mark after editing a to-do
    async function updateTodoInServer(todo: TodoProps) {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/todo/${todo.id}`, todo, getAxiosConfig()).then(res => {
            getTodosFromServer()
        }).catch(err => {
            console.log(err)
        })
    }

    async function deleteTodo({id}: TodoProps) {
        setTodos(todos.filter(todo => todo.id !== id))
        if (userLoggedIn()) {
            deleteTodoInServer(id)
        }
    }

    async function deleteTodoInServer(id: number) {
        setTodos(todos.filter(todo => todo.id !== id)) // all todos that are not meant to be deleted are remained in

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todo/${id}`, getAxiosConfig()).then(res => {
            getTodosFromServer()
        }).catch(err => {
            console.log(err)
        })
    }

    let colourIndex = 0
    let colours = ["bg-green-200", "bg-teal-100", "bg-pink-200", "bg-sky-200", "bg-rose-200", "bg-fuchsia-200"]
    const getRandomColour = () => {
        colourIndex++
        colourIndex = colourIndex % colours.length // so if larger than length of colours, it will start from 0
        return colours[colourIndex]
    }

    return (
        <div className="mt-8 flex flex-col items-center w-4/5 md:w-1/2">
            <h1 className="text-3xl font-bold dark:text-pale-cream">To-Do</h1>

            <form className="mt-5 mb-6 flex flex-col md:flex-row gap-2 items-center" onSubmit={handleSubmit}>
                <input type="text" name="todo_input" id="todo_input" required placeholder="Buy milk and eggs" className="px-4 py-1 border-black border-2 rounded-lg w-60 md:w-80 dark:border-pale-cream" autoComplete="off" />
                <button type="submit" className="w-1/2 md:w-fit bg-slate-200 p-2 rounded-md hover:bg-slate-300 dark:bg-pale-red dark:hover:bg-red-300 transition-all">Add To-Do</button>
            </form>

            {todos && todos.map(todo => (
                <TodoItem key={todo.id} id={todo.id} item={todo.item} updateTodo={updateTodo} deleteTodo={deleteTodo} randomColour={getRandomColour()} />
            ))}
        </div>
    )
}

export default Todo
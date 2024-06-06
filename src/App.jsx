import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

export default function App() {
  const [todos,setTodos] =useState([])
  
  const addTodo = (todo) =>{
    // setTodos(todo); //adds the new todo to the list of todos but reset all the previous values...
    setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev]);
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo =(id) =>{
    //map nahin use kar rahe kyunki filter is good when we have to restrict some value
    //  ,here we are restricting value with id from coming in future
    //in  simple words we are removing that particular element which has same id as passed in parameter
    //here in below line we can see that we are passing this condition `prevTodo.id != id` as true
    setTodos(prev => prev.filter((prevTodo)=>(prevTodo.id != id )))
  }
  const toggleComplete =(id)=>{
    setTodos(prev=>prev.map((prevTodo) => prevTodo.id===id ?{...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo))
  }
  //WHEN APPLICATION IS LOADED RETURN ALREADY PRESENT VALUES !!
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0){
        setTodos(todos);
    }
  }, [])
  //When we add or update some values we want to add them to local storage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  return (
 <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
              className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
        </div>
    </div>
</div>
 </TodoProvider>
  )
}


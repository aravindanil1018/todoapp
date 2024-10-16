import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task,setTask] =useState('')
  const[tasks,setTasks]=useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  //load task from localstorage

  useEffect(()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    
      setTasks(savedTasks)
      setIsLoaded(true)
    
  },[])

  // save task to localstorage whenever task changes

  useEffect(()=>{
    if(isLoaded){
    localStorage.setItem('tasks',JSON.stringify(tasks))
    }
  },[tasks,isLoaded])

  // adding a new task

  const addTask =(e)=>{
    e.preventDefault();
    if(task){
      setTasks([...tasks,{id:Date.now(), text:task, completed:false}]) 
      setTask('');
    }
  }

  //toggling task completion

  const toggleComplete =(id)=>{
    setTasks(tasks.map(task=>task.id === id ? {...task,completed: !task.completed }:task))
  }

  // delete task
  const deleteTask = (id)=>{
    setTasks(tasks.filter(task=> task.id !== id));
  }


  return (
    <>
      <div className="app">
        <h1>Todo List</h1>
        <form onSubmit={addTask} >
          <input type="text"
          value={task}
          placeholder='Enter the task'
          onChange={(e)=>setTask(e.target.value)}/>
          <button type='submit'>Add</button>
        </form>
        <ul>
          {tasks.map((task)=>(
            <li key={task.id} className={task.completed ? 'completed':''}>
                <span onClick={()=>toggleComplete(task.id)}> {task.completed ? '✔️ ' : ''}{task.text}</span>
                
                <button onClick={()=>deleteTask(task.id)}> Delete</button>

            </li>
          ))}

        </ul>
      </div>
    </>
  )
}

export default App

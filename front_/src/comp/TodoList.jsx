import React from 'react'
import TodoItem from './TodoItem'
import todoStore from '../store/TodoStore'

function TodoList() {  

  const {data} = todoStore();


  if(data.length === 0) return <div>준비중,,,</div>;

  return (
    <ul className='list'>
      {
        data.map(function(item){
          return <TodoItem key={item._id} item={item}/>
        })
      }        
    </ul>
  )
}

export default TodoList
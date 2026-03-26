import React from 'react'
import todoStore from '../store/TodoStore'

function TodoItem({item}) {
  const {del,completeTodo} = todoStore();

  return (
    <li className={`item ${item.isdone && 'done'}`}>
        {item.content}
        <span>
          <button>수정</button>
          <button onClick={()=>del(item._id)}>삭제</button>
          <button onClick={()=>completeTodo(item._id)}>완료</button>
        </span>
    </li>
  )
}

export default TodoItem
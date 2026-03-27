import React from 'react'
import todoStore from '../store/TodoStore'

function TodoHead() {
  const {get, data} = todoStore()

  let done =  data.filter(item=>item.isdone === true)
  
  // data.filter(function(item) { 
  //   return item.isdone === true
  // })
  
  return (
    <div className='head'>
        <h2>TodoList</h2>
        <div>
            <div>할일({data.length}) | 완료({done.length})</div>
            <div className='btns'>
                <button onClick={e=>get('all')}>전체</button>
                <button onClick={e=>get(false)}>진행중</button>
                <button onClick={e=>get(true)}>완료</button>
            </div>
        </div>
    </div>
  )
}

export default TodoHead
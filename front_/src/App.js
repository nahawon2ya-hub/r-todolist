import './App.css';
import TodoList from './comp/TodoList';
import TodoInsert from './comp/TodoInsert';
import TodoHead from './comp/TodoHead';
import todoStore from './store/TodoStore';
import { useEffect } from 'react';

function App() {

  const {get} = todoStore();
  
  useEffect(()=>{
    get('all');
  }, [])

  return (
    <div className="App">
      <TodoHead />
      <TodoList />
      <TodoInsert />
    </div>
  );
}

export default App;

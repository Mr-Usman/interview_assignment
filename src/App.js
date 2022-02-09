import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import TodoList from "./TodoList";
import { sortListByDate } from './utility/function';

let todoList = [];

const getTodoList = () => {
  todoList = JSON.parse(window.localStorage.getItem("todoList"));
  return todoList ? sortListByDate(todoList) : [];
};

function App() {
  const [title, setTitle] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({});
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const list = getTodoList();
    setTodoList(list);
  }, []);

  useEffect(() => {
    const stringifyTodoList = JSON.stringify(todoList);
    window.localStorage.setItem("todoList", stringifyTodoList);
  }, [todoList, setTodoList]);

  const handleSubmit = () => {
    //  this condition is checking for update todo case
    if(isUpdate){
      updateTodo.title = title;
      updateTodo.date = new Date().toISOString();
      let updateTodoArray  = todoList.map(todo => {
        if(todo.id === updateTodo.id){
          return updateTodo;
        }
        return todo;
      });
      updateTodoArray = sortListByDate(updateTodoArray);
      setTodoList(updateTodoArray);
    } else {
      // invert the previous update case so creation could happen
      setIsUpdate(false);
      // check if same todo is already exists then stop adding duplicate todo
      const isDuplicate = todoList.some(todo => todo.title === title);
      if(isDuplicate) {
        alert('please do not add duplicate todo');
      } else {
        let sortedList = [
          ...todoList,
          { id: uuid(), title, date: new Date().toISOString() },
        ];
        sortedList = sortListByDate(sortedList);
        setTodoList(sortedList);
      }
    }
    setTitle("");
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const deletedTodo = (deleteTodoId) => {
    const updateTodoList = todoList.filter(singleTodo => singleTodo.id !== deleteTodoId);
    setTodoList(updateTodoList);
  };

  const updatedTodo = (updateTodoId) => {
    setIsUpdate(true);
    const updateTodo = todoList.find(singleTodo => singleTodo.id === updateTodoId);
    setUpdateTodo(updateTodo);
    setTitle(updateTodo.title);
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input type="text" value={title} onChange={(e) => onChangeHandler(e)} /> &nbsp;
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <br />
      {todoList.length > 0 ? todoList.map((todo, index) => (
        <TodoList
          deleteTodo={deletedTodo}
          updateTodo={updatedTodo}
          key={index}
          id={todo.id}
          title={todo.title}
          date={todo.date}
        />
      )): <p>please add some todos</p>}
    </div>
  );
}

export default App;

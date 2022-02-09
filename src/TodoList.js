import React from "react";

const TodoList = ({ id, date, title, deleteTodo, updateTodo }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <div style={{ flex: 0.25 }}>
          <span>{title}</span>
        </div>
        <div>
          <span style={{ flex: 0.25 }}>{date}</span>
        </div>
        <div>
          <span style={{ flex: 0.25 }}>
            <button onClick={() => updateTodo(id)}>Edit</button>
          </span>
        </div>
        <div>
          <span style={{ flex: 0.25 }}>
            <button onClick={() => deleteTodo(id)}>Delete</button>
          </span>
        </div>
      </div>
      <br />
    </>
  );
};

export default TodoList;

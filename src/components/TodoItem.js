import React, { useState } from 'react';

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedtask, setEditedtask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo updated.');
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'DELETE',
    }).then(() => {
      console.log('todo deleted.');
      setRefresh(true);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    todo.task = editedtask;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo edited.');
      setIsEditing(false);
      setRefresh(true);
    });
  };

  return (
    <li className={`${todo.complete ? 'checked' : ''}`}>
      {isEditing ? (
        <div className="kolom-edit">
          <input type="text" value={editedtask} onChange={(e) => setEditedtask(e.target.value)} />
          <button
            className="button-save"
            onClick={() => {
              handleEditSave();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            updateTodo();
          }}
        >
          {todo.task}
        </div>
      )}
      <span className="edit">{!isEditing && <i className="pensil fa-solid fa-pen" onClick={handleEdit}></i>}</span>
      <span
        className="close"
        onClick={() => {
          deleteTodo();
        }}
      >
        <i className="sampah fa-solid fa-trash"></i>
      </span>
    </li>
  );
};

export default TodoItem;

import deleteIcon from '../assets/icon-cross.svg';

const Todo = ({
  todo,
  handleRemoveTodo,
  handleToggleTodo,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  draggedTodo,
}) => {
  return (
    <>
      <li
        draggable
        onDragStart={(event) => handleDragStart(event, todo)}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, todo)}
        onDragEnd={handleDragEnd}
        className={`todo ${todo.isComplete ? 'complete' : ''} ${
          draggedTodo && draggedTodo.id === todo.id ? 'dragged' : ''
        }`}
      >
        <div className="flex">
          <input
            type="checkbox"
            checked={todo.isComplete ? 'checked' : ''}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <span>{todo.name}</span>
        </div>

        <div onClick={() => handleRemoveTodo(todo.id)} className="cross delete">
          <img src={deleteIcon} alt="delete icon" />
        </div>
      </li>
    </>
  );
};

export default Todo;

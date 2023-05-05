import deleteIcon from '../assets/icon-cross.svg';

const Todo = ({ todo, handleRemoveTodo, handleToggleTodo }) => {
  return (
    <>
      <li className={`todo ${todo.complete ? 'complete' : ''}`}>
        <div className="flex">
          <input
            type="checkbox"
            checked={todo.complete ? 'checked' : ''}
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

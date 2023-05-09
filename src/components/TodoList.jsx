import Todo from './Todo';

const TodoList = ({
  handleRemoveTodo,
  handleToggleTodo,
  filterTodos,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
}) => {
  return (
    <>
      <ul className="todos">
        {filterTodos().map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              handleRemoveTodo={handleRemoveTodo}
              handleToggleTodo={handleToggleTodo}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragEnd={handleDragEnd}
            />
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;

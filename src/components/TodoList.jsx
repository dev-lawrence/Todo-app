import Todo from './Todo';

const TodoList = ({
  todos,
  handleRemoveTodo,
  handleToggleTodo,
  filterTodos,
}) => {
  return (
    <>
      <ul className="todos">
        {filterTodos(todos).map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              handleRemoveTodo={handleRemoveTodo}
              handleToggleTodo={handleToggleTodo}
            />
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;

import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  if (!todos || typeof todos !== 'object') {
    return <div>No todos</div>;
  }

  return (
    <>
      {todos
        .map((todo, index) => {
          return (
            <Todo
              key={`${todo}_${index}`}
              todo={todo}
              onClickDelete={onClickDelete(todo)}
              onClickComplete={onClickComplete(todo)}
            />
          );
        })
        .reduce((acc, cur) => [...acc, <hr key={`cursed-warning_${Math.random(100)}`}/>, cur], [])}
    </>
  );
};

export default TodoList;

import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Todo from './Todo';
const testTodo = {
  _id: '67b44c170e0e960d50544ca7',
  text: 'Write code',
  done: false,
};
describe('Testing single note functionality', () => {
  let onClickDelete;
  let onClickComplete;
  beforeEach(() => {
    onClickDelete = vi.fn();
    onClickComplete = vi.fn();
    render(
      <Todo
        todo={testTodo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Todo renders correctly', () => {
    expect(screen.getByText('Write code')).toBeDefined();
  });

  test('Todo delete is called when button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'));
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });

  test('Todo complleted is called when button is clicked', () => {
    fireEvent.click(screen.getByText('Set as done'));
    expect(onClickComplete).toHaveBeenCalledTimes(1);
  });
});

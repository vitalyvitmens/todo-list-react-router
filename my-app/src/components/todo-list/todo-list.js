import { Link, useNavigate } from 'react-router-dom'
import styles from './todo-list.module.css'

export const TodoList = ({
	todosServer,
	search,
	onSubmit,
	checkTodoHandler,
	requestCheckTodo,
	todoData,
}) => {
	const navigate = useNavigate()

	const ellipsis = (str, n) => {
		if (str.length <= n) {
			return str
		} else {
			return str.slice(0, n) + '...'
		}
	}

	const todosFilter = todosServer.filter((todo) => {
		return search
			? todo.title.toLowerCase().includes(search.toLowerCase())
			: todo
	})

	return todosFilter.map(({ id, title, completed }) => (
		<ol key={id} onClick={onSubmit}>
			<span>{id}</span>
			<div
				className={completed ? styles.todoLineThrough : styles.todo}
				onClick={() => {
					navigate(`/todo/${id}`)
					checkTodoHandler()
					requestCheckTodo(id)
				}}
			>
				{ellipsis(String(title), 22)}
			</div>
		</ol>
	))
}

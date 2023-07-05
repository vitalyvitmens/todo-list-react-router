import styles from './todo-list.module.css'

export const TodoList = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
	search,
  onSubmit
}) => {
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

	return todosFilter.map(({ id, title }) => (
		<ol key={id} onClick={onSubmit}>
			<span>{id}</span>
			{ellipsis(String(title), 22)}
			<button
				className={!todo ? styles.updateBtnYellow : styles.updateBtnGreen}
				onClick={() => {
					if (todo === '') {
						setIsUpdating(true)
						setTodo(title)
					} else {
						requestUpdateTodo(id)
						setTodo('')
					}
				}}
			>
				✎
			</button>
			<button
				className={styles.deleteBtn}
				onClick={() => requestDeleteTodo(id)}
			>
				X
			</button>
		</ol>
	))
}

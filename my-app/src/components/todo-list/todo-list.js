import styles from './todo-list.module.css'

export const TodoList = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
	search,
}) => {
	const ellipsis = (str, n) => {
		if (str.length <= n) {
			return str
		} else {
			return str.slice(0, n) + '...'
		}
	}

	return todosServer
		.filter((todo) => {
			return search
				? todo.title.toLowerCase().includes(search.toLowerCase())
				: todo
		})
		.map(({ id, title }) => (
			<ol key={id}>
				<span>{id}</span>
				{ellipsis(String(title), 25)}
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

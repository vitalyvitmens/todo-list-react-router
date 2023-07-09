import styles from './todo-infa.module.css'

export const TodoInfa = ({
	todo,
	setTodo,
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	setIsUpdating,
	onSubmit,
	toggleCompletedHandler,
	requestUpdateCompletedTodo,
	todoData,
}) => {
	const currentTodo = todosServer.filter(
		(todo) => todo.id === Number(todoData.id)
	)

	return currentTodo.map(({ id, title, completed }) => (
		<ol key={id} onClick={onSubmit}>
			<span>{id}</span>
			<div
				className={completed ? styles.todoLineThrough : styles.todo}
				onClick={() => {
					toggleCompletedHandler()
					requestUpdateCompletedTodo(id)
				}}
			>
				{title}
			</div>
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

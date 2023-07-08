import styles from './todo-infa.module.css'

export const TodoInfa = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
	search,
	onSubmit,
	requestCheckTodo,
  toggleCompletedHandler,
	requestUpdateCompletedTodo,
}) => {
	const todosFilter = todosServer.filter((todo) => {
		return search
			? todo.title.toLowerCase().includes(search.toLowerCase())
			: todo
	})

	return todosFilter.map(({ id, title, completed }) => (
		<>
			<div className={styles.containerTodoInfa}>
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
			</div>
		</>
	))
}

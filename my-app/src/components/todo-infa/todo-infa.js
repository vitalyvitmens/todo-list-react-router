import { useNavigate } from 'react-router-dom'
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
	Button,
}) => {
	const navigate = useNavigate()

	return (
		<>
			<div className={styles.btn_h1}>
				<Button onClick={() => navigate('/')}>На Главную</Button>
			</div>
			{todosServer
				.filter((todo) => todo.id === todoData.id)
				.map(({ id, title, completed }) => (
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
				))}
		</>
	)
}

import { useState } from 'react'
import { TodoForm, TodoList, Loader } from './components/index'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './json-server-hooks/index'
import styles from './app.module.css'

//! JSON Server
// json-server --watch src/db.json --port 8204 --delay 1000

export const App = () => {
	const [todo, setTodo] = useState('')
	const [todosServer, setTodosServer] = useState([])
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [editId, setEditId] = useState(false)
	const [sortTitle, setSortTitle] = useState(false)
	const [search, setSearch] = useState('')

	const { isLoading } = useRequestGetTodos(
		refreshTodos,
		setTodosServer,
		sortTitle
	)

	const { requestAddTodo } = useRequestAddTodo(
		refreshTodos,
		setRefreshTodos,
		todo,
		setTodo
	)

	const { isUpdating, requestUpdateTodo, setIsUpdating } = useRequestUpdateTodo(
		refreshTodos,
		setRefreshTodos,
		todo,
		setTodo
	)

	const { requestDeleteTodo } = useRequestDeleteTodo(
		refreshTodos,
		setRefreshTodos,
		todo
	)

	const onSubmit = (e) => {
		e.preventDefault()

		if (editId) {
			const editTodo = todosServer.find((i) => i.id === editId)
			const updatedTodos = todosServer.map((t) =>
				t.id === editTodo.id
					? (t = { id: t.id, todo })
					: { id: t.id, todo: t.todo }
			)
			setTodosServer(updatedTodos)
			setEditId(0)
			setTodo('')
			return
		}

		if (todo !== '') {
			setTodosServer([{ id: `${todo}-${Date.now()}`, todo }, ...todosServer])
			setTodo('')
		}
	}

	const sortHandler = () =>
		sortTitle ? setSortTitle(false) : setSortTitle(true)

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<h2>My To-Do List</h2>
				<input
					type="text"
					value={search}
					name="search-todo"
					placeholder="Найти задачу..."
					onChange={({ target }) => setSearch(target.value)}
					className="input-field"
				/>
				<p></p>
				<TodoForm
					onSubmit={onSubmit}
					todo={todo}
					editId={editId}
					setTodo={setTodo}
					requestAddTodo={requestAddTodo}
					isUpdating={isUpdating}
				/>
				<p></p>
				<button
					className={styles.btnBrown}
					onClick={sortHandler}
					disabled={todosServer.length === 0}
				>
					{sortTitle
						? 'Отфильтровать задачи по id'
						: 'Отфильтровать задачи по алфавиту'}
				</button>
				{isLoading ? (
					<Loader />
				) : (
					<TodoList
						todo={todo}
						todosServer={todosServer}
						setTodo={setTodo}
						requestUpdateTodo={requestUpdateTodo}
						requestDeleteTodo={requestDeleteTodo}
						setIsUpdating={setIsUpdating}
						search={search}
					/>
				)}
			</div>
		</div>
	)
}

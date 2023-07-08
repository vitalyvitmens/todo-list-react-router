import {
	Routes,
	Route,
	NavLink,
	// Outlet,
	// useParams,
	// useMatch,
	// useNavigate,
	// Navigate,
	// useRoutes,
} from 'react-router-dom'
import { useState } from 'react'
import { TodoForm, TodoList, Loader, TodoInfa } from './components/index'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
	useRequestCheckTodo,
	useRequestToggleCompletedTodo,
} from './hooks/index'
import { MainPage, Todo, NotFound } from './pages/index'
import styles from './app.module.css'

//! JSON Server
// json-server --watch src/db.json --port 8204 --delay 1000
//! react-router-dom
// npm i react-router-dom

export const App = () => {
	const [todo, setTodo] = useState('')
	const [todosServer, setTodosServer] = useState([])
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [editId, setEditId] = useState(false)
	const [sortTitle, setSortTitle] = useState(false)
	const [search, setSearch] = useState('')
	const [completed, setСompleted] = useState(false)
	const [todoData, setTodoData] = useState([])

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

	const { requestCheckTodo } = useRequestCheckTodo(setTodoData)

	const { requestUpdateCompletedTodo } = useRequestToggleCompletedTodo(
		refreshTodos,
		setRefreshTodos,
		completed
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

	const toggleCompletedHandler = () =>
		completed ? setСompleted(false) : setСompleted(true)

	const checkTodoHandler = () => todoData

	return (
		<>
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
						<>
							<TodoList
								todosServer={todosServer}
								search={search}
								onSubmit={onSubmit}
								checkTodoHandler={checkTodoHandler}
								requestCheckTodo={requestCheckTodo}
							/>
							<div className={styles.appNav}>
								<ul>
									<li>
										<NavLink to="/">НА ГЛАВНУЮ</NavLink>
									</li>
								</ul>
							</div>
							<h1>Страница Todo</h1>
							<div>
								<TodoInfa
									todo={todo}
									setTodo={setTodo}
									todosServer={todosServer}
									requestUpdateTodo={requestUpdateTodo}
									requestDeleteTodo={requestDeleteTodo}
									setIsUpdating={setIsUpdating}
									onSubmit={onSubmit}
									toggleCompletedHandler={toggleCompletedHandler}
									requestUpdateCompletedTodo={requestUpdateCompletedTodo}
								/>
							</div>
							<h1>Страница 404</h1>
							<div>
								<NotFound />
							</div>
						</>
					)}
				</div>
			</div>
			<div className={styles.appNav}>
				<ul>
					<li>
						<NavLink to="/todo">Todo</NavLink>
					</li>
				</ul>
			</div>
			<Routes>
				<Route
					path="/"
					element={
						<TodoList
							todosServer={todosServer}
							search={search}
							onSubmit={onSubmit}
							checkTodoHandler={checkTodoHandler}
							requestCheckTodo={requestCheckTodo}
						/>
					}
				/>
				<Route
					path="/todo"
					element={
						<TodoInfa
							todo={todo}
							setTodo={setTodo}
							todosServer={todosServer}
							requestUpdateTodo={requestUpdateTodo}
							requestDeleteTodo={requestDeleteTodo}
							setIsUpdating={setIsUpdating}
							onSubmit={onSubmit}
							toggleCompletedHandler={toggleCompletedHandler}
							requestUpdateCompletedTodo={requestUpdateCompletedTodo}
						/>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

// import { NavLink } from 'react-router-dom'
// import { useState } from 'react'
// import { TodoInfa } from '../../components/index'
// import {
// 	useRequestAddTodo,
// 	useRequestDeleteTodo,
// 	useRequestGetTodos,
// 	useRequestUpdateTodo,
// } from '../../json-server-hooks/index.js'
// import styles from './todo-page.module.css'

// export const Todo = () => {
// 	const [todo, setTodo] = useState('')
// 	const [todosServer, setTodosServer] = useState([])
// 	const [refreshTodos, setRefreshTodos] = useState(false)
// 	const [editId, setEditId] = useState(false)
// 	const [sortTitle, setSortTitle] = useState(false)
// 	const [search, setSearch] = useState('')

// 	const { isLoading } = useRequestGetTodos(
// 		refreshTodos,
// 		setTodosServer,
// 		sortTitle
// 	)

// 	const { requestAddTodo } = useRequestAddTodo(
// 		refreshTodos,
// 		setRefreshTodos,
// 		todo,
// 		setTodo
// 	)

// 	const { isUpdating, requestUpdateTodo, setIsUpdating } = useRequestUpdateTodo(
// 		refreshTodos,
// 		setRefreshTodos,
// 		todo,
// 		setTodo
// 	)

// 	const { requestDeleteTodo } = useRequestDeleteTodo(
// 		refreshTodos,
// 		setRefreshTodos,
// 		todo
// 	)

// 	const onSubmit = (e) => {
// 		e.preventDefault()

// 		if (editId) {
// 			const editTodo = todosServer.find((i) => i.id === editId)
// 			const updatedTodos = todosServer.map((t) =>
// 				t.id === editTodo.id
// 					? (t = { id: t.id, todo })
// 					: { id: t.id, todo: t.todo }
// 			)
// 			setTodosServer(updatedTodos)
// 			setEditId(0)
// 			setTodo('')
// 			return
// 		}

// 		if (todo !== '') {
// 			setTodosServer([{ id: `${todo}-${Date.now()}`, todo }, ...todosServer])
// 			setTodo('')
// 		}
// 	}

// 	return (
// 		<>
// 			<div className={styles.appNav}>
// 				<ul>
// 					<li>
// 						<NavLink to="/">НА ГЛАВНУЮ</NavLink>
// 					</li>
// 				</ul>
// 			</div>
// 			<h1>Страница Todo</h1>
// 			<div>
// 				<TodoInfa
// 					todo={todo}
// 					todosServer={todosServer}
// 					setTodo={setTodo}
// 					requestUpdateTodo={requestUpdateTodo}
// 					requestDeleteTodo={requestDeleteTodo}
// 					setIsUpdating={setIsUpdating}
// 					search={search}
// 					onSubmit={onSubmit}
// 				/>
// 			</div>
// 		</>
// 	)
// }

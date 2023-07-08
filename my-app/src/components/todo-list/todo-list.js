export const TodoList = ({ todosServer, search, onSubmit }) => {
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
		</ol>
	))
}

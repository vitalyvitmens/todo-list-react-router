export const useRequestToggleCompletedTodo = (
	refreshTodos,
	setRefreshTodos,
	completed
) => {
	const requestUpdateCompletedTodo = (id) => {
		fetch(`http://localhost:8204/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: completed,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos(!refreshTodos)
			})
	}

	return {
		requestUpdateCompletedTodo,
	}
}

export const useRequestCheckTodo = (setTodosServer) => {
	const requestCheckTodo = (id) => {
		fetch(`http://localhost:8204/todos/${id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosServer(loadedTodo)
			})
	}

	return {
		requestCheckTodo,
	}
}

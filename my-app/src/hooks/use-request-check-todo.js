export const useRequestCheckTodo = (setTodoData) => {
	const requestCheckTodo = (id) => {
		fetch(`http://localhost:8204/todos/${id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodoData(loadedTodo)
			})
	}

	return {
		requestCheckTodo,
	}
}

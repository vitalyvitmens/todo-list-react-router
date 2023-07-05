import { NavLink } from 'react-router-dom'
import styles from './todo-page.module.css'

export const Todo = () => (
	<>
		<div className={styles.appNav}>
			<ul>
				<li>
					<NavLink to="/">НА ГЛАВНУЮ</NavLink>
				</li>
			</ul>
		</div>
		<h1>Ты на странице Todo</h1>
	</>
)

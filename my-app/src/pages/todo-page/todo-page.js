import { MainPage } from '../../pages/index'
import { Routes, Route, NavLink } from 'react-router-dom'
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
		<Routes>
			<Route path="/" element={<MainPage />} />
		</Routes>
	</>
)

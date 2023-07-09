import { useNavigate } from 'react-router-dom'
import styles from './not-found.module.css'

export const NotFound = ({ Button }) => {
	const navigate = useNavigate()

	return (
		<>
			<div className={styles.btn_h1}>
				<Button onClick={() => navigate('/')}>На Главную</Button>
				<h1>404</h1>
			</div>
			<div className={styles.four_zero_four_bg}></div>
			<div className={styles.contant_box_404}>
				<h3>Похоже, Вы потерялись!</h3>
				<h4>Страница, которую ищете, не найдена!</h4>
			</div>
		</>
	)
}

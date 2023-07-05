import { MainPage } from '../../pages/index'
import { Routes, Route, NavLink } from 'react-router-dom'
import styles from './not-found.module.css'

export const NotFound = () => (
	<>
		<section className={styles.page_404}>
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles.col}>
						<div
							className={`${styles.col}
              ${styles.text}`}
						>
							<div className={styles.four_zero_four_bg}>
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
								<h1 className={styles.text}>404</h1>
							</div>

							<div className={styles.contant_box_404}>
								<h3>Похоже, Вы потерялись!</h3>

								<h4>Страница, которую ищете, не найдена!</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</>
)

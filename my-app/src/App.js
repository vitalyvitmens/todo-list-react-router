import styles from './app.module.css'
import { Loader, JsonServerComponent } from './components'

export const App = () => {
	return (
		<div className={styles.app}>
			<JsonServerComponent Loader={Loader} />
		</div>
	)
}

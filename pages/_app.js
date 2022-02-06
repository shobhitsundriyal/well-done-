import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<RecoilRoot>
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link
				rel='preconnect'
				href='https://fonts.gstatic.com'
				crossOrigin
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Poppins:ital@1&display=swap'
				rel='stylesheet'
			></link>{' '}
			<Component {...pageProps} />{' '}
		</RecoilRoot>
	)
}

export default MyApp

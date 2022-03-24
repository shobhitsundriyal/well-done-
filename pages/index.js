import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { userState } from '../atom/currentUserAtom'
import Header from '../components/Header'

export default function Home() {
	const user = useRecoilValue(userState)

	const router = useRouter()

	console.log(user)

	return (
		<div className='overflow-hidden'>
			<Head>
				<title>Well Done!!</title>
				<link rel='icon' href='/logo.ico' />
			</Head>
			<Header />
			<div className='bg-slate-100 h-[90vh] flex flex-col items-center justify-center'>
				<div className='absolute top-45 left-24 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
				<div className='absolute top-25 right-40 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
				<div className='absolute bottom-8 left-30 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>

				<span className='max-w-5xl text-6xl font-extrabold text-center bg-gradient-to-bl from-emerald-500 to-lime-500 text-transparent bg-clip-text p-2 pb-10 z-10'>
					Be on track by Having something to lose
				</span>
				<div className='flex space-x-10 mt-14 z-10'>
					<button
						className='button'
						onClick={() => router.push('/Search')}
					>
						Search by address
					</button>
					{user && (
						<button
							className='button'
							onClick={() => router.push('/Dashboard')}
						>
							Your Dashboard
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

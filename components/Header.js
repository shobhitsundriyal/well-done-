import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/currentUserAtom'

function Header() {
	const [currentAccount, setCurrentAccount] = useState()
	const [user, setUser] = useRecoilState(userState)
	const router = useRouter()
	const checkMetamsk = async () => {
		try {
			const { ethereum } = window
			if (!ethereum) {
				console.log('Make sure you have metamask')
				return
			} else {
				console.log('Ethereum object is present')
			}

			/*
			 * Check if we're authorized to access the user's wallet
			 */
			const accounts = await ethereum.request({ method: 'eth_accounts' })
			if (accounts.length !== 0) {
				const account = accounts[0]
				console.log('Found an authorized account:', account)
				setCurrentAccount(account)
				setUser(account)
			} else {
				console.log('No authorized account found')
			}
			return accounts[0]
		} catch (err) {
			console.log(err)
		}
	}

	/*
	 * This runs our function when the page loads.
	 */
	useEffect(() => {
		checkMetamsk() //returns accounts[0]
	}, [])

	/**Connect wallet function */
	const connectWallet = async () => {
		try {
			const { ethereum } = window
			if (!ethereum) {
				alert("You don't MetaMask!")
				return
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			})
			console.log('Connected', accounts[0])
			setCurrentAccount(accounts[0])
			setUser(accounts[0])
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className=' bg-red-100 p-3 flex rounded-b-xl items-center shadow-lg border-b-2 border-orange-600 z-10 cursor-default'>
			<span
				className='font-mono ml-6  font-extrabold text-2xl text-transparent bg-gradient-to-l from-lime-400 to-orange-400 bg-clip-text cursor-pointer'
				onClick={() => router.push('/')}
			>
				Well Done!!
			</span>
			{currentAccount ? (
				<button
					className='bg-red-400 text-black hover:bg-red-600 hover:text-white p-2 rounded-xl mr-6 ml-auto transition-colors delay-100 active:scale-95 shadow-md outline-none'
					onClick={() => router.push('/Dashboard')}
				>
					{' '}
					Your Dashboard
				</button>
			) : (
				<button
					className='bg-white text-red-500 hover:bg-red-500 border-2 border-red-500 hover:text-white transition-colors delay-100 p-2 rounded-xl mr-6 ml-auto'
					onClick={connectWallet}
				>
					{' '}
					Connect Metamask
				</button>
			)}
		</div>
	)
}

export default Header

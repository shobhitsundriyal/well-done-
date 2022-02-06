import { ethers } from 'ethers'
import Link from 'next/link'
import { useState } from 'react'
import { contractAddress, contractABI } from '../contractDetails'
import List from './List'

function Card({ title, status, acc }) {
	const [shortDesc, setShortDesc] = useState()
	const [link, setLink] = useState()
	const [logModal, setLogModal] = useState('hidden')
	const statusEmoji = ['✅', '🏃', '🔴']

	const [loaderState, setLoaderState] = useState('hidden')

	const [deadline, setDeadline] = useState()
	const [listArr, setListArr] = useState()
	let tempArr = []

	const logList = async () => {
		try {
			const { ethereum } = window
			setLoaderState('visible')
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const wellDoneContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				)
				tempArr = []
				try {
					let i = 1
					while (true) {
						await wellDoneContract.allLogs(i).then((resp) => {
							console.log(resp)
							if (
								//resp.by.toLowerCase() === acc.toLowerCase() && //this way need all project names to be unique.
								title.toLowerCase() === resp.pName.toLowerCase()
							) {
								tempArr.push(
									<List
										day={parseInt(resp.day._hex)}
										link={resp.link}
										description={resp.description}
									/>
								)
							}
						})
						i += 1
					}
				} catch (err) {
					setListArr(tempArr)
					setLoaderState('hidden')
				}
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getDeadline = async () => {
		try {
			const { ethereum } = window

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const wellDoneContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				)
				await wellDoneContract.timeLeft().then((time) => {
					console.log(parseInt(time._hex))
					let t = time._hex
					var h = Math.floor(t / 3600)
					var m = Math.floor((t % 3600) / 60)
					var s = Math.floor((t % 3600) % 60)
					setDeadline(h + 'H: ' + m + 'M: ' + s + 'S')
				})
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const takeLeave = async () => {
		try {
			setLoaderState('visible')
			const { ethereum } = window

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const wellDoneContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				)
				let Txn = await wellDoneContract.takeALeave()
				await Txn.wait()
				if (Txn) {
					setLoaderState('hidden')
					//update deadline
					getDeadline()
				}
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const submitWork = async () => {
		try {
			setLoaderState('visible')
			const { ethereum } = window

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const wellDoneContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				)
				let Txn = await wellDoneContract.submitTodayWork(
					shortDesc,
					link
				)
				await Txn.wait()
				if (Txn) {
					setLoaderState('hidden')
					//update list
					logList()
				}
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div
				className='h-56 w-60 border-2 border-black rounded-2xl p-2 shadow-lg bg-slate-100 hover:scale-105 transition-transform delay-100 cursor-pointer'
				onClick={() => setLogModal('visible')}
			>
				<div className='flex items-center flex-col justify-center'>
					<span className='font-mochi text-3xl text-center'>
						{title}
					</span>
					<span className='text-[5rem]'>{statusEmoji[status]}</span>
				</div>
			</div>
			{/* submit a day work modal */}
			<div
				className={`absolute h-[150%] w-[90%] top-20 left-16 bg-zinc-200 p-3 ${logModal} overflow-scroll`}
			>
				<div>
					<span
						className='button bg-red-700 px-3 hover:text-red-700 cursor-pointer'
						onClick={() => setLogModal('hidden')}
					>
						X
					</span>
				</div>
				<div className='text-xl font-mochi flex justify-between mt-4 items-center'>
					{title}
					{status && (
						<>
							{' '}
							<button
								className='button hover:text-orange-500 bg-orange-500'
								onClick={takeLeave}
							>
								{' '}
								Take leave
							</button>
							<span className=' font-popins '>
								<p
									className='cursor-pointer w-min'
									onClick={getDeadline}
								>
									🔂
								</p>
								Next deadline: {deadline}
							</span>
						</>
					)}
				</div>

				{status && (
					<div className='flex justify-center space-x-4 mt-5'>
						<input
							type='text'
							placeholder='Short Description'
							className='p-2'
							onChange={(e) => setShortDesc(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Link of work'
							className='p-2'
							onChange={(e) => setLink(e.target.value)}
						/>
						<button className='button' onClick={submitWork}>
							Submit Todays work
						</button>
					</div>
				)}

				{/* daily progrss */}
				<div onClick={logList} className='cursor-pointer text-xl'>
					🔃
				</div>

				{listArr}
				{/* loader  */}
				<div
					className={`absolute h-full bg-black top-0 w-full text-white flex items-center justify-center ${loaderState}`}
				>
					<div className='h-12 w-12 rounded-full border-x-2 animate-spin'></div>
					&nbsp;&nbsp;&nbsp;Please wait...
				</div>
			</div>
		</>
	)
}

export default Card

import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../contractDetails'

function Dashboard() {
	const [currentAccount, setCurrentAccount] = useState()
	const [pname, setPName] = useState()
	const [nCommit, setNComit] = useState()
	const [isModal, setIsModal] = useState('hidden')
	const [loaderState, setLoaderState] = useState('hidden')
	const [dispProject, setDispProjects] = useState() //show only projects of current user
	let projArr = [] //temp
	const [logModal, setLogModal] = useState('hidden')

	const checkMetamsk = async () => {
		try {
			const { ethereum } = window
			const accounts = await ethereum.request({ method: 'eth_accounts' })
			if (accounts.length !== 0) {
				const account = accounts[0]
				console.log('Found an authorized account:', account)
				setCurrentAccount(account)
			}
			return accounts[0]
		} catch (err) {
			console.log(err)
		}
	}

	const projectCards = async () => {
		try {
			projArr = []
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
				//this need to have index
				//error expected when index exhausted
				try {
					let i = 0

					while (true) {
						await wellDoneContract
							.allProjectsArr(i)
							.then((project) => {
								//console.log(project)

								if (
									currentAccount.toLowerCase() ===
									project.by.toLowerCase()
								) {
									projArr.push(
										<Card
											title={project.pName}
											status={project.status}
											key={i}
											acc={currentAccount}
										/>
									)
								}
							})
						i += 1
					}
				} catch (err) {
					setLoaderState('hidden')
					setDispProjects(projArr)
				}
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		checkMetamsk()
		projectCards()
	}, [])

	const addNewProject = async () => {
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
				//hard coded 0.001eth
				let Txn = await wellDoneContract.startProject(pname, nCommit, {
					value: ethers.utils.parseEther('0.001'),
				})
				await Txn.wait()
				if (Txn) {
					setIsModal('hidden')
					setLoaderState('hidden')
					projectCards()
				}
			} else {
				console.log('No eth object')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='relative'>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Header />
			{/* Head */}
			<div className='text-3xl py-3 border-2 mt-2'>
				<span className='mx-4 text-clip font-semibold'>
					{' '}
					Welcome {currentAccount}
				</span>
			</div>
			{/* body */}
			<div className='flex flex-col items-center'>
				<span className='font-popins text-xl'>
					Your Projects:{' '}
					<button onClick={() => projectCards()}>🔂</button>{' '}
				</span>
				<div className='w-full px-6 grid grid-cols-4 mt-5'>
					{/* all projects cards */}
					{/* <Card title='Learn Python' totalDays='10' status={1} /> */}
					{dispProject}
					<button
						className='h-56 w-60 border-2 border-black rounded-2xl p-2 shadow-lg bg-slate-100 hover:scale-105 transition-transform delay-100 text-3xl'
						onClick={() => {
							setIsModal('visible')
						}}
					>
						➕
					</button>
				</div>
			</div>
			{/*new project modal */}
			<div
				className={`absolute top-2/3 left-32 rounded-lg bg-slate-600 border-2 h-52 w-3/4 flex flex-col items-center justify-center ${isModal}`}
			>
				<input
					type='text'
					placeholder='Project name'
					className='p-2'
					onChange={(e) => setPName(e.target.value)}
				/>
				<br />
				<input
					type='number'
					placeholder='days of commitment'
					className='p-2'
					onChange={(e) => setNComit(e.target.value)}
				/>
				<br />
				<div className='flex space-x-3'>
					<button className='button' onClick={addNewProject}>
						OK
					</button>
					<button
						className='button bg-red-700 px-3 hover:text-red-700'
						onClick={() => setIsModal('hidden')}
					>
						X
					</button>
				</div>
			</div>
			{/* Loader */}
			<div
				className={`absolute top-0 bg-slate-500 h-screen w-full opacity-40 flex items-center justify-center ${loaderState}`}
			>
				<div className='h-32 w-32 rounded-full border-b-4 animate-spin border-black'>
					&nbsp;
				</div>
			</div>
		</div>
	)
}

export default Dashboard

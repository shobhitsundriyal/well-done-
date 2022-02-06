import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../contractdetails'

function Search() {
	const [currentAccount, setCurrentAccount] = useState()
	const [searchAddr, setSearchAddr] = useState()
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
									searchAddr.toLowerCase() ===
									project.by.toLowerCase()
								) {
									projArr.push(
										<Card
											title={project.pName}
											status={project.status}
											key={i}
											acc={searchAddr}
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
	}, [])

	return (
		<div className='relative'>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Header />
			{/* Head */}
			<div className='text-3xl py-3 border-2 mt-2'>
				<input
					type='text'
					className='mx-4 text-clip font-semibold p-1 border-2 rounded-md'
					placeholder='Address'
					onChange={(e) => setSearchAddr(e.target.value)}
				/>
				<button onClick={() => projectCards()}>🔍</button>
			</div>
			{/* body */}
			<div className='flex flex-col items-center'>
				<div className='w-full px-6 grid grid-cols-4 mt-5'>
					{/* all projects cards */}
					{/* <Card title='Learn Python' totalDays='10' status={1} /> */}
					{dispProject}
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

export default Search

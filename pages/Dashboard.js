import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'

function Dashboard() {
	return (
		<div className='mx-10'>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Header />
		</div>
	)
}

export default Dashboard

import React from 'react'

function List({ day, description, link }) {
	return (
		<div className='flex justify-between items-center w-full text-lg border-b-2 border-slate-400 mt-3'>
			<p>{'Day:' + day}</p>
			<p>{description}</p>
			<a href={link}>🔗</a>
		</div>
	)
}

export default List

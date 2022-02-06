export const contractAddress = '0xa5Eb0643D22169F02f6281aae4527c0536908234'
export const contractABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'allLogs',
		outputs: [
			{
				internalType: 'address',
				name: 'by',
				type: 'address',
			},
			{
				internalType: 'string',
				name: 'pName',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: 'day',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'description',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'link',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'allProjectsArr',
		outputs: [
			{
				internalType: 'address',
				name: 'by',
				type: 'address',
			},
			{
				internalType: 'string',
				name: 'pName',
				type: 'string',
			},
			{
				internalType: 'uint8',
				name: 'status',
				type: 'uint8',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'costOfService',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'forOwner',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'myDaysOfWorkLeft',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'myLeavesLeft',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'myNextDeadline',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_projectName',
				type: 'string',
			},
			{
				internalType: 'uint64',
				name: '_daysOfCommitment',
				type: 'uint64',
			},
		],
		name: 'startProject',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_shortDesc',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_link',
				type: 'string',
			},
		],
		name: 'submitTodayWork',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'takeALeave',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'takeBalance',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'timeLeft',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]

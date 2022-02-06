import { atom } from 'recoil'

export const userState = atom({
	key: 'currentUser',
	default: undefined,
})

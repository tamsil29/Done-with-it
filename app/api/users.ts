import client from './client'

const register = (userInfo: {name: string, email: string, password: string}) => client.post<any>('/users', userInfo)

export default { register }

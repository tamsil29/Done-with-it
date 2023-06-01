import client from './client'

const register = (userInfo: {name: string, email: string, password: string}) => client.post<any>('/users', userInfo)

const getMe = () => client.get<any>('/users/me')

const updatedp = (data: any) => client.put<any>('/users/update-image', data);

export default { register, getMe, updatedp }

import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMinutes } from 'date-fns';


const prefix = 'cache'
const expiryInMinutes = 60 * 12

const store = async (key: string, value: any) => {
    try {
        const item = {
            value,
            timeStamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        console.log(error)
    }
}

const get = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value as string)

        if(!item) return null;

        const isExpired = differenceInMinutes(Date.now(), item?.timeStamp) > expiryInMinutes
        if(isExpired) {
            await AsyncStorage.removeItem(prefix + key)
            return null
        }

        return item.value

    } catch (error) {
        console.log(error)
    }
}

export default { store, get }
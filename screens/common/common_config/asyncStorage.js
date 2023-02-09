import AsyncStorage from '@react-native-async-storage/async-storage'

export const StoreData = async (data, KEY) => {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(data))
    } catch (error) {
        console.log("Key not exists")
    }
};

export const RetrieveData = async (KEY) => {
    try {
        const data = await AsyncStorage.getItem(KEY)
        if (data !== null) 
            return data
    } catch (error) {
        console.error("Key does not exists")
    }
};

export const RemoveData = async (KEY) => {
    try {
        await AsyncStorage.removeItem(KEY)
        return true
    } catch (error) {
        console.error("Key does not exists")
        return false
    }
};
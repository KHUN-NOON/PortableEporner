import { createContext, useContext, useState, useEffect } from "react"
import NetInfo from '@react-native-community/netinfo'
import Toast from "react-native-toast-message"
import { get } from "../configs/storage"

interface INetworkProvider {
    children: React.ReactNode
}

interface INetworkContext {
    isOnline: boolean,
    setIsOnline: React.Dispatch<React.SetStateAction<boolean>>
}

export const NetworkContext = createContext({} as INetworkContext)

export const NetworkProvider = (props: INetworkProvider) => {
    const { children } = props
    const [ isOnline, setIsOnline ] = useState(false)

    const net = NetInfo.useNetInfo()

    const detectFirstLaunch = async () => {
        const IS_FIRST = await get('IS_FIRST')

        if ( IS_FIRST === false ) {
            Toast.show({
                text1: 'Internet Connection Restore!',
                position: 'bottom'
            })
        }
    }
    
    useEffect(() => {
        if ( net.isConnected && net.isInternetReachable ) {
            setIsOnline(true)

            // detectFirstLaunch()
        } else if (net.isConnected === false && net.isInternetReachable === false ) {
            setIsOnline(false)

            Toast.show({
                text1: 'No Internet Connection!',
                position: 'bottom'
            }) 
        }
    }, [net, detectFirstLaunch])
    
    return (
        <NetworkContext.Provider value={{isOnline, setIsOnline}}>
            {children}
        </NetworkContext.Provider>
    )
}

export const useNetworkStatus = () => {
    return useContext(NetworkContext)
}
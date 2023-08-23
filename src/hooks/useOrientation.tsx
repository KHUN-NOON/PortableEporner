import { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'

const useOrientation = () => {
    const dim = useWindowDimensions()

    const [ orientation, setOrientation ] = useState('PORTRAIT')

    useEffect(() => {
        if ( dim.width < dim.height ) {
            setOrientation('PORTRAIT')
        } else {
            setOrientation('LANDSCAPE')
        }
    }, [dim])

    return orientation
}

export default useOrientation
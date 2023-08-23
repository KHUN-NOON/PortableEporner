import { useState } from 'react'

const useToggleModal = () => {
    const [ modalVisible, setModalVisible ] = useState(false)

    const toggleModalVisible = () => {
        setModalVisible(!modalVisible)
    }

    return {
        modalVisible,
        setModalVisible,
        toggleModalVisible
    }
}

export default useToggleModal
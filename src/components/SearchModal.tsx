import { useState } from 'react'
import { View, Modal, StyleSheet, TextInput, Pressable, NativeSyntheticEvent, TextInputSubmitEditingEventData, Text } from 'react-native'
import { Colors } from '../theme'
import { useThemeHook } from '../contexts/ThemeContext'
import { clearSearchValue, pushToRecentSearches, rmFromRecentSearches, searchModalHidden, searchValueChange, selectSearchModalState } from '../redux/slices/searchModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { androidRipple } from '../configs/styleConfigs'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { pagechange, querychange } from '../redux/slices/searchParamSlice'
import videoApi from '../redux/slices/videoSlice'
import { ScrollView } from 'react-native-gesture-handler'

const SearchModal = () => {
    const modalState = useSelector(selectSearchModalState)

    const [ searchVal, setSearchVal ] = useState('')

    const dispatch = useDispatch()

    const themeHook = useThemeHook()
    const { theme } = themeHook

    const styles = styling(theme)

    const handleInputText = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const query = e.nativeEvent.text

        handleChangeSearch(query)
    }

    const handleChangeSearch = (query: string) => {
        dispatch(searchValueChange(query))

        dispatch(querychange({query: query}))

        dispatch(pagechange({page: 1}))

        dispatch(videoApi.util.resetApiState())

        dispatch(searchModalHidden())

        dispatch(pushToRecentSearches(query))
    }

    const clearSearchBox = () => {
        setSearchVal('')

        dispatch(clearSearchValue())

        dispatch(pagechange({page: 1}))

        dispatch(querychange({query: ''}))

        dispatch(videoApi.util.resetApiState())
    }

    return (
        <View>
            <Modal
                animationType='fade'
                visible={modalState.visible}
                transparent={true}
                onRequestClose={() => dispatch(searchModalHidden())}
            >
                <View style={styles.viewcontainer}>
                    <View style={styles.headerview}> 
                        <Pressable android_disableSound
                            android_ripple={androidRipple}
                            onPress={() => dispatch(searchModalHidden())}
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} size={20} color={theme.colors.primary}/>
                        </Pressable>
                        
                        <View style={styles.searchInput}>
                            <TextInput
                                placeholder='Search'
                                autoFocus
                                style={styles.textInput}
                                placeholderTextColor={theme.colors.text}
                                value={searchVal}
                                onChangeText={setSearchVal}
                                returnKeyType='done'
                                onSubmitEditing={handleInputText}
                            />

                            <Pressable android_ripple={androidRipple} onPress={clearSearchBox}>
                                <FontAwesomeIcon icon={faCircleXmark} color={theme.colors.text}/>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.recentscrollview}>
                        <View style={styles.recenttitle}>
                            <Text style={styles.recenttitletext}>
                                Recent Searches:
                            </Text>
                        </View>

                        <ScrollView style={styles.recentlistview}>
                            {
                                modalState.recentSearches?.map( (item, key) => (
                                    <View key={key} style={styles.recentlist}>
                                        <Pressable style={{ flex: 1 }} android_disableSound
                                            onPress={() => handleChangeSearch(item)}
                                        >
                                            <Text style={styles.recentlisttext} ellipsizeMode='tail' numberOfLines={2}>
                                                {item}
                                            </Text>
                                        </Pressable>

                                        <Pressable onPress={() => dispatch(rmFromRecentSearches(item))}>
                                            <FontAwesomeIcon color={theme.colors.text} icon={faCircleXmark}/>
                                        </Pressable>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styling = (theme: typeof Colors['dark']) => 
StyleSheet.create({
    viewcontainer: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    headerview: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        columnGap: 15
    },
    searchInput: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        borderColor: theme.colors.textGrey,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        flex: 1,
        color: theme.colors.text,
    },
    recentscrollview: {
        display: 'flex',
        marginHorizontal: 15,
        flex: 1
    },
    recenttitle: {
        marginVertical: 10
    },
    recenttitletext: {
        fontSize: 17,
        color: theme.colors.text
    },
    recentlistview: {
        paddingHorizontal: 10
    },
    recentlisttext: {
        color: theme.colors.text
    },
    recentlist: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 18,
        columnGap: 10
    }
})

export default SearchModal
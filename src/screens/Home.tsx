import { useRef, useEffect, useState } from 'react'
import { View, ActivityIndicator, FlatList, Text, Pressable, StyleSheet } from 'react-native'
import videoApi, { useSearchVideosQuery } from '../redux/slices/videoSlice'
import { pagechange, querychange, selectSearchParams } from '../redux/slices/searchParamSlice'
import { useDispatch, useSelector } from 'react-redux'
import VideoCard from '../components/VideoCard'
import { clearFlatListRef, selectFlatListRef } from '../redux/slices/flatListRefSlice'
import HomeFilter from '../components/HomeFilters'
import SearchModal from '../components/SearchModal'
import { clearSearchValue, selectSearchModalState } from '../redux/slices/searchModalSlice'
import { useThemeHook } from '../contexts/ThemeContext'
import { Colors } from '../theme'
import CustomStatusBar from '../components/CustomeStatusBar'

const Home = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const styles = styling(theme)

    const params = useSelector(selectSearchParams)
    const dispatch = useDispatch()
    const search = useSearchVideosQuery(params, {
        refetchOnReconnect: true
    })
    const ref = useRef<FlatList>(null)

    const [ refreshing, setRefreshing ] = useState(false)

    const flatListRef = useSelector(selectFlatListRef)
    const searchModalState = useSelector(selectSearchModalState)

    const handleScrollEnd = () => {
        const org_page = params.page ?? 0

        if ( org_page < search.data?.total_pages ) {
            dispatch(pagechange({page: org_page + 1 }))
        }
    } 

    const handleScrollToTop = () => {
        if ( ref.current && search.data?.videos ) {
            ref.current?.scrollToIndex({animated: true, index: 0})
        }
    }

    const handleOnRefresh = () => {
        setRefreshing(true)

        dispatch(videoApi.util.resetApiState())
        dispatch(pagechange({page: 1}))

        setRefreshing(false)
    }

    useEffect(() => {
        if ( flatListRef.scrollToTop ) {
            handleScrollToTop()
        }
    }, [handleScrollToTop, flatListRef])

    const handleClear = () => {
        dispatch(videoApi.util.resetApiState())
        dispatch(querychange('all'))
        dispatch(pagechange({page: 1}))

        dispatch(clearSearchValue())
    }

    return (
        <>
            <CustomStatusBar/>
            <View style={{ flex: 1 }}> 
                <View 
                    style={{
                        ...styles.searchresultcontainer, 
                        display: searchModalState.searchValue !== '' ? 'flex' : 'none'
                    }}
                >
                    <Text style={styles.searchresults} numberOfLines={2}>
                        Search Results: `{searchModalState.searchValue}`
                    </Text>
                    
                    <View>
                        <Pressable style={styles.searchclearpress}
                            android_disableSound
                            onPress={handleClear}
                        >
                            <Text style={{ color: theme.colors.primary, padding: 5, fontSize: 12 }}>
                                CLEAR
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <HomeFilter/>

                {
                    search.isLoading === false ?
                    <>
                        {
                            search?.data?.videos?.length > 0 ?
                            <FlatList
                                ref={ref}
                                data={search?.data?.videos}
                                onScroll={() => dispatch(clearFlatListRef())}
                                keyExtractor={item => item?.id}
                                refreshing={refreshing}
                                onEndReached={handleScrollEnd}
                                removeClippedSubviews={true}
                                onRefresh={handleOnRefresh}
                                renderItem={({item}) => (
                                    <VideoCard
                                        key={item?.id}
                                        thumbnail={item?.default_thumb?.src}
                                        duration={item?.length_min}
                                        upload_date={item?.added}
                                        views={item?.views}
                                        rating={item?.rate}
                                        title={item?.title}
                                        id={item?.id}
                                    />
                                )}
                                ListFooterComponent={<ActivityIndicator color='red' animating={search.isFetching}/>}
                            /> : 
                            <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}> 
                                <Text style={{ color: theme.colors.textGrey, fontSize: 18 }}>
                                    No Results!
                                </Text>
                            </View>
                        }
                    </> :
                    <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}> 
                        <ActivityIndicator color={theme.colors.primary} animating={search.isFetching} size='large'/>
                    </View>
                }

                <SearchModal/>
            </View>
        </>
    )
}

const styling = (theme: typeof Colors.dark) => 
StyleSheet.create({
    searchresultcontainer: {
        paddingHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchresults: {
        color: theme.colors.text, fontSize: 18, flex: 1
    },
    searchclearpress: {
        borderWidth: 1, 
        borderColor: theme.colors.primary, 
        borderRadius: 10
    }
})

export default Home
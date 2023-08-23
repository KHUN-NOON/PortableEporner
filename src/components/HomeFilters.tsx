import { useCallback, useEffect } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Colors } from "../theme"
import { useThemeHook } from "../contexts/ThemeContext"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
// import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import { androidRipple } from "../configs/styleConfigs"
import { useDispatch, useSelector } from "react-redux"
import { orderchange, pagechange, selectSearchParams } from "../redux/slices/searchParamSlice"
import videoApi from "../redux/slices/videoSlice"

let filterOrder = [
    {
        order: 'latest',
        label: 'Latest'
    },
    {
        order: 'longest',
        label: 'Longest'
    },
    {
        order: 'shortest',
        label: 'Shortest'
    },
    {
        order: 'top-rated',
        label: 'Top-Rated'
    },
    {
        order: 'most-popular',
        label: 'Most-Popular'
    },
    {
        order: 'top-weekly',
        label: 'Top-Weekly'
    },
    {
        order: 'top-monthly',
        label: 'Top-Monthly'
    }
]

const HomeFilter = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const searchParams = useSelector(selectSearchParams)

    const styles = styling(theme)

    const dispatch = useDispatch()

    const handleOrderChange = (order: string) => {
        dispatch(pagechange({page: 1}))
        dispatch(orderchange({order: order}))
        dispatch(videoApi.util.resetApiState())
    }

    const sortedFilterOrder = useCallback(() => {
        const fromIndex = filterOrder.findIndex(item => item.order === searchParams.order)
        const toIndex = 0
        const element = filterOrder.splice(fromIndex, 1)[0]

        filterOrder.splice(toIndex, 0, element)
    }, [searchParams.order])

    useEffect(() => {
        sortedFilterOrder()
    }, [sortedFilterOrder])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview} horizontal={true} 
                showsHorizontalScrollIndicator={false}
            >
                {/* <Pressable style={styles.filterAction} android_ripple={androidRipple}
                    android_disableSound
                >
                    <FontAwesomeIcon icon={faBarsStaggered} size={15} color={theme.colors.textGrey}/>
                </Pressable> */}

                {
                    filterOrder.map( item => (
                        <Pressable style={item.order === searchParams.order ? styles.filterActionActive : styles.filterAction} 
                            key={item.order}
                            android_ripple={androidRipple}
                            onPress={() => handleOrderChange(item.order)}
                            android_disableSound={true}
                        >
                            <Text style={item.order === searchParams.order ? styles.filterTextActive : styles.filterText}>
                                {item.label}
                            </Text>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styling = (theme: typeof Colors['dark']) => 
StyleSheet.create({
    container: {
        width: '100%'
    },
    scrollview: {
        paddingHorizontal: 15,
        marginVertical: 10,
        widht: '100%'
    },
    filterAction: {
        borderWidth: 1,
        borderColor: theme.colors.textGrey,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterActionActive: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        color: theme.colors.textGrey,
        fontWeight: 'bold'
    },
    filterTextActive: {
        color: theme.colors.primary,
        fontWeight: 'bold'
    }
})

export default HomeFilter

import { StyleSheet, Text, View } from "react-native"
import { useThemeHook } from "../contexts/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Pressable } from "react-native"
import { androidRipple } from "../configs/styleConfigs"
import { useDispatch, useSelector } from "react-redux"
import { loadFlatListRef, selectFlatListRef } from "../redux/slices/flatListRefSlice"
import { searchModalVisible } from "../redux/slices/searchModalSlice"
import { StackHeaderProps } from "@react-navigation/stack"
import { DrawerActions} from '@react-navigation/native'

type StackOptions = StackHeaderProps

const HeaderContent = (props: StackOptions) => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const flatListRef = useSelector(selectFlatListRef)

    const dispatch = useDispatch()

    const handleMenu = () => {
        props.navigation.dispatch(DrawerActions.openDrawer())
    }

    const handleTitlePress = () => {
        if ( flatListRef.scrollToTop === false ) {
            dispatch(loadFlatListRef(true))
        }
    }

    const handleSearch = () => {
        dispatch(searchModalVisible())
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleMenu} 
                android_ripple={androidRipple}
                android_disableSound
                style={{ zIndex: -10 }}
            >
                <FontAwesomeIcon icon={faBars} style={{ color: theme.colors.primary }} size={20}/>
            </Pressable>

            <Pressable android_ripple={androidRipple} onPress={handleTitlePress}
                android_disableSound
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: theme.colors.primary,
                        fontSize: 20,
                        fontStyle: 'italic'
                    }}
                >
                    PE
                </Text>
            </Pressable>

            <Pressable
                onPress={handleSearch}
                android_ripple={androidRipple}
                android_disableSound
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: theme.colors.primary }}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        alignItems: 'center',
        minHeight: 40
    }
})

export default HeaderContent
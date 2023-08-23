import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated"
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { Colors } from "../theme"
import { useThemeHook } from "../contexts/ThemeContext"
import { useDispatch, useSelector } from "react-redux"
import { closevideobottomsheet, selectVideoBottomSheetState } from "../redux/slices/videoBottomSheetSlice"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const VideoBottomSheet = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const VideoBottomSheetState = useSelector(selectVideoBottomSheetState)

    const { isOpen } = VideoBottomSheetState

    const styles = styling(theme)

    const dispatch = useDispatch()

    const handleSheet = () => {
        dispatch(closevideobottomsheet())
    }

    return (
        <>
            {
                isOpen ?
                <>
                    <AnimatedPressable style={styles.backdrop}
                        entering={FadeIn}
                        exiting={FadeOut}
                        onPress={handleSheet}
                    ></AnimatedPressable>
                    <Animated.View
                        style={styles.sheet}
                        entering={SlideInDown.springify().damping(15)}
                        exiting={SlideOutDown}
                    >
                        <View>
                            <Text style={{ color: theme.colors.text, marginTop: 20, fontSize: 16 }}>
                                Options
                            </Text>
                        </View>
                        <View style={styles.actioncontainer}>
                            <Pressable style={styles.optionpressable}>
                                <View style={styles.optioncontainer}>
                                    <FontAwesomeIcon icon={faBookmark} color={theme.colors.primary} size={23}/>
                                </View>
                                <Text style={{ color: theme.colors.primary }}>
                                    Save
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </> :
                null
            }
        </>
    )
}

const styling = (theme: typeof Colors.dark) => 
StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    actioncontainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 25,
        columnGap: 20,
        rowGap: 20,
        flexWrap: 'wrap'
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.backdrop,
        zIndex: 10
    },
    sheet: {
        backgroundColor: theme.colors.background,
        padding: 16,
        height: 250,
        width: "100%",
        position: "absolute",
        bottom: -20 * 1.1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000
    },
    optioncontainer: {
        borderRadius: 30, 
        width: 60,
        height: 60,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionpressable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5
    }
})

export default VideoBottomSheet
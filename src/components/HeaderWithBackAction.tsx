import { DrawerHeaderProps } from "@react-navigation/drawer"
import { View, StyleSheet, Pressable, Text } from "react-native"
import { androidRipple } from "../configs/styleConfigs"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { useThemeHook } from "../contexts/ThemeContext"
import { StackHeaderProps } from "@react-navigation/stack"

type Types = DrawerHeaderProps | StackHeaderProps

const HeaderWithBackAction = (props: Types) => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const handleBack = () => {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable android_ripple={androidRipple} onPress={handleBack}>
                <FontAwesomeIcon icon={faArrowLeftLong} size={20} color={theme.colors.primary}/>
            </Pressable>

            <Text style={{ marginLeft: 20, color:theme.colors.primary, fontSize: 18, fontWeight: 'bold' }}>
                {props.route.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 14,
        alignItems: 'center',
        minHeight: 40
    }
})

export default HeaderWithBackAction
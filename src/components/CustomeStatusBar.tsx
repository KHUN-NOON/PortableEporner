import { StatusBar } from "react-native"
import { useThemeHook } from "../contexts/ThemeContext"

const CustomStatusBar = (props: { hidden?: boolean }) => {
    const { hidden = false } = props

    const themeHook = useThemeHook()
    const { theme } = themeHook

    return (
        <StatusBar
            animated={true}
            backgroundColor={theme?.colors.background}
            translucent={false}
            barStyle={theme.dark === false ? 'dark-content' : 'light-content'}
            hidden={hidden}
        />
    )
}

export default CustomStatusBar
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import { useThemeHook } from "../contexts/ThemeContext"
import DrawerNavigation from "./DrawerNavigation"

export const Stack = createStackNavigator()

const MainNavigation = () => {
    const themeHook = useThemeHook()
    
    return (
        <NavigationContainer theme={themeHook.theme}>
            <DrawerNavigation/>
        </NavigationContainer>
    )
}

export default MainNavigation
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeNavigation from "./HomeNavigation"
import { useThemeHook } from "../contexts/ThemeContext"
import About from "../screens/About"
import HeaderContent from "../components/HeaderContent"
import CustomDrawerContent from "../components/CustomDrawerContent"
import Settings from "../screens/Settings"
import HeaderWithBackAction from "../components/HeaderWithBackAction"

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background
                },
                headerTintColor: theme.colors.text,
                drawerActiveTintColor: theme.colors.primary,
                drawerLabelStyle: {
                    fontSize: 15
                }
            }}
            drawerContent={ props => <CustomDrawerContent {...props}/> }
        >
            <Drawer.Screen name='HomeNavigation' component={HomeNavigation}
                options={{
                    headerShown: false
                }}
            />
            <Drawer.Screen name='Settings' component={Settings}
                options={{
                    header: props => <HeaderWithBackAction {...props}/>
                }}
            />
            <Drawer.Screen name='About' component={About}
                options={{
                    header: props => <HeaderWithBackAction {...props}/>
                }}
            />      
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
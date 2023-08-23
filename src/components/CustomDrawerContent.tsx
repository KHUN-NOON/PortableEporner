import { Text, View } from "react-native"
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { useThemeHook } from "../contexts/ThemeContext"

type Types = DrawerContentComponentProps

const CustomDrawerContent = (props: Types) => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    return (
        <DrawerContentScrollView 
            {...props}
            style={{
                backgroundColor: theme.colors.background
            }}
        >
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }}>
                <Text
                    style={{
                        color: theme.colors.primary,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                >
                    Portable Eporner
                </Text>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent
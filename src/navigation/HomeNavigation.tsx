import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home"
import Video from "../screens/Video"
import HeaderContent from "../components/HeaderContent"

export interface HomeNavigationParamList {
    Home: undefined,
    Video: { id: string, views: string, title: string, rating: string }
}

const Stack = createStackNavigator()

const HomeNavigation = (props: any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={Home}
                options={{
                    header: (params) => <HeaderContent {...params}/>
                }}
            />
            <Stack.Screen name='Video' component={Video}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation
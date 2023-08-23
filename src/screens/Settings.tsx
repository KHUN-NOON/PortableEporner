import { ScrollView, Text, StyleSheet } from 'react-native'
import { Colors } from '../theme'
import { useThemeHook } from '../contexts/ThemeContext'
import AppearancePart from '../components/Settings/AppearancePart'

const Settings = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const styles = styling(theme)

    return (
        <ScrollView style={styles.scrollviewstyle}>
            <AppearancePart/>
        </ScrollView>
    )
}

type ThemeTypes = typeof Colors['dark']

const styling = (theme: ThemeTypes) => StyleSheet.create({
    scrollviewstyle: {
        margin: 15
    }
})

export default Settings
import { useMemo, useState, useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { RadioButtonProps } from 'react-native-radio-buttons-group/lib/types'
import { useThemeHook } from '../../contexts/ThemeContext'
import { get } from '../../configs/storage'
import { RadioGroup } from 'react-native-radio-buttons-group'

const AppearancePart = () => {
    const themeHook = useThemeHook()
    const { themeOperation, theme } = themeHook

    const [ selectedId, setSelectedId ] = useState<string | undefined>()

    const radioBtns: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: 'Light Mode',
            value: 'light',
            size: 15,
            labelStyle: {
                color: theme.colors.text,
                marginVertical: 2
            }
        },
        {
            id: '2',
            label: 'Dark Mode',
            value: 'dark',
            size: 15,
            labelStyle: {
                color: theme.colors.text,
                marginVertical: 2
            }
        },
        {
            id: '3',
            label: 'System Default',
            value: 'default',
            size: 15,
            labelStyle: {
                color: theme.colors.text,
                marginVertical: 2
            }
        }
    ]), [theme])

    const handlePress = (id: string) => {
        setSelectedId(id)

        const data = radioBtns.find(val => val.id === id)

        if ( data !== undefined ) {
            const value = data.value ?? 'default'

            themeOperation(value) 
        }
    }

    const getTheme = useCallback(async () => {
        const theme = await get('Theme')
        
        if ( theme === 'light' ) {
            handlePress('1')
        } else if ( theme === 'dark' ) {
            handlePress('2')
        } else {
            handlePress('3')
        }
    }, [handlePress])

    useEffect(() => {
        getTheme()
    }, [getTheme])

    return (
        <View>
            <Text style={{ color: theme.colors.textGrey, fontSize: 15 }}>
                APPEARANCE
            </Text>

            <RadioGroup
                radioButtons={radioBtns}
                selectedId={selectedId}
                onPress={handlePress}
                containerStyle={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginTop: 10,
                    paddingHorizontal: 0,
                    marginLeft: -10
                }}
            />
        </View>
    )
}

export default AppearancePart
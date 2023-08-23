import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { Colors } from "../theme"
import { get, save } from "../configs/storage"

interface IThemeProvider {
    children: React.ReactNode
}

interface IThemeContext {
    theme: typeof Colors.light | typeof Colors.dark,
    setTheme: React.Dispatch<React.SetStateAction<IThemeContext['theme']>>,
    themeOperation: (theme: string) => void
}

export const ThemeContext = createContext({} as IThemeContext)

export const ThemeProvider = (props: IThemeProvider) => {
    const { children } = props
    const scheme = useColorScheme()

    const [ theme, setTheme ] = useState<IThemeContext['theme']>(Colors.light)

    const themeOperation = (theme: string) => {
        switch (theme) {
            case 'dark':
                setAppTheme(theme, false)
                break
            case 'light': 
                setAppTheme(theme, false)
                break
            case 'default':
                setAppTheme(theme, true)
                break
        }
    }

    const setAppTheme = useCallback(async (theme: string, isDefault: boolean) => {
        save('Theme', theme)
        save('IsDefault', isDefault)
        
        if ( theme === 'dark' ) {
            setTheme(Colors.dark)
        } else if ( theme === 'light' ) {
            setTheme(Colors.light)
        } else {
            setTheme(scheme === 'dark' ? Colors.dark : Colors.light)
        }
    }, [scheme])

    const getAppTheme = useCallback(async () => {
        const theme = await get('Theme')

        themeOperation(theme)
    }, [scheme])

    const setFirstTheme = useCallback(async () => {
        const IS_FIRST = await get('IS_FIRST')
  
        if ( IS_FIRST === null ) {
          save('Theme', 'default')
          save('IsDefault', true)
          save('IS_FIRST', true)
        } else {
            save('IS_FIRST', false)
        }
    }, [])

    const setUp = useCallback(() => {
        setFirstTheme()
        getAppTheme()
    }, [setFirstTheme, getAppTheme])

    useEffect(() => {
        setUp()
    }, [setUp])

    return (
        <ThemeContext.Provider value={{theme, setTheme, themeOperation}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeHook = () => {
    return useContext(ThemeContext)
}
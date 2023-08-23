import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useSelector } from 'react-redux'
import { RootState } from './src/store/store'
import MainNavigation from './src/navigation/MainNavigation'
import { ThemeProvider } from './src/contexts/ThemeContext'
import { SafeAreaView } from 'react-native'
import Toast from 'react-native-toast-message'
import { NetworkProvider } from './src/contexts/NetworkContext'
import VideoBottomSheet from './src/components/VideoBottomSheet'

const App = () => {
  const _persist = useSelector((state: RootState) => state._persist)

  useEffect(() => {
    if ( _persist.rehydrated ) {
      SplashScreen.hide()
    }
  }, [_persist])

  return (
    <ThemeProvider>
      <NetworkProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <MainNavigation/>
          <Toast/>
          <VideoBottomSheet/>
        </SafeAreaView>
      </NetworkProvider>
    </ThemeProvider>
  )
}

export default App
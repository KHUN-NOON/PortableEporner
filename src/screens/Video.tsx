import { View, StyleSheet, Pressable } from 'react-native'
import { useThemeHook } from '../contexts/ThemeContext'
import { Colors } from '../theme'
import WebView from 'react-native-webview'
import { useRoute } from '@react-navigation/native'
import { useGetRelatedVideosQuery, useGetVideoQuery } from '../redux/slices/videoSlice'
import { RouteProp } from '@react-navigation/native'
import useOrientation from '../hooks/useOrientation'
import { Text } from 'react-native'
import CustomStatusBar from '../components/CustomeStatusBar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisVertical, faEye, faStar, faUpload } from '@fortawesome/free-solid-svg-icons'
import utf8 from 'utf8'
import { androidRipple } from '../configs/styleConfigs'
import { useDispatch } from 'react-redux'
import { openvideobottomsheet } from '../redux/slices/videoBottomSheetSlice'
import keywordfilter from '../utils/keywordfilter'
import RelatedVideos from '../components/RelatedVideos'

const Video = () => {
    const themeHook = useThemeHook()
    const { theme } = themeHook

    const dispatch = useDispatch()

    const { params } = useRoute<RouteProp<any, 'Video'>>()

    const video = useGetVideoQuery({id: params?.id})

    const keywords = video?.data?.keywords

    const orientation = useOrientation()

    const styles = styling(theme, orientation)

    const runJs = `document.getElementById('moviexxx').style.display='none'; 
    document.getElementsByClassName('vjs-docker')[0].style.display='none';
    document.getElementById('playerContextMenu').style.visibility='hidden';
    let video = document.getElementByTagName('video').src
    true;`

    const handleVideoSheet = () => {
        dispatch(openvideobottomsheet())
    }

    return (
        <>
            <CustomStatusBar hidden={orientation === 'PORTRAIT' ? false : true}/>
            <View style={styles.container}>
                <View style={styles.webviewcontainer}>
                    <WebView
                        source={{ uri: video?.data?.embed }}
                        useWebView2
                        javaScriptEnabled={true}
                        injectedJavaScript={runJs}
                        onMessage={(event) => {}}
                    />
                </View>
                <View style={styles.videoInfoContainer}>
                    <View style={styles.metaInfoContainer}>
                        <View style={styles.metaText}>
                            <FontAwesomeIcon icon={faUpload} color={theme.colors.textGrey}/>
                            <Text style={{ color: theme.colors.textGrey }}>
                                {video.data?.added}
                            </Text>
                        </View>
                        <View style={styles.metaText}>
                            <FontAwesomeIcon icon={faEye} color={theme.colors.textGrey}/>
                            <Text style={{ color: theme.colors.textGrey }}>
                                {video?.data?.views}
                            </Text>
                        </View>
                        <View style={styles.metaText}>
                            <FontAwesomeIcon icon={faStar} color={theme.colors.textGrey}/>
                            <Text style={{ color: theme.colors.textGrey }}>
                                {video?.data?.rate}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.videotitleview}>
                        <Text style={styles.videoTitleStyle} numberOfLines={2}>
                            {utf8.decode(video.data?.title ?? '')}
                        </Text>

                        <Pressable
                            android_ripple={androidRipple}
                            android_disableSound
                            onPress={handleVideoSheet}
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} color={theme.colors.text} size={20}/>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.relatedvideocontainer}>
                    <Text style={styles.relatedvideotitle}>
                        Related Videos
                    </Text>

                    <View style={{ flex: 1 }}>
                        <RelatedVideos keywords={keywordfilter(keywords, video?.data?.title) ?? ''}/>
                    </View>
                </View>
            </View>
        </>
    )
}

const styling = (theme: typeof Colors.dark, orientation: string) => 
StyleSheet.create({
    container: {
        marginTop: 0,
        display: 'flex',
        flex: 1
    },
    webviewcontainer: {
        width: '100%', 
        height: orientation === 'PORTRAIT' ? 220: '100%', 
        // paddingHorizontal: orientation === 'PORTRAIT' ? 0 : 10,
        zIndex: 1
    },
    videoInfoContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        maxHeight: '40%',
    },
    metaInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    metaText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    videoTitleStyle: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    durationContainer: {
        height: 'auto',
        width: 'auto',
        backgroundColor: 'black',
        margin: 10,
        alignSelf: 'flex-end',
        paddingHorizontal: 5
    },
    videotitleview: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 10
    },
    relatedvideocontainer: {
        marginTop: 15,
        flex: 1
    },
    relatedvideotitle: {
        fontSize: 18,
        color: theme.colors.text,
        marginHorizontal: 15,
        marginBottom: 10
    }
})

export default Video
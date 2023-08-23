import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Pressable } from 'react-native'
import { Colors } from '../theme'
import { useThemeHook } from '../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisVertical, faEye, faStar, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/core'
import utf8 from 'utf8'
import { androidRipple } from '../configs/styleConfigs'
import { useDispatch } from 'react-redux'
import { openvideobottomsheet } from '../redux/slices/videoBottomSheetSlice'

const defaultSrc = `https://images.unsplash.com/
photo-1650692201357-3b1b15469952
?ixlib=rb-4.0.3
&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`

interface IVideoCard {
    thumbnail?: string,
    duration?: string,
    upload_date: string,
    views?: string,
    rating: string,
    title: string,
    id: string
}

const VideoCard = (props: IVideoCard) => {
    const {
        thumbnail,
        duration = 'N/A',
        upload_date,
        views = 'N/A',
        rating,
        title,
        id
    } = props

    const themeHook = useThemeHook()
    const { theme } = themeHook

    const dispatch = useDispatch()

    const navigate = useNavigation<StackNavigationProp<ParamListBase>>()

    const styles = styling(theme)

    const handleVideo = () => {
        navigate.push('Video', {
            id: id,
            views: views,
            title: title,
            rating: rating
        })
    }

    const handleVideoSheet = () => {
        dispatch(openvideobottomsheet())
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.imageBackgroundStyle}
                android_ripple={{ color: 'white', foreground: true }} onPress={handleVideo}
                android_disableSound={true}     
            >
                <ImageBackground
                    source={{uri: thumbnail}}
                    style={styles.imageBackgroundStyle}
                    defaultSource={{uri: defaultSrc}}
                >
                    <View style={styles.durationContainer}>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>{duration}</Text>
                    </View>
                </ImageBackground>
            </Pressable>
            <View style={styles.videoInfoContainer}>
                <View style={styles.metaInfoContainer}>
                    <View style={styles.metaText}>
                        <FontAwesomeIcon icon={faUpload} color={theme.colors.textGrey}/>
                        <Text style={{ color: theme.colors.textGrey }}>
                            {upload_date}
                        </Text>
                    </View>
                    <View style={styles.metaText}>
                        <FontAwesomeIcon icon={faEye} color={theme.colors.textGrey}/>
                        <Text style={{ color: theme.colors.textGrey }}>
                            {views}
                        </Text>
                    </View>
                    <View style={styles.metaText}>
                        <FontAwesomeIcon icon={faStar} color={theme.colors.textGrey}/>
                        <Text style={{ color: theme.colors.textGrey }}>
                            {rating}
                        </Text>
                    </View>
                </View>
                <View style={styles.videotitleview}>
                    <Text style={styles.videoTitleStyle} numberOfLines={2}>
                        {utf8.decode(title)}
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
        </View>
    )
}

const styling = (theme: typeof Colors['dark']) => StyleSheet.create({
    container: {
        minHeight: 250,
        maxWidth: '100%',
        marginBottom: 10
    },
    imageBackgroundStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        resizeMode: 'cover',
        flex: 1
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
        flex: 1,
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
        rowGap: 10,
        columnGap: 10,
    }
})

export default React.memo(VideoCard)
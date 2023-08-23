import { View, ActivityIndicator, FlatList, Text } from 'react-native'
import { useThemeHook } from '../contexts/ThemeContext'
import VideoCard from './VideoCard'
import { useGetRelatedVideosQuery } from '../redux/slices/videoSlice'

interface IRelatedVideos {
    keywords: string
}

const RelatedVideos = (props: IRelatedVideos) => {
    const { keywords } = props

    const themeHook = useThemeHook()
    const { theme } = themeHook

    const related_videos = useGetRelatedVideosQuery({query: keywords}, {
        skip: keywords ? false : true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    })

    console.log(keywords)

    // const handleScrollEnd = () => {

    // }

    return (
        <>
            {
                related_videos.isLoading === false ?
                <>
                    {
                        related_videos.data?.videos?.length > 0 ?
                        <FlatList
                            keyExtractor={item => item?.id}
                            data={related_videos?.data?.videos}
                            removeClippedSubviews={true}
                            renderItem={({item}) => (
                                <VideoCard
                                    key={item?.id}
                                    thumbnail={item?.default_thumb?.src}
                                    duration={item?.length_min}
                                    upload_date={item?.added}
                                    views={item?.views}
                                    rating={item?.rate}
                                    title={item?.title}
                                    id={item?.id}
                                />
                            )}
                            ListFooterComponent={<ActivityIndicator color='red' animating={related_videos.isFetching}/>}
                        /> :
                        <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}> 
                            <Text style={{ color: theme.colors.textGrey, fontSize: 18 }}>
                                No Results!
                            </Text>
                        </View>
                    }
                    
                </> :
                <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.primary} animating={related_videos.isFetching} size='large'/>
                </View>
            }
        </>
    )
}

export default RelatedVideos
import React, { FC, useRef } from 'react';
import {
    ScrollView,
    ImageBackground,
    Animated,
    useWindowDimensions,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
export interface sliderprops {
    images: string [],
}

const Slider: FC<sliderprops> = ({ images }) => {
    const styles = StyleSheet.create({
        scrollContainer: {
            height: 230,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
        },
        card: {
            flex: 1,
            marginVertical: 4,
            marginHorizontal: 16,
            borderRadius: 5,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
        },
        normalDot: {
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: 'silver',
            marginHorizontal: 4,
        },
        indicatorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    const sliderimage = (windowWidth: number): StyleProp<ViewStyle> => ({ width: windowWidth, height: 200 });
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();
    return (
        <View style={styles.scrollContainer}>
            <ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX,
                            },
                        },

                    },
                ], { useNativeDriver: false })}
                scrollEventThrottle={1}>
                {images.map((image, imageIndex) => {
                    return (
                        <View style={sliderimage(windowWidth)} key={imageIndex}>
                            <ImageBackground source={{ uri: image }} style={styles.card}>
                            </ImageBackground>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {images.map((image, imageIndex) => {
                    const width = scrollX.interpolate({
                        inputRange: [
                            windowWidth * (imageIndex - 1),
                            windowWidth * imageIndex,
                            windowWidth * (imageIndex + 1),
                        ],
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={imageIndex}
                            style={[styles.normalDot, { width }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Slider;
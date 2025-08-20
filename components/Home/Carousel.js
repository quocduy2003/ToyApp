import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View, LogBox } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue, useDerivedValue, runOnJS } from "react-native-reanimated";
LogBox.ignoreLogs([
    '[Reanimated]',   // ví dụ warning Reanimated
    'VirtualizedLists should never be nested',
]);
const { width } = Dimensions.get("window");

const MyCarousel = ({ data }) => {
    const progress = useSharedValue(0);
    const derivedProgress = useDerivedValue(() => {
        return progress.value;
    });

    return (
        <View>
            <Carousel
                width={width}
                style={{ alignSelf: "center" }}
                height={180}
                data={data}
                loop
                autoPlay
                autoPlayInterval={3000}
                scrollAnimationDuration={1000}
                onProgressChange={(_, absProgress) => {
                    // Cập nhật progress trong worklet
                    progress.value = absProgress;
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,  // scale ảnh giữa
                    parallaxScrollingOffset: 50,  // độ lệch hai bên
                }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.image }} style={styles.image} />
                )}
            />


            {/* <Pagination.Basic
                progress={derivedProgress}
                data={data}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            /> */}
        </View> 
    );
};

export default MyCarousel;

const styles = StyleSheet.create({ 
    image: {
        width: "100%",
        height: 180,
        borderRadius: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: "#333",
    },
});

import { FC } from "react";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
export interface imageviewprops {
    image: string[],
}
const ImageView: FC<imageviewprops> = ({ image }) => {
    const { width: windowWidth } = useWindowDimensions();
    return <FlatList
        data={image}
        style={{ flex: 1 }}
        numColumns={2}
        renderItem={({ item }) => {
            return <View style={{ width: (windowWidth - 10) / 2, height: 150,padding: 5}}>
                <Image source={{ uri: item }} style={{flex:1, borderRadius: 10}} resizeMode="cover"/>
            </View>
        }}
    />
}
export default ImageView;
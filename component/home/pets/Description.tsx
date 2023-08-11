import { FC } from "react";
import { View } from "react-native";
import { breed } from "../../../interface";
import Text from "../../utils/Text";
export interface descriptionprops {
    description: string,
    breed?: breed,
}
const Description: FC<descriptionprops> = ({ description, breed }) => {
    return <View>
        <Text style={{marginBottom: 5}}><Text style={{fontFamily: "Ubuntu-Bold"}}>Breed:</Text> {breed?.name}</Text>
        <Text>
            {description}
        </Text>
    </View>
}
export default Description;
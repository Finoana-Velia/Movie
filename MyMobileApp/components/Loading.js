import { ActivityIndicator, View } from "react-native";
import tw from 'twrnc';

export default function DisplayLoading() {
    return (
        <View style={tw`flex items-center justify-center`}>
            <ActivityIndicator size="large"/>
        </View>
    )
}
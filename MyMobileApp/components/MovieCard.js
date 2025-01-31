import { useNavigation } from "@react-navigation/native";
import { Dimensions,Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { getJackets } from "../API/MovieAPI";

var {width, height} = Dimensions.get('window');

export default function MovieCard({item}){

    const navigation = useNavigation();


    return (
        <TouchableOpacity
            style={tw`flex-1 justify-center items-center`}
            onPress={() => navigation.navigate('Movie',item.id)}
        >
            <Image 
                style={styles.image}
                // source={item.image}
                source={{ uri : getJackets(item.id)}}
            />
            <View>
                <Text style={tw`text-neutral-300 ml-1`}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image : {
        backgroundColor : '#172554',
        borderRadius : 30,
        width : width*0.6,
        height : height*0.4,
        margin : 10,
        padding : 50,
    }
})
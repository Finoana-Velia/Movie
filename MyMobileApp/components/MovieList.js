import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { getJackets } from "../API/MovieAPI";

var {width,height} = Dimensions.get('window');

export default function MovieList({title,data}) {

    var movieName = "Ant man et la guepe";
    const navigation = useNavigation();

    const handleNavigation = (item) => {
        navigation.navigate('Movie',item);
    }

    return (
        <View style={tw`mb-8 py-4`}>
           <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl`}>{title}</Text>
                <TouchableOpacity>
                    <Text style={tw`text-lg text-white`}>See all</Text>
                </TouchableOpacity>
           </View>
           
           {/* ScrollView Horizontal */}
           <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal : 15}}
            >
                {
                    data.map((item,index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleNavigation(item)}
                            >
                                <View style={tw`py-1 mr-4 flex-1 justify-center items-center`}>
                                    <Image 
                                        style={styles.image}
                                        // source={item.image}
                                        source={{ uri : getJackets(item.id)}}
                                    />
                                    <Text style={tw`text-neutral-300 ml-1`}>
                                        {
                                            item.title.length>14 ? item.title.slice(0.14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image : {
        backgroundColor : '#172554',
        borderRadius : 30,
        width : width*0.33,
        height : height*0.22,
        margin : 10,
        padding : 50,
    }
})
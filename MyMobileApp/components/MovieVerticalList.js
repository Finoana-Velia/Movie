import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import DisplayLoading from "./Loading";

const {width, height} = Dimensions.get('window');

export default function MovieVerticalList({results}) {
    
    const navigation = useNavigation();

    return (
        <ScrollView
                contentContainerStyle={{paddingHorizontal : 15}}
            >
                <Text style={tw`text-white font-semibold ml-1`}>Result ({results.length})</Text>
                
                {
                    results.map((item,index) => {
                        return(
                            <TouchableOpacity 
                                style={tw`flex flex-1 flex-row w-full mt-2`}
                                key={index}
                                onPress={() => navigation.navigate('Movie',item)}
                            >
                                <View style={tw`w-40 h-50 rounded-2`}>
                                    <Image 
                                        source={item.image}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={tw`flex flex-2 w-full flex-row justify-between`}>
                                    <View style={tw`flex justify-around`}>
                                        <Text style={tw`text-2xl text-white font-bold`}>
                                            {
                                                item.title.length > 10 ? item.title.split(' ')[0] + '...' : item.title
                                            }
                                        </Text>
                                        <Text style={tw`text-white font-semibold`}>
                                            Actions
                                        </Text>
                                        <Text style={tw`mt-5 text-white`}>Release</Text>
                                    </View>
                                    <Text style={tw`text-white`}>{item.duration}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                
                <TouchableOpacity
                    style={tw`flex justify-center items-center p-5 border-t border-gray-500 mt-5`}
                >
                    <Text style={tw`text-3xl text-white`}>See more</Text>
                </TouchableOpacity>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    image : {
        borderRadius : 30,
        width : width*0.33,
        height : height*0.22,
        margin : 10,
        padding : 50,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})
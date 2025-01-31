import tw from 'twrnc';
import { ScrollView, StyleSheet,Dimensions, Text, TouchableOpacity, View, Image } from "react-native";
import { getProfile } from '../API/MovieAPI';

var {width,height} = Dimensions.get('window');

export default function Actors({cast,navigation}){
    // let actorName = "Johnny Deep";
    // let castName = "Jack Sparow";

    const handleNavigation = (item) => {
        navigation.navigate('Actor',item);
    }

    return (
        <View style={tw`my-6`}>
            <Text style={tw`text-white text-lg mx-4 mb-5`}>Top cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal : 5}}
            >
                {
                    cast && cast.map((person,index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={tw`mr-4 items-center`}
                                onPress={() => handleNavigation(person.id)}
                            >
                                <View style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}>
                                    <View style={styles.imageContent}>
                                    <Image
                                        source={{ uri : getProfile(person.id)}}
                                        style={styles.image}
                                    />
                                    </View>
                                   
                                </View>
                                <Text style={tw`text-white text-xs mt-1`}>
                                    {
                                        person.name.length > 10 ? person.name.slice(0,10) + '...' : person.name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContent : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        width : width*0.33,
        height : width*0.33,
        backgroundColor : 'silver',
        borderRadius : 120,
    },
    image : {
        width : width*0.25,
        height : width*0.25,
        resizeMode : 'cover'
    },

})
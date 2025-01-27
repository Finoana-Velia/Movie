import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';

import { ScrollView, StyleSheet, Image,Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';

export default function ActorScreen(props){
    const navigation = useNavigation();
    const [actorInfo, setActor] = useState(props.route.params);
    
    return (
       <ScrollView
            contentContainerStyle={{padding : 20}}
            style={tw`flex-1 bg-neutral-900`}
       >
            <View style={tw`w-full`}>
                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.image_container}>
                   <Image
                        source={actorInfo.image}
                        style={styles.image}
                   />
                </View>
                <View style={tw`mt-6`}>
                    <Text style={tw`text-3xl text-white font-bold text-center`}>{actorInfo.name}</Text>
                    <Text style={tw`text-base text-neutral-500 text-center`}>{actorInfo.location.city},{actorInfo.location.contry}</Text>
                </View>
            </View>

            <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                    <Text style={tw`text-white font-semibold`}>Gender</Text>
                    <Text style={tw`text-neutral-300 text-sm`}>{actorInfo.personalInfo.gender}</Text>
                </View>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                    <Text style={tw`text-white font-semibold`}>Birthdate</Text>
                    <Text style={tw`text-neutral-300 text-sm`}>{actorInfo.personalInfo.birthdate}</Text>
                </View>
                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                    <Text style={tw`text-white font-semibold`}>Activity</Text>
                    <Text style={tw`text-neutral-300 text-sm`}>{actorInfo.personalInfo.activity}</Text>
                </View>
                <View style={tw`px-2 items-center`}>
                    <Text style={tw`text-white font-semibold`}>Popularity</Text>
                    <Text style={tw`text-neutral-300 text-sm`}>{actorInfo.personalInfo.popularity}</Text>
                </View>
            </View>
            <View style={tw`my-6 mx-4 space-y-2`}>
                <Text style={tw`text-white text-lg`}>Biography</Text>
                <Text style={tw`text-neutral-400`}>Very long text talking about {actorInfo.name}</Text>
            </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    image_container : {
        flex : 1,
        // flexDirection : 'row',
        justifyContent : 'center',
        shadowColor : 'white',
        shadowRadius : 40,
        shadowOffset : { width : 0, height : 5},
        shadowOpacity : 1
    },
    image : {
        backgroundColor : 'silver',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        width : 200,
        height : 200,
        borderRadius : 100,
        margin : 'auto',
    }
})
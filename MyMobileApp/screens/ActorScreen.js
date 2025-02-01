import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Image,Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { getActorById, getMoviePlayedByActor, getProfile } from "../API/MovieAPI";
import DisplayLoading from "../components/Loading";
import MovieList from "../components/MovieList";

export default function ActorScreen(props){
    const navigation = useNavigation();
    const {params : item} = useRoute();

    const [actorInfo, setActor] = useState(null);
    const [movies, setMovies] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadFilm, setLoadFilm] = useState(false);
    
    const convertDate = (date) => {
        let printDate = date.split("T");
        return printDate[0];
    }

    useEffect(() => {
        getActorById(item).then(
            response => {
                setActor(response);
                setLoading(true);
            }
        );
        getMoviePlayedByActor(item).then(
            response => {
                setMovies(response);
                setLoadFilm(true);
            }
        )
    },[item]);


    return (
       <ScrollView
            contentContainerStyle={{padding : 20}}
            style={tw`flex-1 bg-neutral-900`}
       >
            {
                loading ? 
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
                        source={{ uri : getProfile(actorInfo.id)}}
                        style={styles.image}
                   />
                </View>
                <View style={tw`mt-6`}>
                    <Text style={tw`text-3xl text-white font-bold text-center`}>{actorInfo.name}</Text>
                    <Text style={tw`text-base text-neutral-500 text-center`}>{actorInfo.location.street},{actorInfo.location.nation}</Text>
                </View>

                <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                    <View style={tw`px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Gender</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{actorInfo.gender}</Text>
                    </View>
                    <View style={tw`border border-neutral-400 h-full`}></View>
                    <View style={tw`px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Birthdate</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{convertDate(actorInfo.birthDate)}</Text>
                    </View>
                    <View style={tw`border border-neutral-400 h-full`}></View>
                    <View style={tw`px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Activity</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>Actor</Text>
                    </View>
                </View>

                <View style={tw`my-6 mx-4`}>
                    <Text style={tw`text-white text-lg`}>Biography</Text>
                    <Text style={tw`text-neutral-400`}>{actorInfo.biography}</Text>
                </View>

            </View> : 
            <DisplayLoading />
            }
            
            {
                loadFilm ?
                <MovieList title="Playes in" data={movies}/> 
                : <DisplayLoading />
            }
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useEffect,useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from 'expo-linear-gradient';
import Actors from "../components/Actors";
import { connect } from "react-redux";

import {actor} from '../helpers/data';
import { getJackets, getMovieById } from "../API/MovieAPI";
import DisplayLoading from "../components/Loading";

const {width , height} = Dimensions.get('window');

function MovieScreen(props){

    const navigation = useNavigation();

    const [isFavorite, toggleFavorite] = useState(false);
    //get the params from the method navigate
    const {params : item} = useRoute();

    const [film , setFilm] = useState(null);
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        //call the movie detail api
        getMovieById(item).then(
            response => {
                setFilm(response);
                setLoading(true);
            }
        )
    },[item]);

    const onPutFavorite = () => {
        const action = { type : 'TOGGLE_FAVORITE', value : film}
        console.log(props);
        props.dispatch(action);
        console.log(props.dispatch(action));
        toggleFavorite(!isFavorite)
    }
   
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom : 20}}
            style={tw`flex-1 bg-neutral-900`}
        >
            { loading ?  
                <View style={tw`w-full`}>
                <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center p-4`}>

                    <TouchableOpacity 
                        style={tw`rounded-xl p-1`}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="silver"/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={tw`rounded-xl p-1`}
                        onPress={onPutFavorite}
                    >
                        <HeartIcon 
                            size="28" strokeWidth={2.5} 
                            color={isFavorite ? '#555' : "white"}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image 
                        source={{ uri : getJackets(film.id)}}
                        style={{width, height : height*0.55}}
                    />
                    <LinearGradient 
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{position : 'absolute', bottom : 0,width, height : height*0.40}}
                        start={{x : 0.5 , y : 0}}
                        end={{x: 0.5, y : 1}}
                    />
                </View>
                <View style={styles.detail}>
                    <Text style={tw`text-white text-center text-3xl font-bold`}>
                        {film.title}
                    </Text>
                    {/* <Text style={tw`mt-1 text-neutral-400 font-semibold text-base text-center`}>
                        Released . 2020 . 170min
                    </Text> */}
                    <Text style={tw`mt-1 text-neutral-400 font-semibold text-base text-center`}>
                        {film.release}
                    </Text>
                    <Text style={tw`mt-1 text-neutral-400 font-semibold text-base text-center`}>
                        {film.duration}
                    </Text>
                    <View style={tw`flex-row justify-center mx-4 p-2`}>
                        <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
                            {film.type}
                        </Text>
                    </View>
                    <Text style={tw`text-neutral-400 mx-4 font-semibold text-xl`}>Description</Text>
                    <Text style={tw`text-neutral-400 mx-4`}>
                        {film.description}
                    </Text>
                </View>

                <Actors navigation={navigation} cast={film.actors}/>
            </View> :
            <DisplayLoading />
            }
            
        </ScrollView>
    )
}


/* styles for LinearGradient*/
const styles = StyleSheet.create({
    font : {
        width : width,
        height : height*0.40,
        position : 'absolute',
        top : 0
    },
    detail : {
        marginTop : -(height*0.09),
        paddingVertical : 30
    }
});

const mapStateToProps = (state) => {
    return {
        favorites : state.favorites
    }
}

export default connect(mapStateToProps)(MovieScreen);


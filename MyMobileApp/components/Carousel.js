import { FlatList, View,Text, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import tw from 'twrnc';
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";
import { actual } from "../helpers/data";
import { useEffect, useState } from "react";
import { getAllMovies } from "../API/MovieAPI";
import DisplayLoading from "./Loading";


export default function Carousel(){

    const navigation = useNavigation();

    const [all , setAll] = useState(null);

    useEffect(() => {
        getAllMovies().then(
            response => {
                setTimeout(() => {
                    setAll(response);
                },2000)
            }
        )
    },[]);

    const _displayLoading = () => {
        return (
            <DisplayLoading />
        );
    }
    
    return(
        // <View>
        //     <Text style={tw`text-white text-xl`}>Carousel</Text>
        //     <FlatList 
        //         data={data}
        //         renderItem={MovieCard}
        //         horizontal={true}
        //         //pagingEnabled={true}
        //     />
        // </View>
        <View style={tw`mb-8 py-2`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl`}>All movies</Text>
                <TouchableOpacity
                >
                    <Text style={tw`text-lg text-white`}>See all</Text>
                </TouchableOpacity>
            </View>
            {/* <FlatList 
                data={data}
                renderItem={MovieCard}
                horizontal
            /> */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal : 15}}
            >
                {
                    all ?
                    all.map((item,index) => {
                        return (
                            <View key={index}>
                                <MovieCard item={item}/>
                            </View>
                        )
                    }) :
                    _displayLoading()
                }   
                
                
            </ScrollView>
        </View>
    )
}

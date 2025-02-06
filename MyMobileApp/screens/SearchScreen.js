import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import tw from 'twrnc';
import MovieVerticalList from "../components/MovieVerticalList";
import { best } from "../helpers/data";
import { searchMovieByTitle } from "../API/MovieAPI";
import DisplayLoading from "../components/Loading";


export default function SearchScreen() {
    
    const navigation = useNavigation();
    const [results, setResults] = useState(null);

    const [text, setText] = useState("");

    const _searchMovie = (text) => {
        searchMovieByTitle(text,0).then(
            response => {
                setResults(response.content);
            }
        )
    }

    const _loadMovie = () => {
        searchMovieByTitle(text,0).then(
            response => {
                setResults(response.content);
            }
        )
    }

    useEffect(() => {
        searchMovieByTitle(text,0).then(
            response => {
                setResults(response.content);
            }
        )
    },[]);

    return (
        <SafeAreaView style={tw`flex-1 bg-neutral-800`}>
            <View style={tw`my-10`}>
                <View style={tw`mx-4 mt-5 flex justify-between items-center flex-row border border-white rounded-full p-2`}>
                    <TextInput 
                        onChangeText={(text) => _searchMovie(text)}
                        onSubmitEditing={() => _loadMovie()}
                        placeholder="Search" 
                        style={tw`pb-1 pl-2 max-w-[80%] text-white`}
                        placeholderTextColor={'lightgray'}
                    />
                    <TouchableOpacity
                        style={tw`bg-neutral-500 rounded-full p-2`}
                        onPress={() => navigation.goBack()}
                    >
                        <XMarkIcon size="30" strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
            {
                results ?
                <MovieVerticalList results={results}/> : <DisplayLoading/>
            }
        </SafeAreaView>
    );
}



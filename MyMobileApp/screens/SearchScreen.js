import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import tw from 'twrnc';
import MovieVerticalList from "../components/MovieVerticalList";
import { best } from "../helpers/data";


export default function SearchScreen() {
    
    const navigation = useNavigation();
    const [results, setResults] = useState([1,2,3,4]);

    return (
        <SafeAreaView style={tw`flex-1 bg-neutral-800`}>
            <View style={tw`my-10`}>
                <View style={tw`mx-4 mt-5 flex justify-between items-center flex-row border border-white rounded-full p-2`}>
                    <TextInput 
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
            <MovieVerticalList results={best}/>
        </SafeAreaView>
    );
}



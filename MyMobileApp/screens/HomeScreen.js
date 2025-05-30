import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from'react-native-heroicons/outline'
import tw from 'twrnc';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import DisplayLoading from '../components/Loading';
import { getAllMovies } from '../API/MovieAPI';
import { useEffect,useState } from 'react';


export default function HomeScreen(){

    const [data, setData] = useState(null);

    useEffect(() => {
      getAllMovies().then(
        response => {
          setTimeout(() => {
          setData(response);
          },2000)
        }
      )
    },[])

    const navigation = useNavigation();

    const _displayLoading = () => {
        return (
            <DisplayLoading />
        );
    }
    
    return (
        <View style={tw`flex-1 bg-neutral-800`}>
      {/* Searchbar and logo*/}
      <SafeAreaView style={tw`mt-11 mb-2`}>
        <StatusBar style="light" />
        {/*Bottom navigation with title and the bar icons */}
        <View style={tw`flex-row justify-between items-center mx-4`}>

          {/* Bar icon left */}
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          
          {/* Title in the middle */}
          <Text style={tw`text-white text-3xl font-bold`}>
            Movies
          </Text>      
        
          {/* Search button in the right */}
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" stokeWidth={2} color="white"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:5}}
      >
        
       {/* Content */}

       <Carousel />

       {data ? <MovieList title="Actions" data={data}/> : _displayLoading()}
       {data ? <MovieList title="Adventure" data={data}/> : _displayLoading()}
       
       {/* <MovieList title="Adventure" data={data}/> */}
       {/* <MovieList title="test" data={data} /> */}

      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
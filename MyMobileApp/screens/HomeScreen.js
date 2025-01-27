import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from'react-native-heroicons/outline'
import tw from 'twrnc';
import Carousel from '../components/Carousel';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import { best, boxoffice } from '../helpers/data';
import { getAllMovies } from '../API/MovieAPI';
import { useEffect,useState } from 'react';


export default function HomeScreen(){

    const [data, setData] = useState(null);

    useEffect(() => {
      getAllMovies().then(
        response => setData(response)
      )
    });

    const navigationProperty = useNavigation();

    const navigation = () => {
        navigationProperty.navigate('Movie');
    }

    _loadMovie = () => {
      getAllMovies().then(
        data => {
          console.log("");
          console.log("the response getted in the home Screen : ");
          console.log(data);
          console.log("");
        }
      )
    }
    
    return (
        <View style={tw`flex-1 bg-neutral-800`}>
      {/* Searchbar and logo*/}
      <SafeAreaView style={tw`my-10`}>
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
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" stokeWidth={2} color="white" onPress={this._loadMovie}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:10}}
      >
        
       {/* Content */}

       <Carousel />
       
       {/* <MovieList title="Best of" data={best}/>
       <MovieList title="Box office" data={boxoffice}/> */}
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
  
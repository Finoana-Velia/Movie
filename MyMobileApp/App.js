import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from'react-native-heroicons/outline'
import tw from 'twrnc';
import Carousel from './components/Carousel';
import MovieList from './components/MovieList';
import StackNavigation from './navigation/StackNavigation';
import TabNavigation from './navigation/TabNavigation';
import { Provider } from 'react-redux';
import Store from './reducer/Configure';

export default function App() {

  return (
    <Provider store={Store}>
      <TabNavigation/>
    </Provider>
  );
  
}

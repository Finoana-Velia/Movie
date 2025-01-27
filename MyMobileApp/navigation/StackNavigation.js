import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import ActorScreen from "../screens/ActorScreen";

const Stack = createStackNavigator();

export default function StackNavigation(){
    return (
       
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown : false}} component={HomeScreen}/>
                <Stack.Screen name="Movie" options={{headerShown : false}} component={MovieScreen}/>
                <Stack.Screen name="Actor" options={{headerShown : false}} component={ActorScreen}/>
            </Stack.Navigator>
       
    )
}
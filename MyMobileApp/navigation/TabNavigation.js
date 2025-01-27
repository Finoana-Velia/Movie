import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./StackNavigation";
import { HomeIcon,StarIcon } from "react-native-heroicons/outline";
import FavoriteList from "../components/FavoriteList";

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{headerShown : false}}
            >
                <Tab.Screen
                    name="Main"
                    component={StackNavigation}
                    options={{
                        tabBarLabel : 'Home',
                        tabBarIcon : () => {
                            return (<HomeIcon size='30' strokeWidth={2} color='black'/>)
                        }
                    }}
                />
                <Tab.Screen
                    name="Favorite"
                    component={FavoriteList}
                    options={{
                        tabBarLabel : 'Favorite',
                        tabBarIcon : () => {
                            return (<StarIcon size='30' strokeWidth={2} color='black'/>)
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigation;
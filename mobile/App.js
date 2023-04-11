import Homepage from './src/screens/Homepage/Homepage';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Statistics from './src/screens/Statistics/Statistics';
import ManualControl from './src/screens/ManualControl/ManualControl';
import ContextSetup from './src/screens/ContextSetup/ContextSetup';
import UserProfile from './src/screens/UserProfile/UserProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Homepage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}

        />
        <Tab.Screen name="Statistics" component={Statistics} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        />
        <Tab.Screen name='Manual Control' component={ManualControl} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="remote" color={color} size={size} />
            ),
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        />
        <Tab.Screen name='Context Setup' component={ContextSetup} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        />
        <Tab.Screen name='User Profile' component={UserProfile} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


import * as React from 'react'
import Register from './screens/register';
import Login from './screens/login';
import Home from './screens/Home'
import Search from './screens/Search'
import Create from './screens/Create'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import ActiveScoreCard from './screens/ActiveScoreCard';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
function getHeaderTitle(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home'
  
    switch (routeName) {
      case 'Home':
        return 'Home'
      case 'Search':
        return 'Search'
      case 'Create':
        return 'Create'
    }
  }
function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='ios-search' color={color} size={size} />
                )
            }}/>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='ios-home' color={color} size={size} />
                )
            }}/>
            <Tab.Screen name="Create" component={Create} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='ios-create' color={color} size={size} />
                )
            }}/>
        </Tab.Navigator>
    )
}
function MainStackNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Home'
            component={MainTabNavigator}
            options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
                headerLeft: null
            })}
          />
          <Stack.Screen
            name='ActiveScoreCard'
            component={ActiveScoreCard}
            options={{ headerShown: true }}
          />
          {/* To add a screen, put it below. */}
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default MainStackNavigator;
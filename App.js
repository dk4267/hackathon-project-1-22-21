import React from 'react';
import { createAppContainer, NavigationContainer, StackActions, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './src/context/taskContext';

import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import InsightScreen from './src/screens/InsightScreen';
import DisplayScreen from './src/screens/DisplayScreen';

const homeStack = createStackNavigator();

const historyStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <homeStack.Navigator initialRouteName='Home'>
      <homeStack.Screen name='Home' component={HomeScreen} options={{title: 'App Name'}}/>
      <homeStack.Screen name='Display' component={DisplayScreen} options={{title: 'Task'}}/>
      <homeStack.Screen name='Edit' component={EditScreen} options={{title: 'Edit'}}/>
    </homeStack.Navigator>
  );
}

const History = () => {
  return (
    <historyStack.Navigator initialRouteName='History'>
      <historyStack.Screen name='History' component={HistoryScreen} options={{title: 'History'}}/>
      <homeStack.Screen name='DisplayHistory' component={DisplayScreen} options={{title: 'Task'}}/>
      <historyStack.Screen name='EditHistory' component={EditScreen} options={{title: 'Edit'}}/>
    </historyStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{ tabBarLabel: 'Home'}}/>
        <Tab.Screen name='History' component={History} options={{ tabBarLabel: 'History'}}/>
        <Tab.Screen name='Insights' component={InsightScreen} options={{ tabBarLabel: 'Insights', title: 'Insights'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
}


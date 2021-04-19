import React from 'react';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Navigation from './src/navigation'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import reducers from "./src/reducers";


const store = createStore(
  reducers, 
  applyMiddleware(thunk)
);

const TrackListStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Tabs = createBottomTabNavigator(); 


const trackListFlow = () => (
  <TrackListStack.Navigator 
   screenOptions={{ 
    title: "Tracks", 
    tabBarIcon: <FontAwesome name="th-list" size={20} />
   }}>
    <TrackListStack.Screen name="TrackList" component={TrackListScreen} />
    <TrackListStack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </TrackListStack.Navigator>
) 


const tabsScreen = () => (
  <Tabs.Navigator>
     <Tab.Screen name="trackListFlow" component={trackListFlow} /> 
     <Tab.Screen name="TrackCreate" component={TrackCreateScreen} /> 
     <Tab.Screen name="Account" component={AccountScreen} /> 
  </Tabs.Navigator>
)

const loginFlow = () => (
  <LoginStack.Navigator> 
      <LoginStack.Screen name="Signup" component={SignupScreen} /> 
      <LoginStack.Screen name="Signin" component={SigninScreen} /> 
  </LoginStack.Navigator> 
)


const RootStack = createStackNavigator();

const Root = () => (
    <RootStack.Navigator> 

      <RootStack.Screen name="resolveAuth" component={ResolveAuthScreen} /> 
  {token ? (
      <RootStack.Screen name="tabsScreen" component={tabsScreen} /> 
     ) : (
      <RootStack.Screen name="loginFlow" component={loginFlow} /> 
    )
  }
    </RootStack.Navigator> 
)

{/*          

    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
    */}

export default () => {

  return (
    <Provider store={store}>
      <Navigation 
        ref={navigator => {
          setNavigator(navigator)
        }} 
      />
    </Provider>
  );
};
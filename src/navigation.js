import React from 'react';
import AccountScreen from './screens/AccountScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import TrackCreateScreen from './screens/TrackCreateScreen';
import TrackDetailScreen from './screens/TrackDetailScreen';
import TrackListScreen from './screens/TrackListScreen';
import { Provider as AuthProvider } from './context/AuthContext';
import { setNavigator } from './navigationRef';
import ResolveAuthScreen from './screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './context/LocationContext';
import { Provider as TrackProvider } from './context/TrackContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useSelector } from 'react-redux' 

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
     <Tab.Screen 
       name="TrackCreate" 
       component={TrackCreateScreen} 
       options={{
        title: 'Add Track',
        tabBarIcon: <FontAwesome name="plus" size={20} />
       }}
     /> 
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

const Root = () => {

    <RootStack.Navigator> 
      <RootStack.Screen name="ResolveAuth" component={ResolveAuthScreen} /> 
  { token ? (
      <RootStack.Screen name="tabsScreen" component={tabsScreen} /> 
     ) : (
      <RootStack.Screen name="loginFlow" component={loginFlow} /> 
    )
  }
    </RootStack.Navigator> 
}



// const switchNavigator = createSwitchNavigator({
//   ResolveAuth: ResolveAuthScreen,
//   loginFlow: createStackNavigator({
//     Signup: SignupScreen,
//     Signin: SigninScreen
//   }),
//   mainFlow: createBottomTabNavigator({
//     trackListFlow,
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen
//   })
// });

const selectToken = state => state.token

export default () => {

  const token = useSelector(selectToken)
  console.log("token  ", token )


  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <Root 
         	 token={token}
         	 ref={navigator => {
              setNavigator(navigator)
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
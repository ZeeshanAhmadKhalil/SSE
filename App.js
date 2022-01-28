import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, StatusBar, Modal, ActivityIndicator, LogBox } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import Toast, { BaseToast } from 'react-native-toast-message'

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {
  ChangeNavigation,
} from './Src/Store/Actions/sharedActions'
import {
  GetUserData,
  ChangeUserData,
} from './Src/Store/Actions/userActions'

import LeftDrawer from './Src/Screens/LeftDrawer'
import RightDrawer from './Src/Screens/RightDrawer'
import ProductDetail from './Src/Screens/Product/ProductDetail'
import Wallet from './Src/Screens/Wallet/Wallet'
import Login from './Src/Screens/User/Login';
import Signup from './Src/Screens/User/Signup';
import DepositRequests from './Src/Screens/Wallet/DepositRequests';
import OrderDetail from './Src/Screens/Product/OrderDetail';
import Dashboard from './Src/Screens/User/Dashboard';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const DrawerNavigator = createDrawerNavigator()
const Stack = createStackNavigator()

function App(props) {
  const { textOffColor,
    warningColor,
    dangerColor,
    successLightColor,
    successColor,
    modalBorderColor,
    modalColor,
    textColor,
    backgroundColor,
    backgroundDarkerColor,
    mainDarkerColor,
    mainLighterColor,
    mainColor,
  } = props.color
  const {
    loader,
  } = props.shared
  const {
    userData
  } = props.user
  const {
    ChangeNavigation,
    ChangeUserData,
  } = props

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: mainColor,
      background: backgroundColor,
      card: modalColor,
      text: textColor,
      border: modalColor,
      notification: mainLighterColor,
    },
  }

  const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: mainLighterColor }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}
        text2Style={{
          fontSize: 12,
        }}
        text1={text1}
        text2={text2}
      />
    )
  }

  useEffect(() => {
    RNBootSplash.hide({ fade: true }); // fade

    GetUserData().then((data) => {
      console.log("DATA")
      console.log(data)
      if (data == null) {
        console.log("DATA IS NULL")
        ChangeUserData('')
      } else {
        ChangeUserData(data)
      }
    })
  }, [])
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        {userData == null || userData == '' ?
          <Stack.Navigator
            headerMode="none"
            initialRouteName="Login" // change to Login
            mode="modal"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
          :
          <Stack.Navigator
            headerMode="none"
            initialRouteName="RightDrawer" // change to RightDrawer
            mode="modal"
          >
            <Stack.Screen name="RightDrawer" component={RightDrawer} />
            <Stack.Screen name="DepositRequests" component={DepositRequests} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        }

      </NavigationContainer>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Modal
        visible={loader}
        transparent={true}
      >
        <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center", paddingLeft: '3%', paddingRight: '3%' }}>
          <ActivityIndicator size="large" color={mainLighterColor} />
        </View>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ color, shared, user }) => ({
  color, shared, user
})

export default connect(mapStateToProps, {
  ChangeNavigation,
  ChangeUserData,
})(App)

import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, ImageBackground, TouchableOpacity, LogBox } from 'react-native';
import { Button } from 'react-native-paper'
import RNBootSplash from "react-native-bootsplash"; // https://github.com/zoontek/react-native-bootsplash
import { SwipeablePanel } from 'rn-swipeable-panel';

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
} from '../Store/Actions/sharedActions';

import Home from './Product/Home'
import AddProduct from './Product/AddProduct';
import Profile from './User/Profile'
import Dashboard from './User/Dashboard'
import Wallet from './Wallet/Wallet';
import WishList from './Product/WishList';
import MyProducts from './Product/MyProducts';
import ProductStack from './Product/ProductStack';
import Delivery from './Product/Delivery';

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabs(props) {
    const {
        textOffColor,
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
        showWalletPannel,
        showWishListPannel,
        showMyProductsPannel,
    } = props.shared
    const {
        ChangeShowWalletPannel,
        ChangeShowWishListPannel,
        ChangeShowMyProductsPannel,
    } = props

    return (
        <>
            <BottomTab.Navigator
                initialRouteName="Home" //todo: Change to Home
                activeColor={textColor}
                barStyle={{
                    backgroundColor: mainColor,
                    display: "flex"
                }}
                shifting
            >
                <BottomTab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="home" color={color} size={24} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="ProductStack"
                    component={ProductStack}
                    options={{
                        tabBarLabel: 'Products',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-shirt-outline" color={color} size={24} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="AddProduct"
                    component={AddProduct}
                    options={{
                        tabBarLabel: 'Add Product',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="pluscircleo" color={color} size={24} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Delivery"
                    component={Delivery}
                    options={{
                        tabBarLabel: 'Delivery',
                        tabBarIcon: ({ color }) => (
                            <Feather name="package" color={color} size={25} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="user-o" color={color} size={22} />
                        ),
                    }}
                />
            </BottomTab.Navigator>
            <SwipeablePanel
                isActive={showWalletPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowWalletPannel(false)
                }}
                noBackgroundOpacity={true}
                // allowTouchOutside={true}
                closeOnTouchOutside={true}
                fullWidth={true}
                closeIconStyle={{
                    backgroundColor: textColor
                }}
                closeRootStyle={{
                    backgroundColor: modalBorderColor,
                    marginTop: -10,
                }}
                barStyle={{
                    backgroundColor: textColor,
                }}
                noBar={false}
                style={{
                    backgroundColor: modalColor,
                    height: '75%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <Wallet navigate={props.navigation.navigate} />
            </SwipeablePanel>
            <SwipeablePanel
                isActive={showWishListPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowWishListPannel(false)
                }}
                noBackgroundOpacity={true}
                // allowTouchOutside={true}
                closeOnTouchOutside={true}
                fullWidth={true}
                closeIconStyle={{
                    backgroundColor: textColor
                }}
                closeRootStyle={{
                    backgroundColor: modalBorderColor,
                    marginTop: -10,
                }}
                barStyle={{
                    backgroundColor: textColor,
                }}
                noBar={false}
                style={{
                    backgroundColor: modalColor,
                    height: '75%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <WishList
                    navigation={props.navigation}
                />
            </SwipeablePanel>
            <SwipeablePanel
                isActive={showMyProductsPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowMyProductsPannel(false)
                }}
                noBackgroundOpacity={true}
                // allowTouchOutside={true}
                closeOnTouchOutside={true}
                fullWidth={true}
                closeIconStyle={{
                    backgroundColor: textColor
                }}
                closeRootStyle={{
                    backgroundColor: modalBorderColor,
                    marginTop: -10,
                }}
                barStyle={{
                    backgroundColor: textColor,
                }}
                noBar={false}
                style={{
                    backgroundColor: modalColor,
                    height: '75%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <MyProducts
                    navigation={props.navigation}
                />
            </SwipeablePanel>
        </>
    )
}

const mapStateToProps = ({ color, shared }) => ({
    color, shared
})

export default connect(mapStateToProps, {
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
})(BottomTabs)

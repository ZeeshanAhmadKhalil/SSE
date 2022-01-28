import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, StatusBar } from 'react-native'

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

import LeftDrawer from './LeftDrawer'
import Cart from './Cart/Cart'

const DrawerNavigator = createDrawerNavigator()
class RightDrawer extends Component {
    render() {
        const { textOffColor, warningColor, dangerColor, successLightColor, successColor, modalBorderColor, modalColor, textColor, backgroundColor, backgroundDarkerColor, mainDarkerColor, mainLighterColor, mainColor, } = this.props.color
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
        };
        return (
            <>
                <StatusBar translucent hidden={false} backgroundColor={'transparent'} />
                <DrawerNavigator.Navigator
                    drawerContent={props => <Cart {...props} />}
                    initialRouteName="BottomTabs" // Change it to Dashboard
                    drawerPosition="right"
                    drawerType="front"
                    hideStatusBar={false}
                    overlayColor={0}
                    openByDefault={false}
                    drawerStyle={{
                        backgroundColor: backgroundDarkerColor,
                        width: '100%',
                    }}
                >
                    <DrawerNavigator.Screen
                        name="LeftDrawer" component={LeftDrawer}
                    />
                </DrawerNavigator.Navigator>
            </>
        )
    }
}

const mapStateToProps = ({ color }) => ({
    color
})

export default connect(mapStateToProps, {
})(RightDrawer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import {
    Title, Subheading, Headline, Caption, Paragraph, Drawer, TouchableRipple, Switch, FAB, List, Provider, Portal, Divider
} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { DrawerItem } from '@react-navigation/drawer'

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
    Logout,
} from '../Store/Actions/userActions';
import {
    GetMyProducts,
    GetMyWishList,
} from '../Store/Actions/productActions';
import {
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
} from '../Store/Actions/sharedActions';

function LeftDrawerContent(props) {
    var { index, routes } = props.state
    var currentPage = routes[index].name
    if (currentPage == "BottomTabs") {
        if (routes[index].state != undefined) {
            var { index, routes } = routes[index].state
            currentPage = routes[index].name
        } else {
            currentPage = "Home"
        }
    }
    const {
        textOffColor,
        headerIconColor,
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
        userData
    } = props.user
    const {
        balance
    } = props.wallet
    const {
        ChangeShowWalletPannel,
        ChangeShowWishListPannel,
        ChangeShowMyProductsPannel,
        Logout,
        GetMyProducts,
        GetMyWishList,
    } = props
    return (
        <LinearGradient
            colors={[mainColor, mainLighterColor]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <View style={{ backgroundColor: mainColor, width: '100%', height: getStatusBarHeight() }}>
            </View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
                style={{ height: 80, borderColor: 'red', borderWidth: 0, alignItems: "center", flexDirection: "row" }}
            >
                <Avatar
                    rounded
                    source={{ uri: "https:" + userData?.userModel?.profilePic }}
                    title={"Z"}
                    size="medium"
                    containerStyle={{
                        marginTop: 5,
                        marginLeft: 2,
                        marginRight: 2,
                        backgroundColor: "silver",
                        marginLeft: 20,
                    }}
                />
                <View style={{ marginLeft: 10, borderColor: 'red', borderWidth: 0, width: 200 }}>
                    <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold" }}>{userData?.userModel?.fullName}</Text>
                    <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal" }}>{userData?.userModel?.email}</Text>
                </View>
            </TouchableOpacity>
            <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5 }} />
            <ScrollView>
                <Drawer.Section title='Shopping'>
                    <DrawerItem
                        focused={currentPage == "Home"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <AntDesign name="home" color={color} size={size} />
                        )}
                        label="Home"
                        onPress={() => {
                            props.navigation.navigate("Home")
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "Products"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <Ionicons name="ios-shirt-outline" color={color} size={size} />
                        )}
                        label="Products"
                        onPress={() => {
                            props.navigation.navigate("Products")
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "WishList"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <AntDesign name="hearto" size={size} color={color} />
                        )}
                        label="Wish List"
                        onPress={() => {
                            props.navigation.closeDrawer()
                            GetMyWishList()
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "Cart"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <AntDesign name="shoppingcart" size={size} color={color} />
                        )}
                        label="Shopping Cart"
                        onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.dangerouslyGetParent().openDrawer()
                        }}
                    />
                </Drawer.Section>
                <Drawer.Section title='Personal'>
                    <DrawerItem
                        focused={currentPage == "Dashboard"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <Entypo name="line-graph" color={color} size={size} />
                        )}
                        label="Dashboard"
                        onPress={() => {
                            props.navigation.navigate("Dashboard")
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "Profile"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <FontAwesome name="user-o" color={color} size={size} />
                        )}
                        label="My Profile"
                        onPress={() => {
                            props.navigation.navigate("Profile")
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "AddProduct"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <AntDesign name="plussquareo" size={size} color={color} />
                        )}
                        label="Add Product"
                        onPress={() => {
                            props.navigation.navigate("AddProduct")
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "MyProducts"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <Feather name="list" size={size} color={color} />
                        )}
                        label="My Products"
                        onPress={() => {
                            props.navigation.closeDrawer()
                            GetMyProducts()
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "Wallet"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <AntDesign name="wallet" size={size} color={color} />
                        )}
                        label="My Wallet"
                        onPress={() => {
                            props.navigation.closeDrawer()
                            ChangeShowWalletPannel(true)
                        }}
                    />
                    <DrawerItem
                        focused={currentPage == "Logout"}
                        activeTintColor={headerIconColor}
                        icon={({ color, size }) => (
                            <Ionicons name="exit-outline" size={size} color={color} />
                        )}
                        label="Logout"
                        onPress={() => {
                            Logout()
                        }}
                    />
                </Drawer.Section>
            </ScrollView>
            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "flex-end" }}>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5 }} />
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer()
                        ChangeShowWalletPannel(true)
                    }}
                    style={{
                        height: 80, borderColor: 'red', borderWidth: 0, flexDirection: 'row', alignItems: "center"
                    }}
                >
                    <Text style={{ color: headerIconColor, fontWeight: "bold", fontSize: 15, marginLeft: 20 }}>BALANCE</Text>
                    <Text style={{ color: headerIconColor, fontWeight: "normal", fontSize: 20, marginLeft: 20 }}>{balance} /-</Text>
                </TouchableOpacity>
            </View >
        </LinearGradient >
    )
}

const mapStateToProps = ({ color, user, wallet }) => ({
    color, user, wallet
})

export default connect(mapStateToProps, {
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
    Logout,
    GetMyProducts,
    GetMyWishList,
})(LeftDrawerContent)

import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar } from 'react-native-elements'
import {
    Title, Subheading, Headline, Caption, Paragraph, Drawer, TouchableRipple, Switch, FAB, List, Provider, Portal, Divider
} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

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
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
} from '../../Store/Actions/sharedActions';
import {
    GetUserById,
} from '../../Store/Actions/userActions';
import {
    GetMyProducts,
} from '../../Store/Actions/productActions';

import CustomHeader from '../Shared/CustomHeader'

function Profile(props) {

    const {
        headerIconColor,
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
        userDetail,
        userData
    } = props.user
    const {
        ChangeShowWalletPannel,
        ChangeShowWishListPannel,
        ChangeShowMyProductsPannel,
        GetMyProducts,
    } = props

    useEffect(() => {
        props.GetUserById(userData.userModel._id)
    }, [])

    return (
        <>
            <ScrollView style={{ borderColor: 'red', borderWidth: 0, marginTop: 33 + getStatusBarHeight(), }}>
                <ImageBackground
                    style={{ borderColor: 'red', borderWidth: 0, width: '100%', height: 250, }}
                    source={require('../../Assets/Images/profilebackground.jpg')}
                >
                </ImageBackground>
                <View style={{
                    width: '100%',
                    height: 250,
                    borderColor: 'red', borderWidth: 0,
                    position: 'absolute',
                    backgroundColor: mainColor + '88',
                }} >
                    <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, justifyContent: "flex-end", alignItems: "center" }}>
                        <Avatar
                            rounded
                            source={{ uri: "https:" + userDetail?.user?.profilePic }}
                            title={userDetail?.user?.fullName[0]}
                            size="large"
                            containerStyle={{
                                backgroundColor: "silver",
                                borderColor: headerIconColor,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                            }}
                        />
                        <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.fullName}</Text>
                        <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>{userDetail?.user?.email}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("MyProducts")} style={{ alignItems: "center", marginRight: 10 }}>
                                <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Products</Text>
                                <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, }}>{userDetail?.totalProducts}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-start" }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("WishList")} style={{ alignItems: "center", marginLeft: 10 }}>
                                <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Wishlist</Text>
                                <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, }}>{userDetail?.totalProductsInWishlist}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, borderColor: 'red', borderWidth: 0 }}></View>
                </View>
                <View style={{ width: '100%', height: 3, backgroundColor: mainDarkerColor }}></View>
                {/* <TouchableOpacity
                    style={{
                        width: 55,
                        height: 55,
                        backgroundColor: mainColor,
                        borderRadius: 55,
                        borderWidth: 3,
                        borderColor: mainDarkerColor,
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'absolute',
                        top: 200 + getStatusBarHeight(),
                        right: 140,
                    }}>
                    <Entypo name="edit" color={headerIconColor} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 55,
                    height: 55,
                    backgroundColor: mainColor,
                    borderRadius: 55,
                    borderWidth: 3,
                    borderColor: mainDarkerColor,
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'absolute',
                    top: 200 + getStatusBarHeight(),
                    right: 75,
                }}>
                    <FontAwesome name="lock" color={headerIconColor} size={25} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => GetMyProducts()}
                    style={{
                        width: 55,
                        height: 55,
                        backgroundColor: mainColor,
                        borderRadius: 55,
                        borderWidth: 3,
                        borderColor: mainDarkerColor,
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'absolute',
                        top: 200 + getStatusBarHeight(),
                        right: 10,
                    }}
                >
                    <FontAwesome5 name="tshirt" color={headerIconColor} size={25} />
                </TouchableOpacity>
                <View style={{ width: '100%', height: 80, borderColor: 'red', borderWidth: 0, justifyContent: "center", paddingLeft: 20, flexDirection: "row" }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                        <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Joined Since</Text>
                        <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.createdOn}</Text>
                    </View>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginHorizontal: 20 }} />
                <View style={{ width: '100%', height: 80, borderColor: 'red', borderWidth: 0, justifyContent: "center", paddingLeft: 20 }}>
                    <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Full Name</Text>
                    <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.fullName}</Text>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginHorizontal: 20 }} />
                <View style={{ width: '100%', height: 80, borderColor: 'red', borderWidth: 0, justifyContent: "center", paddingLeft: 20 }}>
                    <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Email Address</Text>
                    <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.email}</Text>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginHorizontal: 20 }} />
                <View style={{ width: '100%', height: 80, borderColor: 'red', borderWidth: 0, justifyContent: "center", paddingLeft: 20 }}>
                    <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Phone Number</Text>
                    <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.phone}</Text>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginHorizontal: 20 }} />
                <View style={{ width: '100%', height: 80, borderColor: 'red', borderWidth: 0, justifyContent: "center", paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ color: headerIconColor, fontSize: 12, fontWeight: "normal", borderColor: 'red', borderWidth: 0 }}>Local Address</Text>
                    <Text style={{ color: headerIconColor, fontSize: 18, fontWeight: "bold", borderColor: 'red', borderWidth: 0, marginTop: 5 }}>{userDetail?.user?.location}</Text>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginHorizontal: 20 }} />
            </ScrollView>
            <View style={{ position: 'absolute', top: 0, width: '100%' }}>
                <CustomHeader
                    navigation={props.navigation}
                    currentPage="Profile"
                />
            </View>
        </>
    )
}

const mapStateToProps = ({ color, user }) => ({
    color, user
})

export default connect(mapStateToProps, {
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
    GetUserById,
    GetMyProducts,
})(Profile)

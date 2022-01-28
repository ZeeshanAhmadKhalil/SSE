import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, Dimensions, Image, ImageBackground, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Divider } from 'react-native-paper';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import {
    ChangeViewingSellingProductDetails,
    GetSellingProducts,
    GetProductById,
} from '../../../../Store/Actions/productActions';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CustomLikeToggle from '../../../Shared/CustomLikeToggle';
import CustomCartCount from '../../../Shared/CustomCartCount';

function SellingProducts(props) {
    const {
        warningColor,
        dangerColor,
        successLightColor,
        successColor,
        modalBorderColor,
        modalColor,
        textColor,
        textOffColor,
        backgroundColor,
        backgroundDarkerColor,
        mainDarkerColor,
        mainLighterColor,
        mainlightColorRGB,
        mainColor,
        chartYellowColor,
        chartBlueColor,
        chartGreenColor,
        chartRedColor,
    } = props.color
    const {
        productsToSell
    } = props.product
    const {
        userData
    } = props.user
    const {
        ChangeViewingSellingProductDetails,
        GetSellingProducts,
        GetProductById,
    } = props

    const RenderProductsToSell = ({ item, index }) => {
        const { productName, description, isLiked, media, price, quantityInCart, _id, user } = item
        // console.log(index)
        return (
            <TouchableOpacity
                style={{ marginTop: index == 0 ? 20 : 0 }}
                onPress={() => {
                    GetProductById(_id, props.navigation.navigate)
                }}
            >
                <View style={{ width: '95%', height: 100, borderColor: 'red', borderWidth: 0, marginHorizontal: '2.5%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <Image
                            source={{ uri: media[0].path }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 8,
                            }}
                        />
                    </View>
                    <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, }}>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, }}>
                                <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{productName}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", marginRight: 5, padding: 2 }}>
                                    <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{price}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                            <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                    <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{description}</Text>
                                </View>
                                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}>
                                        {userData?.userModel?._id != user ?
                                            <CustomCartCount
                                                productId={_id}
                                                quantityInCart={quantityInCart}
                                            />
                                            :
                                            <View
                                                style={{
                                                    height: 25,
                                                    width: 80,
                                                    backgroundColor: mainColor,
                                                    borderRadius: 5,
                                                    flexDirection: "row",
                                                    marginLeft: 10,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FontAwesome5 name="eye" size={14} color={textColor} style={{ marginRight: 5 }} />
                                                <Text style={{ color: textColor, fontSize: 14 }}>View</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end", justifyContent: "center" }}>
                                        {userData?.userModel?._id != user ?
                                            <CustomLikeToggle
                                                isLiked={isLiked}
                                                productId={_id}
                                            />
                                            :
                                            // <MaterialCommunityIcons name="delete" size={25} color={dangerColor} style={{ marginLeft: 10, marginRight: 5 }} />
                                            null
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </TouchableOpacity >
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>No Selling products to show!</Text>
            </View>
        )
    }
    useEffect(() => {
        GetSellingProducts()
    }, [])
    return (
        <>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => GetSellingProducts()}
                    />
                }
                data={productsToSell}
                renderItem={RenderProductsToSell}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={RenderEmptyListComponent()}
            />
        </>
    )
}

const mapStateToProps = ({ color, product, user }) => ({
    color, product, user
})

export default connect(mapStateToProps, {
    ChangeViewingSellingProductDetails,
    GetSellingProducts,
    GetProductById,
})(SellingProducts)

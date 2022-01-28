import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, Dimensions, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
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

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import {
    ChangeViewingSellingProductDetails,
    GetProductById,
} from '../../Store/Actions/productActions';

import CustomHeader from '../Shared/CustomHeader'
import CustomLikeToggle from '../Shared/CustomLikeToggle';
import CustomCartCount from '../Shared/CustomCartCount';

function WishList(props) {
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
        wishlist
    } = props.product
    const {
        GetProductById,
    } = props
    function RenderWishList({ item, index }) {
        const { product, quantityInCart } = item
        const { category, city, condition, createdOn, description, forExchange, isDeleted, media, price, productName, quantity, user, _id } = product
        return (
            <TouchableOpacity
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
                                <Text style={{ color: props.color.textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{productName}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                <View style={{ backgroundColor: props.color.modalColor, borderRadius: 3, alignItems: "center", marginRight: 5, padding: 2 }}>
                                    <Text numberOfLines={4} style={{ color: props.color.textOffColor, fontSize: 12, fontWeight: "bold" }}>{price}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                            <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                    <Text numberOfLines={2} style={{ color: props.color.textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{description}</Text>
                                </View>
                                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}>
                                        <CustomCartCount
                                            productId={_id}
                                            quantityInCart={quantityInCart}
                                        />
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end", justifyContent: "center" }}>
                                        <CustomLikeToggle
                                            isLiked={true}
                                            productId={_id}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Divider
                    style={{ borderColor: props.color.modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </TouchableOpacity >
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>You didn't liked any products yet!</Text>
            </View>
        )
    }
    function RenderListHeaderComponent() {
        return (
            <>
                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>Wishlist</Text>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </>
        )
    }
    return (
        <FlatList
            ListHeaderComponent={RenderListHeaderComponent()}
            data={wishlist}
            renderItem={RenderWishList}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={RenderEmptyListComponent()}
        />
    )
}

const mapStateToProps = ({ color, product }) => ({
    color, product
})

export default connect(mapStateToProps, {
    ChangeViewingSellingProductDetails,
    GetProductById,
})(WishList)

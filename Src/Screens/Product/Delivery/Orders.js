import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, Image, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import {
    GetMyOrders,
    GetOrderById,
} from '../../../Store/Actions/productActions';
import {
    ChangeShowDepositRequestPannel,
} from '../../../Store/Actions/sharedActions';




function Orders(props) {
    const {
        mainColor,
        mainLighterColor,
        mainlightColorRGB,
        mainDarkerColor,
        backgroundDarkerColor,
        backgroundColor,
        textLightColor,
        textColor,
        textOffLightColor,
        textOffColor,
        modalColor,
        modalBorderColor,
        successColor,
        successLightColor,
        dangerColor,
        warningColor,
        headerIconColor,
        headerTextColor,
        chartGreenColor,
        chartBlueColor,
        chartYellowColor,
        chartRedColor,
        graphsBackgroundOpacity,
        tilesBackgroundOpacity,
        chartsDividerColor,
    } = props.color
    const {
        orders,
    } = props.product
    const {
        showDepositRequestPannel,
    } = props.shared
    const {
        userData
    } = props.user
    const {
        ChangeShowDepositRequestPannel,
        GetMyOrders,
        GetOrderById,
    } = props

    const RenderOrders = ({ item, index }) => {
        const { _id, createdOn, media, deliveryAddress, isPaymentByHand, orderStatus, orderproducts, productDetails, totalProducts, user } = item
        return (
            <TouchableOpacity
                onPress={() => GetOrderById(_id, props.navigation.navigate)}
                style={{
                    borderColor: 'red', borderWidth: 0,
                    borderRadius: 15,
                    marginHorizontal: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginTop: 20,
                    backgroundColor: modalColor,
                    flexDirection: 'row'
                }}
            >
                <View style={{ borderColor: 'red', borderWidth: 0, }}>
                    <Image
                        source={{ uri: media[0].path }}
                        resizeMode="cover"
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: 15,
                        }}
                    />
                </View>
                <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, paddingLeft: 10, justifyContent: 'space-evenly' }}>
                    <Text style={{ color: textColor, fontWeight: "bold", fontSize: 14 }}>{_id}</Text>
                    <Text style={{ color: textColor, fontWeight: "normal", fontSize: 14 }}>{`${totalProducts} Product(s)`}</Text>
                </View>
                <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                    <Text style={{ color: textColor, fontWeight: "normal", fontSize: 14 }}>{moment(createdOn).format("Do, MMM")}</Text>
                </View>
                <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                    <Entypo name="chevron-right" size={20} color={textColor} />
                </View>
            </TouchableOpacity>
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>No orders are placed yet!</Text>
            </View>
        )
    }
    function RenderListFooterComponent() {
        return (
            <View style={{ height: 20 }}>
            </View>
        )
    }
    useEffect(() => {
        GetMyOrders()
    }, [])
    return (
        <>
            <StatusBar translucent hidden={false} backgroundColor={'transparent'} />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => GetMyOrders()}
                    />
                }
                data={orders}
                renderItem={RenderOrders}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={RenderListFooterComponent()}
                ListEmptyComponent={RenderEmptyListComponent()}
            />
        </>
    )
}

const mapStateToProps = ({ color, product, user, wallet, shared }) => ({
    color, product, user, wallet, shared
})

export default connect(mapStateToProps, {
    ChangeShowDepositRequestPannel,
    GetMyOrders,
    GetOrderById,
})(Orders)

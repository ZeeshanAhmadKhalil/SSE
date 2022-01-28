import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import {
    GetRequestingExchanges,
    GetRequestedExchanges,
    GetProductById,
    MarkAsExchanged,
} from '../../../Store/Actions/productActions';
import {
    ChangeShowDepositRequestPannel,
} from '../../../Store/Actions/sharedActions';




function Exchanges(props) {
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
        requestingExchanges,
        requestedExchanges,
    } = props.product
    const {
        showDepositRequestPannel,
    } = props.shared
    const {
        userData
    } = props.user
    const {
        ChangeShowDepositRequestPannel,
        GetRequestingExchanges,
        GetRequestedExchanges,
        GetProductById,
        MarkAsExchanged,
    } = props

    const [showingRequestedExchanges, ChangeShowingRequestedExchanges] = useState(true)

    const RenderExchanges = ({ item, index }) => {
        const { deliveryAddress, isExchanged, isPaymentByHand, requestedMedia, requestedProduct, requestingMedia, requestingProduct, _id } = item
        // console.log(index)
        return (
            <View
                style={{
                    borderColor: 'red', borderWidth: 0,
                    borderRadius: 15,
                    marginHorizontal: 15,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginTop: 20,
                    backgroundColor: modalColor,
                }}
            >
                <Text style={{ color: textColor, fontSize: 16, fontWeight: 'bold' }}>{`Id # ${_id}`}</Text>
                {/* <Text style={{ color: textOffColor, fontSize: 14, fontWeight: 'normal', marginTop: 5 }}>{`Category : ${category}`}</Text> */}
                <TouchableOpacity
                    onPress={() => GetProductById(requestedProduct[0]._id, props.navigation.navigate)}
                    style={{
                        borderColor: 'red', borderWidth: 0,
                        borderRadius: 15,
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: modalColor,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{ borderColor: 'red', borderWidth: 0, }}>
                        <Image
                            source={{ uri: requestedMedia[0].path }}
                            resizeMode="cover"
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 15,
                            }}
                        />
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, paddingLeft: 10, justifyContent: 'center' }}>
                        <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>{requestedProduct[0].productName}</Text>
                        <Text style={{ color: textOffColor, fontWeight: "normal", fontSize: 12 }}>
                            {!showingRequestedExchanges ? `Requested Product` : `Your Product`}
                        </Text>
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                        <Text style={{ color: textColor, fontWeight: "normal", fontSize: 14 }}>{`${requestedProduct[0].price} PKR`}</Text>
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                        <Entypo name="chevron-right" size={18} color={textColor} />
                    </View>
                </TouchableOpacity>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, }} />
                <TouchableOpacity
                    onPress={() => GetProductById(requestingProduct[0]._id, props.navigation.navigate)}
                    style={{
                        borderColor: 'red', borderWidth: 0,
                        borderRadius: 15,
                        marginTop: 10,
                        backgroundColor: modalColor,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{ borderColor: 'red', borderWidth: 0, }}>
                        <Image
                            source={{ uri: requestingMedia[0].path }}
                            resizeMode="cover"
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 15,
                            }}
                        />
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, paddingLeft: 10, justifyContent: 'center' }}>
                        <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>{requestingProduct[0].productName}</Text>
                        <Text style={{ color: textOffColor, fontWeight: "normal", fontSize: 12 }}>
                            {showingRequestedExchanges ? `Requesting Product` : `Your Product`}
                        </Text>
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                        <Text style={{ color: textColor, fontWeight: "normal", fontSize: 14 }}>{`${requestingProduct[0].price} PKR`}</Text>
                    </View>
                    <View style={{ borderColor: 'red', borderWidth: 0, justifyContent: 'center' }}>
                        <Entypo name="chevron-right" size={18} color={textColor} />
                    </View>
                </TouchableOpacity>
                {((isExchanged == false && showingRequestedExchanges) || (isExchanged == true && !showingRequestedExchanges)) &&
                    <TouchableOpacity
                        onPress={() => MarkAsExchanged(_id)}
                        disabled={!showingRequestedExchanges}
                        style={{ position: 'absolute', right: 10, top: 15 }}
                    >
                        <AntDesign name="checkcircle" size={25} color={mainLighterColor} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>No exchanges requested yet!</Text>
            </View>
        )
    }
    function RenderListFooterComponent() {
        return (
            <View style={{ height: 20 }}>
            </View>
        )
    }
    function RenderListHeaderComponent() {
        return (
            <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => { ChangeShowingRequestedExchanges(true) }}
                    style={{ backgroundColor: showingRequestedExchanges ? mainDarkerColor : backgroundDarkerColor, height: 50, width: '45%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: '1%' }}
                >
                    <Text style={{ fontSize: 16, fontWeight: '500', color: showingRequestedExchanges ? textColor : textColor }}>
                        Others Req.
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => ChangeShowingRequestedExchanges(false)}
                    style={{ backgroundColor: !showingRequestedExchanges ? mainDarkerColor : backgroundDarkerColor, height: 50, width: '45%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginLeft: '1%' }}
                >
                    <Text style={{ fontSize: 16, fontWeight: '500', color: !showingRequestedExchanges ? textColor : textColor }}>
                        My Req.
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    useEffect(() => {
        GetRequestingExchanges()
        GetRequestedExchanges()
    }, [])
    return (
        <>
            <StatusBar translucent hidden={false} backgroundColor={'transparent'} />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            GetRequestingExchanges()
                            GetRequestedExchanges()
                        }}
                    />
                }
                data={showingRequestedExchanges ? requestedExchanges : requestingExchanges}
                renderItem={RenderExchanges}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={RenderListHeaderComponent()}
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
    GetRequestingExchanges,
    GetRequestedExchanges,
    GetProductById,
    MarkAsExchanged,
})(Exchanges)

import React, { useEffect } from 'react'
import { Dimensions, FlatList, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import {
    ChangeOrderStatus
} from '../../Store/Actions/productActions'
import {
    ChangeShowOrderPannel
} from '../../Store/Actions/sharedActions'

const screenWidth = Dimensions.get("window").width;

function OrderDetail(props) {
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
        orderDetail
    } = props.product
    const {
        showOrderPannel
    } = props.shared
    const {
        ChangeShowOrderPannel,
        ChangeOrderStatus,
    } = props

    function RenderProducts({ item }) {
        const { quantity, product, order } = item
        const { _id, productName, price, media, isDeleted, forExchange, description, createdOn, condition, city, category, } = product
        return (
            <View
                style={{
                    width: screenWidth * 0.46,
                    // height: 300,
                    borderColor: 'red',
                    borderWidth: 0,
                    marginHorizontal: screenWidth * 0.02,
                    marginVertical: 10,
                    backgroundColor: modalColor,
                    borderRadius: 20,
                    alignItems: "center"
                }}
            >
                <ImageBackground
                    source={{ uri: media[0].path }}
                    style={{
                        width: screenWidth * 0.42,
                        height: screenWidth * 0.42,
                    }}
                    imageStyle={{
                        borderRadius: 20,
                        marginTop: 10,
                    }}
                >
                    <View style={{
                        top: 10,
                        left: 0,
                        borderColor: 'red',
                        borderWidth: 0,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 10,
                        backgroundColor: backgroundColor + "aa",
                    }}>
                        <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 14, fontWeight: "normal" }}>{`${quantity} Item(s)`}</Text>
                    </View>
                </ImageBackground>
                <View style={{ borderColor: 'red', borderWidth: 0, width: screenWidth * 0.42, marginTop: 0, paddingVertical: 10, flexDirection: "row-reverse" }}>
                    <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{productName}</Text>
                        <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", padding: 0 }}>
                            <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{`${price} /-`}</Text>
                        </View>
                        <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3 }}>{description}</Text>
                    </View>
                </View>
            </View>
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>Something went wrong!</Text>
            </View>
        )
    }

    useEffect(() => {
        console.log("CART")
    }, [])
    return (
        <>
            <StatusBar translucent hidden={false} backgroundColor={'transparent'} />
            <View style={{ backgroundColor: mainColor, width: '100%', height: getStatusBarHeight() }}>
            </View>
            <View style={{
                width: '100%', height: 50, backgroundColor: mainColor, flexDirection: "row",
                borderBottomLeftRadius: 20, borderBottomRightRadius: 20
            }}>
                <View style={{ flex: 4, borderColor: 'red', borderWidth: 0, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                    >
                        <Ionicons name="arrow-back" size={25} color={headerIconColor} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Order Detail</Text>
                </View>
            </View>
            <FlatList
                data={orderDetail}
                renderItem={RenderProducts}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                style={{ zIndex: 9, marginBottom: 75, }}
                ListEmptyComponent={RenderEmptyListComponent()}
            />
            <View style={{ height: 80, width: '100%', backgroundColor: modalColor, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexDirection: "row", position: 'absolute', bottom: 0 }}>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => ChangeOrderStatus(orderDetail[0].order._id, 'Delivered', props.navigation.navigate)}
                        disabled={orderDetail[0].order.orderStatus == '614f733793e00a99cca623b2'}
                        style={{
                            borderColor: 'red', borderWidth: 0,
                            // width: 150,
                            // height: 45,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            borderColor: mainLighterColor,
                            borderWidth: 2,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            backgroundColor: mainDarkerColor,
                        }}
                    >
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
                            {orderDetail[0].order.orderStatus == '614f733793e00a99cca623b2' ?
                                "Delivered"
                                :
                                "Mark as Delivered"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const mapStateToProps = ({ color, product, shared }) => ({
    color, product, shared
})

export default connect(mapStateToProps, {
    ChangeShowOrderPannel,
    ChangeOrderStatus,
})(OrderDetail)

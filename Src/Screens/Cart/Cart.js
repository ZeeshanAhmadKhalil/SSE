import React, { useEffect } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { SwipeablePanel } from 'rn-swipeable-panel'
import {
    ChangeShowOrderPannel,
} from '../../Store/Actions/sharedActions'
import CustomCartCount from '../Shared/CustomCartCount'
import OrderProducts from './OrderProducts'

const screenWidth = Dimensions.get("window").width;

function Cart(props) {
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
        shoppingCart
    } = props.cart
    const {
        showOrderPannel
    } = props.shared
    const {
        ChangeShowOrderPannel,
    } = props

    let totalAmount = 0
    shoppingCart.forEach(element => {
        const { product, quantity } = element
        totalAmount = totalAmount + quantity * product.price
    });

    function RenderShoppingCart({ item }) {
        const { product, quantity, user, } = item
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
                <Image
                    source={{ uri: media[0].path }}
                    style={{
                        width: screenWidth * 0.42,
                        height: screenWidth * 0.42,
                        borderRadius: 20,
                        marginTop: 10,
                    }}
                />
                <View style={{ borderColor: 'red', borderWidth: 0, width: screenWidth * 0.42, marginTop: 0, paddingVertical: 10, flexDirection: "row-reverse" }}>
                    <CustomCartCount
                        productId={_id}
                        quantityInCart={quantity}
                        vertical={true}
                    />
                    <View style={{ borderColor: 'red', borderWidth: 0, flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{productName}</Text>
                        <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", padding: 0 }}>
                            <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{price}</Text>
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
                <Text style={{ color: textOffColor, fontSize: 18 }}>You didn't added any products in the cart!</Text>
            </View>
        )
    }

    useEffect(() => {
        console.log("CART")
    }, [])
    return (
        <>
            <View style={{ backgroundColor: mainColor, width: '100%', height: getStatusBarHeight() }}>
            </View>
            <View style={{
                width: '100%', height: 50, backgroundColor: mainColor, flexDirection: "row",
                borderBottomLeftRadius: 20, borderBottomRightRadius: 20
            }}>
                <View style={{ flex: 4, borderColor: 'red', borderWidth: 0, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.closeDrawer()
                        }}
                    >
                        <Ionicons name="arrow-back" size={25} color={headerIconColor} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Shopping Cart</Text>
                </View>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row-reverse", alignItems: "center" }}>
                    <View style={{ marginRight: 10 }}>
                        <AntDesign name="shoppingcart" size={30} color={textColor} />
                        {shoppingCart.length != 0 &&
                            <Badge
                                status="error"
                                value={shoppingCart.length}
                                containerStyle={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                }}
                            />
                        }
                    </View>
                </View>
            </View>
            <FlatList
                data={shoppingCart}
                renderItem={RenderShoppingCart}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                style={{ zIndex: 9, marginBottom: 75, }}
                ListEmptyComponent={RenderEmptyListComponent()}
            />
            <View style={{ height: 80, width: '100%', backgroundColor: modalColor, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexDirection: "row", position: 'absolute', bottom: 0 }}>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.closeDrawer()}
                        style={{
                            borderColor: 'red', borderWidth: 0,
                            width: 150,
                            height: 45,
                            borderRadius: 10,
                            borderColor: modalBorderColor,
                            borderWidth: 2,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Ionicons name="md-caret-back-outline" size={16} color={modalBorderColor} style={{}} />
                        <Text style={{ color: modalBorderColor, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>{"Shop More"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => ChangeShowOrderPannel(true)}
                        style={{
                            borderColor: 'red', borderWidth: 0,
                            width: 150,
                            height: 45,
                            borderRadius: 10,
                            borderColor: mainLighterColor,
                            borderWidth: 2,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            backgroundColor: mainDarkerColor,
                        }}
                    >
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>{`Total : ${totalAmount} /-`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SwipeablePanel
                isActive={showOrderPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowOrderPannel(false)
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
                    height: '40%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <OrderProducts navigate={props.navigation.navigate} />
            </SwipeablePanel>
        </>
    )
}

const mapStateToProps = ({ color, cart, shared }) => ({
    color, cart, shared
})

export default connect(mapStateToProps, {
    ChangeShowOrderPannel,
})(Cart)

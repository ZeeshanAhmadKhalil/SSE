import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

import {
    AddProductToCart,
    RemoveProductFromCart,
} from '../../Store/Actions/cartActions'




function CustomCartCount(props) {
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
    } = props.product
    const {
    } = props.user
    const {
        shoppingCart
    } = props.cart
    const {
        productId,
        quantityInCart,
        AddProductToCart,
        RemoveProductFromCart,
    } = props

    const [quantityInCartLocal, ChangeQuantityInCartLocal] = useState(0)

    useEffect(() => {
        let currentProduct = shoppingCart.find(obj => obj.product._id == productId)
        if (currentProduct)
            ChangeQuantityInCartLocal(currentProduct.quantity)
        else
            ChangeQuantityInCartLocal(0)
    }, [shoppingCart])
    return (
        <>
            {props.vertical == undefined && props.big == undefined &&
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            height: 25,
                            width: 80,
                            backgroundColor: modalColor,
                            borderRadius: 5,
                            flexDirection: "row",
                            marginLeft: 10,
                        }}
                    >
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                            <TouchableOpacity
                                disabled={quantityInCartLocal == 0}
                                onPress={() => RemoveProductFromCart(productId)}
                                style={{
                                    opacity: quantityInCartLocal == 0 ? 0.3 : 1,
                                    flex: 1,
                                    margin: 2,
                                    backgroundColor: mainColor,
                                    borderRadius: 5,
                                    borderColor: 'red', borderWidth: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <AntDesign name="minus" size={15} color={textColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: textColor, fontSize: 16 }}>{quantityInCartLocal}</Text>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                            <TouchableOpacity
                                onPress={() => AddProductToCart(productId)}
                                style={{
                                    flex: 1,
                                    margin: 2,
                                    backgroundColor: mainColor,
                                    borderRadius: 5,
                                    borderColor: 'red', borderWidth: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <AntDesign name="plus" size={15} color={textColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
            {props.vertical &&
                <View
                    style={{
                        width: 25,
                        height: 80,
                        backgroundColor: backgroundColor,
                        borderRadius: 5,
                        flexDirection: "column",
                        marginLeft: 5,
                    }}
                >
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <TouchableOpacity
                            onPress={() => AddProductToCart(productId)}
                            style={{
                                flex: 1,
                                margin: 2,
                                backgroundColor: mainColor,
                                borderRadius: 5,
                                borderColor: 'red', borderWidth: 0,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <AntDesign name="plus" size={15} color={textColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: textColor, fontSize: 16 }}>{quantityInCartLocal}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <TouchableOpacity
                            onPress={() => RemoveProductFromCart(productId)}
                            style={{
                                flex: 1,
                                margin: 2,
                                backgroundColor: mainColor,
                                borderRadius: 5,
                                borderColor: 'red', borderWidth: 0,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <AntDesign name="minus" size={15} color={textColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {props.big &&
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            height: 45,
                            width: 150,
                            backgroundColor: backgroundDarkerColor,
                            borderRadius: 10,
                            flexDirection: "row",
                            marginLeft: 10,
                        }}
                    >
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                            <TouchableOpacity
                                onPress={() => RemoveProductFromCart(productId)}
                                style={{
                                    flex: 1,
                                    margin: 2,
                                    backgroundColor: mainColor,
                                    borderRadius: 10,
                                    borderColor: 'red', borderWidth: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <AntDesign name="minus" size={15} color={textColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: textColor, fontSize: 16 }}>{quantityInCartLocal}</Text>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                            <TouchableOpacity
                                onPress={() => AddProductToCart(productId)}
                                style={{
                                    flex: 1,
                                    margin: 2,
                                    backgroundColor: mainColor,
                                    borderRadius: 10,
                                    borderColor: 'red', borderWidth: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <AntDesign name="plus" size={15} color={textColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </>
    )
}

const mapStateToProps = ({ color, product, user, cart }) => ({
    color, product, user, cart
})

export default connect(mapStateToProps, {
    AddProductToCart,
    RemoveProductFromCart,
})(CustomCartCount)

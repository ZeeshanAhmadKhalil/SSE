import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import MapView, { Marker } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { SwipeablePanel } from 'rn-swipeable-panel';
import {
    GetProductById,
    GetProductsToExchange
} from '../../Store/Actions/productActions';
import {
    ChangeShowExchangeProductPannel, ChangeShowMyProductsToExchangePannel
} from '../../Store/Actions/sharedActions';
import CustomCartCount from '../Shared/CustomCartCount';
import CustomLikeToggle from '../Shared/CustomLikeToggle';
import ExchangeProduct from './ExchangeProduct';
import ProductsToExchange from './ProductsToExchange';

function ProductDetail(props) {
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
        productDetailImages,
        viewingSellingProductDetails,
        productDetail,
        productsWithSameCategory,
    } = props.product
    const {
        userData
    } = props.user
    const {
        showMyProductsToExchangePannel,
        showExchangeProductPannel,
        rightDrawerNavigation,
    } = props.shared

    const {
        product,
        isLiked,
        quantityInCart,
    } = productDetail
    const {
        GetProductById,
        ChangeShowMyProductsToExchangePannel,
        GetProductsToExchange,
        ChangeShowExchangeProductPannel,
    } = props

    const {
        category,
        city,
        condition,
        createdOn,
        description,
        forExchange,
        isDeleted,
        media,
        price,
        productName,
        quantity,
        user,
        longitude,
        latitude,
        _id,
    } = product || {}

    console.log("RIGHTDRAWERNAVIGATION");
    console.log(rightDrawerNavigation);

    const RenderSimilarCategoryProducts = () => {
        return productsWithSameCategory.map((item, key) => {
            const { description, isLiked, media, price, productName, _id, user } = item
            return (
                <TouchableOpacity
                    onPress={() => GetProductById(_id, props.navigation.navigate)}
                    style={{ width: 180, height: 180, borderColor: 'red', borderWidth: 0, marginLeft: key == 0 ? 0 : 10 }}
                    key={key}
                >
                    <View style={{ flex: 2, borderColor: 'red', borderWidth: 0 }}>
                        <ImageBackground
                            source={{ uri: media[0].path }}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            imageStyle={{
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        >
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", marginRight: 5, marginTop: 5, padding: 2 }}>
                                    <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{price}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                {userData?.userModel?._id != user &&
                                    <View
                                        style={{
                                            height: 25,
                                            width: 25,
                                            borderRadius: 25,
                                            backgroundColor: modalColor,
                                            marginRight: 5,
                                            marginBottom: 5,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >

                                        <CustomLikeToggle
                                            isLiked={isLiked}
                                            productId={_id}
                                            noStyle={true}
                                            size={15}
                                        />

                                    </View>
                                }
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{
                        flex: 1,
                        borderColor: 'red',
                        borderWidth: 0,
                        backgroundColor: modalColor,
                        borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        padding: 3,
                    }}>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{productName}</Text>
                        <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 2 }}>{description}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    return (
        <>
            <StatusBar hidden />
            <SliderBox
                autoplay
                circleLoop
                images={productDetailImages}
                ImageComponentStyle={{
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                }}
                sliderBoxHeight={300}
                imageLoadingColor={mainLighterColor}
                dotColor={mainLighterColor}
            />
            <TouchableOpacity
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: textColor,
                    position: "absolute",
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    left: 10,
                    top: 20,
                }}
                onPress={() => {
                    props.navigation.goBack()
                }}
            >
                <Ionicons name="arrow-back" size={20} color={mainColor} style={{}} />
            </TouchableOpacity>
            <ScrollView style={{ marginHorizontal: 15, }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        {!forExchange ?
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5, alignItems: "center" }}>
                                <Entypo name='shopping-cart' size={20} color={mainLighterColor} />
                                <Text style={{ color: mainLighterColor, marginLeft: 5, fontSize: 14 }}>Shopping Product</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5, alignItems: "center" }}>
                                <FontAwesome name='exchange' size={20} color={mainLighterColor} />
                                <Text style={{ color: mainLighterColor, marginLeft: 5, fontSize: 14 }}>Exchange Product</Text>
                            </View>
                        }
                        <Text style={{ color: textColor, fontSize: 25, fontWeight: "bold" }}>{productName}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-end", borderColor: 'red', borderWidth: 0 }}>
                        {userData?.userModel?._id != user._id &&
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 40,
                                    backgroundColor: mainColor + "44",
                                    marginRight: 0,
                                    marginBottom: 0,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CustomLikeToggle
                                    isLiked={isLiked}
                                    productId={_id}
                                    noStyle={true}
                                />
                            </View>
                        }
                    </View>
                </View>
                <Text style={{ color: textOffColor, fontSize: 14, fontWeight: "normal", textAlign: "justify", marginTop: 10 }}>
                    {description}
                </Text>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 15 }}
                />
                <View style={{ flexDirection: 'row', marginBottom: 0, alignItems: "center", borderColor: 'red', borderWidth: 0 }}>
                    <View
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 10,
                            backgroundColor: mainColor + "44",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome5 name='map-marker-alt' size={20} color={mainLighterColor} />
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: "center" }}>
                        <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{city.cityName}</Text>
                        {!forExchange ?
                            <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{`${quantity} Quantity`}</Text>
                            :
                            <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{"Tap buttom below to exchange"}</Text>
                        }
                    </View>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.3, marginVertical: 10 }}
                />
                <View style={{ flexDirection: 'row', marginBottom: 0, alignItems: "center", borderColor: 'red', borderWidth: 0 }}>
                    <View
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 10,
                            backgroundColor: mainColor + "44",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome5 name='user-alt' size={20} color={mainLighterColor} />
                    </View>
                    <View style={{ marginLeft: 10, justifyContent: "center" }}>
                        <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{user.fullName}</Text>
                        <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{`${user.email} - ${user.phone}`}</Text>
                    </View>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 15 }}
                />
                <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{`Cost ${price} /-`}</Text>
                <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", textAlign: "justify", }}>{`${condition.conditionName} ${category.categoryName}`}</Text>
                {productsWithSameCategory.length > 0 &&
                    <>
                        <TouchableOpacity
                            style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, marginTop: 10 }}
                            onPress={() => props.navigation.navigate("Products")}
                        >
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Other {category.categoryName}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                                {/* <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginRight: 2 }}>See all</Text>
                        <AntDesign name="right" color={textOffColor} size={12} style={{}} /> */}
                            </View>
                        </TouchableOpacity>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ borderColor: 'red', borderWidth: 0, marginTop: 10, marginBottom: (longitude && latitude) ? 20 : 90 }}>
                            {RenderSimilarCategoryProducts()}
                        </ScrollView>
                    </>
                }
                {(longitude && latitude) &&
                    <>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", marginBottom: 10 }}>
                            <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Location on map</Text>
                        </View>
                        <View
                            style={{
                                height: 300,
                                width: '100%',
                                marginBottom: 90,
                                borderRadius: 10,
                                overflow: "hidden",
                                borderColor: 'red', borderWidth: 0,
                            }}
                        >
                            <MapView
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                initialRegion={{
                                    latitude,
                                    longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    key={0}
                                    coordinate={{
                                        latitude,
                                        longitude,
                                    }}
                                    title={productName}
                                    description={null}
                                />
                            </MapView>
                        </View>
                    </>
                }
            </ScrollView>
            {userData?.userModel?._id != user._id &&
                <View style={{
                    height: 80,
                    width: '100%',
                    backgroundColor: modalColor,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    flexDirection: "row",
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {!forExchange ?
                        <>
                            <CustomCartCount
                                productId={_id}
                                quantityInCart={quantityInCart}
                                big={true}
                            />
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("RightDrawer")
                                        rightDrawerNavigation.dangerouslyGetParent().dangerouslyGetParent().openDrawer()
                                    }}
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
                                    <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>{"Purchase Now"}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <TouchableOpacity
                            onPress={() => GetProductsToExchange(category._id)}
                            style={{
                                borderColor: 'red', borderWidth: 0,
                                width: 170,
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
                            <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>{"Exchange Product"}</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            <SwipeablePanel
                isActive={showMyProductsToExchangePannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowMyProductsToExchangePannel(false)
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
                    height: '75%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <ProductsToExchange
                    navigation={props.navigation}
                />
            </SwipeablePanel>
            <SwipeablePanel
                isActive={showExchangeProductPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowExchangeProductPannel(false)
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
                <ExchangeProduct navigate={props.navigation.navigate} />
            </SwipeablePanel>
        </>
    )
}

const mapStateToProps = ({ color, cart, product, user, shared }) => ({
    color, cart, product, user, shared
})

export default connect(mapStateToProps, {
    GetProductById,
    ChangeShowMyProductsToExchangePannel,
    GetProductsToExchange,
    ChangeShowExchangeProductPannel,
})(ProductDetail)

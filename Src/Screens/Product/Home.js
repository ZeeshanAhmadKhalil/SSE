import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    LineChart
} from "react-native-chart-kit";
import { Divider } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {
    ChangeViewingSellingProductDetails,
    GetHomeData,
    GetProductById
} from '../../Store/Actions/productActions';
import {
    ChangeBottomNavigate,
    ChangeRightDrawerNavigation
} from '../../Store/Actions/sharedActions';
import CustomCartCount from '../Shared/CustomCartCount';
import CustomHeader from '../Shared/CustomHeader';
import CustomLikeToggle from '../Shared/CustomLikeToggle';
import BuyingReportDonutChart from '../User/Dashboard/BuyingReportDonutChart';

const screenWidth = Dimensions.get("window").width;
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

function Home(props) {

    let carousel
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => chartBlueColor, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [46, 28, 36, 69, 75, 99],
                color: (opacity = 1) => chartRedColor, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [13, 55, 69, 45, 15, 85],
                color: (opacity = 1) => chartGreenColor, // optional
                strokeWidth: 2 // optional
            },
        ],
        legend: ["Deposits", "Spending", "Earning"] // optional
    };
    const chartConfig = {
        backgroundGradientFrom: backgroundColor,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: backgroundColor,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => mainLighterColor,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

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
        chartYellowColor,
        chartBlueColor,
        chartGreenColor,
        chartRedColor,
    } = props.color
    const {
        mostlyLikedProducts,
        fiveProductsToSell,
        fiveProductsToExchange,
        recommendedProducts,
        cjProducts,
    } = props.product
    const {
        userData
    } = props.user
    const {
        GetHomeData,
        ChangeViewingSellingProductDetails,
        GetProductById,
        ChangeBottomNavigate,
        ChangeRightDrawerNavigation,
    } = props

    const [activeIndex, setActiveIndex] = useState(0)

    function RenderGraphs() {
        return (
            <>
                <TouchableOpacity
                    style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, }}
                    onPress={() => props.navigation.navigate("Dashboard")}
                >
                    <View style={{ flex: 4.5, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                        <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Deposits, Spending & Earning Report</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                        <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginRight: 2 }}>See all</Text>
                        <AntDesign name="right" color={textOffColor} size={12} style={{ marginRight: 10 }} />
                    </View>
                </TouchableOpacity>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
                <TouchableOpacity
                    style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, }}
                    onPress={() => props.navigation.navigate("Dashboard")}
                >
                    <View style={{ flex: 4.5, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                        <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Your Buying Report</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                        <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginRight: 2 }}>See all</Text>
                        <AntDesign name="right" color={textOffColor} size={12} style={{ marginRight: 10 }} />
                    </View>
                </TouchableOpacity>
                <BuyingReportDonutChart />
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </>
        )
    }
    const RenderMostlyLikedProducts = ({ item, key }) => {
        const { description, isLiked, media, price, productName, _id } = item
        return (
            <TouchableOpacity
                key={key}
                style={{ borderColor: 'red', borderWidth: 0, height: 200, width: '100%' }}
                onPress={() => {
                    // ChangeViewingSellingProductDetails(true)
                    // props.navigation.navigate("ProductDetail")
                    GetProductById(_id, props.navigation.navigate)
                }}
            >
                <View style={{ flex: 3, borderColor: 'red', borderWidth: 0 }}>
                    <Image
                        source={{ uri: media[0].path }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    borderColor: 'red',
                    borderWidth: 0,
                    backgroundColor: modalColor,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    padding: 5
                }}>
                    <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{productName}</Text>
                    <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3 }}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const RenderFirstFiveProductsToSell = (fiveProductsToSell) => {
        return fiveProductsToSell.map((item, key) => {
            const { description, isLiked, media, price, productName, _id, quantityInCart, user } = item
            return (
                <TouchableOpacity
                    onPress={() => {
                        // props.ChangeViewingSellingProductDetails(true)
                        // props.navigation.navigate("ProductDetail")
                        GetProductById(_id, props.navigation.navigate)
                    }}
                    key={key}
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
                                        <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{`${price} PKR`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                    <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                        <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{description}</Text>
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
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
                                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end", justifyContent: "center" }}>
                                            {userData?.userModel?._id != user ?
                                                <>
                                                    <CustomLikeToggle
                                                        isLiked={isLiked}
                                                        productId={_id}
                                                    />
                                                </>
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
        })
    }
    const RenderFiveProductsToExchange = (fiveProductsToExchange) => {
        return fiveProductsToExchange.map((item, key) => {
            const { _id, productName, price, media, isLiked, description, user } = item
            return (
                <TouchableOpacity
                    key={key}
                    onPress={() => {
                        // props.ChangeViewingSellingProductDetails(false)
                        // props.navigation.navigate("ProductDetail")
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
                                        <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{`${price} PKR`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                    <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                        <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{description}</Text>
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                        {userData?.userModel?._id != user ?
                                            <View style={{ flex: 1 }}>
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
                                                    <Text style={{ color: textColor, fontSize: 14 }}>Exchange</Text>
                                                </View>
                                            </View>
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
        })
    }
    const RenderCjProducts = (cjProducts) => {
        return cjProducts.map((item, key) => {
            const { categoryName, createTime, productImage, productNameEn, sellPrice, cjProducts, } = item
            return (
                <TouchableOpacity
                    key={key}
                    onPress={() => {
                        let searchQuery = productNameEn.split(' ').join('+')
                        // Linking.openURL('https://cjdropshipping.com/search/' + searchQuery)
                        Linking.openURL('https://cjdropshipping.com')
                    }}
                // disabled={true}
                >
                    <View style={{ width: '95%', height: 100, borderColor: 'red', borderWidth: 0, marginHorizontal: '2.5%', flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                            <Image
                                source={{ uri: productImage }}
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
                                    <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{productNameEn}</Text>
                                </View>
                                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                    <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", marginRight: 5, padding: 2 }}>
                                        <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{`${sellPrice} USD`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                    <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                        <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{categoryName}</Text>
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
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
                                            <Entypo name="link" size={14} color={textColor} style={{ marginRight: 5 }} />
                                            <Text style={{ color: textColor, fontSize: 14 }}>Visit</Text>
                                        </View>
                                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end", justifyContent: "center" }}>
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
        })
    }
    const RenderRecommendedProducts = (recommendedProducts) => {
        return recommendedProducts.map((item, key) => {
            const { createdOn, description, forExchange, media, price, productName, quantity, user, _id } = item
            return (
                <TouchableOpacity
                    onPress={() => GetProductById(_id, props.navigation.navigate)}
                    style={{ width: 180, height: 180, borderColor: 'red', borderWidth: 0, marginLeft: 10 }}
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
                                    <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{`${price} PKR`}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                {/* <View
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
                                    {liked ?
                                        <AntDesign name="heart" size={15} color={textOffColor} style={{}} />
                                        :
                                        <AntDesign name="hearto" size={15} color={textOffColor} style={{}} />
                                    }
                                </View> */}
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
    useEffect(() => {
        ChangeBottomNavigate(props.navigation.navigate)
        ChangeRightDrawerNavigation(props.navigation)
        GetHomeData()
    }, [])
    return (
        <>
            <CustomHeader
                navigation={props.navigation}
                currentPage="Home"
            />
            <ScrollView
                showsVerticalScrollIndicator={false} style={{ borderColor: 'red', borderWidth: 0, paddingHorizontal: 0 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => GetHomeData()}
                    />
                }
            >
                {mostlyLikedProducts.length != 0 &&
                    <>
                        <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>Mostly Liked Products</Text>
                        <Carousel
                            layout={"default"}
                            ref={ref => carousel = ref}
                            data={mostlyLikedProducts}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={300}
                            containerCustomStyle={{ marginTop: 10 }}
                            renderItem={RenderMostlyLikedProducts}
                            onSnapToItem={index => setActiveIndex(index)}
                            enableMomentum={true}
                            // firstItem={3}
                            loop={true}
                            autoplay={true}
                            color={props.color}
                        />
                    </>
                }
                {fiveProductsToExchange.length != 0 &&
                    <>
                        <TouchableOpacity
                            style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, marginTop: 10 }}
                            onPress={() => props.navigation.navigate("Products")}
                        >
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Products to Exchange</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                                <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginRight: 2 }}>See all</Text>
                                <AntDesign name="right" color={textOffColor} size={12} style={{ marginRight: 10 }} />
                            </View>
                        </TouchableOpacity>
                        <Divider
                            style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                        />
                        {RenderFiveProductsToExchange(fiveProductsToExchange)}
                    </>
                }
                {recommendedProducts.length != 0 &&
                    <>
                        <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Recommended Products</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ borderColor: 'red', borderWidth: 0 }}>
                            {RenderRecommendedProducts(recommendedProducts)}
                        </ScrollView>
                    </>
                }
                {fiveProductsToSell.length != 0 &&
                    <>
                        <TouchableOpacity
                            style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, marginTop: 10 }}
                            onPress={() => props.navigation.navigate("Products")}
                        >
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Products to Sell</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                                <Text style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginRight: 2 }}>See all</Text>
                                <AntDesign name="right" color={textOffColor} size={12} style={{ marginRight: 10 }} />
                            </View>
                        </TouchableOpacity>
                        <Divider
                            style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                        />
                        {RenderFirstFiveProductsToSell(fiveProductsToSell)}
                    </>
                }
                {/* {RenderGraphs()} */}
                {cjProducts.length != 0 &&
                    <>
                        <TouchableOpacity
                            style={{ width: '100%', flexDirection: "row", borderColor: 'red', borderWidth: 0, marginTop: 15 }}
                            onPress={() => props.navigation.navigate("Products")}
                        >
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>CJ Dropshipping Products</Text>
                            </View>
                        </TouchableOpacity>
                        <Divider
                            style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                        />
                        {RenderCjProducts(cjProducts)}
                    </>
                }
            </ScrollView>
        </>
    )
}

const mapStateToProps = ({ color, product, user, }) => ({
    color, product, user,
})

export default connect(mapStateToProps, {
    ChangeViewingSellingProductDetails,
    GetHomeData,
    GetProductById,
    ChangeBottomNavigate,
    ChangeRightDrawerNavigation,
})(Home)

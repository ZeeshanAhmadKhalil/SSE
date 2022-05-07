import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Badge, SearchBar } from 'react-native-elements'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import {
    ChangeProductSearchQuery,
    GetMyWishList, SearchByImage, SearchProducts
} from '../../Store/Actions/productActions'
import {
    ChangeShowMyProductsPannel, ChangeShowWalletPannel,
    ChangeShowWishListPannel
} from '../../Store/Actions/sharedActions'
import {
    GetTransactions
} from '../../Store/Actions/walletActions'

function CustomHeader(props) {
    const { headerTextColor,
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
        productSearchQuery
    } = props.product
    const {
        shoppingCart
    } = props.cart
    const {
        ChangeProductSearchQuery,
        ChangeShowWalletPannel,
        ChangeShowWishListPannel,
        ChangeShowMyProductsPannel,
        GetMyWishList,
        navigation,
        currentPage,
        SearchProducts,
        SearchByImage,
        GetTransactions,
    } = props
    return (
        <View style={{ backgroundColor: mainColor + '00' }}>
            <View style={{ backgroundColor: mainColor, width: '100%', height: getStatusBarHeight() }}>
            </View>
            <View style={{
                width: '100%', height: 50, backgroundColor: mainColor, flexDirection: "row",
                borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backfaceVisibility: "visible"
            }}>
                <View style={{ flex: 0.3, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    {props.onBack ?
                        <TouchableOpacity
                            onPress={() => {
                                props.onBack()
                            }}
                        >
                            <Ionicons name="arrow-back" size={25} color={headerIconColor} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                navigation.openDrawer()
                            }}
                        >
                            <Entypo name="menu" size={25} color={headerIconColor} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flex: 2, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                    <View style={{ flex: 30, borderColor: 'red', borderWidth: 0 }}>
                        <SearchBar
                            placeholder="Search..."
                            placeholderTextColor={textOffColor}
                            containerStyle={{
                                backgroundColor: mainColor,
                                borderWidth: 0,
                                borderBottomColor: 'transparent',
                                borderTopColor: 'transparent'
                            }}
                            inputContainerStyle={{
                                backgroundColor: mainDarkerColor,
                                marginLeft: 0,
                                marginRight: 0,
                                height: 20,
                            }}
                            inputStyle={{
                                color: headerTextColor,
                            }}
                            value={productSearchQuery}
                            onChangeText={val => ChangeProductSearchQuery(val)}
                            searchIcon={() => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                            }}
                                        >
                                            <Ionicons name="search-sharp" color={textOffColor} size={18} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }}
                            clearIcon={false}
                            returnKeyType="search"
                            onSubmitEditing={() => {
                                console.log("ONSUBMITEDITING")
                                if (productSearchQuery != '') {
                                    SearchProducts()
                                }
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: mainDarkerColor,
                                borderColor: 'red',
                                borderWidth: 0,
                                borderRadius: 5,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                height: 30,
                                width: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 2,
                            }}
                        // onPress={() => SearchByImage()}
                        >
                            {/* <EvilIcons name="image" size={25} color={textOffColor} style={{ marginLeft: 0 }} /> */}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row-reverse", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (currentPage == "WishList" || currentPage == "Wallet") {
                                navigation.dangerouslyGetParent().openDrawer()
                            } else if (currentPage == "Products" || currentPage == "SearchedProducts") {
                                navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().openDrawer()
                            } else {
                                navigation.dangerouslyGetParent().dangerouslyGetParent().openDrawer()
                            }
                        }}
                    >
                        <View style={{ marginLeft: 5, marginRight: 5 }} >
                            <AntDesign name="shoppingcart" size={28} color={textOffColor} />
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
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => GetTransactions()}
                    >
                        <AntDesign name="wallet" size={22} color={currentPage == "Wallet" ? headerIconColor : textOffColor} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => GetMyWishList()}
                    >
                        <AntDesign name="hearto" size={22} color={currentPage == "WishList" ? headerIconColor : textOffColor} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = ({ color, product, cart }) => ({
    color, product, cart
})

export default connect(mapStateToProps, {
    ChangeProductSearchQuery,
    ChangeShowWalletPannel,
    ChangeShowWishListPannel,
    ChangeShowMyProductsPannel,
    GetMyWishList,
    SearchProducts,
    SearchByImage,
    GetTransactions,
})(CustomHeader)

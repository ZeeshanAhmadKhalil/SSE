import * as shape from 'd3-shape'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, ProgressBarAndroidComponent, Modal, Dimensions, TextInput as ReactTextInput, Platform, BackHandler, RefreshControl, } from 'react-native'
import { BottomSheet, ListItem } from 'react-native-elements'
import { Checkbox, HelperText, TextInput, Divider, Switch as PaperSwitch, Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker' // todo: Upgrade gradle to 4.0.1 https://github.com/ivpusic/react-native-image-crop-picker/issues/1416#issuecomment-700644075
import ImageModal from 'react-native-image-modal';
import { useForm, Controller } from "react-hook-form";

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {
    ChangeIsForExchange,
    ChangeCityValue,
    ChangeCategoryValue,
    ChangeConditionValue,
    AddProductImages,
    GetAddProductData,
    PostProduct,
} from '../../Store/Actions/productActions'

import CustomHeader from '../Shared/CustomHeader'

function AddProduct(props) {
    let input1
    let input2
    let input3
    let input11

    const [isCityOpen, setIsCityOpen] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isConditionOpen, setIsConditionOpen] = useState(false)
    const [imagePickerModal, setImagePickerModal] = useState(false)

    const AttachProductImages = (isCamera) => {
        if (isCamera) {
            ImagePicker.openCamera({
                width: 400,
                height: 400,
                // cropping: true,
                // includeBase64: true,
                multiple: true,
                mediaType: 'photo',
            }).then((image) => {
                console.log(image)
                props.AddProductImages(image)
            })
        } else {
            ImagePicker.openPicker({
                width: 400,
                height: 400,
                // cropping: true,
                // includeBase64: true,
                multiple: true,
                mediaType: 'photo',
            }).then((image) => {
                props.AddProductImages(image)
            })
        }
    }
    const RenderProductImages = (productImages) => {
        return productImages.map((item, key) => {
            // const { url } = item
            return (
                <View key={key}>
                    <ImageModal
                        resizeMode="cover"
                        imageBackgroundColor="transparent"
                        modalImageStyle={{
                        }}
                        modalImageResizeMode="contain"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 10,
                            borderWidth: 1,
                            marginRight: 10,
                            borderColor: props.color.modalBorderColor,
                            backgroundColor: "silver",
                        }}
                        source={{ uri: item }}
                    />
                </View>
            )
        })
    }

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
        isForExchange,
        cityValue,
        cityList,
        categoryValue,
        categoryList,
        conditionValue,
        conditionList,
        productImages,
    } = props.product
    const {
        ChangeIsForExchange,
        ChangeCityValue,
        ChangeCategoryValue,
        ChangeConditionValue,
        GetAddProductData,
        PostProduct,
    } = props

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        console.log("USEEFFECT")
        GetAddProductData()
    }, [])

    return (
        <>
            <CustomHeader
                navigation={props.navigation}
                currentPage="AddProduct"
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => GetAddProductData()}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 15, borderColor: 'red', borderWidth: 0 }}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => input1.focus()}>
                    <View pointerEvents="none">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.productName}
                                    onBlur={onBlur}
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                            underlineColor: modalColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Product Name"
                                    style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                    ref={(input) => { input1 = input; }}
                                    returnKeyType='done'
                                    right={<TextInput.Icon name="tshirt-crew" size={20} color={errors.productName ? dangerColor : modalBorderColor} style={{ marginBottom: -2 }} />}

                                />
                            )}
                            name="productName"
                            defaultValue=""
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => input2.focus()}>
                    <View pointerEvents="none">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.price}
                                    onBlur={onBlur}
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                            underlineColor: modalColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Price"
                                    style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                    ref={(input) => { input2 = input; }}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    keyboardType="number-pad"
                                    right={<TextInput.Icon name="bitcoin" size={20} color={errors.price ? dangerColor : modalBorderColor} style={{ marginBottom: -2 }} />}

                                />
                            )}
                            name="price"
                            defaultValue=""
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => input3.focus()}>
                    <View pointerEvents="none">
                        <Controller
                            control={control}
                            rules={{
                                required: !isForExchange,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    disabled={isForExchange}
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.quantity && !isForExchange}
                                    onBlur={onBlur}
                                    mode="outlined"
                                    theme={{
                                        colors: {
                                            placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                            underlineColor: modalColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Quantity"
                                    style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                    ref={(input) => { input3 = input; }}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    keyboardType="number-pad"
                                    right={<TextInput.Icon name="playlist-check" size={25} color={errors.quantity && !isForExchange ? dangerColor : modalBorderColor} style={{ marginBottom: -2 }} />}

                                />
                            )}
                            name="quantity"
                            defaultValue=""
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ width: '100%', height: 30, borderColor: 'red', borderWidth: 0, marginTop: 10, height: 45, flexDirection: "row" }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-start" }}>
                        <Text style={{ color: modalBorderColor, fontSize: 16, fontWeight: "bold", marginLeft: 3 }}>For Exchange</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-end" }}>
                        <PaperSwitch
                            value={isForExchange}
                            onValueChange={() => ChangeIsForExchange(!isForExchange)}
                            color={mainLighterColor}
                        />
                    </View>
                </View>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    showTickIcon={true}
                    ArrowDownIconComponent={({ style }) => <Entypo name="chevron-down" style={style} size={20} color={modalBorderColor} />}
                    ArrowUpIconComponent={({ style }) => <Entypo name="chevron-up" style={style} size={20} color={textOffColor} />}
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    items={conditionList}
                    open={isConditionOpen}
                    placeholder="Condition..."
                    containerStyle={{
                        height: isConditionOpen ? (50 + 40 * (conditionList.length > 5 ? 5 : conditionList.length)) : 50,
                        width: '100%',
                        marginTop: 25,
                        borderColor: 'red', borderWidth: 0,
                        zIndex: 9,
                        position: "absolute",
                        top: 400,
                    }}
                    style={{ backgroundColor: backgroundColor, color: textColor, borderColor: isConditionOpen ? textOffColor : modalBorderColor, borderWidth: 1, height: 45, borderRadius: 5 }}
                    labelProps={{
                        style: { color: conditionValue != "" ? textOffColor : modalBorderColor, }
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: backgroundColor, color: textColor, borderColor: isConditionOpen ? textOffColor : modalBorderColor, borderWidth: 1
                    }}
                    theme="DARK"
                    dropDownStyle={{ backgroundColor: modalColor }}
                    setOpen={(open) => {
                        setIsConditionOpen(open)
                    }}
                    value={conditionValue}
                    setValue={(value) => {
                        // console.log(value(conditionList))
                        ChangeConditionValue(value(conditionList))
                    }}
                    zIndex={10}
                />
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    showTickIcon={true}
                    ArrowDownIconComponent={({ style }) => <Entypo name="chevron-down" style={style} size={20} color={modalBorderColor} />}
                    ArrowUpIconComponent={({ style }) => <Entypo name="chevron-up" style={style} size={20} color={textOffColor} />}
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    items={categoryList}
                    open={isCategoryOpen}
                    placeholder="Category..."
                    containerStyle={{
                        height: isCategoryOpen ? (50 + 40 * (categoryList.length > 5 ? 5 : categoryList.length)) : 50,
                        width: '100%',
                        marginTop: 25,
                        borderColor: 'red', borderWidth: 0,
                        zIndex: 9,
                        position: "absolute",
                        top: 330,
                    }}
                    style={{ backgroundColor: backgroundColor, color: textColor, borderColor: isCategoryOpen ? textOffColor : modalBorderColor, borderWidth: 1, height: 45, borderRadius: 5 }}
                    labelProps={{
                        style: { color: categoryValue != "" ? textOffColor : modalBorderColor, }
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: backgroundColor, color: textColor, borderColor: isCategoryOpen ? textOffColor : modalBorderColor, borderWidth: 1
                    }}
                    theme="DARK"
                    dropDownStyle={{ backgroundColor: modalColor }}
                    setOpen={(open) => {
                        setIsCategoryOpen(open)
                    }}
                    value={categoryValue}
                    setValue={(value) => {
                        // console.log(value(categoryList))
                        ChangeCategoryValue(value(categoryList))
                    }}
                    zIndex={10}
                />
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    showTickIcon={true}
                    ArrowDownIconComponent={({ style }) => <Entypo name="chevron-down" style={style} size={20} color={modalBorderColor} />}
                    ArrowUpIconComponent={({ style }) => <Entypo name="chevron-up" style={style} size={20} color={textOffColor} />}
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    items={cityList}
                    open={isCityOpen}
                    placeholder="City..."
                    containerStyle={{
                        height: isCityOpen ? (50 + 40 * (cityList.length > 5 ? 5 : cityList.length)) : 50,
                        width: '100%',
                        marginTop: 25,
                        borderColor: 'red', borderWidth: 0,
                        zIndex: 9,
                        position: "absolute",
                        top: 260,
                    }}
                    style={{ backgroundColor: backgroundColor, color: textColor, borderColor: isCityOpen ? textOffColor : modalBorderColor, borderWidth: 1, height: 45, borderRadius: 5 }}
                    labelProps={{
                        style: { color: cityValue != "" ? textOffColor : modalBorderColor, }
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: backgroundColor, color: textColor, borderColor: isCityOpen ? textOffColor : modalBorderColor, borderWidth: 1
                    }}
                    theme="DARK"
                    dropDownStyle={{ backgroundColor: modalColor }}
                    setOpen={(open) => {
                        setIsCityOpen(open)
                    }}
                    value={cityValue}
                    setValue={(value) => {
                        // console.log(value(cityList))
                        ChangeCityValue(value(cityList))
                    }}
                    zIndex={11}
                />
                <View style={{ zIndex: 1, height: 200, width: '100%', borderColor: 'red', borderWidth: 0, }} pointerEvents="auto"></View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{}}>
                    <View
                        style={{
                            borderColor: 'red', borderWidth: 0,
                            height: 130,
                            marginTop: 20,
                            width: '100%',
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setImagePickerModal(true)
                            }}
                            style={{
                                height: 120,
                                width: 120,
                                backgroundColor: backgroundColor,
                                borderRadius: 10,
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: modalBorderColor
                            }}>
                            <Entypo name="camera" size={60} color={modalBorderColor} />
                        </TouchableOpacity>
                        {RenderProductImages(productImages)}
                    </View>
                </ScrollView>
                <TouchableOpacity activeOpacity={1} onPress={() => input11.focus()}>
                    <View pointerEvents="none">
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <ReactTextInput
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholder="description"
                                    placeholderTextColor={errors.description ? dangerColor : modalBorderColor}
                                    multiline={true}
                                    style={{
                                        backgroundColor: backgroundColor,
                                        zIndex: 10,
                                        marginTop: 25,
                                        height: 100,
                                        borderColor: errors.description ? dangerColor : modalBorderColor,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        paddingLeft: 10,
                                        color: textColor,
                                        marginRight: 10,
                                        width: '100%',
                                    }}
                                    ref={(input) => { input11 = input; }}
                                    textAlignVertical="top"
                                    editable={true}
                                />
                            )}
                            name="description"
                            defaultValue=""
                        />
                    </View>
                </TouchableOpacity>
                <Button
                    title="submit"
                    onPress={handleSubmit((data) => {
                        reset({
                            productName: "",
                            price: "",
                            quantity: "",
                            description: "",
                        })
                        PostProduct(data)
                    })}
                    mode="contained"
                    style={{
                        backgroundColor: mainLighterColor,
                        width: 100,
                        alignSelf: "flex-start",
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: textColor }}>Submit</Text>
                </Button>
                <View style={{ zIndex: 1, height: 200, width: '100%', borderColor: 'red', borderWidth: 0, }} pointerEvents="auto"></View>
            </ScrollView>
            <Modal
                visible={imagePickerModal}
                transparent={true}
                onRequestClose={() => setImagePickerModal(false)}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center", paddingLeft: '3%', paddingRight: '3%', alignItems: 'center' }}>
                    <View
                        style={{
                            height: 100,
                            width: 250,
                            backgroundColor: modalColor,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setImagePickerModal(false)
                                AttachProductImages(true)
                            }}
                        >
                            <Entypo name="camera" size={50} color={textOffColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setImagePickerModal(false)
                                AttachProductImages(false)
                            }}
                        >
                            <Entypo name="images" size={50} color={textOffColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setImagePickerModal(false)}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        >
                            <Entypo name="cross" size={20} color={textOffColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ color, product }) => ({
    color, product
})

export default connect(mapStateToProps, {
    ChangeIsForExchange,
    ChangeCityValue,
    ChangeCategoryValue,
    ChangeConditionValue,
    AddProductImages,
    GetAddProductData,
    PostProduct,
})(AddProduct)

import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, ProgressBarAndroidComponent, Modal, TextInput as ReactTextInput, Dimensions, Image } from 'react-native'
import { Divider, BottomSheet, ListItem } from 'react-native-elements'
import { Checkbox, TextInput, HelperText, Button } from 'react-native-paper';
import AutoHeightImage from 'react-native-auto-height-image';
import { SliderBox } from "react-native-image-slider-box";
import Svg, { Path } from 'react-native-svg';
import { useForm, Controller } from "react-hook-form";

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {
    SignUp,
} from '../../Store/Actions/userActions';

import CustomHeader from '../Shared/CustomHeader'
import Wavy from '../Shared/Wavy';

const screenWidth = Dimensions.get("window").width;

function Signup(props) {
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
    } = props.product
    const {
        SignUp
    } = props
    const styles = {
        container: {
            flex: 1,
            backgroundColor: backgroundColor
        },
        headerContainer: {
            marginTop: 40,
            marginHorizontal: 10,
            zIndex: 10,
        },
        headerText: {
            fontSize: 30,
            fontWeight: 'bold',
            color: textColor,
            textAlign: 'center',
            marginTop: 10,
        },
        svgCurveTop: {
            position: 'absolute',
            width: screenWidth,
            zIndex: 9,
        },
        svgCurveBottom: {
            position: 'absolute',
            width: screenWidth,
            bottom: 0,
            zIndex: 9,
        },
    };

    let input1
    let input2
    let input3
    let input4

    const { control, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Wavy
                    customStyles={styles.svgCurveTop}
                    customColor={mainDarkerColor}
                    customPattren={"M0,224L10.9,202.7C21.8,181,44,139,65,112C87.3,85,109,75,131,74.7C152.7,75,175,85,196,96C218.2,107,240,117,262,138.7C283.6,160,305,192,327,197.3C349.1,203,371,181,393,192C414.5,203,436,245,458,256C480,267,502,245,524,213.3C545.5,181,567,139,589,138.7C610.9,139,633,181,655,186.7C676.4,192,698,160,720,149.3C741.8,139,764,149,785,165.3C807.3,181,829,203,851,176C872.7,149,895,75,916,74.7C938.2,75,960,149,982,154.7C1003.6,160,1025,96,1047,106.7C1069.1,117,1091,203,1113,224C1134.5,245,1156,203,1178,160C1200,117,1222,75,1244,80C1265.5,85,1287,139,1309,170.7C1330.9,203,1353,213,1375,208C1396.4,203,1418,181,1429,170.7L1440,160L1440,0L1429.1,0C1418.2,0,1396,0,1375,0C1352.7,0,1331,0,1309,0C1287.3,0,1265,0,1244,0C1221.8,0,1200,0,1178,0C1156.4,0,1135,0,1113,0C1090.9,0,1069,0,1047,0C1025.5,0,1004,0,982,0C960,0,938,0,916,0C894.5,0,873,0,851,0C829.1,0,807,0,785,0C763.6,0,742,0,720,0C698.2,0,676,0,655,0C632.7,0,611,0,589,0C567.3,0,545,0,524,0C501.8,0,480,0,458,0C436.4,0,415,0,393,0C370.9,0,349,0,327,0C305.5,0,284,0,262,0C240,0,218,0,196,0C174.5,0,153,0,131,0C109.1,0,87,0,65,0C43.6,0,22,0,11,0L0,0Z"}
                    customHeight={100}
                    customSVGHeight={220}
                    customTop={30}
                    isTop={true}
                    customBottom={0}
                />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Sign up to continue...</Text>
                </View>
                <View style={{ width: '100%', flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center", backgroundColor: backgroundDarkerColor }}>
                    <View style={{ width: '80%', borderColor: 'red', borderWidth: 0 }}>
                        {/* <AutoHeightImage
                                width={screenWidth / 4}
                                source={require('../../Assets/Images/icon.png')}
                                style={{
                                    alignSelf: "center",
                                    borderColor: 'red', borderWidth: 0,
                                    marginBottom: 10,
                                }}
                                resizeMode="stretch"
                            /> */}
                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")} >
                            <Text style={{ color: textColor, fontSize: 18, fontWeight: "normal" }}>
                                {"Already have an account? "}
                                <Text style={{ color: mainColor, fontWeight: 'bold' }}>
                                    {"Login"}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.fullName}
                                    // blurOnSubmit={true}
                                    mode="flat"
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Full Name"
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input1 = input; }}
                                    returnKeyType='done'
                                />
                            )}
                            name="fullName"
                            defaultValue=""
                        />
                        {errors.fullName && <HelperText type="error" visible={true}>First Name is required</HelperText>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    error={errors.email}
                                    // blurOnSubmit={true}
                                    mode="flat"
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Email"
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input2 = input; }}
                                    returnKeyType='done'
                                />
                            )}
                            name="email"
                            defaultValue=""
                        />
                        {errors.email && <HelperText type="error" visible={true}>Email is required</HelperText>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    mode="flat"
                                    error={errors.phone}
                                    value={value}
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Phone"
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input3 = input; }}
                                    returnKeyType='done'
                                />
                            )}
                            name="phone"
                            defaultValue=""
                        />
                        {errors.phone && <HelperText type="error" visible={true}>Phone number is required</HelperText>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    error={errors.password}
                                    value={value}
                                    mode="flat"
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    secureTextEntry
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Password"
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input4 = input; }}
                                    returnKeyType='done'
                                />
                            )}
                            name="password"
                            defaultValue=""
                        />
                        {errors.password && <HelperText type="error" visible={true}>Password is required</HelperText>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.location}
                                    mode="flat"
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Location"
                                    // value={state.emailValue}
                                    // onChangeText={ }
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input4 = input; }}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                />
                            )}
                            name="location"
                            defaultValue=""
                        />
                        {errors.location && <HelperText type="error" visible={true}>Location is required</HelperText>}
                        <Button
                            title="submit"
                            onPress={handleSubmit((data) => SignUp(data))}
                            mode="contained"
                            style={{
                                backgroundColor: mainDarkerColor,
                                width: '95%',
                                alignSelf: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text style={{ color: textColor }}>Sign Up</Text>
                        </Button>
                    </View>
                </View>
                <Wavy
                    customStyles={styles.svgCurveBottom}
                    customColor={mainDarkerColor}
                    customPattren={"M0,224L10.9,208C21.8,192,44,160,65,165.3C87.3,171,109,213,131,224C152.7,235,175,213,196,213.3C218.2,213,240,235,262,250.7C283.6,267,305,277,327,250.7C349.1,224,371,160,393,154.7C414.5,149,436,203,458,213.3C480,224,502,192,524,186.7C545.5,181,567,203,589,218.7C610.9,235,633,245,655,234.7C676.4,224,698,192,720,192C741.8,192,764,224,785,229.3C807.3,235,829,213,851,181.3C872.7,149,895,107,916,117.3C938.2,128,960,192,982,229.3C1003.6,267,1025,277,1047,277.3C1069.1,277,1091,267,1113,234.7C1134.5,203,1156,149,1178,160C1200,171,1222,245,1244,272C1265.5,299,1287,277,1309,240C1330.9,203,1353,149,1375,160C1396.4,171,1418,245,1429,282.7L1440,320L1440,320L1429.1,320C1418.2,320,1396,320,1375,320C1352.7,320,1331,320,1309,320C1287.3,320,1265,320,1244,320C1221.8,320,1200,320,1178,320C1156.4,320,1135,320,1113,320C1090.9,320,1069,320,1047,320C1025.5,320,1004,320,982,320C960,320,938,320,916,320C894.5,320,873,320,851,320C829.1,320,807,320,785,320C763.6,320,742,320,720,320C698.2,320,676,320,655,320C632.7,320,611,320,589,320C567.3,320,545,320,524,320C501.8,320,480,320,458,320C436.4,320,415,320,393,320C370.9,320,349,320,327,320C305.5,320,284,320,262,320C240,320,218,320,196,320C174.5,320,153,320,131,320C109.1,320,87,320,65,320C43.6,320,22,320,11,320L0,320Z"}
                    customHeight={20}
                    customSVGHeight={100}
                    customTop={0}
                    isTop={false}
                    customBottom={10}
                />
            </View>
        </>
    )
}

const mapStateToProps = ({ color, cart, product }) => ({
    color, cart, product
})

export default connect(mapStateToProps, {
    SignUp,
})(Signup)

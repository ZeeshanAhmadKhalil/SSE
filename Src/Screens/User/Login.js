import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, ProgressBarAndroidComponent, Modal, TextInput as ReactTextInput, Dimensions, Image } from 'react-native'
import { Divider, BottomSheet, ListItem } from 'react-native-elements'
import { Checkbox, TextInput, Button } from 'react-native-paper';
import AutoHeightImage from 'react-native-auto-height-image';
import { SliderBox } from "react-native-image-slider-box";
import Svg, { Path } from 'react-native-svg';

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
    SignIn,
} from '../../Store/Actions/userActions'

import CustomHeader from '../Shared/CustomHeader'
import Wavy from '../Shared/Wavy';

const screenWidth = Dimensions.get("window").width;

function Login(props) {

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
        userData
    } = props.user
    const {
        SignIn
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

    const [email, ChangeEmail] = useState('')
    const [password, ChangePassword] = useState('')

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                {userData == '' &&
                    <>
                        <Wavy
                            customStyles={styles.svgCurveTop}
                            customColor={mainDarkerColor}
                            customPattren={"M0,192L12.6,176C25.3,160,51,128,76,96C101.1,64,126,32,152,32C176.8,32,202,64,227,101.3C252.6,139,278,181,303,181.3C328.4,181,354,139,379,149.3C404.2,160,429,224,455,218.7C480,213,505,139,531,128C555.8,117,581,171,606,202.7C631.6,235,657,245,682,240C707.4,235,733,213,758,192C783.2,171,808,149,834,144C858.9,139,884,149,909,176C934.7,203,960,245,985,245.3C1010.5,245,1036,203,1061,181.3C1086.3,160,1112,160,1137,181.3C1162.1,203,1187,245,1213,224C1237.9,203,1263,117,1288,80C1313.7,43,1339,53,1364,96C1389.5,139,1415,213,1427,250.7L1440,288L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"}
                            customHeight={100}
                            customSVGHeight={220}
                            customTop={30}
                            isTop={true}
                            customBottom={0}
                        />
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Login to continue...</Text>
                        </View>
                        <View style={{ width: '100%', flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center", backgroundColor: backgroundDarkerColor }}>
                            <View style={{ width: '80%', borderColor: 'red', borderWidth: 0 }}>
                                <AutoHeightImage
                                    width={screenWidth / 4}
                                    source={require('../../Assets/Images/icon.png')}
                                    style={{
                                        alignSelf: "center",
                                        borderColor: 'red', borderWidth: 0,
                                        marginBottom: 10,
                                    }}
                                    resizeMode="stretch"
                                />
                                {/* <Text style={{ color: textColor, fontSize: 30, fontWeight: "bold", marginTop: 20 }}>Sign in</Text> */}

                                <TouchableOpacity onPress={() => props.navigation.navigate("Signup")} >
                                    <Text style={{ color: textColor, fontSize: 18, fontWeight: "normal" }}>
                                        {"Don't have an account? "}
                                        <Text style={{ color: mainColor, fontWeight: 'bold' }}>
                                            {"Sign up"}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                                <TextInput
                                    value={email}
                                    onChangeText={(val) => ChangeEmail(val)}
                                    mode="flat"
                                    theme={{
                                        colors: {
                                            placeholder: textColor, text: textColor, primary: textColor,
                                            underlineColor: textColor, background: backgroundColor
                                        }
                                    }}
                                    selectionColor={textColor}
                                    underlineColor={textColor}
                                    label="Email address"
                                    // error={state.emailError}
                                    // value={state.emailValue}
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input1 = input; }}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={(val) => ChangePassword(val)}
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
                                    // error={state.emailError}
                                    // value={state.emailValue}
                                    style={{ marginTop: 20 }}
                                    ref={(input) => { input2 = input; }}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                />
                                {/* <View style={{ height: 70, borderColor: 'red', borderWidth: 0, flexDirection: "row", marginTop: 10 }}>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                <Checkbox
                                    color={mainColor}
                                    uncheckedColor={modalBorderColor}
                                    status={false}
                                    onPress={() => {
                                    }}
                                />
                                <Text style={{ color: textColor, fontSize: 14, marginTop: 8 }}>Remember me</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                <Text style={{ color: mainColor, fontSize: 14, marginTop: 8 }}>Forgot Password?</Text>
                            </View>
                        </View> */}
                                <Button
                                    onPress={() => {
                                        console.log("LoggingIn")
                                        SignIn(email, password)
                                    }}
                                    mode="contained"
                                    style={{
                                        backgroundColor: mainDarkerColor,
                                        width: '95%',
                                        alignSelf: "center",
                                        marginTop: 20
                                    }}
                                >
                                    <Text style={{ color: textColor }}>Login</Text>
                                </Button>
                            </View>
                        </View>
                        <Wavy
                            customStyles={styles.svgCurveBottom}
                            customColor={mainDarkerColor}
                            customPattren={"M0,160L12.6,133.3C25.3,107,51,53,76,64C101.1,75,126,149,152,149.3C176.8,149,202,75,227,85.3C252.6,96,278,192,303,234.7C328.4,277,354,267,379,224C404.2,181,429,107,455,80C480,53,505,75,531,117.3C555.8,160,581,224,606,256C631.6,288,657,288,682,266.7C707.4,245,733,203,758,176C783.2,149,808,139,834,154.7C858.9,171,884,213,909,245.3C934.7,277,960,299,985,293.3C1010.5,288,1036,256,1061,229.3C1086.3,203,1112,181,1137,154.7C1162.1,128,1187,96,1213,80C1237.9,64,1263,64,1288,101.3C1313.7,139,1339,213,1364,213.3C1389.5,213,1415,139,1427,101.3L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"}
                            customHeight={20}
                            customSVGHeight={100}
                            customTop={0}
                            isTop={false}
                            customBottom={10}
                        />
                    </>
                }
            </View>
        </>
    )
}

const mapStateToProps = ({ color, cart, product, user }) => ({
    color, cart, product, user
})

export default connect(mapStateToProps, {
    SignIn,
})(Login)

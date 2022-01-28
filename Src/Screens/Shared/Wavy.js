import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, FlatList, StatusBar, ImageBackground } from 'react-native'
import { Divider, BottomSheet, ListItem, Avatar, Badge, Icon, withBadge } from 'react-native-elements'
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

import CustomHeader from '../Shared/CustomHeader'

const screenWidth = Dimensions.get("window").width;

class Wavy extends Component {
    render() {
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
        } = this.props.color
        const {
        } = this.props.product
        const {
            customStyles,
            customColor,
            customPattren,
            customHeight,
            customTop,
            isTop,
            customBottom,
            customSVGHeight,
        } = this.props
        const styles = {
            forTopWave: {
                position: 'absolute',
                top: customTop,
            },
            forBottomWave: {
                position: 'absolute',
                bottom: customBottom
            }
        }
        return (
            <View style={customStyles}>
                <View style={{ backgroundColor: customColor, height: customHeight, borderColor: 'red', borderWidth: 0 }}>
                    <Svg
                        height={customSVGHeight}
                        width="100%"
                        viewBox="0 0 1440 320"
                        style={isTop ? styles.forTopWave : styles.forBottomWave}
                    >
                        <Path
                            fill={customColor}
                            fill-opacity="1"
                            d={customPattren}
                        />
                    </Svg>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ color, cart, product }) => ({
    color, cart, product
})

export default connect(mapStateToProps, {
})(Wavy)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CustomHeader from '../../Shared/CustomHeader'
import ExchangeProducts from './Products/ExchangeProducts'
import SellingProducts from './Products/SellingProducts'

const Tab = createMaterialTopTabNavigator();

class Products extends Component {
    render() {
        const { textOffColor, warningColor, dangerColor, successLightColor, successColor, modalBorderColor, modalColor, textColor, backgroundColor, backgroundDarkerColor, mainDarkerColor, mainLighterColor, mainColor, } = this.props.color
        return (
            <>
                <View style={{ backgroundColor: modalColor }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        currentPage="Products"
                    />
                </View>
                <Tab.Navigator
                    swipeEnabled={true}
                    initialRouteName="Selling" // Change to Selling
                    tabBarOptions={{
                        labelStyle: { fontSize: 12 },
                        showIcon: true,
                        style: {
                            backgroundColor: modalColor,
                        }
                    }}
                >
                    <Tab.Screen name="Selling" component={SellingProducts} />
                    <Tab.Screen name="Exchange" component={ExchangeProducts} />
                </Tab.Navigator>
            </>
        )
    }
}

const mapStateToProps = ({ color }) => ({
    color
})

export default connect(mapStateToProps, {
})(Products)

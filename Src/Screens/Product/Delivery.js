import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../Shared/CustomHeader'
import Exchanges from './Delivery/Exchanges'
import Orders from './Delivery/Orders'

const Tab = createMaterialTopTabNavigator();

class Delivery extends Component {
    render() {
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
        } = this.props.color
        return (
            <>
                <View style={{ backgroundColor: modalColor }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        currentPage="Delivery"
                    />
                </View>
                <Tab.Navigator
                    swipeEnabled={true}
                    initialRouteName="Orders" // Change to Selling
                    tabBarOptions={{
                        labelStyle: { fontSize: 12 },
                        showIcon: true,
                        style: {
                            backgroundColor: modalColor,
                        }
                    }}
                >
                    <Tab.Screen name="Orders" component={Orders} />
                    <Tab.Screen name="Exchanges" component={Exchanges} />
                </Tab.Navigator>
            </>
        )
    }
}

const mapStateToProps = ({ color }) => ({
    color
})

export default connect(mapStateToProps, {
})(Delivery)

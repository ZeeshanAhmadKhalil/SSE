import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Products from './ProductStack/Products';
import SearchedProducts from './ProductStack/SearchedProducts';





const Stack = createStackNavigator()

function ProductStack(props) {
    const { textOffColor,
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
        loader,
    } = props.shared
    const {
        userData
    } = props.user
    const {
    } = props

    useEffect(() => {
    }, [])
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Products" //todo: change to Products
            mode="modal"
        >
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="SearchedProducts" component={SearchedProducts} />
        </Stack.Navigator>
    )
}

const mapStateToProps = ({ color, shared, user }) => ({
    color, shared, user
})

export default connect(mapStateToProps, {
})(ProductStack)

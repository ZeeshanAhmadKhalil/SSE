import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Switch, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import {
    ExchangeProducts,
} from '../../Store/Actions/productActions'

function ExchangeProduct(props) {
    let input1

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
    } = props.product
    const {
        ExchangeProducts
    } = props

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const [isPaymentByHand, ChangeIsPaymentByHand] = useState(false)

    useEffect(() => {
    }, [])

    return (
        <View style={{ borderColor: 'red', borderWidth: 0, paddingHorizontal: 15 }}>
            <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Exchange Products</Text>
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
                                error={errors.deliveryAddress}
                                onBlur={onBlur}
                                onSubmitEditing={() => { }}
                                blurOnSubmit={true}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                        underlineColor: modalColor, background: backgroundColor
                                    }
                                }}
                                selectionColor={textColor}
                                underlineColor={textColor}
                                label="Delivery Address"
                                style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                ref={(input) => { input1 = input; }}
                                returnKeyType='next'
                            />
                        )}
                        name="deliveryAddress"
                        defaultValue=""
                    />
                </View>
            </TouchableOpacity>
            <View style={{ width: '100%', height: 30, borderColor: 'red', borderWidth: 0, marginTop: 10, height: 45, flexDirection: "row" }}>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={{ color: modalBorderColor, fontSize: 16, fontWeight: "bold", marginLeft: 3 }}>Payment By Hand</Text>
                </View>
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-end" }}>
                    <Switch
                        value={isPaymentByHand}
                        onValueChange={() => ChangeIsPaymentByHand(!isPaymentByHand)}
                        color={mainLighterColor}
                    />
                </View>
            </View>
            <Button
                title="submit"
                onPress={handleSubmit((data) => {
                    props.ExchangeProducts(data, isPaymentByHand, props.navigate)
                })}
                mode="contained"
                style={{
                    backgroundColor: mainLighterColor,
                    width: 150,
                    alignSelf: "flex-start",
                    marginTop: 20,
                }}
            >
                <Text style={{ color: textColor }}>Exchange</Text>
            </Button>
            <View style={{ zIndex: 1, height: 200, width: '100%', borderColor: 'red', borderWidth: 0, }} pointerEvents="auto"></View>
        </View>
    )
}

const mapStateToProps = ({ color, product }) => ({
    color, product
})

export default connect(mapStateToProps, {
    ExchangeProducts,
})(ExchangeProduct)

import React, { useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import {
    DepositRequest,
} from '../../Store/Actions/walletActions'




function MakeDepositRequest(props) {
    let input1
    let input2
    let input3
    let input4

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
        DepositRequest,
    } = props

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
    }, [])

    return (
        <View style={{ borderColor: 'red', borderWidth: 0, paddingHorizontal: 15 }}>
            <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Make a Deposit Request</Text>
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
                                error={errors.bankName}
                                onBlur={onBlur}
                                onSubmitEditing={() => input2.focus()}
                                blurOnSubmit={false}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                        underlineColor: modalColor, background: backgroundColor
                                    }
                                }}
                                selectionColor={textColor}
                                underlineColor={textColor}
                                label="Bank Name"
                                style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                ref={(input) => { input1 = input; }}
                                returnKeyType='next'
                            />
                        )}
                        name="bankName"
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
                                error={errors.accountNumber}
                                onBlur={onBlur}
                                onSubmitEditing={() => input3.focus()}
                                blurOnSubmit={false}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                        underlineColor: modalColor, background: backgroundColor
                                    }
                                }}
                                selectionColor={textColor}
                                underlineColor={textColor}
                                label="Account Number"
                                style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                ref={(input) => { input2 = input; }}
                                returnKeyType='next'
                                keyboardType="number-pad"
                            />
                        )}
                        name="accountNumber"
                        defaultValue=""
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => input3.focus()}>
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
                                error={errors.accountTitle}
                                onBlur={onBlur}
                                onSubmitEditing={() => input4.focus()}
                                blurOnSubmit={false}
                                mode="outlined"
                                theme={{
                                    colors: {
                                        placeholder: modalBorderColor, text: textColor, primary: textOffColor,
                                        underlineColor: modalColor, background: backgroundColor
                                    }
                                }}
                                selectionColor={textColor}
                                underlineColor={textColor}
                                label="Account Title"
                                style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                ref={(input) => { input3 = input; }}
                                returnKeyType='next'
                            />
                        )}
                        name="accountTitle"
                        defaultValue=""
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => input4.focus()}>
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
                                error={errors.amount}
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
                                label="Amount"
                                style={{ marginTop: 20, height: 45, fontSize: 14 }}
                                ref={(input) => { input4 = input; }}
                                returnKeyType='done'
                                keyboardType="number-pad"
                            />
                        )}
                        name="amount"
                        defaultValue=""
                    />
                </View>
            </TouchableOpacity>
            <Button
                title="submit"
                onPress={handleSubmit((data) => {
                    reset({
                        bankName: "",
                        accountNumber: "",
                        accountTitle: "",
                        amount: "",
                    })
                    DepositRequest(data)
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
        </View>
    )
}

const mapStateToProps = ({ color, product }) => ({
    color, product
})

export default connect(mapStateToProps, {
    DepositRequest,
})(MakeDepositRequest)

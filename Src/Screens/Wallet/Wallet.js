import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';



function Wallet(props) {
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
        transactions,
        balance,
    } = props.wallet
    const {
        userData
    } = props.user
    const {
        navigate
    } = props
    function RenderTransactions() {
        return transactions.map((item, key) => {
            const { downAmount, performedOn, transactionType, upAmount, user, } = item
            return (
                <View key={key}>
                    <View style={{ height: 60, width: '100%', borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                        <View style={{ width: 60, height: '100%', borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center" }}>
                            {transactionType.transactionType == "Buy" &&
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 40,
                                        backgroundColor: dangerColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FontAwesome5 name="shopping-cart" size={23} color={textColor} />
                                </View>
                            }
                            {transactionType.transactionType == "Sell" &&
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 40,
                                        backgroundColor: successLightColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FontAwesome5 name="shopping-cart" size={23} color={textColor} />
                                </View>
                            }
                            {transactionType.transactionType == "Deposit" &&
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 40,
                                        backgroundColor: successLightColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FontAwesome5 name="plus" size={23} color={textColor} />
                                </View>
                            }
                            {transactionType.transactionType == "Exchange" &&
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 40,
                                        backgroundColor: warningColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FontAwesome5 name="exchange-alt" size={23} color={textColor} />
                                </View>
                            }
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center" }}>
                            {transactionType.transactionType == "Buy" &&
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Buying</Text>
                            }
                            {transactionType.transactionType == "Sell" &&
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Selling</Text>
                            }
                            {transactionType.transactionType == "Deposit" &&
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Deposited</Text>
                            }
                            {transactionType.transactionType == "Exchange" &&
                                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>Exchange</Text>
                            }
                            <Text numberOfLines={1} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal" }}>{moment(performedOn).format("Do, MMM YYYY")}</Text>
                        </View>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-end", paddingRight: 10 }}>
                            <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold" }}>{upAmount != 0 ? upAmount : downAmount}</Text>
                            {upAmount != 0 ?
                                <AntDesign name="arrowup" size={15} color={successLightColor} />
                                :
                                <AntDesign name="arrowdown" size={15} color={dangerColor} />
                            }
                        </View>
                    </View>
                    <Divider
                        style={{ borderColor: modalBorderColor, borderWidth: 0.5, }}
                    />
                </View>
            )
        })
    }
    return (
        <>
            {/* <View style={{ height: 20, borderColor: 'red', borderWidth: 0, backgroundColor: mainColor, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: 5, width: 40, backgroundColor: textColor, borderRadius: 10 }}></View>
                </View> */}
            <View
                style={{
                    height: 70,
                    width: '100%',
                    borderColor: 'red', borderWidth: 0,
                    flexDirection: 'row',
                }}
            >
                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity
                        onPress={() => navigate("DepositRequests")}
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            backgroundColor: mainColor,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                        }}
                    >
                        <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold" }}>DEPOSITS</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "flex-start" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                        <Text style={{ color: textColor, fontSize: 30, fontWeight: "bold" }}>{`${balance} PKR`}</Text>
                        <Text style={{ color: textOffColor, fontSize: 14, fontWeight: "normal" }}>{userData?.userModel?.fullName}'s Account</Text>
                    </View>
                </View>
            </View>
            <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>Transactions</Text>
            <Divider
                style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginTop: 10 }}
            />
            {transactions.length != 0 ?
                RenderTransactions()
                :
                <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                    <Text style={{ color: textOffColor, fontSize: 18 }}>No transactions found!</Text>
                </View>
            }
        </>
    )
}

const mapStateToProps = ({ color, wallet, user }) => ({
    color, wallet, user
})

export default connect(mapStateToProps, {
})(Wallet)

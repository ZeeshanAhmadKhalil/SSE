import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Divider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { SwipeablePanel } from 'rn-swipeable-panel';
import {
    GetDepositRequests,
} from '../../Store/Actions/walletActions';
import {
    ChangeShowDepositRequestPannel,
} from '../../Store/Actions/sharedActions';
import MakeDepositRequest from './MakeDepositRequest';
import { Avatar } from 'react-native-elements';

function DepositRequests(props) {
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
        depositRequests,
    } = props.wallet
    const {
        showDepositRequestPannel,
    } = props.shared
    const {
        userData
    } = props.user
    const {
        ChangeShowDepositRequestPannel,
        GetDepositRequests,
    } = props

    const [adminAccountInfoModal, setAdminAccountInfoModal] = useState(false)

    const RenderDepositRequests = ({ item, index }) => {
        const { accountNumber, accountTitle, amount, bankName, depositRequestStatus, createdOn } = item
        return (
            <View style={{
                borderColor: 'red',
                borderWidth: 0,
                borderRadius: 15,
                marginHorizontal: 15,
                paddingHorizontal: 15,
                paddingVertical: 20,
                marginTop: 20,
                backgroundColor: modalColor,
            }}>
                <View style={{ flexDirection: 'row', borderColor: 'red', borderWidth: 0, marginBottom: 15, }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <Text style={{ color: textOffColor, fontSize: 14 }}>Bank Name</Text>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{bankName}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <Text style={{ color: textOffColor, fontSize: 14 }}>Account Title</Text>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{accountTitle}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: 'flex-end' }}>
                        <Text style={{ color: textOffColor, fontSize: 14 }}>Staus</Text>
                        {depositRequestStatus.depositRequestStatus == "Pending" &&
                            <Text style={{ color: warningColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{depositRequestStatus.depositRequestStatus}</Text>
                        }
                        {depositRequestStatus.depositRequestStatus == "Rejected" &&
                            <Text style={{ color: dangerColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{depositRequestStatus.depositRequestStatus}</Text>
                        }
                        {depositRequestStatus.depositRequestStatus == "Accepted" &&
                            <Text style={{ color: successColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>{depositRequestStatus.depositRequestStatus}</Text>
                        }
                    </View>
                </View>
                <Divider style={{ borderColor: modalBorderColor, borderWidth: 0.5, }} />
                <View style={{ flexDirection: 'row', borderColor: 'red', borderWidth: 0, marginTop: 15, }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "500" }}>{`${amount} PKR`}</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: 'flex-end' }}>
                        <Text style={{ color: textColor, fontSize: 14, fontWeight: "500" }}>{moment(createdOn).format("Do, MMM YYYY")}</Text>
                    </View>
                </View>
            </View>
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>No deposit requests made!</Text>
            </View>
        )
    }
    function RenderListHeaderComponent() {
        return (
            <View>
                <View style={{ backgroundColor: mainColor, width: '100%', height: getStatusBarHeight() }}>
                </View>
                <View style={{
                    width: '100%', height: 50, backgroundColor: mainColor, flexDirection: "row",
                    borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                }}>
                    <View style={{ flex: 4, borderColor: 'red', borderWidth: 0, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.goBack()
                            }}
                        >
                            <Ionicons name="arrow-back" size={25} color={headerIconColor} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>Deposit Requests</Text>
                    </View>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row-reverse", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => ChangeShowDepositRequestPannel(true)} style={{ marginRight: 10 }}>
                            <AntDesign name="plus" size={30} color={textColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAdminAccountInfoModal(true)} style={{ marginRight: 10 }}>
                            <AntDesign name="eye" size={30} color={textColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    function RenderListFooterComponent() {
        return (
            <View style={{ height: 20 }}>
            </View>
        )
    }
    useEffect(() => {
        GetDepositRequests()
    }, [])
    return (
        <>
            <StatusBar translucent hidden={false} backgroundColor={'transparent'} />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => GetDepositRequests()}
                    />
                }
                data={depositRequests}
                renderItem={RenderDepositRequests}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={RenderListHeaderComponent()}
                ListFooterComponent={RenderListFooterComponent()}
                ListEmptyComponent={RenderEmptyListComponent()}
                stickyHeaderIndices={[0]}
            />
            <Modal
                visible={adminAccountInfoModal}
                transparent={true}
                onRequestClose={() => {
                    console.log("CLOSE")
                    setAdminAccountInfoModal(false)
                }}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center", paddingLeft: '3%', paddingRight: '3%', alignItems: 'center' }}>
                    <View
                        style={{
                            minHeight: 220,
                            minWidth: 320,
                            paddingVertical: 20,
                            backgroundColor: modalColor,
                            borderRadius: 15,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                            {"Account Details"}
                        </Text>
                        <Avatar
                            rounded
                            source={require('../../Assets/Images/icon.png')}
                            title={"I"}
                            size="large"
                            containerStyle={{
                                backgroundColor: "silver",
                                borderColor: headerIconColor,
                                borderWidth: 1,
                            }}
                            onPress={() => {
                            }}
                        />
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>
                            {"Account  "}
                            <Text style={{ color: textOffColor, fontSize: 10, fontWeight: 'normal' }}> (Account Title)</Text>
                        </Text>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>
                            {"4537496784636585  "}
                            <Text style={{ color: textOffColor, fontSize: 10, fontWeight: 'normal' }}> (Account Number)</Text>
                        </Text>
                        <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 6 }}>
                            {"HBL  "}
                            <Text style={{ color: textOffColor, fontSize: 10, fontWeight: 'normal' }}> (Bank Name)</Text>
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("CLOSE")
                                setAdminAccountInfoModal(false)
                            }}
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
            <SwipeablePanel
                isActive={showDepositRequestPannel}
                onlyLarge={true}
                showCloseButton={true}
                onClose={() => {
                    ChangeShowDepositRequestPannel(false)
                }}
                noBackgroundOpacity={true}
                // allowTouchOutside={true}
                closeOnTouchOutside={true}
                fullWidth={true}
                closeIconStyle={{
                    backgroundColor: textColor
                }}
                closeRootStyle={{
                    backgroundColor: modalBorderColor,
                    marginTop: -10,
                }}
                barStyle={{
                    backgroundColor: textColor,
                }}
                noBar={false}
                style={{
                    backgroundColor: modalColor,
                    height: '60%'
                }}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                <MakeDepositRequest
                    navigation={props.navigation}
                />
            </SwipeablePanel>
        </>
    )
}

const mapStateToProps = ({ color, product, user, wallet, shared }) => ({
    color, product, user, wallet, shared
})

export default connect(mapStateToProps, {
    ChangeShowDepositRequestPannel,
    GetDepositRequests,
})(DepositRequests)

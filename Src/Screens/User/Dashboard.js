import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView } from 'react-native'
import { Grid, BarChart as SVGBarChart, StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts'

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import CustomHeader from '../Shared/CustomHeader'
import { Dimensions } from 'react-native'
import { ContributionGraph, LineChart } from 'react-native-chart-kit'
import { Divider } from 'react-native-paper'
import BuyingReportDonutChart from './Dashboard/BuyingReportDonutChart'
import PostingReportDonutChart from './Dashboard/PostingReportDonutChart'

const screenWidth = Dimensions.get("window").width;

function Dashboard(props) {
    const {
        warningColor,
        dangerColor,
        successLightColor,
        successColor,
        modalBorderColor,
        modalColor,
        textColor,
        textOffColor,
        backgroundColor,
        backgroundDarkerColor,
        mainDarkerColor,
        mainLighterColor,
        mainlightColorRGB,
        mainColor,
        chartYellowColor,
        chartBlueColor,
        chartGreenColor,
        chartRedColor,
    } = props.color
    const depositSpendingAndEarningData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => chartBlueColor, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [46, 28, 36, 69, 75, 99],
                color: (opacity = 1) => chartRedColor, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [13, 55, 69, 45, 15, 85],
                color: (opacity = 1) => chartGreenColor, // optional
                strokeWidth: 2 // optional
            },
        ],
        legend: ["Deposits", "Spending", "Earning"] // optional
    };
    const exchangeData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [200, 450, 280, 800, 990, 430, 690],
                color: (opacity = 1) => chartYellowColor, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [50, 290, 200, 500, 440, 130, 400],
                color: (opacity = 1) => chartGreenColor + "00", // optional
                strokeWidth: 2 // optional
            },
            {
                data: [150, 160, 80, 300, 500, 300, 290],
                color: (opacity = 1) => chartRedColor + "00", // optional
                strokeWidth: 2 // optional
            },
        ],
        // legend: ["Amount", "Profit", "Loss"] // optional
    };
    const Loss = [50, 290, 200, 500, 440, 130, 400]
        .map((value) => ({ value }))
    const Profit = [150, 160, 80, 300, 500, 300, 290]
        .map((value) => ({ value }))
    const dummySpaces = [0, 0, 0, 0, 0, 0, 1400,]
        .map((value) => ({ value }))
    const exchangeBarData = [
        {
            name: "Profit",
            data: Profit,
            svg: {
                fill: chartGreenColor,
            },
        },
        {
            name: "Loss",
            data: Loss,
            svg: {
                fill: chartRedColor,
            },
        },
        {
            name: "",
            data: dummySpaces,
            svg: {
                fill: 'transparent',
            },
        },
    ]
    const activityData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-27", count: 4 },
        { date: "2017-03-28", count: 2 },
        { date: "2017-03-29", count: 4 },
        { date: "2017-03-30", count: 6 },
    ];
    const chartConfig = {
        backgroundGradientFrom: backgroundColor,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: backgroundColor,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(${mainlightColorRGB}, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <>
            <CustomHeader
                navigation={props.navigation}
                currentPage="Dashboard"
                onBack={() => props.navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ borderColor: 'red', borderWidth: 0, paddingHorizontal: 0 }}>
                <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Your Exchange Report</Text>
                <View style={{ flexDirection: "row", marginLeft: '10%', height: 35, borderColor: 'red', borderWidth: 0, alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: chartYellowColor, marginLeft: 10 }}></View>
                    <Text style={{ color: mainColor, fontSize: 14, fontWeight: 'normal', marginLeft: 10 }}>Amount</Text>
                    <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: chartGreenColor, marginLeft: 10 }}></View>
                    <Text style={{ color: mainColor, fontSize: 14, fontWeight: 'normal', marginLeft: 10 }}>Profit</Text>
                    <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: chartRedColor, marginLeft: 10 }}></View>
                    <Text style={{ color: mainColor, fontSize: 14, fontWeight: 'normal', marginLeft: 10 }}>Loss</Text>
                </View>
                <View>
                    <LineChart
                        data={exchangeData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        style={{ borderColor: 'red', borderWidth: 0, zIndex: 10 }}
                    />
                    <View style={{ marginLeft: 10, borderColor: 'red', borderWidth: 0, marginLeft: '12%', position: 'absolute', zIndex: 11 }}>
                        <SVGBarChart
                            style={{ height: 182 }}
                            data={exchangeBarData}
                            yAccessor={({ item }) => item.value}
                            contentInset={{ left: 10, right: 10 }}
                            animate={false}
                            {...props}
                        >
                        </SVGBarChart>
                    </View>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
                <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Your Postings Report</Text>
                <PostingReportDonutChart />
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />

                <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Deposits, Spending & Earning Report</Text>
                <LineChart
                    data={depositSpendingAndEarningData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
                <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10 }}>Your Buying Report</Text>
                <BuyingReportDonutChart />
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
                <Text style={{ color: textColor, fontSize: 18, fontWeight: "bold", marginVertical: 10, marginLeft: 10, marginBottom: 0 }}>Your Activity Report</Text>
                <ContributionGraph
                    values={activityData}
                    endDate={new Date("2017-04-01")}
                    numDays={100}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    gutterSize={1}
                    squareSize={20}
                    style={{ borderColor: 'red', borderWidth: 0 }}
                />
                <View style={{ width: '100%', height: 20, borderColor: 'red', borderWidth: 0, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ color: textOffColor, fontSize: 12, marginLeft: 5 }}>Less</Text>
                    <View style={{ width: 15, height: 15, backgroundColor: modalColor, marginLeft: 5 }}></View>
                    <View style={{ width: 15, height: 15, backgroundColor: mainDarkerColor, marginLeft: 5 }}></View>
                    <View style={{ width: 15, height: 15, backgroundColor: mainColor, marginLeft: 5 }}></View>
                    <View style={{ width: 15, height: 15, backgroundColor: mainLighterColor, marginLeft: 5 }}></View>
                    <Text style={{ color: textOffColor, fontSize: 12, marginLeft: 5 }}>More</Text>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </ScrollView>
        </>
    )
}

const mapStateToProps = ({ color }) => ({
    color
})

export default connect(mapStateToProps, {
})(Dashboard)

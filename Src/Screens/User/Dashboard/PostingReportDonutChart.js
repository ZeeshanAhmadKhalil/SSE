import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text as SimpleText, View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, ProgressBarAndroidComponent, Modal, TextInput } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line, Text, Svg } from 'react-native-svg'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'

class PostingReportDonutChart extends Component {
    constructor(props) {
        super(props)
    }
    RenderCategorieLabels = (data) => {
        return data.map((item, key) => {
            const { amount, categoryName, svg, } = item
            const { fill } = svg
            return (
                <View key={key} style={{ borderWidth: 0, borderColor: 'red', marginHorizontal: 5, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: 10, width: 20, backgroundColor: fill }}></View>
                    <SimpleText style={{ marginLeft: 10, color: this.props.color.textColor }}>
                        {categoryName}
                    </SimpleText>
                </View>
            )
        })
    }
    render() {
        const {
            mainColor,
            mainLighterColor,
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
            chartYellowColor,
            chartBlueColor,
            chartGreenColor,
            chartRedColor,
            graphsBackgroundOpacity,
            tilesBackgroundOpacity,
            chartsDividerColor,
        } = this.props.color
        const data = [
            {
                key: 1,
                amount: 69,
                categoryName: "For Selling",
                svg: { fill: chartRedColor }
            },
            {
                key: 2,
                amount: 44,
                categoryName: "For Exchanging",
                svg: { fill: chartYellowColor }
            },
        ]
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }
        return (
            <>
                <PieChart
                    style={{ height: 300 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={'95%'}
                >
                    <Labels />
                </PieChart>
                <View style={{ borderWidth: 0, borderColor: 'red', marginHorizontal: 10, marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
                    {this.RenderCategorieLabels(data)}
                </View>
            </>
        )
    }
}

const mapStateToProps = ({ color, }) => ({
    color,
})

export default connect(mapStateToProps, {
})(PostingReportDonutChart)
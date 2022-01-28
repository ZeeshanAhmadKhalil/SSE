import {
} from '../Actions/types'

const initialState = {
    mainColor: "#264072",
    mainLighterColor: "#3B5380",
    mainlightColorRGB: "59,83,128",
    mainDarkerColor: "#1A2C4F",
    backgroundDarkerColor: "#000",
    backgroundColor: "#141414",
    textLightColor: "#e0e0e0",
    textColor: "#e0e0e0",
    textOffLightColor: "silver",
    textOffColor: "silver",
    modalColor: "#2e2e2e",
    modalBorderColor: "#616161",
    successColor: "#2B7638",
    successLightColor: "#239b37",
    dangerColor: "#B53326",
    warningColor: "#C78E24",
    headerIconColor: "#fff",
    headerTextColor: '#e0e0e0',
    chartGreenColor: "#6BD098",
    chartBlueColor: "#51CBD7",
    chartYellowColor: "#FBC658",
    chartRedColor: "#EF8156",
    graphsBackgroundOpacity: 0.5,
    tilesBackgroundOpacity: "77",
    chartsDividerColor: '#000',
}

export default (state = initialState, { type, payload }) => {
    // console.log('TYPE::')
    // console.log(type)
    // console.log('PAYLOAD::')
    // console.log(payload)
    switch (type) {
        default:
            return state;
    }
}
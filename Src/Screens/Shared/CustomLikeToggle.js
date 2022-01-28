import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from 'react-redux';
import {
    LikeProduct,
    AddLikeProduct,
} from '../../Store/Actions/productActions';

function CustomLikeToggle(props) {
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
        chartYellowColor,
        chartBlueColor,
        chartGreenColor,
        chartRedColor,
    } = props.color
    const {
    } = props.product
    const {
    } = props.user
    const {
        likeProducts
    } = props.shared
    const {
        LikeProduct,
        productId,
        isLiked,
        AddLikeProduct,
    } = props

    const [isLikedLocal, ChangeIsLikedLocal] = useState(false)

    useEffect(() => {
        if (likeProducts.includes(productId))
            ChangeIsLikedLocal(true)
        else
            ChangeIsLikedLocal(false)
    }, [likeProducts])
    useEffect(() => {
        if (isLiked) {
            ChangeIsLikedLocal(true)
            if (!likeProducts.includes(productId))
                AddLikeProduct(productId)
        }
    }, [])
    return (
        <TouchableOpacity
            onPress={() => {
                ChangeIsLikedLocal(!isLikedLocal)
                LikeProduct(productId)
            }}
        >
            {isLikedLocal ?
                <AntDesign name="heart" size={props.size ? props.size : 20} color={textOffColor} style={props.noStyle ? {} : { marginLeft: 10, marginRight: 5 }} />
                :
                <AntDesign name="hearto" size={props.size ? props.size : 20} color={textOffColor} style={props.noStyle ? {} : { marginLeft: 10, marginRight: 5 }} />
            }
        </TouchableOpacity>
    )
}

const mapStateToProps = ({ color, product, user, shared }) => ({
    color, product, user, shared
})

export default connect(mapStateToProps, {
    LikeProduct,
    AddLikeProduct,
})(CustomLikeToggle)

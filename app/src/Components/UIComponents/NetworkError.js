import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import networkErrorImage from '../../../assets/images/Components/NetworkError.png'
import { MyAppConstants } from '../../util/config'
export default function NetworkError() {
    return (
        <View style={styles.container}>
            <Image source={networkErrorImage} style={{ width: "100%", height: 300, resizeMode: "contain" }} />
            <Text style={{ fontSize: 28, color: "#8F8F8F", fontFamily: "SfProSemiBold",marginTop:10 }}>Whoops!</Text>
            <Text style={{ fontSize: 12, color: "#8F8F8F", fontFamily: "SfProRegular", textAlign: "center",marginTop:10 }}>No internet connection.You need to be connected to the internet to submit feedback.</Text>
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={{ ...styles.loginBtn, borderColor: MyAppConstants.PRIMARY_COLOR, borderWidth: 1, backgroundColor:  MyAppConstants.PRIMARY_COLOR  }}>
                    <Text style={{ ...styles.btnText, color:  '#fff'  }}>Try Again</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        paddingHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    loginBtn: {
        width: "100%",
        height: 48,
        marginTop: 30,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 4,

    },
    btnText: {
        fontSize: 20,
    },
})

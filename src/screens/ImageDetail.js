import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../colors/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ImageDetail = ({navigation,route}) => {
    const {url,title} = route.params.image;
  return (
    <ImageBackground
        source={{uri:url}}
        style={{width: '100%', height: '100%',flex:1}}
    >
        <View style={{paddingVertical:'7%',paddingHorizontal:'5%'}}>
            <Icon name="chevron-left" size={40} color={colors.white} onPress={()=>navigation.goBack()} />
        </View>
        <View style={{height:'75%',justifyContent:'flex-end'}}>
            <View style={{width:'80%',alignSelf:"center"}}>
                <Text style={{color:colors.white,fontSize:RFPercentage(3)}}>{title}</Text>
            </View>
        </View>
    </ImageBackground>
  )
}

export default ImageDetail
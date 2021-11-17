import React from 'react'
import { Image, View } from 'react-native';
import { Avatar, Divider, Paragraph, Text, Title, TouchableRipple } from 'react-native-paper'

const Main = ({navigation}) => {

    const imageUrl = '../img/logo.png';

    return (
            <TouchableRipple
                onPress={() => navigation.push('Home')}
                rippleColor="rgba(0, 0, 0, .32)"
                style={{ flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0)' }}
            >
                <>
                    <Image source={require('../img/logo.png')} style={{ width: 300, height: 300 }} />
                    <Paragraph style={{textAlign:'center' }} margin={20}>Toque na tela para entrar...</Paragraph>
                </>
            </TouchableRipple>
    )
}

export default Main

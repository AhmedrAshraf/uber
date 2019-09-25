import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default CurLocationButton = function (props) {
    
    const cb = props.cb ? props.cb : console.log('callback function not passed to currentLocation');
    const bottom = props.bottom ? props.bottom:  65;

    return (
        <View style={[styles.container, { top: HEIGHT-bottom }]}>
            <MaterialIcons name='my-location'
                color='#000000' size={25} onPress={() => { cb() }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        left: WIDTH - 70,
        borderRadius: 50,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Title from '../components/title';


const Home = ({navigation}) => {
    return(
        <View style={styles.wrapper}>
            <Title/>
            <View style={styles.bannerWrapper}>
                <Image style={styles.banner} resizeMode="contain" source={require('../resources/homescreen.png')}></Image>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Home;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 40,
        paddingTop: 20,
        height: '100%',
    },
    bannerWrapper: {
        flex: 1,
    },
    banner: {
        width: 300,
        height: 300,
    },
    button: {
        width: '100%',
        backgroundColor: "#1A759F",
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 70
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});

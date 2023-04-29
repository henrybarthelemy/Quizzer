import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import Title from '../components/title';

const Result = ({route, navigation}) => {
    const {numCorrect, total} = route.params;
    return(
        <View style={styles.wrapper}>
            <View>
                <Text style={styles.headerText}>Results</Text>
            </View>
            <View style={styles.bannerWrapper}>
                <Image style={styles.banner} resizeMode="contain" source={require('../resources/homescreen.png')}></Image>
            </View>
            <View style={styles.statsWrapper}>
                <Text style={styles.statsTitleText}>Amount correct: </Text>
                <Text style={styles.statsText}>{numCorrect} out of {total}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Result;

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    bannerWrapper: {
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    banner: {
        width: 300,
        height: 300,
    },
    button: {
        backgroundColor: "#1A759F",
        padding: 12,
        paddingHorizontal: 25,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 70
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    statsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
    },
    statsTitleText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    statsText: {
        fontSize: 15,
        fontWeight: 300,
    },
});

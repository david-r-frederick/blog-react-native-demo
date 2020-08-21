import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const appColor = '#773344';
const accentColor = '#F5E9E2';

const showScreen = ({ navigation }) => {
    const { state } = useContext(BlogContext);
    const blogPost = state.find((p) => p.id === navigation.getParam('id'));

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{blogPost.title}</Text>
            <Text style={styles.content}>{blogPost.content}</Text>
        </View>
    );
};

showScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
                <FontAwesome name="pencil" style={styles.editBtn}/>
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: appColor,
        height: '100%'
    },
    editBtn: {
        marginRight: 14,
        fontSize: 30,
        color: appColor
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 19,
        marginVertical: 10,
        color: accentColor,
        maxWidth: '90%',
        borderBottomWidth: 2,
        borderColor: accentColor,
        paddingBottom: 2
    },
    content: {
        fontSize: 18,
        marginHorizontal: 14,
        padding: 5,
        minHeight: '85%',
        color: accentColor
    }
});

export default showScreen;
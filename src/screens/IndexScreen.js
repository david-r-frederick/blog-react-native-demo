import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const appColor = '#773344';
const accentColor = '#F5E9E2';

const indexScreen = ({ navigation }) => {
    const { state, changePosts, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        //only invoked if we ever eliminate IndexScreen
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View style={styles.screen}>
            {state.length > 0 ? null : (
                <TouchableOpacity
                    style={{
                        height: 60,
                        marginTop: '30%',
                        marginHorizontal: 18,
                    }}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Create')}
                >
                    <Text style={styles.missingContentText}>
                        Click the + above to add a post!
                    </Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.id.toString()}
                renderItem={({ item }) => {
                    let title =
                        item.title.length > 25
                            ? item.title.substring(0, 25) + '...'
                            : item.title;
                    return (
                        <View>
                            <TouchableOpacity
                                style={styles.row}
                                activeOpacity={0.7}
                                onPress={() =>
                                    navigation.navigate('Show', { id: item.id })
                                }
                            >
                                <Text style={styles.title}>{title}</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={(ev) => {
                                        changePosts(
                                            'Delete_Post',
                                            null,
                                            null,
                                            item.id
                                        );
                                    }}
                                >
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

indexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" style={styles.createBtn} />
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: appColor,
        height: '100%',
    },
    icon: {
        fontSize: 24,
        color: appColor,
    },
    row: {
        fontSize: 20,
        marginHorizontal: 17,
        marginTop: 14,
        padding: 15,
        color: appColor,
        borderWidth: 1,
        borderColor: accentColor,
        borderRadius: 10,
        backgroundColor: accentColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: appColor,
        fontWeight: 'bold',
    },
    createBtn: {
        fontSize: 30,
        marginRight: 10,
    },
    missingContentText: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 15,
        color: appColor,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: accentColor,
        borderRadius: 10,
        backgroundColor: accentColor,
    },
});

export default indexScreen;

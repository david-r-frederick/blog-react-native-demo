import React, { useContext, useState } from 'react';
import { Context as BlogContext } from '../context/BlogContext';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const appColor = '#773344';
const accentColor = '#F5E9E2';

const BlogPostForm = ({ onSubmitFn, initialValues, labels }) => {
    const { state, changePosts } = useContext(BlogContext);
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={styles.page}>
            <Text style={styles.header}>{labels.titleText}</Text>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.header}>{labels.inputText}</Text>
            <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => onSubmitFn(title, content)}
            >
                <Text style={styles.submitTxt}>{labels.submitText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 14,
        backgroundColor: appColor,
        height: '100%'
    },
    header: {
        fontSize: 20,
        marginTop: 12,
        marginBottom: 8,
        color: 'white'
    },
    titleInput: {
        fontSize: 18,
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: accentColor,
        borderRadius: 3,
        borderColor: accentColor
    },
    contentInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: accentColor,
        height: 300,
        textAlignVertical: 'top',
        paddingLeft: 5,
        backgroundColor: accentColor,
        borderRadius: 3,
    },
    submitBtn: {
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 5,
    },
    submitTxt: {
        fontSize: 20,
        color: accentColor,
        alignSelf: 'center',
        padding: 10,
        fontWeight: 'bold'
    },
});

export default BlogPostForm;

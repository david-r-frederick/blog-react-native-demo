import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const editScreen = ({ navigation }) => {
    const { state, changePosts } = useContext(BlogContext);
    const currentPost = state.find((el) => el.id === navigation.getParam('id'));

    return (
        <BlogPostForm
            onSubmitFn={(title, content) => {
                changePosts('Edit_Post', title, content, navigation.getParam('id'), () => navigation.pop());
            }}
            initialValues={{
                title: currentPost.title,
                content: currentPost.content,
            }}
            labels={{
                titleText: 'Edit Title',
                inputText: 'Edit Content',
                submitText: ' CONFIRM',
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default editScreen;

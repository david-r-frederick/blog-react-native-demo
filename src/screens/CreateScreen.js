import React, { useContext } from 'react';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
    const { changePosts } = useContext(BlogContext);
    return <BlogPostForm 
                onSubmitFn={(title, content) => {
                    changePosts('Add_Post', title, content, null, () =>
                    navigation.navigate('Index')
                );
                }}
                initialValues={{
                    title: '',
                    content: ''
                }}
                labels={{
                    titleText: "New Title",
                    inputText: "New Content",
                    submitText: "SAVE"
                }}
            />
};

export default CreateScreen;

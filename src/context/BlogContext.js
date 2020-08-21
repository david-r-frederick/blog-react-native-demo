import CreateDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'Delete_Post':
            return state.filter((el) => el.id !== action.payload.id);
        case 'Edit_Post':
            return state.map((el, index) => {
                return el.id === action.payload.id ? action.payload : el;
            });
        case 'get_blogPosts':
            return action.payload;
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogPosts', payload: response.data });
    };
};

const changePosts = (dispatch) => {
    return (type, title = null, content = null, id = null, callback = null) => {
        switch (type) {
            case 'Add_Post':
                jsonServer
                    .post('/blogposts', { title, content })
                    .catch((err) => console.log(err));
                break;
            case 'Delete_Post':
                jsonServer
                    .delete(`/blogposts/${id}`)
                    .catch((err) => console.log(err));
                dispatch({ type, payload: { id } });
                break;
            case 'Edit_Post':
                jsonServer
                    .put(`blogposts/${id}`, { title, content })
                    .catch((err) => console.log(err));
                dispatch({ type: type, payload: { title, content, id } });
                break;
        }
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = CreateDataContext(
    blogReducer,
    { changePosts, getBlogPosts },
    []
);

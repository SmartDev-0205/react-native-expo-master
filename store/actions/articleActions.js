import * as actionTypes from './actionTypes';
import { AsyncStorage } from 'react-native';

const options = async (data) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const getAllArticles = () => {
    return dispatch => {
        fetch(config.apiServer + '/api/articles')
        .then(res => res.json())
        .then(res => {
            AsyncStorage.setItem('BasicMERNStackAppAllArticles', JSON.stringify(res.articles));
            dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: res.articles })
        })
    };
};

export const getMyArticles = () => {
    return async dispatch => {
        fetch(config.apiServer + '/api/articles/myarticles', {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem(),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            AsyncStorage.setItem('BasicMERNStackAppMyArticles', JSON.stringify(res.articles));
            dispatch({ type: actionTypes.GOT_MY_ARTICLES, myArticles: res.articles })
        })
    };
};

export const getArticle = (articleId) => {
    return dispatch => {
        fetch(config.apiServer + '/api/articles/' + articleId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_ARTICLE, article: res.article })
        })
    };
};

export const submitNewArticle = (articleData) => {
    return dispatch => {
        return fetch(config.apiServer + '/api/articles/add', options(articleData))
        .then(res => res.json())
    }
};

export const saveArticle = (articleId, articleData) => {
    return dispatch => {
        return fetch(config.apiServer + '/api/articles/edit/' + articleId, options(articleData))
        .then(res => res.json())
    }
}

export const deleteArticle = (articleId) => {
    return async dispatch => {
        return fetch(config.apiServer + '/api/articles/delete/' + articleId, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'delete'
        })
        .then(res => res.json())
    };
}

import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { act } from '@testing-library/react';

const BASEURL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
const ACTIONS = {
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_DATA: 'GET_DATA',
    ERROR: 'ERROR',
    UPDATE_HAS_NEXT_PAGE: 'UPDATE_HAS_NEXT_PAGE'
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {
                loading: true,
                jobs: []
            };
        case ACTIONS.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs
            };

        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            };
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.payload.hasNextPage
            };
        default:
            return state;
    }
};


const FetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer, {
        jobs: [],
        loading: true,
    });

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASEURL, {
            cancelToken: cancelToken1.token,
            params: { makedown: true, page: page, ...params }
        }).then(res => {
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: { jobs: res.data }
            })
        }).catch(err => {
            if (axios.isCancel(err)) return;
            dispatch({
                type: ACTIONS.ERROR,
                payload: { error: err }
            })
        })

        //handle pagination
        const cancelToken2 = axios.CancelToken.source();
        axios.get(BASEURL, {
            cancelToken: cancelToken2.token,
            params: { makedown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({
                type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
                payload: { hasNextPage: res.data.length !== 0 }
            })
        }).catch(err => {
            if (axios.isCancel(err)) return;
            dispatch({
                type: ACTIONS.ERROR,
                payload: { error: err }
            })
        })


        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page])

    return state;
}

export default FetchJobs;
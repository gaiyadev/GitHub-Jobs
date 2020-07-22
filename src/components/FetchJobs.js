import { useReducer, useEffect } from 'react';
import axios from 'axios';

const BASEURL = 'https://jobs.github.com/positions.json';

const ACTIONS = {
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_DATA: 'GETz_DATA',
    ERROR: 'ERROR'
}

const reducer = (state, action) => {
    switch (ACTIONS.type) {
        case action.MAKE_REQUEST:
            return {
                loading: true,
                jobs: []
            }
        case ACTIONS.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs
            }

        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            }

        default:
            return state;
    }
};


const FetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer,
        {
            jobs: [],
            loading: true
        });
    dispatch({
        type: 'hello', payload: { x: 3 }
    })

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST });

        axios.get(BASEURL, {
            params: {
                makedown: true,
                page: page,
                ...params
            }
        }).then(res => {
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: { jobs: res.data }
            })
        }).catch(err => {
            dispatch({
                type: ACTIONS.ERROR,
                payload: {
                    error: err
                }
            })
        })
    }, [params, page])

    return {
        jobs: [],
        loading: false,
        error: false
    };
}

export default FetchJobs;
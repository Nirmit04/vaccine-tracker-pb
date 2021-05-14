import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { baseURL } from '../App';

interface Props {

}

export default function useIndianStates(): Array<{ state_id: number, state_name: string }> {
    const [indianStates, setIndianStates] = useState();
    const dispatchRedux = useDispatch()
    useEffect(() => {
        fetchStates();
    }, [])
    const fetchStates = async () => {
        dispatchRedux({type:'SET_TRUE'})
        let { data } = await axios.get(`${baseURL}/admin/location/states`);
        dispatchRedux({type:'SET_FALSE'})
        setIndianStates(data.states);
    }
    return indianStates
}

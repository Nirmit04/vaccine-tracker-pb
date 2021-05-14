import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { baseURL } from '../App';

interface Props {
    stateId: number;
}

export default function useIndianDistricts({ stateId }: Props): Array<{ district_id: number, district_name: string, }> {
    const [indianDistricts, setIndianDistricts] = useState()
    const dispatchRedux = useDispatch()
    useEffect(() => {
        if (stateId) {
            fetchDistricts(stateId);
        }
    }, [stateId])
    const fetchDistricts = async (stateId: number) => {
        dispatchRedux({type:'SET_TRUE'})
        let { data } = await axios.get(`${baseURL}/admin/location/districts/${stateId}`);
        dispatchRedux({type:'SET_FALSE'})
        setIndianDistricts(data.districts)
    }
    return indianDistricts
}

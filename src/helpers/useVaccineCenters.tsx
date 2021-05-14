import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { baseURL, ICenter } from '../App';

interface Props {
    distId: number;
    formattedDate: string
}

let timerId;
export default function useVaccineCenters({ distId, formattedDate }: Props): Array<ICenter> {
    const [centers, setCenters] = useState<Array<ICenter>>();
    const dispatchRedux = useDispatch()
    useEffect(() => {
        if (distId && formattedDate) {
            clearInterval(timerId);
            fetchCenters(distId, formattedDate);
            timerId = setInterval(() => fetchCenters(distId, formattedDate), 10000)
        }
    }, [distId, formattedDate])

    const fetchCenters = async (distId: number, formattedDate: string) => {
        dispatchRedux({type:'SET_TRUE'})
        let data = await axios.get(`${baseURL}/appointment/sessions/public/calendarByDistrict?district_id=${distId}&date=${formattedDate}`);
        dispatchRedux({type:'SET_FALSE'})
        const centers: Array<ICenter> = data.data.centers;
        setCenters(centers);
    }

    return centers;
}

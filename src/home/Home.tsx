import React, { ReactElement, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { ActionTypes, IDispCenter, ILocalState } from '../App';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Home.scss'
import { formatDate, formatSessions, play } from '../helpers/dataFormatters';
import equal from 'deep-equal';
import useIndianStates from '../helpers/useIndianStates';
import useIndianDistricts from '../helpers/useIndianDistricts';
import useVaccineCenters from '../helpers/useVaccineCenters';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
interface Props {

};

let oldData:{columns:Array<string>,rows:Array<IDispCenter>,availabilityCount:number};

const initialState: ILocalState = {
    date: new Date(),
    chosenState: undefined,
    chosenDist: undefined,
    ageLess45: false,
    vaccinePreference: 'NO'
}

function reducer(state: ILocalState, action: { type: ActionTypes, payload: any }): ILocalState {
    switch (action.type) {
        case ActionTypes.SetStartDate: {
            return { ...state, date: action.payload }
        }
        case ActionTypes.SetChosesState: {
            return { ...state, chosenState: action.payload }
        }
        case ActionTypes.SetChoseDist: {
            return { ...state, chosenDist: action.payload }
        }
        case ActionTypes.SetAgeLess45: {
            return { ...state, ageLess45: action.payload }
        }
        case ActionTypes.SetVaccinePreference: {
            return { ...state, vaccinePreference: action.payload }
        }
        default: {
            return state
        }
    }
}
export default function Home({ }: Props): ReactElement {
    const [{ chosenDist, chosenState, date, vaccinePreference, ageLess45 }, dispatch] = useReducer(reducer, initialState);
    const indianStates = useIndianStates();
    const indianDistrcits = useIndianDistricts({ stateId: chosenState });
    const rawCenters = useVaccineCenters({ distId: chosenDist, formattedDate: formatDate(date) })
    const reduxLoader = useSelector<any>(state => state.root.loader)
   
    useEffect(() => {
        if (indianStates && indianStates.length > 0 && chosenState === undefined) {
            dispatch({ type: ActionTypes.SetChosesState, payload: indianStates[0].state_id })
        }
    }, [indianStates])
    useEffect(() => {
        if (indianDistrcits && indianDistrcits.length > 0) {
            dispatch({ type: ActionTypes.SetChoseDist, payload: indianDistrcits[0].district_id });
        }
    }, [indianDistrcits])

    let finalData:{columns:Array<string>,rows:Array<IDispCenter>,availabilityCount:number} = useMemo(() => {
        if (rawCenters && rawCenters.length > 0) {
            return formatSessions(rawCenters, { vaccinePreference, ageLess45, date })
        }
    }, [rawCenters, ageLess45, vaccinePreference])

    let isNewDataPresnt = useMemo(() => {
        // return true
        let result = finalData?.availabilityCount>0 && finalData?.availabilityCount!==oldData?.availabilityCount;
        oldData = finalData;
        return result
    }, [finalData])

    if (isNewDataPresnt && finalData?.rows.length > 0) {
        play()
    }

    return (
        <React.Fragment>
            {reduxLoader?<Loader/>:null}
            <div className='home_wrapper'>
                <div className='filters'>
                    <div className='one_filter'>
                        <label className='filter_label'>Starting Date:</label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(date: any) => dispatch({ type: ActionTypes.SetStartDate, payload: date })} />
                    </div>
                    <div className='one_filter'>
                        <label className='filter_label'>Age Less Than 45:</label>
                        <input type="checkbox" checked={ageLess45} onChange={e => dispatch({ type: ActionTypes.SetAgeLess45, payload: e.target.checked })} />
                    </div>
                    <div className='one_filter'>
                        <label className='filter_label'>Select State:</label>
                        <select value={chosenState} onChange={e => dispatch({ type: ActionTypes.SetChosesState, payload: +e.target.value })}>
                            {indianStates?.length > 0 ?
                                indianStates.map(state => {
                                    return (
                                        <option key={'state' + state.state_id} value={state.state_id}>
                                            {state.state_name}
                                        </option>
                                    )
                                })
                                : null}
                        </select>
                    </div>
                    <div className='one_filter'>
                        <label className='filter_label'>Select District:</label>
                        <select value={chosenDist} onChange={e => dispatch({ type: ActionTypes.SetChoseDist, payload: +e.target.value })}>
                            {indianDistrcits?.length > 0 ?
                                indianDistrcits?.map(dist => {
                                    return (
                                        <option key={'district' + dist.district_id} value={dist.district_id}>
                                            {dist.district_name}
                                        </option>
                                    )
                                })
                                : null}
                        </select>
                    </div>
                    <div className='one_filter'>
                        <label className='filter_label' htmlFor="">Vaccine Preference</label>
                        <select value={vaccinePreference} onChange={e => dispatch({ type: ActionTypes.SetVaccinePreference, payload: e.target.value as 'COVAXIN' | 'COVISHIELD' | 'NO' })}>
                            <option value='NO'>None</option>
                            <option value="COVAXIN">Covaxin</option>
                            <option value="COVISHIELD">Covishield</option>
                        </select>
                    </div>
                </div>
                <div className="table_wrapper">
                    <br/>
                    <div>TOTAL SLOTS&nbsp;:&nbsp;&nbsp;&nbsp;<span style={{fontWeight:500}}>{finalData?.availabilityCount}</span></div>
                    <div className='table'>
                        <div className='row header_row'>
                            {finalData?.columns?.map((el: string, index: number) => {
                                return (
                                    <div key={index} className={`col${index}`}>{el}</div>
                                )
                            })}
                        </div>
                        <div className="table_body">
                            {finalData?.rows?.map((el: IDispCenter) => {
                                const { columns } = finalData
                                return (
                                    <div key={el.sno} className='row'>
                                        <div className={`col0 cell`}>{el.sno}</div>
                                        <div className={`col1 cell`}>{el.name}</div>
                                        <div className={`col2 cell`}>{el.address}</div>
                                        <div className={`col3 cell`}>{el.pincode}</div>
                                        <div className={`col4 cell ${el[columns[3]]}`}>{el[columns[3]]}</div>
                                        <div className={`col5 cell ${el[columns[4]]}`}>{el[columns[4]]}</div>
                                        <div className={`col6 cell ${el[columns[5]]}`}>{el[columns[5]]}</div>
                                        <div className={`col7 cell ${el[columns[6]]}`}>{el[columns[6]]}</div>
                                        <div className={`col8 cell ${el[columns[7]]}`}>{el[columns[7]]}</div>
                                        <div className={`col9 cell ${el[columns[8]]}`}>{el[columns[8]]}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

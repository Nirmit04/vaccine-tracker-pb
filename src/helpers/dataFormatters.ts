import { ICenter, IDispCenter } from '../App';

export const formatSessions = (rawCenterList: Array<ICenter>, filters: { vaccinePreference, ageLess45, date }) => {
    let availabilityCount:number=0;
    let dispCenters = [];
    for (let center of rawCenterList) {
        let rawCenterData: ICenter = {
            center_id: center.center_id,
            address: center.address,
            name: center.name,
            sessions: center.sessions
        };
        rawCenterData.sessions = rawCenterData.sessions.filter(el => el.available_capacity > 0);
        if (filters.vaccinePreference !== 'NO' && rawCenterData.sessions.length > 0) {
            rawCenterData.sessions = rawCenterData.sessions.filter(el => el.vaccine === filters.vaccinePreference);
        }
        if (filters.ageLess45) {
            rawCenterData.sessions = rawCenterData.sessions.filter(el => el.min_age_limit < 45);
        }
        if (rawCenterData.sessions.length > 0) {
            dispCenters.push(rawCenterData)
        }
    }
    const cols = ['S.No.', 'Name', 'Address'];
    for (let i = 0; i <= 5; i++) {
        cols.push(formatDate(addDays(filters.date, i)))
    }
    let data: Array<IDispCenter> = []
    dispCenters.forEach((el: ICenter, index: number) => {
        let record = {} as IDispCenter;
        record = {
            name: el.name,
            sno: (index + 1).toString(),
            address: el.address,
        }
        for (let i = 3; i < cols.length; i++) {
            let session = el.sessions.find(el1 => el1.date === cols[i])
            record[cols[i]] = 'NA'
            if (session) {
                availabilityCount+=session.available_capacity;
                record[cols[i]] = session.available_capacity.toString(); 
            }
        }
        data.push(record)
    })
    console.log(data);
    
    return { columns: cols, rows: data,availabilityCount:availabilityCount }
}

export const formatDate = (date: Date) => {
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    };
    var month = pad2(date.getMonth() + 1);
    var day = pad2(date.getDate());
    var year = date.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    return formattedDate
}
const addDays = (initialDate: Date, days: number): Date => {
    const initDate = new Date(initialDate);
    initDate.setDate(initDate.getDate() + days);
    return initDate;
}
export async function play() {
    var audio = new Audio('http://ionden.com/a/plugins/ion.sound/static/sounds/metal_plate.mp3');
    await audio.play();
}
import './App.css';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./home/Home";

export const baseURL = "https://cdn-api.co-vin.in/api/v2";
export interface ICenter {
  center_id: number,
  address: string,
  name: string,
  sessions: Array<ISessionWk>,
  pincode:number
}
interface ISessionWk {
  available_capacity: number,
  min_age_limit: number,
  vaccine: "COVISHIELD" | "COVAXIN"
  date: string,
}
export interface IDispCenter {
  sno: string,
  name: string,
  address: string,
  pincode:string,
  [x: string]: string,
}
export interface ILocalState {
  date: Date,
  chosenState: number,
  chosenDist: number,
  ageLess45: boolean,
  vaccinePreference: 'COVISHIELD' | 'COVAXIN' | 'NO'
}
export enum ActionTypes {
  SetStartDate = 'setStartDate',
  SetChosesState = 'setChosesState',
  SetChoseDist = 'setChoseDist',
  SetAgeLess45 = 'setAgeLess45',
  SetVaccinePreference = 'setVaccinePreference'
}
function App() {
  return (
    <div className="router_outlet">
      <div className="router_wrapper">
        <Router>
          <Switch>
            <Route component={Home} path='/' exact />
            <Route component={() => <div style={{ color: 'white' }}>Not Found</div>} />
          </Switch>
        </Router>
      </div>
    </div >
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PlannerRow } from '../typings/PlannerRow';
import Gantt from './pages/Gantt';
import Home from './pages/Home';

function App() {
    const [data, setData] = useState<PlannerRow[]>([]);

    const handleSetData = (json: PlannerRow[]) => {
        console.log('handleSetData', json);
        setData(json);
    };
    return (
        <Router>
            <Switch>
                <Route path="/gantt">
                    <Gantt data={data} />
                </Route>
                <Route path="/">
                    <Home data={data} setData={handleSetData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

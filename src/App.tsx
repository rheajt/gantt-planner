import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PlannerRow } from '../typings/PlannerRow';
import Gantt from './pages/Gantt';
import Home from './pages/Home';
import LabelledGantt from './pages/LabelledGantt';

interface ILabelInfo {
    [key: string]: {
        label: string;
        count: number;
    };
}
function App() {
    const [data, setData] = useState<PlannerRow[]>([]);
    const [labels, setLabels] = useState<ILabelInfo | null>(null);

    useEffect(() => {
        const labelInfo = data.reduce<ILabelInfo>((acc, cur) => {
            const ls = cur.Labels.split(';');

            ls.forEach((l) => {
                let label = !!l ? l : 'UNLABELED';
                if (!acc[label]) {
                    acc[label] = {
                        label,
                        count: 1,
                    };
                } else {
                    acc[label].count++;
                }
            });

            return acc;
        }, {});

        setLabels(labelInfo);
    }, [data]);

    const handleSetData = (json: PlannerRow[]) => {
        setData(json);
    };

    console.log(labels);
    return (
        <Router>
            <Switch>
                <Route path="/gantt">
                    <Gantt data={data} labels={labels} />
                </Route>

                <Route path="/labelled-gantt">
                    <LabelledGantt data={data} labels={labels} />
                </Route>

                <Route path="/">
                    <Home data={data} setData={handleSetData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

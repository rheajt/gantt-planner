import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import YAML from 'yaml';
import { ILabelInfo } from '../typings/ILabelInfo';

import { PlannerRow } from '../typings/PlannerRow';
import Home from './pages/Home';
import LabelledGantt from './pages/LabelledGantt';

// export interface ILabelInfo {
//     [key: string]: {
//         label: string;
//         count: number;
//     };
// }

function App() {
    const [data, setData] = useState<PlannerRow[]>([]);
    const [labels, setLabels] = useState<ILabelInfo | null>(null);
    const [selectedLabels, setSelectedLabels] =
        useState<ILabelInfo | null>(null);

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
        const withYaml = json.reduce<PlannerRow[]>((acc, wy) => {
            if (wy.Description.includes('---')) {
                const [yml, desc] = wy.Description.split('---');
                const parsed = YAML.parse(yml);

                acc.push({ ...wy, Description: desc, Other: parsed });
            } else {
                acc.push({ ...wy, Other: {} });
            }

            return acc;
        }, []);

        setData(withYaml);
    };

    return (
        <Router>
            <Switch>
                <Route path="/gantt">
                    <LabelledGantt data={data} labels={labels} />
                </Route>

                <Route path="/">
                    <Home
                        data={data}
                        setData={handleSetData}
                        labels={labels}
                        selectedLabels={selectedLabels}
                        setSelectedLabels={setSelectedLabels}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
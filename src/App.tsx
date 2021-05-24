import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import YAML from 'yaml';
import { ILabelInfo } from '../typings/ILabelInfo';

import { PlannerRow } from '../typings/PlannerRow';
import Home from './pages/Home';
import LabelledGantt from './pages/LabelledGantt';

function App() {
    const [data, setData] = useState<PlannerRow[]>([]);
    const [labels, setLabels] = useState<ILabelInfo | null>(null);
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

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
            console.log(wy);

            if (wy.Description.includes('---')) {
                const [yml, desc] = wy.Description.split('---');
                let parsed = {};
                try {
                    parsed = YAML.parse(yml);
                } catch (err) {
                    parsed = {
                        YAML: 'Error parsing your YAML frontmatter',
                    };
                }

                acc.push({ ...wy, Description: desc, Other: parsed });
            } else {
                acc.push({ ...wy, Other: {} });
            }

            return acc;
        }, []);

        setData(withYaml);
    };

    const handleSetSelectedLabels = (val: string) => {
        if (selectedLabels.includes(val)) {
            const updated = selectedLabels.reduce<string[]>((acc, cur) => {
                if (cur === val) {
                    return acc;
                }
                acc.push(cur);
                return acc;
            }, []);

            setSelectedLabels(updated);
        } else {
            setSelectedLabels([...selectedLabels, val]);
        }
    };

    return (
        <Router>
            <Switch>
                <Route path="/gantt">
                    <LabelledGantt data={data} labels={selectedLabels} />
                </Route>

                <Route path="/">
                    <Home
                        data={data}
                        labels={labels}
                        setData={handleSetData}
                        selectedLabels={selectedLabels}
                        setSelectedLabels={handleSetSelectedLabels}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

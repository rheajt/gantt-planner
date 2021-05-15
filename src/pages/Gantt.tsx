import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { PlannerRow } from '../../typings/PlannerRow';
import CollapseCard from '../components/CollapseCard';

interface Props {
    data: PlannerRow[];
}

const Gantt = (props: Props) => {
    const [sections, setSections] = useState<string[]>([]);

    useEffect(() => {
        const allSections = props.data.reduce<string[]>((acc, cur) => {
            if (!acc.includes(cur['Bucket Name'])) {
                acc.push(cur['Bucket Name']);
            }
            return acc;
        }, []);

        setSections(allSections);
    }, [props.data, setSections]);

    if (!props.data.length) {
        return <Redirect to="/" />;
    }

    return (
        <Accordion defaultActiveKey="0">
            {sections.map((s, idx) => {
                const plans = props.data
                    .filter((d) => d['Bucket Name'] === s)
                    .filter((d) => {
                        return d['Start Date'] !== '' && d['Due Date'] !== '';
                    });

                return (
                    <CollapseCard
                        key={`card-${idx}`}
                        eventKey={'' + idx}
                        title={s}
                        plans={plans}
                    />
                );
            })}
        </Accordion>
    );
};

export default React.memo(Gantt);

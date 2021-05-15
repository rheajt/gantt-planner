import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { ILabelInfo } from '../../typings/ILabelInfo';
import { PlannerRow } from '../../typings/PlannerRow';
import CollapseCard from '../components/CollapseCard';

interface Props {
    data: PlannerRow[];
    labels: ILabelInfo | null;
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
        <Container fluid>
            {sections.map((s, idx) => {
                const plans = props.data
                    .filter((d) => d['Bucket Name'] === s)
                    .filter((d) => d.Progress !== 'Not Started')
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
        </Container>
    );
};

export default React.memo(Gantt);

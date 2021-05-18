import React, { useEffect, useState } from 'react';
import {
    Badge,
    Container,
    ToggleButton,
    ToggleButtonGroup,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { ILabelInfo } from '../../typings/ILabelInfo';
import { PlannerRow } from '../../typings/PlannerRow';
import CollapseCard from '../components/CollapseCard';

interface Props {
    data: PlannerRow[];
    labels: ILabelInfo | null;
}

const Gantt = (props: Props) => {
    const [values, setValues] = useState<string[]>([]);

    useEffect(() => {
        if (props.labels) {
            setValues(Object.keys(props.labels));
        }
    }, [props.labels]);

    if (!props.data.length || !props.labels) {
        return <Redirect to="/" />;
    }

    const plans = props.data
        //remove plans not started
        .filter((d) => d.Progress !== 'Not Started')
        //remove plans without a start date or due date
        .filter((d) => {
            return d['Start Date'] !== '' && d['Due Date'] !== '';
        })
        //remove plans before last august
        .filter((d) => {
            return new Date(d['Start Date']) > new Date(2020, 6, 1);
        })
        //remove plans without the selected labels
        .filter((d) => {
            if (!d.Labels) return false;

            return d.Labels.split(';').some((l) => values.includes(l));
        });

    const labels = props.labels;

    return (
        <Container fluid>
            <div>
                <ToggleButtonGroup
                    type="checkbox"
                    value={values}
                    onChange={(e) => {
                        setValues(e);
                    }}
                    className="mb-2"
                >
                    {Object.keys(labels).map((key) => {
                        let label = labels[key];
                        return (
                            <ToggleButton value={label.label}>
                                {label.label}
                                <Badge variant="light">{label.count}</Badge>
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
                <p>{values}</p>
            </div>

            <CollapseCard
                eventKey={'' + 0}
                title={'All Buckets'}
                plans={plans}
            />
        </Container>
    );
};

export default React.memo(Gantt);

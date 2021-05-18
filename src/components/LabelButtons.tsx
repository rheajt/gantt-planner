import React from 'react';
import { Badge, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { ILabelInfo } from '../../typings/ILabelInfo';

const variants = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
];

const LabelButtons: React.FC<{
    labels: any;
    selectedLabels: ILabelInfo | null;
    setSelectedLabels: Function;
}> = ({ setSelectedLabels, labels }) => {
    return (
        <div>
            <ToggleButtonGroup
                type="checkbox"
                value={labels}
                onChange={(e) => {
                    setSelectedLabels(e);
                }}
                className="mb-2"
            >
                {Object.keys(labels).map((key, idx) => {
                    let label = labels[key];
                    return (
                        <ToggleButton
                            variant={variants[idx % variants.length]}
                            size="sm"
                            value={label.label}
                            key={label.label}
                        >
                            {label.label}{' '}
                            <Badge variant="light">{label.count}</Badge>
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
        </div>
    );
};

export default LabelButtons;

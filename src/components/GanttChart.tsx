import React from 'react';
import Chart from 'react-google-charts';
import { GanttRow } from '../../typings/GanttRow';
import '../styles/gantt.css';

function GanttChart({ rows }: { rows: GanttRow[] }) {
    const height = rows.length * 30 + 50;
    return (
        // <div className="gantt-container">
        <Chart
            width={'100%'}
            height={height + 'px'}
            chartType="Gantt"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Labels' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                ],
                ...rows,
            ]}
            options={{
                height,
                width: 1280,
                gantt: {
                    trackHeight: 30,
                },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                },
            }}
            rootProps={{ 'data-testid': '2' }}
        />
        // </div>
    );
}

export default GanttChart;

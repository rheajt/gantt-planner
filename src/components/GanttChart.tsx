import React from 'react';
import Chart from 'react-google-charts';
import { GanttRow } from '../../typings/GanttRow';
import '../styles/gantt.css';

function GanttChart({ rows }: { rows: GanttRow[] }) {
    console.log(rows.length);
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
                    { type: 'string', label: 'Resource' },
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
            }}
            rootProps={{ 'data-testid': '2' }}
        />
        // </div>
    );
}

export default GanttChart;

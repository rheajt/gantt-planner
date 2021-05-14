import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import CollapseCard from './components/CollapseCard';
import xlsx from 'xlsx';

function App() {
    const sections = ['Grade 1', 'Grade 2', 'Grade 3'];
    const file = xlsx.read(__dirname + '/data/planning.xlsx');
    const wsname = file.SheetNames[0];
    const ws = file.Sheets[wsname];

    const json = xlsx.utils.sheet_to_json(ws, { header: 4 });

    console.log(json);
    return (
        <Container>
            <Accordion defaultActiveKey="0">
                {sections.map((s, idx) => {
                    return (
                        <CollapseCard
                            key={`card-${idx}`}
                            eventKey={'' + idx}
                            title={s}
                        />
                    );
                })}
            </Accordion>
        </Container>
    );
}

export default App;

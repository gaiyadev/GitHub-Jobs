import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title}- <span className="text-muted font-weight-light"> {job.company} </span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div style={{ wordBreak: 'break-all' }}>
                            <ReactMarkDown src={job.how_to_apply} />
                        </div>
                    </div>
                    <div className="d-none d-md-block">
                        <img alt={job.company} height='50' src={job.company_logo} />
                    </div>
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant="primary">
                        {open ? 'Hide Details' : 'Open Details'}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkDown escapeHtml={false} source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default Job;
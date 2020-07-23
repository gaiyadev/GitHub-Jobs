import React, { useState } from 'react';
import './App.css';
import FetchJobs from './components/FetchJobs/FetchJobs';
import Job from './components/Job/Job';
import { Container } from 'react-bootstrap';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = FetchJobs(params, page);


  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong. try refreshing</h1>}
      {jobs.map(job => {
        return (
          <Job key={job.id} job={job} />)
      })}
    </Container>
  );
};


export default App;

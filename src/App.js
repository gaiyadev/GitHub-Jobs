import React, { useState } from 'react';
import './App.css';
import FetchJobs from './components/FetchJobs/FetchJobs';
import Job from './components/Job/Job';
import { Container } from 'react-bootstrap';
import JobPagination from './components/JobPagination/JobPagination';
import SearchForm from './components/SearchForm/SearchForm';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = FetchJobs(params, page);
  const handleParamsChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return {
        ...prevParams,
        [param]: value
      };
    })
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamsChange} />
      <JobPagination page={page} hasNextPage={hasNextPage} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong. try refreshing</h1>}
      {jobs.map(job => {
        return (
          <Job key={job.id} job={job} />);
      })}
      <JobPagination page={page} hasNextPage={hasNextPage} setPage={setPage} />
    </Container>
  );
};


export default App;

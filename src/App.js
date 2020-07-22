import React from 'react';
import './App.css';
import FetchJobs from './components/FetchJobs';
import { Container } from 'react-bootstrap';

const App = () => {
  const { jobs, loading, error } = FetchJobs();
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong. try refreshing</h1>}
      <h1>{jobs.length}</h1>
    </Container>
  );
};


export default App;

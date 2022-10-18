import { useState, useEffect } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../src/styles.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import fetchData from 'services/API';

const App = () => {
  const Status = {
    idle: 'IDLE',
    pending: 'PENDING',
    resolved: 'RESOLVED',
    rejected: 'REJECTED',
  };
  const { idle, pending, resolved, rejected } = Status;
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState(idle);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    (async function fetchTestData() {
      try {
        setStatus(pending);
        const response = await fetchData(searchQuery, page);
        if (
          response.total === 0 ||
          (response.hits.length === 0 && response.data.totalHits > 0)
        ) {
          setStatus(idle);
          return;
        }
        setStatus(resolved);
        setHits(prevHits => [...prevHits, ...response.hits]);
        return;
      } catch (error) {
        console.log(error);
        setStatus(rejected);
      }
    })();
  }, [idle, page, pending, rejected, resolved, searchQuery]);

  const handlePageIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setHits([]);
    setStatus(idle);
  };

  const NOT_EMPTY_ARRAY = hits.length !== 0;
  const ENOUGH_IMAGES = hits.length % 12 === 0;
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme={'colored'}
        transition={Slide}
        closeOnClick
      />
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'REJECTED' && (
        <h1 className="errorTitle">
          Ooops, someting went wrong. Please, try again.
        </h1>
      )}
      {hits.length > 0 && status !== 'REJECTED' && <ImageGallery hits={hits} />}
      {status === 'PENDING' && <Loader />}
      {status === 'RESOLVED' && ENOUGH_IMAGES && NOT_EMPTY_ARRAY && (
        <Button onClick={handlePageIncrement} />
      )}
    </div>
  );
};

export default App;


import { Component } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../src/styles.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import fetchData from 'services/API';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    status: 'IDLE',
  };

  handlePageIncrement = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, hits: [], status: 'IDLE' });
  };

  async componentDidUpdate(_, prevState) {
    const currentPage = this.state.page;
    const prevPage = prevState.page;
    const prevSearchQuery = prevState.searchQuery;
    const currentSearchQuery = this.state.searchQuery;
    try {
      if (prevSearchQuery !== currentSearchQuery || prevPage !== currentPage) {
        this.setState({ status: 'PENDING' });
        const response = await fetchData(currentSearchQuery, currentPage);
        if (
          response.total === 0 ||
          (response.hits.length === 0 && response.data.totalHits > 0)
        ) {
          this.setState({ status: 'IDLE' });
          return;
        }
        this.setState({ status: 'RESOLVED' });
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.hits],
        }));
        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'REJECTED' });
    }
  }

  render() {
    const { handleFormSubmit, handlePageIncrement } = this;
    const { hits, status } = this.state;
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
        {hits.length > 0 && status !== 'REJECTED' && (
          <ImageGallery hits={hits} />
        )}
        {status === 'PENDING' && <Loader />}
        {status === 'RESOLVED' && ENOUGH_IMAGES && NOT_EMPTY_ARRAY && (
          <Button onClick={handlePageIncrement} />
        )}
      </div>
    );
  }
}

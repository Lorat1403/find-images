import axios from 'axios';
import { toast } from 'react-toastify';

export default async function fetchData(searchQuery, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=29245292-844c4c201188366cd8cc26438&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.data.totalHits === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (response.data.hits.length % 12 !== 0 && response.data.totalHits > 0) {
      toast.error("We're sorry, but you've reached the end of search results.");
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

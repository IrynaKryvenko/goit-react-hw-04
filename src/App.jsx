import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader/Loader.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import getImg from './ImagesApi.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import Section from './components/Section/Section.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      console.log('Fetching images with:', query, page); 
      setIsLoading(true);
      setIsVisible(false);
      setError(null);
      setIsEmpty(false);
      try {
        const { results, total_pages } = await getImg(query, page);
        console.log('Fetched results:', results); 
        if (!results.length) {
          setIsEmpty(true);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
          setIsVisible(page < total_pages);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSubmit = (value) => {
    console.log('Submitted query:', value); 
    setQuery(value);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Section>
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {isVisible && (
          <LoadMoreBtn onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load more"}
          </LoadMoreBtn>
        )}
        {!images.length && isEmpty && <span>Sorry, no images found.</span>}
        {isLoading && <Loader />}
        {error && <span>Error: {error.message}</span>}
        {isEmpty && !isLoading && (
          <span>
            There are no images matching your search query. Please try again!
          </span>
        )}
      </Section>
      <ImageModal
        modalIsOpen={isOpen}
        closeModal={closeModal}
        src={modalUrl}
        alt={modalAlt}
      />
    </>
  );
}

export default App;

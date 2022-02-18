import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Loader from "./components/Loader/Loader";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import fetchImages from "./api/axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAlt, setModalAlt] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchImages === "") {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    setLoadMore(true);

    fetchImages(searchImages, page).then((res) => {
      const images = res.data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (images.length === 0) {
        setLoadMore(false);
        alert(`Sorry, nothing found`);
        return;
      }

      setImages((prevImages) => [...prevImages, ...images]);
      setLoadMore(false);
    });
  }, [searchImages, page]);

  const handleFormSubmit = (searchImages) => {
    setSearchImages(searchImages);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const setModal = (largeImageURL, tags) => {
    setModalImage(largeImageURL);
    setModalAlt(tags);
    toggleModal();
  };

  return (
    <Box>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery setModal={setModal} images={images} />
      )}
      {loadMore ? (
        <Loader />
      ) : (
        images.length > 0 &&
        images.length % 12 === 0 && <LoadMoreButton onClick={onLoadMore} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={modalAlt} />
        </Modal>
      )}
    </Box>
  );
}

//libraries
import { useState, useEffect } from "react";

//utils
import { last } from "../utils/helpers";

//styles
import "../styles/form.scss";
import "../styles/posts.scss";
import Reviews from "./Reviews";

//components
import ModalForm from "./ModalForm";

export const AddReview = function AddReview() {
  const localStorageData = localStorage.getItem('reviews');
  const [nameValue, setNameValue] = useState('');
  const [reviewValue, setReviewValue] = useState('');
  const [reviews, setReviews] = useState(localStorageData ? JSON.parse(localStorageData) : []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const readNameValue = (event) => {
    setNameValue(event.target.value);
  };

  const readReviewValue = (event) => {
    setReviewValue(event.target.value);
  };

  const clearInputs = () => {
    setNameValue('');
    setReviewValue('');
  };

  const createReview = () => {
    if (nameValue.trim() && reviewValue.trim() !== '') {
      const lastReview = last(reviews);
      const lastIndex = lastReview ? lastReview.id + 1 : 0;
      setReviews([...reviews, { id: lastIndex + 1, name: nameValue, review: reviewValue }])
      clearInputs();
    }
  };

  const toggleOpen = () => {
    setOpen((state) => !state)
  };

  const editReview = (newReview) => {
    if (nameValue.trim() && reviewValue.trim() !== '') {
      const newReviews = reviews.map((item) => {
        if (item.id === newReview.id) {
          item.name = nameValue;
          item.review = reviewValue;
        };

        return item;
    });
      setReviews(newReviews);
      toggleOpen();
      clearInputs();
    };
  };

  const deleteReview = (key) => {
    setReviews(reviews.filter(item => item.id !== key));
  };

  return (
    <div className="wrapper">
      <Reviews reviews={reviews} editReview={editReview} deleteReview={deleteReview} readNameValue={readNameValue} readReviewValue={readReviewValue} open={open} toggleOpen={toggleOpen} />
      <ModalForm takeReview={createReview} buttonSign={"Add"} readNameValue={readNameValue} readReviewValue={readReviewValue} />
    </div>
  );
};

//libraries
import { useState, useEffect } from "react";

//utils
import { last } from "../utils/helpers";

//components
import EditForm from "./editForm";

export const Form = function Form() {
  const localStorageData = localStorage.getItem('reviews');

  const [nameValue, setNameValue] = useState();
  const [reviewValue, setReviewValue] = useState();
  const [reviews, setReviews] = useState(localStorageData ? JSON.parse(localStorageData) : []);
  const [currentItemId, setCurrentItemId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews])

  function readNameValue(event) {
    setNameValue(event.target.value);
  }

  function readReviewValue(event) {
    setReviewValue(event.target.value);
  }

  function editReview(key, name, value) {
    const newReviews = reviews.map((item) => { if (item.id === key.id) { item.name = name; item.review = value }; return item })
    setReviews(newReviews)
    setOpen(false)
  }

  function createReview() {
    const lastReview = last(reviews);
    const lastIndex = lastReview ? lastReview.id + 1 : 0;
    setReviews([...reviews, { id: lastIndex + 1, name: nameValue, review: reviewValue }]);
  }

  function deleteReview(key) {
    setReviews(reviews.filter(item => item.id !== key));
  }

  return (
    <div className="wrapper">
      {reviews.map((item) =>
        open && item.id === currentItemId ? <EditForm editReview={editReview} item={item}  key={item.id}/> :
          <div className="review-box" key={item.id} >
            <div className="user-logo">
              <img className="user-logo__photo" src="https://picsum.photos/100/100" alt="{item.name}" />
            </div>
            <div className='user-data'>
              <div className="user-name">{item?.name}</div>
              <div className="user-message">{item?.review}</div>
            </ div>
            <div className='button-container'>
              <img className="edit-button" src="http://simpleicon.com/wp-content/uploads/pencil.png" alt="" onClick={() => { setOpen((state) => !state); setCurrentItemId(item.id) }} />
              <img className="delete-button" src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" alt="" onClick={() => deleteReview(item.id)} />
            </div>
          </div>
      )}

      <div className="modal">
        <input className="name" placeholder="Name" onChange={readNameValue} />
        <textarea className="message" placeholder="Your review" onChange={readReviewValue} />
        <button className="add" onClick={createReview}> Add </button>
      </div>
    </div>
  );
};

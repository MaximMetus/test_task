//libraries
import { useState } from "react";

//components
import ModalForm from "./ModalForm";

export default function Reviews(props) {
  const { toggleOpen, open, editReview, deleteReview, reviews, readNameValue, readReviewValue} = props;

  const [currentItemId, setCurrentItemId] = useState();

  return (
    <div className="wrapper">
      {reviews.map((item) =>
        open && item.id === currentItemId ? <ModalForm item={item} key={item.id} buttonSign={"Save"} takeReview={(item) => {editReview(item)}} readNameValue={readNameValue} readReviewValue={readReviewValue}  /> :
          <div className="review-box" key={item.id} >
            <div className="user-logo">
              <img className="user-logo__photo" src="https://picsum.photos/100/100" alt="{item.name}" />
            </div>
            <div className='user-data'>
              <div className="user-name">{item?.name}</div>
              <div className="user-message">{item?.review}</div>
            </div>
            <div className='button-container'>
              <img className="button-edit" src="http://simpleicon.com/wp-content/uploads/pencil.png" alt="" onClick={() => { toggleOpen(); setCurrentItemId(item.id) }} />
              <img className="button-delete" src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" alt="" onClick={() => deleteReview(item.id)} />
            </div>
          </div>
      )}
    </div>
  );
};

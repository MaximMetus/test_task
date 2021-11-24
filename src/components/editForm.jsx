import React, {useState, useEffect } from  'react';

const EditForm = (props) => {

    const {editReview, item } = props;
    const [nameValue, setNameValue] = useState('');
    const [reviewValue, setReviewValue] = useState('');
    

    function readNameValue(event) {
        setNameValue(event.target.value);
    }
    
    function readReviewValue(event, key) {
        setReviewValue(event.target.value);
    }

    useEffect(() => {
        setNameValue(item.name);
        setReviewValue(item.review);
    }, [item])
    
    
    return(
        <>
            <div className="modal edit-form">
            <input className="name" placeholder="Name" value={nameValue} onChange={readNameValue} />
            <textarea className="message" placeholder="Your review" value={reviewValue} onChange={readReviewValue} />
            <button className="add" onClick={() => {editReview(item, nameValue, reviewValue)}}> Save </button>
            </div>
        </>
    )
}

export default EditForm;

const ModalForm = (props) => {
  const { takeReview, item, buttonSign, readNameValue, readReviewValue } = props;

  return (
    <div className="modal edit-form">
      <input className="name" placeholder="Name" defaultValue={item ? item.name : ''} onChange={readNameValue} />
      <textarea className="message" placeholder="Your review" defaultValue={item? item.review : ''} onChange={readReviewValue} />
      <button className="add" onClick={() => { takeReview(item) }}> {buttonSign} </button>
    </div>
  );
};

export default ModalForm;

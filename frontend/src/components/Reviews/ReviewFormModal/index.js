

import React, { useState } from "react"
import { Modal } from "../../../context/Modal"
import ReviewForm from "./ReviewForm"
import "./AddReview.css"

function ReviewFormModal ({spotId}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
      className="loadOneSpot-review-button"
      onClick={() => setShowModal(true)}>
        Create Review
      </div>


      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
          onCreation={() => setShowModal(false)}
          spotId={spotId}
          setShowModal={setShowModal}
          />

        </Modal>
      )}

    </>
  )
}

export default ReviewFormModal; 

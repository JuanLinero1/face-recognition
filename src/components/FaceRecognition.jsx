import React from 'react'

const FaceRecognition = (props) => {
  return (
    <div className='container'>
      <img src={props.inputUrl} alt="" className='container__img' />
    </div>
  )
}

export default FaceRecognition
import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner({classy}) {
  return (
    <div className={classy}>
      <div className={`lds-ring`}><div></div><div></div></div>
    </div>
  )
}

export default LoadingSpinner
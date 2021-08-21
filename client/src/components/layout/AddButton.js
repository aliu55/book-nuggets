import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './AddButton.css'

const AddButton = () => {
  const [optionsToggle, setOptionsToggle] = useState(false)
  return (
    <div className="dropdown">
      {optionsToggle && (
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            duration: 0.3,
          }}
          className="dropdown-content"
        >
          <a href="#" id="insight">
            insight
          </a>
          <a href="#" id="question">
            question
          </a>
          <a href="#" id="quote">
            quote
          </a>
        </motion.div>
      )}
      <button
        className="dropbtn"
        onClick={() => setOptionsToggle(!optionsToggle)}
      >
        <span className="dropbtn-icon">+</span>
      </button>
    </div>
  )
}

export default AddButton

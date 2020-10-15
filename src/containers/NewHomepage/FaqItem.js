import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const FaqItem = ({ faq, pos }) => {
  const [collapsed, setCollapsed] = useState(true);
  const faqId = 'faq' + pos;
  return (
    <div className="faq-wrapper">
      <label htmlFor={faqId} className="faq-toggle">
        <span>
          {
            collapsed ? (
              <FontAwesomeIcon
                icon={faPlus}
                className='fas'
              />
            ) : (
              <FontAwesomeIcon
                icon={faMinus}
                className='fas'
              />
            )
          }
        </span>
        { faq.question }
      </label>
      <input
        id={faqId}
        name={faqId}
        type="checkbox"
        onChange={() => setCollapsed(!collapsed)}
      />
      <div className="faq-content">
        <p>
          { faq.answer }
        </p>
      </div>
    </div>
  );
}
 
export default FaqItem;
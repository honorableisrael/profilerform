import React from 'react';


const TestimonialItem = ({ testimonial, image, username, location }) => {
  return (
    <div className="testimonial">
      <p
        dangerouslySetInnerHTML={{
          __html: `
            ${testimonial}
            <span><strong>${username}</strong><br />${location}</span>
          `
        }}
      />
      {/* </p> */}
      <img
        src={image}
        alt={username}
      />
    </div>
  );
}
 
export default TestimonialItem;
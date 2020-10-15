import React from 'react';

import Stanbic from '../Resource/new-stanbic-bank.png';
import AccessBank from '../Resource/new-access-bank.png'
import StandardChartered from '../Resource/new-standard-bank.png';


const PatnersSection = () => {
  return (
    <section className='partner-carousel'>
      {
        [
          { title: 'access bank', img: AccessBank },
          { title: 'standard chartered', img: StandardChartered },
          { title: 'stanbic bank', img: Stanbic },
          { title: 'access bank', img: AccessBank },
        ].map(({ title, img }) => (
          <img
            src={img}
            alt={title}
            className='partner-logo'
          />
        ))
      }
    </section>
  );
}
 
export default PatnersSection;
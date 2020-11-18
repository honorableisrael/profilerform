import React from 'react';

import Stanbic from '../Resource/new-stanbic-bank.png';
import AccessBank from '../Resource/new-access-bank.png'
import StandardChartered from '../Resource/new-standard-bank.png';
import FirstTrust from '../Resource/firsttrust.png';
import NMRC from '../Resource/nmrc.png';
import HomeBase from '../Resource/homebase.png';
import FamilyHomes from '../Resource/familyhomes.png';
import FederalMortgage from '../Resource/federal.png';


const PatnersSection = () => {

  return (
    <section className='partner-carousel' style={{backgroundColor: "#f7f7f7", overflowY: "hidden", padding: "0 0", margin: "0 8%",
    overflowX: "auto"}}>
      {
        [
          { title: 'access bank', img: AccessBank, id: 1 },
          { title: 'familyhomes', img: FamilyHomes , id: 2},
          { title: 'standard chartered', img: StandardChartered , id: 3},
          { title: 'stanbic bank', img: Stanbic , id: 4},
          { title: 'federal mortgage', img: FederalMortgage , id: 5},
          { title: 'first trust', img: FirstTrust , id: 6},
          { title: 'nmrc', img: NMRC , id: 7},
          { title: 'homebase', img: HomeBase , id: 8},
        ].map(({ title, img, id }) => (
          <img
            key={id}
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
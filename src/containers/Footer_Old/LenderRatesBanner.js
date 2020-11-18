import React, { useState, useEffect } from "react";
import { extractErrors } from "../../utils/errorUtils";
import Axios from "axios";
import { BASE_URL } from "../../constants";
import LenderRatesBannerItem from "./LenderRatesBannerItem";

const LenderRatesBanner = () => {
  const [lenders, setLenders] = useState("[]");

  useEffect(() => {
    (async () => {
      const url = `${BASE_URL}/all-lenders`;
      try {
        const {
          data: { data }
        } = await Axios.get(url);
        setLenders(JSON.stringify(data));
      } catch (error) {
        const errors = extractErrors(error);
        console.log(errors);
      }
    })();
  }, [lenders]);

  return (
    <div
      className={`row fp-lender-rates-wrapper m-0${
        lenders.length ? "" : " hide"
      }`}
    >
      <div className='col-2 text-center fp-lenders-rates-text'>
        <strong>Mortgage Rates:</strong>
      </div>
      <div className='col-10 d-none-mx-width' style={{ overflow: "hidden" }}>
        <div
          className='fp-lenders-rates-list-wrapper'
          style={{ width: "3000px" }}
        >
          <div className='fp-lenders-rates-list'>
            {JSON.parse(lenders).map(lender => {
              return <LenderRatesBannerItem {...{ lender }} key={lender.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderRatesBanner;

import React from "react";
import * as Icon from "react-feather";

const LenderRatesBannerItem = ({ lender }) => {
  const { lender_name, lender_rate } = lender;
  return (
    <span>
      {lender_name}
      <Icon.TrendingDown className='mx-2 mb-1' color='#00b1ab' size='15px' />
      Prime = {lender_rate}%
    </span>
  );
};

export default LenderRatesBannerItem;

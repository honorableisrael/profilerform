import React from "react";
import {Link} from "react-router-dom";
import ApplicationListItem from "./ApplicationListItem";

import * as Icon from "react-feather";
//{...{ applications, errors, setLoading, setErrors, setEditApplicationData, history }}
const HorizontalApplicationList = ({
  errors,
  history,
  setErrors,
  isLoading,
  setLoading,
  applications,
  setEditApplicationData,
}) => {
  const nhfApplication = applications.find((application) => application.type.toLowerCase() === 'nhf');
  const mortgageApplication = applications.find((application) => application.type.toLowerCase() === 'mortgage');

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='row mt-4'>
          <div className='col-md-9 fp-mortgage-application-summary-wrapper'>
            <div className='fp-mortgage-application-title-wrapper'>
              <h2>My Applications</h2>
            </div>
            <div className='row fp-mortgage-application-content'>
              <div className='col-md-12 p-0'>
                <div className='d-flex position-relative'>
                  {!(errors && errors.length) ? (
                    [mortgageApplication, nhfApplication].map((data, index) => (
                        <ApplicationListItem
                          {...{
                            data,
                            index,
                            history,
                            isLoading,
                            setEditApplicationData,
                          }}
                          key={index}
                        />
                      ))
                  ) : (
                    <div className='error-wrapper mx-auto'>
                      <ul className='fp-network-blank-result error-item'>
                        {errors.map((msg, index) => (
                          <li className='' key={index}>
                            <div className=''>
                              <Icon.Frown color='#bbbbbb' size='180' />
                              <p>
                                Kindly confirm you are connected to a network
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3 fp-credit-score'>
            <div className='fp-mortgage-credit-score-content'>
              <div className='fp-mortgage-wallet'></div>
              <h2>Get your credit score in minutes</h2>
              <p>Improve your standing with mortgage lenders.</p>
              <Link className='fp-dashboard-credit-score-btn' to='/'>
                Get Credit Rating
              </Link>
              <div className='fp-mortgage-bottom-pattern'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalApplicationList;

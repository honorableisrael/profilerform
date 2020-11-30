import Axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { useDispatch, connect } from 'react-redux';

import { sexes } from '../../constants';
import cookies from '../../utils/cookies';
import countries from '../../utils/countries';
import statesList from '../../utils/statesMapped';
import { validations } from '../../utils/yupUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import userActions from '../../store/actions/userActions';
import applicationActions from '../../store/actions/applicationActions';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import ButtonSpinner from '../ButtonSpinner';
import postApplication from './postApplication';
import applicationTypes from '../../store/types/applicationTypes';
// import NewDatePicker from '../NewDatePicker';
import "./../../commons/TextFieldGroup/ProfileTextField.css";


const Wrapper = styled.div`
background: #f9f9f9 !important; 
width: auto !important;
`;

const validationSchema = Yup.object().shape({
  sex: validations.sex,
  phone: validations.phone,
  id_issue_date: validations.date,
  id_expire_date: validations.date,
  address: validations.requiredString,
  id_number: validations.requiredString,
  middlename: validations.isSingleName,
  profession: validations.requiredString,
  nationality: validations.requiredString,
  place_of_birth: validations.requiredString,
  lastname: validations.isRequiredSingleName,
  state_of_origin: validations.requiredString,
  firstname: validations.isRequiredSingleName,
  highest_education: validations.requiredString,
  means_of_identification: validations.requiredString,
  mother_middle_name: validations.isRequiredSingleName,
})

const PersonalInfoFormStepOne = ({
  app_ref, isNhf, setActiveTab, idCards = [], goToNextComponent, goToPreviousComponent, ...rest
}) => {
  const dispatch = useDispatch();
  const appRef = app_ref || cookies.get('app_ref');
  const email = (rest.email || cookies.get('email'));
  const handleSubmit = async (values) => {
    const {
      firstname, lastname, middlename, mother_middle_name, address, phone, sex,
      place_of_birth, nationality, means_of_identification, id_number, id_issue_date,
      id_expire_date, highest_education, state_of_origin, profession
    } = values;
    const userData = { firstname, lastname, middlename }
    const applicationData = {
      mother_middle_name, address, phone, sex, place_of_birth, nationality,
      means_of_identification, id_number, id_issue_date, id_issue_date,
      id_expire_date, highest_education, state_of_origin, profession
    };
    console.log({userData, applicationData});
    batchDispatcher(userData, userActions, dispatch);
    batchDispatcher(applicationData, applicationActions, dispatch);
    try {
      const res = await postApplication(
        {
          ...userData, ...applicationData,
          email, type: isNhf ? 'nhf' : 'mortgage',
          nationality: JSON.parse(values.nationality).name
        },
          appRef
      );
      if (!appRef && res.app_ref) dispatch(applicationActions[applicationTypes.SET_APP_REF](res.app_ref));
      goToNextComponent();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Wrapper>
      {/* <NewDatePicker /> */}
      <Formik
        onSubmit={handleSubmit}
        initialValues={{...rest, email}}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => {
          const nationality = values.nationality || '{}';
          const states = statesList[JSON.parse(nationality).id] || [];
          return (
            <Form>
              <div className='container'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <span>Hi Olumide Olorundare</span>
                      <p className="mt-2">
                        Ordinary Mortgage | Personal Info
                      </p>
                      <div className="form-group row">
                        <div className="col-md-6 col-sm-12 form-group">
                          <WrappedInputWithError
                            type="text"
                            name='firstname'
                            value={values.firstname}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            First Name
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='lastname'
                            placeholder=""
                            value={values.lastname}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Last Name
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='middlename'
                            placeholder=""
                            value={values.middlename}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">Middle Name</label>
                        </div>

                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='mother_middle_name'
                            placeholder=""
                            value={values.mother_middle_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Mother's Maiden Name
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-12 form-group'>
                         
                          <WrappedInputWithError
                            type="text"
                            placeholder="Address..."
                            name="address"
                            value={values.address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                           <label className="form-label">
                            Address
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedInput
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder=""
                            // disabled
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Email
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className='col-md-4 col-sm-12 form-group'>
                         
                          <WrappedInputWithError
                            type="text"
                            name='phone'
                            value={values.phone}
                            placeholder="Phone..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                           <label className="form-label">
                            Phone
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedInput
                            name='age'
                            type="number"
                            value={values.age}
                            // disabled
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Age
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            name='sex'
                            options={sexes}
                            value={values.sex}
                            placeholder='Sex...'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Sex
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="text"
                            name='place_of_birth'
                            value={values.place_of_birth}
                            placeholder="Place of birth..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Place of Birth
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            textKey='name'
                            name='nationality'
                            options={countries}
                            value={values.nationality}
                            placeholder=""
                            extractValue={({ id, name }) => JSON.stringify({ id, name })}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Nationality
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            textKey='name'
                            options={states}
                            name='state_of_origin'
                            value={values.state_of_origin}
                            extractValue={({ name }) => name}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          /> 
                          <label className="form-label">
                            State of Origin
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            name='highest_education'
                            value={values.highest_education}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            options={[
                                'BSc',
                                'Ba',
                                'Msc',
                                'PhD',
                                'Doctoral degree',
                                'Master\'s degree',
                                'Higher National Diploma',
                                'Bachelor\'s degree with honours',
                                'Non-honours Bachelor\'s degree',
                                'Higher National Certificate'
                              ]}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Highest Education
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-4 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="text"
                            name="profession"
                            value={values.profession}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Profession
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-3 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            // textKey='name'
                            // options={idCards}
                            options={[
                              'International passport',
                              'National ID',
                              'Permanent Voters card',
                              'Drivers liscense',
                              'INEC Registration Card'
                            ]}
                            // extractValue={({ id }) => id}
                            name='means_of_identification'
                            value={values.means_of_identification}
                            placeholder="Please choose a qualification"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Identification
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className='col-md-3 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="text"
                            name='id_number'
                            value={values.id_number}
                            placeholder="ID Number..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            ID Number
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className='col-md-3 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            name='id_issue_date'
                            placeholder="DD/MM/YYYY"
                            value={values.id_issue_date}
                            // append={<FontAwesomeIcon color='gray' icon={faCalendarAlt} />}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            ID Issue Date
                            <sup>*</sup>
                          </label>
                          {/* <v-menu
                            v-model="idIssueMenu"
                            //:close-on-content-click="false"
                            //:nudge-right="40"
                            //transition="scale-transition"
                            //offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <input
                                v-model="bareIdIssue"
                                placeholder="DD/MM/YYYY"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[rules.required('ID issue date')]"
                                required
                              ></input>
                            </template>
                            <v-date-picker
                              show-current
                              color="#3B937A"
                              v-model="id_issue_date"
                              :max="today"
                              @input="idIssueMenu = false"
                            ></v-date-picker>
                          </v-menu> */}
                        </div>

                        <div className='col-md-3 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            name='id_expire_date'
                            placeholder="DD/MM/YYYY"
                            value={values.id_expire_date}
                            // append={<FontAwesomeIcon color='gray' icon={faCalendarAlt} />}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            ID Expiry Date
                            <sup>*</sup>
                          </label>
                          {/* <v-menu
                            v-model="idExpiryMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <input
                                v-model="bareIdExpiry"
                                placeholder="DD/MM/YYYY"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[rules.required('ID expiry date')]"
                                required
                              ></input>
                            </template>
                            <v-date-picker
                              show-current
                              color="#3B937A"
                              v-model="id_expire_date"
                              @input="idExpiryMenu = false"
                              :min="tomorrow"
                            ></v-date-picker>
                          </v-menu> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-5'>
                  <div className='col-md-6 px-3'>
                    <button
                      disabled={isSubmitting}
                      className='w-100 item-btn mb-3'
                      onClick={() => setActiveTab(1)}
                    >
                      back
                    </button>
                  </div>
                  <div className="col-md-6 px-3">
                    <button
                      type="submit"
                      className='w-100'
                      disabled={isSubmitting}
                    >
                      {
                        isSubmitting ? (
                          <ButtonSpinner />
                        ) : 'submit'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};


const mapStateToProps = ({ application, currentUser, affordability }, ownProps) => {
  const {
    app_ref, firstname, lastname, middlename, mother_middle_name, highest_education,
    address, email, phone, age, sex, place_of_birth, nationality, profession, means_of_identification,
    id_number, id_issue_date, id_expire_date, state_of_origin, isNhf
  } = { ...currentUser, ...application, ...affordability };
  return {
    app_ref, firstname, lastname, middlename, mother_middle_name, highest_education, address,
    email, phone, age, sex, place_of_birth, nationality, profession, state_of_origin, isNhf,
    means_of_identification, id_number, id_issue_date, id_expire_date, ...ownProps
  }
};
 
export default connect(mapStateToProps)(PersonalInfoFormStepOne);

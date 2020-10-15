import React, {Component, createRef} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import LoginForm from "../Header/LoginForm";
import MobileNavigation from "../HomePage/MobileNavigation";

import FinancePlusLogo from "../Resource/finance-plus-long.png";
import * as Icon from "react-feather";

import login from "../../store/middlewares/login";
import signup from "../../store/middlewares/signup";
import ProgressBar from "../NProgress";
import setIsAuthenticated from "../../store/actions/setIsAuthenticated";
import setErrors from "../../store/actions/setErrors";
import BrowserStorage from "../../utils/browserStorageUtils";
import {logout} from "../../utils/dashboardUtils";
import setLoading from "../../store/actions/setLoading";
import TrackFormResult from "../Header/TrackFormResult";
import TrackForm from "../Header/TrackForm";
import {redirectUserWhenNotLoggedIn} from "../../utils/authFormUtils";

class HeaderPageHeader extends Component {
  state = {applicationTrackResult: null, menuVisibility: false};

  constructor(props) {
    super(props);
    this.trackResultModalLink = createRef();
  }

  componentDidMount() {
    const token = BrowserStorage.getUserToken();
    if (token) this.props.setIsAuthenticated(true);
    else
      redirectUserWhenNotLoggedIn(
        this.props.history,
        this.props.setIsAuthenticated
      );
  }

  /**
   * Handles click event on log out button
   * @param {DOMEvent} event
   */
  handleLogout = event => {
    event.preventDefault();
    logout(this.props.setIsAuthenticated, this.props.history);
  };

  toggleMenu = () => {
    this.setState({
      menuVisibility: !this.state.menuVisibility
    });
  };

  /**
   * Finds a DOM node in the header and simulates a click on it
   * @param {string} selector
   */
  clickNavItem = selector =>
    ReactDOM.findDOMNode(this)
      .querySelector(selector)
      .click();

  render() {
    const {applicationTrackResult} = this.state;
    const {
      login,
      history,
      isAuthenticated,
      isLoading,
      errors,
      setErrors,
      setLoading
    } = this.props;
    const userData = BrowserStorage.getUserData();
    const {initials, usertype} = userData;
    return (
      <div className='fp-mortgage-header'>
        <ProgressBar isLoading={isLoading} />
        {this.state.menuVisibility ? (
          <MobileNavigation toggleMenu={this.toggleMenu} />
        ) : (
          ""
        )}

        <nav
          id='nav-scroll'
          className='navbar navbar-expand-md navbar-dark navbar-light bg-white landing-page-nav'
        >
          <div className='container'>
            <Link to='/'>
              <img
                className='navbar-brand'
                src={FinancePlusLogo}
                alt='Finance Plus'
              />
            </Link>

            <div className='fp-mortgage-application-mobile-landscape-view'>
              <span onClick={this.toggleMenu}>
                <Icon.AlignJustify size='28px' color='#00b1ab' />
              </span>
            </div>

            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarText'
              aria-controls='navbarText'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarText'>
              <ul className='navbar-nav ml-auto navigation'>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    title='Home Loans'
                    rel='noopener noreferrer'
                    to='/mortgage/application-type'
                  >
                    Home Loans
                  </Link>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    title='Track My Application'
                    rel='noopener noreferrer'
                    href='#modalTrackApplication'
                    data-toggle='modal'
                  >
                    Track My Application
                  </a>

                  <a
                    className='nav-link'
                    ref={this.trackResultModalLink}
                    title='My Application Track Result'
                    rel='noopener noreferrer'
                    href='#modalTrackApplicationResult'
                    data-toggle='modal'
                  >
                    {""}
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    title=' About Us'
                    href='/company/about'
                  >
                    About Us
                  </a>
                </li>
                {/* <li className='nav-item'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='nav-link'
                    href='/'
                  >
                    Learn
                  </a>
                </li> */}
                <li className='nav-item'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='nav-link'
                    href='/contact'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              {isAuthenticated ? (
                <ul className='navbar-nav ml-auto navigation'>
                  <li className='navbar-item fp-mortgage-notification-chat-profile-wrapper'>
                    <div className='fp-divider'></div>
                    <div className='fp-mortgage-user-profile-wrapper'>
                      <div className='fp-mortgage-user-avatar'>
                        <span className='fp-user-avatar-initial rounded-circle'>
                          {initials}
                        </span>
                      </div>
                      <div className=''>
                        <Link
                          className='navbar-nav-link'
                          to='/'
                          role='button'
                          data-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <Icon.MoreVertical color='#b9b7b7' />
                        </Link>
                        <div
                          className='dropdown-menu dropdown-menu-right dropdown-menu-arrow fp-mortgage-dropdown'
                          x-placement='bottom-end'
                        >
                          <Link
                            className='dropdown-item'
                            to={`/${usertype}/dashboard`}
                          >
                            <Icon.User
                              color='#555555'
                              size='18'
                              className='mr-2'
                            />
                            My Account
                          </Link>
                          <Link
                            className='dropdown-item'
                            to='/'
                            onClick={this.handleLogout}
                          >
                            <Icon.LogOut
                              color='#555555'
                              size='18'
                              className='mr-2'
                            />
                            Sign out
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav ml-auto navigation'>
                  <li className='nav-item'>
                    <a
                      className='btn-landing-login'
                      href='#modalSignIn'
                      data-toggle='modal'
                      rel='noopener noreferrer'
                    >
                      Sign In
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>

        <div
          className='modal fade'
          id='modalTrackApplicationResult'
          role='dialog'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-lg modal-dialog-centered'
            role='document'
          >
            <TrackFormResult {...applicationTrackResult} />
          </div>
        </div>

        <div
          className='modal fade show'
          id='modalTrackApplication'
          role='dialog'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-md modal-dialog-centered'
            role='document'
          >
            <TrackForm
              {...{
                setErrors,
                isLoading,
                setLoading,
                parentComponent: this,
                trackResultModalLink: this.trackResultModalLink
              }}
            />
          </div>
        </div>

        <div
          className='modal fade'
          id='modalSignIn'
          role='dialog'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-dialog-centered wd-sm-400'
            role='document'
          >
            <LoginForm
              {...{
                login, history, errors, setErrors, clickNavItem: this.clickNavItem
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ root: state }, ownProps) => {
  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    errors: state.errors,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login(data, submitButton, historyObject) {
      dispatch(login(data, submitButton, historyObject));
    },
    signup(data, submitButton, historyObject) {
      dispatch(signup(data, submitButton, historyObject));
    },
    setIsAuthenticated(isAuthenticated) {
      dispatch(setIsAuthenticated(isAuthenticated));
    },
    setErrors(errors) {
      dispatch(setErrors(errors));
    },
    setLoading(isLoading) {
      dispatch(setLoading(isLoading));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderPageHeader);

import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';
import { registerNewUser } from '../actions/auth';

class Register extends React.Component {
  
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        successMsg: '',
        errorMsg: '',
        isSubmitted: false
    };

       //Lifecycle methods for mounting and updating
       componentDidUpdate(prevProps){
        if (!_.isEqual(prevProps.errors, this.props.errors)){
            this.setState({ errorMsg: this.props.errors });
        }
      }
        componentWillUnmount() {
          this.props.dispatch(resetErrors());
      }

    /** Register a user and check if fields are filled.
     * Event handler method
     * @param {*} event 
     */
    registerUser = (event) => {
        event.preventDefault();
        const { first_name, last_name, email, password, confirm_password } = this.state;

        const fieldsToValidate = [
            { first_name },
            { last_name },
            { email },
            { password },
            { confirm_password },
        ];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if(!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    signup_error: 'Please field in all the fields.'
                }
            });
        } else {
            if (password !== confirm_password) {
                this.setState({
                    errorMsg: {
                        signup_error: 'Passwords do not match.'
                    }
                });
        } 
        
        else {
            this.setState({isSubmitted: true});
            this.props
            .dispatch(registerNewUser({
              first_name, last_name, email, password
            }))
            .then((response) => {
              if (response.success) {
                this.setState({
                  successMsg:'Registration successful.',
                  errorMsg: ''
                });
              }
            });
          }
        }
    };

handleInputChange = (event) => {
    const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

render() {
    const { errorMsg, successMsg, isSubmitted } = this.state;
    return (
    <div className="login-page">
            <h2>
             Register User   
            </h2>
            <div className="login-form">
                <Form onSubmit={this.registerUser}>
                    {errorMsg && errorMsg.signup_error ? (
                        <p className="errorMsg centered-message">
                            {errorMsg.signup_error}
                        </p>
                    ) : (
                        isSubmitted && (
                        <p className="successMsg centered-message">{successMsg}</p>
                        )
                    )}
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter your last name..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email (hardworker@mail.com)..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="confirm_password">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                placeholder="Confirm password here..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
                    <Button variant="primary" type="submit">
                    Register
                    </Button>
                    <Link to="/" className="btn btn-secondary">
                      Login
                    </Link> 
                </div>
            </Form>
        </div>
    </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Register);
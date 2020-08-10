import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { resetErrors } from '../actions/errors';
import { initiateLogin } from '../actions/auth';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMsg: '' // login error message 
    };

    //Lifecycle methods for mounting and updating
    componentDidUpdate(prevProps){
    if (!_.isEqual(prevProps.errors, this.props.errors))
    {
        this.setState({ errorMsg: this.props.errors });
    }

    }

    componentWillUnmount() {
        this.props.dispatch(resetErrors());
    }

    /** Handle the login event.
     * @param {*} event 
     */
    handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const fieldsToValidate = [{ email }, { password }];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    signin_error: 'Please fill in all the fields.'
                }
            });
        } else {
            this.setState({
                errorMsg: {
                    signin_error: ''
                }
            });
            //login successful
            this.props.dispatch(initiateLogin(email,password));
        }
    };

    /** takes care of anything change in input and sets the state. 
     * @param {*} event 
     */
    handleInputChange = (event) => {
        const { name, value } = event.target;

        
        this.setState({
            [name]: value
        });
    };
//
render() {
    const { errorMsg } = this.state;
    return (
        <div className="login-page">
            <h1>Moolah Banking App</h1>
            <div className="login-form">
                <Form onSubmit={this.handleLogin}>
                    {errorMsg && errorMsg.signin_error && (
                        <p className="errorMsg center-message">
                            {errorMsg.signin_error}
                        </p>
                    )}                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email"
                        name="email" 
                        placeholder="Enter email..."
                        onChange={this.handleInputChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password"
                        name="password" 
                        placeholder="Enter password..." 
                        onChange = {this.handleInputChange}
                        />
                    </Form.Group>
                    <div className= "action-items">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <Link to="/register" className = "btn btn-secondary">
                        Create Account
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

export default connect(mapStateToProps)(Login);
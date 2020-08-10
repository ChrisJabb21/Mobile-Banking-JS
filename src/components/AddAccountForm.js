import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';

class AddAccountForm extends React.Component{
    state = {
        account_no: '',
        errorMsg: '',
    }

    comoponentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.errors, this.props.errors)){
            this.setState({ errorMsg: this.props.errors });
        }
    }

    handleInputChange = (event) => {
        const {name, value } =event.target;
        this.setState({
            [name]: value
        });
    };

    handleAddAccount = (event) => {
        event.preventDefault();
        const { account_no } = this.state;
        const fieldsToValidate = [{ account_no }];
        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
          this.setState({
            errorMsg: {
              add_error: 'Please fill in your account number for your account.'
            }
          });
        } else {
          this.props.handleAddAccount(this.state);
        }
      };

render() {
    const { account_no, errorMsg } = this.state;
    return (
      <div className="edit-account-form  col-md-6 offset-md-3">
        <Form onSubmit={this.handleAddAccount} className="account-form">
          {errorMsg && errorMsg.add_error && (
            <p className="errorMsg centered-message">{errorMsg.add_error}</p>
          )}
          <Form.Group controlId="type">
            <Form.Label>Add account</Form.Label>
          </Form.Group>
          <hr />
          <Form.Group controlId="accnt_no">
            <Form.Label>Account number: </Form.Label>
            <Form.Control
              type="number"
              name="account_no"
              placeholder="Enter your account number"
              value={account_no}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    errors: state.errors
  });
  
  export default connect(mapStateToProps)(AddAccountForm);

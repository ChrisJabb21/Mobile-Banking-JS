import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { validateFields } from '../utils/common';
import _ from 'lodash';
import {
  initiateGetAccntDetails,
  initiateAddAccntDetails,
  initiateUpdateAccntDetails
} from '../actions/account';

import { initiateWithdrawAmount, initiateDepositAmount } from '../actions/transactions' 

import { resetErrors } from '../actions/errors';
import { maskNumber } from '../utils/mask';
import  AddAccountForm  from './AddAccountForm';

class AccountForm extends React.Component {


    state = {
        amount: '',
        account: this.props.account,
        editAccount: false,
        account_no: '',
        errorMsg: ''
    };

    componentDidMount() {
        const { email } = this.props;
        if (email) {
          this.props.dispatch(initiateGetAccntDetails());
        }
    }

    componentWillUnmount() {
      this.props.dispatch(resetErrors());
    }

    componentDidUpdate(prevProps) {
      if(!_.isEqual(prevProps.account, this.props.account)) {
        this.setState({ account: this.props.account});
      }
      if(!_.isEqual(prevProps.errors,this.props.errors)){
        this.setState({errorMsg: this.props.error});
        }
      } 

      handleUpdateAccount = (account_no) => {
        const fieldsToValidate = [{ account_no }];
    
        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
          this.setState({
            errorMsg: {
              update_error: 'Please enter account number.'
            }
          });
        } else {
          this.setState({
            errorMsg: ''
          });
          this.props.dispatch(initiateUpdateAccntDetails(account_no));
        }
      };
    
    
    handleAmountChange = (event) => {
        this.setState({ amount: event.target.value });
      };
    
    handleEditAccount = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({ editAccount: !prevState.editAccount }));
      };

    handleOnSubmit = (event) => {
      event.preventDefault();
      let { amount, account } = this.state;

      const { selectedType } = this.props;
      const fieldsToValidate = [{ amount }];

      const allFieldsEntered = validateFields(fieldsToValidate);

      if(!allFieldsEntered) {
          this.setState({
            errorMsg: {
              [selectedType === 'withdraw' 
              ? 'withdraw_error' : 'add_error']: 'Please enter an amount.'
            }
          });
        } else {
        let { total_balance } = account;
        amount = +amount;
        total_balance = +total_balance; //Unary plus operater to convert variables to numbers.
      //if amount is less or equal to balance
      
      if(selectedType === 'withdraw' && amount <= total_balance) {
        this.props.dispatch(initiateWithdrawAmount(account.account_id, amount));
        this.setState({
          errorMsg: ''
        });
      } else if (selectedType === 'deposit') {
        this.props.dispatch(initiateDepositAmount(account.account_id, amount));
        this.setState({
        errorMsg: ''
      });
    } else {
      this.setState({ 
      errorMsg: {
        [selectedType === 'withdraw' ? 'withdraw_error' : 'add_error']: "You don't have enough balance in your account"
      }
      });
    }
  }
};

handleAddAccount = (account) => {
  const {account_no} = account;
  this.props
    .dispatch(initiateAddAccntDetails(account_no))
    .then(() => this.props.dispatch(initiateGetAccntDetails()));
};


render() {
  const { selectedType } = this.props;
  const { editAccount, errorMsg, account } = this.state;
  const account_no = account.account_no ? maskNumber(account.account_no) : '';
  const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  return account_no ? (
    editAccount ? (
      <div className="edit-account-form  col-md-6 offset-md-3">
        <h3>
          Account details
          <a
            href="/#"
            className="edit-account"
            onClick={this.handleEditAccount}
          >
            Go Back
          </a>
        </h3>
        <hr />
        <Form>
          {errorMsg && errorMsg.update_error && (
            <p className="errorMsg">{errorMsg.update_error}</p>
          )}
          <Form.Group controlId="acc_no">
            <Form.Label>Account number:</Form.Label>
            <span className="label-value">{account && account_no}</span>
          </Form.Group>
        
          <Button
            variant="primary"
            onClick={() => this.handleUpdateAccount(account_no)}
          >
            Update details
          </Button>
        </Form>
      </div>
    ) : (
      <div className="account-form col-md-6 offset-md-3">
        {errorMsg && errorMsg.withdraw_error && (
          <p className="errorMsg">{errorMsg.withdraw_error}</p>
        )}
        {errorMsg && errorMsg.add_error && (
          <p className="errorMsg">{errorMsg.add_error}</p>
        )}
        <Form onSubmit={this.handleOnSubmit} className="account-form">
          <Form.Group controlId="type">
            <Form.Label>{type}</Form.Label>
            <a
              href="/#"
              className="edit-account"
              onClick={this.handleEditAccount}
            >
              Edit Account Details
            </a>
          </Form.Group>
          <hr />
          <Form.Group controlId="accnt_no">
            <Form.Label>Account number: </Form.Label>
            <span className="label-value">{account && account_no}</span>
          </Form.Group>
          <Form.Group controlId="accnt_no">
            <Form.Label>Available balance: </Form.Label>
            <span className="label-value">
              {account && account.total_balance}
            </span>
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder={`Enter amount to ${selectedType}`}
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  ) : (
    <AddAccountForm handleAddAccount={this.handleAddAccount} />
  );
}
}

const mapStateToProps = (state) => ({
  email: state.auth && state.auth.email,
  account: state.account,
  errors: state.errors
});

export default connect(mapStateToProps)(AccountForm);
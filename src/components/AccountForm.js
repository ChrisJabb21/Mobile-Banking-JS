import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {
    render() {
        return (
            <div>
                <p>Account form</p>
            </div>
        );
    }
}

export default connect()(AccountForm);

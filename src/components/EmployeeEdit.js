import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.forEach(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextpress() {
    const { name, phone, shift } = this.props;
    Communications.text(phone, `Hi ${name}, your upcoming shift is ${shift}`);
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onAccept() {
    const { uid } = this.props.employee
    this.props.employeeDelete({ uid });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextpress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

      <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire
          </Button>
        </CardSection>

        <Confirm 
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
            Are you sure you want to fire this employee?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(
  EmployeeEdit
);


import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { employeeUpdate, employeeCreate } from '../actions';

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class EmployeeForm extends Component {

  renderPickerItems() {
   return Days.map(day => {
     return <Picker.Item key={day} label={day} value={day} />;
    });
  }


  render() {
    const { name, phone, shift } = this.props;
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="First Last"
            value={name}
            onChangeText={text => this.props
                .employeeUpdate({ prop: 'name', value: text })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="###-###-####"
            value={phone}
            onChangeText={text => this.props
                .employeeUpdate({ prop: 'phone', value: text })
            }
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}> Select Shift </Text>
          <Picker
            style={{ flex: 0 }}
            selectedValue={this.props.shift}
            onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
          >
           {this.renderPickerItems()}
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};


export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);

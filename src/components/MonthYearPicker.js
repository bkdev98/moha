import React, { Component } from 'react';
import { View, Picker, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default class MonthYearPicker extends Component {
  constructor(props) {
    super(props);
    let { startYear, endYear, selectedYear, selectedMonth, visiable } = props;
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths();
    selectedYear = selectedYear || years[0];
    selectedMonth = selectedMonth || new Date().getMonth() + 1;
    this.state = {
      years,
      months,
      selectedYear,
      selectedMonth,
      visiable: visiable || false,
    };
  }

  show = async ({ startYear, endYear, selectedYear, selectedMonth }) => {
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths();
    selectedYear = selectedYear || years[0];
    selectedMonth = selectedMonth || new Date().getMonth() + 1;
    let promise = new Promise(resolve => {
      this.confirm = (year, month) => {
        resolve({
          year,
          month,
        });
      };
      this.setState({
        visiable: true,
        years,
        months,
        startYear,
        endYear,
        selectedYear,
        selectedMonth,
      });
    });
    return promise;
  };

  dismiss = () => {
    this.setState({
      visiable: false,
    });
  };

  getYears = (startYear, endYear) => {
    startYear = startYear || new Date().getFullYear();
    endYear = endYear || new Date().getFullYear();
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };

  getMonths = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  };

  renderPickerItems = data => {
    let items = data.map((value, index) => {
      return <Picker.Item key={'r-' + index} label={'' + value} value={value} />;
    });
    return items;
  };

  onCancelPress = () => {
    this.dismiss();
  };

  onConfirmPress = () => {
    const confirm = this.confirm;
    const { selectedYear, selectedMonth } = this.state;
    confirm && confirm(selectedYear, selectedMonth);
    this.dismiss();
  };

  render() {
    const { years, months, selectedYear, selectedMonth, visiable } = this.state;
    if (!visiable) return null;
    return (
      <>
        <TouchableOpacity style={styles.modal} onPress={this.onCancelPress} />
        <View style={styles.outerContainer}>
          <View style={styles.toolBar}>
            <TouchableOpacity style={styles.toolBarButton} onPress={this.onCancelPress}>
              <Text style={styles.toolBarButtonText}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.toolBarButton} onPress={this.onConfirmPress}>
              <Text style={styles.toolBarButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={selectedYear}
              onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}>
              {this.renderPickerItems(years)}
            </Picker>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={selectedMonth}
              onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}>
              {this.renderPickerItems(months)}
            </Picker>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  outerContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 101,
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#EBECED',
  },
  toolBarButton: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  toolBarButtonText: {
    fontSize: 16,
    color: '#4a4944',
    fontFamily: 'playfair-regular',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Platform.OS === 'android' ? 15 : 0,
  },
  picker: {
    flex: 1,
    height: Platform.OS === 'android' ? 100 : '100%',
  },
  pickerItem: {
    fontFamily: 'major-mono',
    fontSize: 18,
  },
});
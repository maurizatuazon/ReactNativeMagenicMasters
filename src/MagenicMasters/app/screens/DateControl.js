import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    Switch,
    DatePickerIOS,
    TouchableNativeFeedback,
    DatePickerAndroid,
    Platform
} from "react-native";

export default class DateControl extends Component {
    constructor(props) {
        super(props);
        this.state = { settings: this.props.settings };
    }

    dateChanged = newDate => {
        this.setState({
            settings: {
                ...this.state.settings,
                createDate: newDate
            }
        });
    };

    setDate = async () => {
        try {
            const dateChanged = this.dateChanged;
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.settings.createDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                dateChanged(new Date(year, month, day));
            }
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {Platform.OS === "ios" && (
                    <DatePickerIOS
                        style={{ flex: 1 }}
                        date={this.props.settings.createDate}
                        mode="date"
                        onDateChange={this.dateChanged}
                    />
                )}
                {Platform.OS === "android" && (
                    <TouchableNativeFeedback
                        style={{ flex: 1 }}
                        onPress={() => this.setDate()}
                    >
                        <Text style={{ flex: 1, textAlign: "right" }}>
                            {this.props.settings.createDate.toDateString()}
                        </Text>
                    </TouchableNativeFeedback>
                )}
            </View>
        );
    }
}

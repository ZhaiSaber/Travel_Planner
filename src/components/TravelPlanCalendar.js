import React from 'react';
import { Modal, Calendar, message } from 'antd';
import moment from 'moment';

export default class TravelPlanCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarStartDateValue : moment(props.startDate),
            calendarEndDateValue : moment(props.endDate),
        }
    }
    onSelectStartDate = (value) => {
        this.setState({
            calendarStartDateValue : value,
        });
    }
    onSelectEndDate = (value) => {
        this.setState({
            calendarEndDateValue : value,
        });
    }
    confirmCalendar = () => {
        const startDate = this.state.calendarStartDateValue.format('YYYY-MM-DD');
        const endDate = this.state.calendarEndDateValue.format('YYYY-MM-DD');
        if (startDate > endDate) {
            message.error("Start date cannot be later than end date.");
            return false;
        }
        this.props.App.handleTravelPlanCalendarConfirm(
            startDate, 
            endDate
            );
    }
    cancelCalendar = () => {
        this.props.App.handleTravelPlanCalendarCancel();
    }
    onPanelChangeStartDate = (value) => {
        this.setState({
            calendarStartDateValue : value,
        });
    }
    onPanelChangeEndDate = (value) => {
        this.setState({
            calendarEndDateValue : value,
        });
    }
    render() {
        const App = this.props.App;
        return (
            <div>
                <Modal
                    title="Pick the date range (no more than 15 days):"
                    visible={this.props.visible}
                    onOk={this.confirmCalendar}
                    onCancel={this.cancelCalendar}
                    >
                    <Calendar 
                        value={this.state.calendarStartDateValue} 
                        fullscreen={false} 
                        onSelect={this.onSelectStartDate}
                        onPanelChange={this.onPanelChangeStartDate}
                        />
                    <Calendar 
                        value={this.state.calendarEndDateValue} 
                        fullscreen={false} 
                        onSelect={this.onSelectEndDate}
                        onPanelChange={this.onPanelChangeEndDate}
                        />
                </Modal>
            </div>
        );
    }
}
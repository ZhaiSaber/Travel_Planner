import React from 'react';
import { Modal, Input, message } from 'antd';

export default class TravelPlanDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
        }
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
            });
            this.props.App.handleTravelPlanCreateConfirm();
        }, 2000);
    }

    handleCancel = () => {
        this.props.App.handleTravelPlanCreateCancel();
    }

    render() {
        return (
            <Modal
                title="Please create a name for the travel plan:"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <Input placeholder="Enter the name of the travel plan" />
            </Modal>
        );
    }
}
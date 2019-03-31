import React from 'react';
import '../styles/Header.css';
import { Button, Icon, Modal, message } from 'antd';
import { Register } from './Register';
import { Login } from "./Login";

const signup = (<Button type="primary">Sign up</Button>);
const login = (<Button>Log in</Button>);

class Header extends React.Component {
    state = {
        isLoginModal: false,
        isRegisterModal: false,
    }

    showLoginModal = () => {
        this.setState({
            isLoginModal: true,
        });
    }

    onCancelLoginModal = () => {
        this.setState({
            isLoginModal: false,
        });
    }

    showRegisterModal = () => {
        this.setState({
            isRegisterModal: true,
        });
    }

    onCancelRegisterModal = () => {
        this.setState({
            isRegisterModal: false,
        });
    }

    onSubmitRegister = () => {
        message.success("Register sent.");
        this.setState({
            isRegisterModal: false,
        });
        this.onSubmitLogin();
    }

    onSubmitLogin = () => {
        message.success("Login sent.");
        this.props.handleLogin("Test token");
        this.setState({
            isLoginModal: false,
        });
    }

    render() {
        return (
            <header id="header">
                {this.props.isLoggedIn ?
                    <Button onClick={this.props.handleLogout}>
                        <Icon type="logout" />{' '}Logout
                    </Button> :
                    <div>
                        <Button onClick={this.showRegisterModal}>
                            <Icon type="signup" />{' '}Sign up
                        </Button>
                        <Button onClick={this.showLoginModal}>
                            <Icon type="login" />{' '}Log in
                        </Button>
                    </div>
                }
                {this.state.isLoginModal ?
                    (
                        <Modal
                            title="Login"
                            visible={this.state.isLoginModal}
                            onOk={this.onSubmitLogin}
                            onCancel={() => {
                                this.onCancelLoginModal();
                            }}
                            footer={[
                                <Button key="login" type="primary" onClick={this.onSubmitLogin}>
                                    Log in
                            </Button>,
                                <Button key="signup" onClick={() => {
                                    this.onCancelLoginModal();
                                    this.showRegisterModal();
                                }}>
                                    Sign up
                            </Button>,
                            ]}
                        >
                            <Login />
                        </Modal>) : null
                }
                {this.state.isRegisterModal ?
                    (<Modal
                        title="Registration Form"
                        visible={this.state.isRegisterModal}
                        onOk={this.onSubmitRegister}
                        onCancel={this.onCancelRegisterModal}>
                        <Register />
                    </Modal>) : null
                }
            </header>

        );
    }
}

export default Header;
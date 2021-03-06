import React from "react";
import CallApi from "../../../api/api";
// import { AppContext } from "../../App"
import AppContextHOC from "../../HOC/AppContextHOC"


class LoginForm extends React.Component {
    state = {
        username: "irastr",
        password: "str14795",
        repeatPassword: "str14795",
        errors: {},
        submitting: false
    };

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                base: null,
                [name]: null
            }
        }));
    };

    handleBlur = (event) => {

        const errors = this.validateFields(event.target.name);

        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        }
    };

    validateFields = (name) => {
        const errors = {};

        if (this.state[name] === "") {
            errors[name] = "Not empty";
        }

        if ((this.state.repeatPassword) && (this.state.password !== this.state.repeatPassword)) {
            errors.repeatPassword = "Must be equal password";
        }

        return errors;
    };

    onSubmit = () => {
        this.setState({
            submitting: true
        });
        CallApi.get("/authentication/token/new")
            // fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
            .then(data => {
                return CallApi.post("/authentication/token/validate_with_login", {
                    body: {
                        username: this.state.username,
                        password: this.state.password,
                        request_token: data.request_token
                    }
                })


            })
            .then(data => {
                return CallApi.post("/authentication/session/new", {
                    body: {
                        request_token: data.request_token
                    }
                })

            })
            .then(data => {
                const { updateSessionId } = this.props
                updateSessionId(data.session_id);

                return CallApi.get("/account", {
                    params: {
                        session_id: data.session_id
                    }
                })


            })
            .then(user => {
                const { updateUser, getFavoritesWatchlist } = this.props
                updateUser(user);
                // updateUserSessionId(user)
                // getFavoritesWatchlist();

                this.setState({
                    submitting: false
                });
                this.props.toggleModal()

            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    submitting: false,
                    errors: {
                        base: error.status_message
                    }
                });
            });
    };

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        } else {
            this.onSubmit();
        }
    };

    render() {
        const { username, password, repeatPassword, errors, submitting } = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
          </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="repeatPassword">Повторите пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Повторите пароль"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback">{errors.repeatPassword}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        {submitting ? "Выполняется вход..." : "Вход"}
                    </button>
                    {errors.base && (
                        <div className="invalid-feedback text-center">{errors.base}</div>
                    )}
                </form>
            </div>
        );
    }
}



export default AppContextHOC(LoginForm);
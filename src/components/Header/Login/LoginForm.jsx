import React from "react";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ formStore }) => ({
  loginValues: formStore.loginValues,
  onChange: formStore.onChange,
  handleBlur: formStore.handleBlur,
  errors: formStore.errors
}))
@observer
class LoginForm extends React.Component {
  state = {
    submitting: false
  };

  // onSubmit = () => {
  //   this.setState({
  //     submitting: true
  //   });
  //   CallApi.get("/authentication/token/new")
  //     .then(data => {
  //       return CallApi.post("/authentication/token/validate_with_login", {
  //         body: {
  //           username: this.state.username,
  //           password: this.state.password,
  //           request_token: data.request_token
  //         }
  //       });
  //     })
  //     .then(data => {
  //       return CallApi.post("/authentication/session/new", {
  //         body: {
  //           request_token: data.request_token
  //         }
  //       });
  //     })
  //     .then(data => {
  //       const { updateSessionId } = this.props;
  //       updateSessionId(data.session_id);

  //       return CallApi.get("/account", {
  //         params: {
  //           session_id: data.session_id
  //         }
  //       });
  //     })
  //     .then(user => {
  //       const { updateUser } = this.props;
  //       updateUser(user);
  //       this.setState({
  //         submitting: false
  //       });
  //       this.props.toggleModal();
  //     })
  //     .catch(error => {
  //       console.log("error", error);
  //       this.setState({
  //         submitting: false,
  //         errors: {
  //           base: error.status_message
  //         }
  //       });
  //     });
  // };

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
    const { submitting } = this.state;
    const { onChange, loginValues, handleBlur, errors } = this.props;
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
              value={loginValues.username}
              onChange={onChange}
              onBlur={handleBlur}
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
              value={loginValues.password}
              onChange={onChange}
              onBlur={handleBlur}
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
              value={loginValues.repeatPassword}
              onChange={onChange}
              onBlur={handleBlur}
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

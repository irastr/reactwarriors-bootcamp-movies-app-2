import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ formStore }) => ({
  loginValues: formStore.loginValues,
  onChange: formStore.onChange,
  handleBlur: formStore.handleBlur,
  validateFields: formStore.validateFields,
  chainPromises: formStore.chainPromises
}))
@observer
class LoginForm extends React.Component {
  onLogin = event => {
    event.preventDefault();
    const errors = this.props.validateFields();
    console.log(this.props.errors, "errors from state");
    console.log(errors, "errors from function");
    if (Object.keys(errors).length > 0) {
      this.props.loginValues.errors = errors;
    } else {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    const { updateUser, updateSessionId, toggleModal } = this.props;
    const callback = (user, session_id) => {
      updateUser(user);
      updateSessionId(session_id);
      toggleModal();
    };
    this.props.chainPromises(callback);
  };

  render() {
    const { onChange, loginValues, handleBlur } = this.props;
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
            {loginValues.errors.username && (
              <div className="invalid-feedback">
                {loginValues.errors.username}
              </div>
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
            {loginValues.errors.password && (
              <div className="invalid-feedback">
                {loginValues.errors.password}
              </div>
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
            {loginValues.errors.repeatPassword && (
              <div className="invalid-feedback">
                {loginValues.errors.repeatPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={loginValues.submitting}
          >
            {loginValues.submitting ? "Выполняется вход..." : "Вход"}
          </button>
          {loginValues.errors.base && (
            <div className="invalid-feedback text-center">
              {loginValues.errors.base}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);

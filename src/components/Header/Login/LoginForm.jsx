import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ formStore }) => ({
  formStore
}))
@observer
class LoginForm extends React.Component {
  render() {
    const {
      formStore: {
        onChange,
        loginValues,
        handleBlur,
        submitting,
        errors,
        onLogin
      }
    } = this.props;
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
            onClick={onLogin}
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

export default LoginForm;

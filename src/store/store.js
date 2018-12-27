import { observable, action } from "mobx";
import CallApi from "../api/api";

export default class Store {
  @observable
  loginValues = {
    username: "irastr",
    password: "str14795",
    repeatPassword: "str14795",
    submitting: false,
    errors: {}
  };

  @action
  onChange = event => {
    this.loginValues[event.target.name] = event.target.value;
    this.loginValues.errors[event.target.name] = null;
    this.loginValues.errors.base = null;
  };

  validateFields = name => {
    const errors = {};
    if (this.loginValues.username === "") {
      this.loginValues.errors.username = "Поле не должно быть пустым";
    }
    if (this.loginValues.password === "") {
      this.loginValues.errors.password = "Поле не должно быть пустым";
    }
    if (
      this.loginValues.password !== this.loginValues.repeatPassword &&
      this.loginValues.password !== ""
    ) {
      this.loginValues.errors.repeatPassword = "Пароли должны совпадать";
    }
    return errors;
  };

  @action
  handleBlur = event => {
    const errors = this.validateFields(event.target.name);

    if (Object.keys(errors).length > 0) {
      this.loginValues.errors = errors;
    }
  };

  @action
  chainPromises = callback => {
    let session_id;
    this.loginValues.submitting = true;

    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.loginValues.username,
            password: this.loginValues.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        session_id = data.session_id;
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.loginValues.submitting = false;
        callback(user, session_id);
      })
      .catch(error => {
        console.log("error", error);
        this.loginValues.submitting = false;
        this.loginValues.errors.base = error.status_message;
      });
  };

  // @action
  // onLogin = event => {
  //   event.preventDefault();
  //   const errors = this.validateFields();
  //   if (Object.keys(errors).length > 0) {
  //     this.errors = errors;
  //   } else {
  //     this.onSubmit();
  //   }
  // };
}

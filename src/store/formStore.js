import { observable, action, configure } from "mobx";
import CallApi from "../api/api";
import { userStore } from "./userStore";

configure({ enforceActions: "always" });
//with it we can mutate @observable only in @actions

class FormStore {
  @observable
  loginValues = {
    username: "irastr",
    password: "str14795",
    repeatPassword: "str14795"
  };
  @observable submitting = false;
  @observable errors = {};
  @observable showLoginModal = false;

  @action
  toggleModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  @action
  onChange = event => {
    this.loginValues[event.target.name] = event.target.value;
    // this.loginValues.errors[event.target.name] = null;
    // this.loginValues.errors.base = null;

    //to get rid of mutation not in action:
    this.updateErrors({
      base: null,
      [event.target.name]: null
    });
  };

  @action
  updateSubmitting = value => {
    this.submitting = value;
  };

  //patern for observable modification
  @action
  updateErrors = (errors = {}) => {
    for (let key in errors) {
      this.errors[key] = errors[key];
    }
  };

  validateFields = name => {
    const errors = {};
    if (this.loginValues.username === "") {
      errors.username = "Поле не должно быть пустым";
    }
    if (this.loginValues.password === "") {
      errors.password = "Поле не должно быть пустым";
    }
    if (
      this.loginValues.password !== this.loginValues.repeatPassword &&
      this.loginValues.password !== ""
    ) {
      errors.repeatPassword = "Пароли должны совпадать";
    }
    return errors;
  };

  @action
  handleBlur = event => {
    const errors = this.validateFields(event.target.name);
    if (Object.keys(errors).length > 0) {
      // this.loginValues.errors = errors;
      this.updateErrors(errors);
    }
  };

  @action
  onSubmit = callback => {
    let session_id;
    this.updateSubmitting(true);
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
        this.updateSubmitting(false);
        // callback(user, session_id);
        userStore.updateAuth(user, session_id);
        // userStore.updateSessionId(session_id);
        this.toggleModal();
      })
      .catch(error => {
        console.log("error", error);
        this.updateSubmitting(false);
        // this.loginValues.errors.base = error.status_message;
        this.updateErrors({
          base: error.status_message
        });
      });
  };
}

export const formStore = new FormStore();

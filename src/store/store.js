import { observable, action, computed } from "mobx";
import CallApi from "../api/api";

export default class Store {
  @observable
  loginValues = {
    username: "irastr",
    password: "str14795",
    repeatPassword: "str14795"
  };

  @observable
  errors = {};

  @observable
  submitting = false;

  @action
  onChange = event => {
    this.loginValues[event.target.name] = event.target.value;
  };

  validateFields = name => {
    const errors = {};

    if (this.loginValues[name] === "") {
      errors[name] = "Not empty";
    }

    if (
      this.loginValues.repeatPassword &&
      this.loginValues.password !== this.loginValues.repeatPassword
    ) {
      errors.repeatPassword = "Must be equal password";
    }

    return errors;
  };

  @action
  handleBlur = event => {
    const errors = this.validateFields(event.target.name);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    }
  };

  @action
  onSubmit = () => {
    this.submitting = true;
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
        const { updateSessionId } = this.props;
        updateSessionId(data.session_id);

        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        const { updateUser } = this.props;
        updateUser(user);
        this.setState({
          submitting: false
        });
        this.props.toggleModal();
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
}

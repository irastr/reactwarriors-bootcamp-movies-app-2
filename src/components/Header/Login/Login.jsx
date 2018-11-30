import React from "react";
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm"

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {


    // state = {
    //     showModal: false
    // };




    // toggleModal = () => {
    //     this.setState(prevState => ({
    //         showModal: !prevState.showModal
    //     }));
    // }

    //ASYNC AWAIT

    // sendPromises = async () => {

    //     const fetchApi = (url, options = {}) => {
    //         return new Promise((resolve, reject) => {
    //             fetch(url, options)
    //                 .then(response => {
    //                     if (response.status < 400) {
    //                         return response.json();
    //                     } else {
    //                         throw response;
    //                     }
    //                 })
    //                 .then(data => {
    //                     resolve(data);
    //                 })
    //                 .catch(response => {
    //                     response.json().then(error => {
    //                         reject(error);
    //                     });
    //                 });
    //         });
    //     };



    //     try {
    //         const data = await fetchApi(
    //             `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
    //         );
    //         const result = await fetchApi(
    //             `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     username: "irastr",
    //                     password: "str14795",
    //                     request_token: data.request_token
    //                 })
    //             }
    //         );
    //         const { session_id } = await fetchApi(
    //             `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     request_token: result.request_token
    //                 })
    //             }
    //         );
    //         console.log(session_id);
    //     } catch (error) {
    //         console.log("error", error);
    //     }

    //CHAIN PROMISES

    // fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //     .then(data => {
    //         return fetchApi(
    //             `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     username: "irastr",
    //                     password: "str14795",
    //                     request_token: data.request_token
    //                 })
    //             }
    //         );
    //     })
    //     .then(data => {
    //         return fetchApi(
    //             `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     request_token: data.request_token
    //                 })
    //             }
    //         );
    //     })
    //     .then(data => {
    //         console.log("session", data);
    //     })
    //     .catch(error => {
    //         console.log("error", error);
    //     });



    //  WITHOUT CHAIN PROMISES


    // // 1
    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         // 2
    //         console.log(data)
    //         fetch(
    //             `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     username: "irastr",
    //                     password: "str14795",
    //                     request_token: data.request_token
    //                 })
    //             }
    //         )
    //             .then(response => response.json())
    //             .then(data => {
    //                 // 3
    //                 console.log(data)
    //                 fetch(
    //                     `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //                     {
    //                         method: "POST",
    //                         mode: "cors",
    //                         headers: {
    //                             "Content-type": "application/json"
    //                         },
    //                         body: JSON.stringify({
    //                             request_token: data.request_token
    //                         })
    //                     }
    //                 )
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         console.log("session", data);
    //                     });
    //             });
    //     });
    // };
    render() {
        return (
            <div>
                <button
                    className="btn btn-success"
                    type="button"
                    // onClick={this.sendPromises}
                    onClick={this.props.toggleModal}
                >
                    Login
        </button>
                <Modal isOpen={this.props.showModal} toggle={this.props.toggleModal} >
                    <ModalBody>
                        <LoginForm updateUser={this.props.updateUser} updateSessionId={this.props.updateSessionId} />
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}
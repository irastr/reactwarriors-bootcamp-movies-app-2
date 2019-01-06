// import React from "react";
// import CallApi from "../../api/api";
// import _ from "lodash";
// import { inject, observer } from "mobx-react";

// export default (Component, type) =>
//   @inject(({ userStore }) => ({
//     userStore
//   }))
//   @observer
//   class AddMovieHOC extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         isAdd: this.getAddById({ list: props[type], id: props.item.id })
//       };
//     }

//     getAddById = ({ list, id }) => list.some(item => item.id === id);

//     componentDidUpdate(prevProps, prevState) {
//       if (
//         !_.isEqual(prevProps[type], this.props[type]) &&
//         this.state.isAdd !==
//           this.getAddById({ list: this.props[type], id: this.props.item.id })
//       ) {
//         this.setState({
//           isAdd: this.getAddById({
//             list: this.props[type],
//             id: this.props.item.id
//           })
//         });
//       }
//     }

//     handleIconClick = name => () => {
//       const {
//         userStore: { session_id, toggleModal, user },
//         item,
//         addToList,
//         deleteFromList
//       } = this.props;

//       if (session_id && user) {
//         this.setState(
//           prevState => ({ isAdd: !prevState.isAdd }),
//           () => {
//             if (this.state.isAdd) {
//               addToList(item, type);
//             } else {
//               deleteFromList(item, type);
//             }

//             CallApi.post(`/account/${user.id}/${name}`, {
//               params: {
//                 session_id
//               },
//               body: {
//                 media_type: "movie",
//                 media_id: item.id,
//                 [name]: this.state.isAdd
//               }
//             }).then(data => {
//               // getFavoritesWatchlist();
//             });
//           }
//         );
//       } else {
//         toggleModal();
//       }
//     };

//     render() {
//       console.log("AddMovieHOC render");
//       return (
//         <Component
//           {...this.props}
//           onClick={this.handleIconClick}
//           isAdd={this.state.isAdd}
//         />
//       );
//     }
//   };

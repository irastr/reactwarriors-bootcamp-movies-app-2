import React from "react";
import { AppContext } from "../App"


export default Component => class AppContextHOC extends React.Component {
    render() {
        return <AppContext.Consumer>
            {(context) =>
                <Component {...this.props} {...context} />}
        </AppContext.Consumer>
    }
    // <AppContext.Consumer> 

    //     {(context) => {
    //         return <User user={context.user} session_id={context.session_id} onLogOut={context.onLogOut} />
    //     }}
    // </AppContext.Consumer>


    //         < AppContext.Consumer >
    // {
    //     context =>
    //         <LoginForm updateUser={context.updateUser}  {...props} />
    // }
    //         </AppContext.Consumer >
    //     );
    // }
}

// const UserContainer = () => {
//     return (
//         <AppContext.Consumer>
//             {(context) => {
//                 return <User user={context.user} session_id={context.session_id} onLogOut={context.onLogOut} />
//             }}
//         </AppContext.Consumer>
//     );
// }

// UserContainer.displayName = "UserContainer"

// export default UserContainer;


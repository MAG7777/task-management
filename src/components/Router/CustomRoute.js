import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


// function CustomRoute(props) {
//     const { isLogin } = props;
//     return (
//         isLogin ? <Route  {...props} /> : <Redirect to="/login" />
//     );
// }

function CustomRoute({ isLogin, type = "public", path, exact, component: Componenet }) {
    if (type === "private") {
        return (
            <Route path={path} exact={exact} render={(props) => {
                return isLogin ? <Componenet {...props} /> : <Redirect to="/login" />
            }} />
        );
    } else {
        return (
            <Route path={path} exact={exact} render={(props) => {
                return !isLogin ? <Componenet {...props} /> : <Redirect to="/" />
            }} />
        );
    }

}

const mapDispatchToProps = (state) => {
    return {
        isLogin: state.authReducer.isLogin
    }
}

CustomRoute.propTypes = {
    type: PropTypes.oneOf(['private', 'public']),
    path:PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.object.isRequired
};

export default connect(mapDispatchToProps)(CustomRoute)
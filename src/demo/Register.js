import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";

function Register() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("event", event)
    }
    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        })

    }

    return (
        <div>
            <form action="http://localhost:300/contact" method="GET">
                <input
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                />

                <input
                    values={values.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                />

                <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    name="confirmPassword"
                />

                <input type="submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default Register;
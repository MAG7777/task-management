import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./register.module.css"
import { connect } from "react-redux";
import { register } from "../../../store/userAction";
import { Link } from "react-router-dom";


function Register(props) {
    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = () => {
        const { email, password, confirmPassword, name, surname } = values;
        let valid = true;
        let passwordErrorMessage = null;
        if (!confirmPassword) {
            passwordErrorMessage = "Password is required";
            valid = false;
        }
        else if (password !== confirmPassword) {
            passwordErrorMessage = "Passwords is not match";
            valid = false;
        }

        setErrors({
            email: email ? null : "Email is required",
            confirmPassword: passwordErrorMessage,
            password: password ? null : "Password is required",

        });
        if (valid) {
            props.register(values);
        }

    }
    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });

    }

    // const { registerSuccess, history } = props;
    // useEffect(() => {
    //     if (registerSuccess) {
    //         history.push("/login")
    //     }
    // }, [registerSuccess, history]);

    return (
        <div className={styles.form}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.formTitle}>Registration</h3>
                            <Form.Group>
                                <Form.Control
                                    // className={errors.name ? styles.inValid : ""}
                                    value={values.name}
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    // className={errors.surname ? styles.inValid : ""}
                                    value={values.surname}
                                    onChange={handleChange}
                                    type="text"
                                    name="surname"
                                    placeholder="Enter your surname"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.email ? styles.inValid : ""}
                                    value={values.email}
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                />
                                {

                                    <Form.Text className="text-danger" >
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group >
                                <Form.Control
                                    className={errors.password ? styles.inValid : ""}
                                    values={values.password}
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                                {

                                    <Form.Text className="text-danger" >
                                        {errors.password}
                                    </Form.Text>
                                }
                            </Form.Group>

                            <Form.Group >
                                <Form.Control
                                    className={errors.confirmPassword ? styles.inValid : ""}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                                {

                                    <Form.Text className="text-danger" >
                                        {errors.confirmPassword}
                                    </Form.Text>
                                }

                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Register
                        </Button>
                            </div>
                            <Link to='/login' >Already register? Try to login.</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


const mapDispatchToProps = {
    register
};

export default connect(null, mapDispatchToProps)(Register);
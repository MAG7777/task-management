import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./register.module.css"


function Register() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = () => {
        const { email, password, confirmPassword } = values;
        let passwordErrorMessage = null;
        if (!confirmPassword) {
            passwordErrorMessage = "Password is required";
        }
        else if (password !== confirmPassword) {
            passwordErrorMessage = "Passwords is not match";
        }

        setErrors({
            email: email ? null : "Email is required",
            confirmPassword: passwordErrorMessage,
            password: password ? null : "Password is required",
            
        });

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

    return (
        <div className={styles.form}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.formTitle}>Registration</h3>
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

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
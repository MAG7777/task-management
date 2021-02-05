import React, { useState} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./login.module.css"
import { connect } from "react-redux";
import { login } from "../../../store/userAction";
import { Link } from "react-router-dom";



function Login(props) {
    const [values, setValues] = useState({

        email: "",
        password: "",

    });

    const [errors, setErrors] = useState({

        email: null,
        password: null,

    });

    const handleSubmit = () => {
        const { email, password } = values;
        let valid = true;
        let passwordErrorMessage = null;

        setErrors({
            email: email ? null : "Email is required",
            password: password ? null : "Password is required",

        });
        if (email && password) {
            props.login(values);
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

    return (
        <div className={styles.form}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.formTitle}>Login</h3>

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

                            <div className="text-center">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Login
                        </Button>
                            </div>
                            <Link to='/register' >You need register for login.</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


const mapDispatchToProps = {
    login
};

export default connect(null, mapDispatchToProps)(Login);
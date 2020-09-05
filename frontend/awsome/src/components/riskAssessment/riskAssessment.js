import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Input from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from 'react-datepicker'
import { Link } from "react-router-dom" 
import "./riskAssessment.css"

export default class RiskAssessment extends Component {
    render() {
        return (
            <Container>

                <Row>
                    <Col xs={9}>
                        <br></br>
                        <h1 id="risk-title">What's your risk<br></br>appetite?</h1>
                    </Col>
                
                </Row>

                <br></br>
                <br></br>

                <Row>
                    <Col>
                 
                        <div>
                            <Form>
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>When making a long-term investment, I play to keep the money invested for...</Form.Label>
                                            <Form.Control as="select" custom>
                                                <option>1-5 years</option>
                                                <option>6-10 years</option>
                                                <option>11-20 years</option>
                                                <option>21 years and above</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>Typically, assets that fluctuate more also deliver higher returns. Which of the following statements do you agree with most?</Form.Label>
                                            <Form.Control as="select" custom>
                                                <option>In order to minimise fluctuations in asset values, I am willing to accept returns below the rate of inflation</option>
                                                <option>I am willing to accept small, occasional drawdowns in exchange for returns slightly above the rate of inflation </option>
                                                <option>I am willing to accept large, occasional drawdowns in exchange for returns well above the rate of inflation </option>
                                                <option>I am willing to accept large, frequent drawdowns in exchange for high returns </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>In the 2008 financial crisis, stocks plunged over 50% from their peak. What is the maximum loss of value you could accept in a one-year period?</Form.Label>
                                            <Form.Control as="select" custom>
                                                <option>5%</option>
                                                <option>10%</option>
                                                <option>30%</option>
                                                <option>50%</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>To what extend do you agree with this statement: "Protecting my portfolio value is more important to me than high returns."</Form.Label>
                                            <Form.Control as="select" custom>
                                                <option>Strongly Agree</option>
                                                <option>Agree</option>
                                                <option>Disagree</option>
                                                <option>Strongly Disagree</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br>
                                <br></br>
                                
                                <Row>
                                    <Col xs={9}>
                                        <Form.Group controlId="invested">
                                            <Form.Label>Should there be a 30% shortfall in your investment proceeds at the end of the investment period, to what extent will it affect your retirement lifestyle?</Form.Label>
                                            <Form.Control as="select" custom>
                                                <option>I will not be able to support my basic needs</option>
                                                <option>I will have to downgrade my lifestyle to one that I am unable to accept</option>
                                                <option>I will have to downgrade my lifestyle to one that I am able to accept</option>
                                                <option>It does not affect my lifestyle</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    
                                </Row>

                                <br></br><br></br><br></br><br></br>

                                <Link to="/retirementForm">
                                    <Button id="submit" variant="primary" type="submit">Next</Button>
                                </Link>
                            </Form>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}
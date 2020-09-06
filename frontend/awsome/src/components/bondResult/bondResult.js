import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css"

export default class BondResult extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="center">
                            <h1>You're suited for Bond Investing</h1>
                        </div>
                        <br></br>
             
                        <div className="center text-justify">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in fringilla eros. Etiam molestie 
                            dui et sem fermentum, interdum condimentum mi condimentum. Curabitur convallis, massa quis mattis accumsan.</h4>
                            <br></br>

                            <h2>Risk Appetite: Low</h2>

                            <p>
                            neque lectus tincidunt dui, eu placerat magna libero ut lorem. Etiam ornare tempor euismod. Quisque in nibh lacinia,
                            pharetra ex at, viverra risus. Morbi ac dui nibh. Sed ac dui eu magna egestas accumsan volutpat sagittis mi. Nunc vitae quam vel
                            nibh mollis faucibus. Suspendisse ultrices, lectus ac imperdiet euismod, massa metus luctus elit, aliquam egestas ante est nec risus.
                            </p>

                            <br></br>
                            <br></br>
                            <h2>Retirement Planning</h2>

                            <p>
                            neque lectus tincidunt dui, eu placerat magna libero ut lorem. Etiam ornare tempor euismod. Quisque in nibh lacinia,
                            pharetra ex at, viverra risus. Morbi ac dui nibh. Sed ac dui eu magna egestas accumsan volutpat sagittis mi. Nunc vitae quam vel
                            nibh mollis faucibus. Suspendisse ultrices, lectus ac imperdiet euismod, massa metus luctus elit, aliquam egestas ante est nec risus.
                            </p>

                            <br></br>
                            <br></br>
                            <h2>Investing in Bonds</h2>

                            <p>
                            neque lectus tincidunt dui, eu placerat magna libero ut lorem. Etiam ornare tempor euismod. Quisque in nibh lacinia,
                            pharetra ex at, viverra risus. Morbi ac dui nibh. Sed ac dui eu magna egestas accumsan volutpat sagittis mi. Nunc vitae quam vel
                            nibh mollis faucibus. Suspendisse ultrices, lectus ac imperdiet euismod, massa metus luctus elit, aliquam egestas ante est nec risus.
                            </p>

                            <br></br>
                            <br></br>
                            <br></br>

                            <Link to="/register">
                                <Button variant="primary" >Learn More</Button>
                            </Link>

                        </div>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>

            </Container>
        )
    }
}
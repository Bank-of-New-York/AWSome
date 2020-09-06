import React, { Component } from "react"

import { Container, Row, Col, Card, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NVD3Chart from 'react-nvd3';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import "bootstrap/dist/css/bootstrap.min.css"

const datum = [
    { key: "Bonds", y: 80, color: "#5CD4EF" },
    { key: "Equities", y: 20, color: "#FFA861" },
];

function getDatum() {
    var sin = [],
        sin2 = [],
        cos = [];
    for (var i = 0; i < 100; i++) {
        sin.push({
            'x': i,
            'y': Math.sin(i / 10)
        });
        sin2.push({
            'x': i,
            'y': Math.sin(i / 10) * 0.25 + 0.5
        });
        cos.push({
            'x': i,
            'y': .5 * Math.cos(i / 10)
        });
    }
    return [
        {
            values: sin,
            key: 'Sine Wave',
            color: '#A389D4'
        },
        {
            values: cos,
            key: 'Cosine Wave',
            color: '#04a9f5'
        },
        {
            values: sin2,
            key: 'Another sine wave',
            color: '#1de9b6',
            area: true
        }
    ];
}

const equitiesTabContent = (
    <Aux>
        <h3 align='center'>Equities</h3>

        <p>
            neque lectus tincidunt dui, eu placerat magna libero ut lorem. Etiam ornare tempor euismod. Quisque in nibh lacinia,
            pharetra ex at, viverra risus. Morbi ac dui nibh. Sed ac dui eu magna egestas accumsan volutpat sagittis mi. Nunc vitae quam vel
            nibh mollis faucibus. Suspendisse ultrices, lectus ac imperdiet euismod, massa metus luctus elit, aliquam egestas ante est nec risus.
        </p>

    </Aux>
);

const BondsTabContent = (
    <Aux>
        <h3 align='center'>Bonds</h3>

        <p>
            neque lectus tincidunt dui, eu placerat magna libero ut lorem. Etiam ornare tempor euismod. Quisque in nibh lacinia,
            pharetra ex at, viverra risus. Morbi ac dui nibh. Sed ac dui eu magna egestas accumsan volutpat sagittis mi. Nunc vitae quam vel
            nibh mollis faucibus. Suspendisse ultrices, lectus ac imperdiet euismod, massa metus luctus elit, aliquam egestas ante est nec risus.
        </p>

    </Aux>
);

export default class EquityResult extends Component {



    render() {

        const data = getDatum();

        return (
            <Container fluid>
                <Row style={{ width: "80%" }}>
                    <Col>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div>
                            <h2>Your Results</h2>
                        </div>
                        <br></br>

                        <div className="center text-justify">
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in fringilla eros. Etiam molestie
                            dui et sem fermentum, interdum condimentum mi condimentum. Curabitur convallis, massa quis mattis accumsan.</h4>
                            <br></br>
                            <br></br>

                            <h2>Risk Appetite: Higher</h2>

                            <p>
                            Based on our risk assessment, you have a high risk tolerance. You are comfortable with subjecting your capital to volatility, as long as they are able to yield high returns on your investment over time.  
                            We recommend that you deploy most of your investable capital towards higher risk assets like equities (hyperlink), and place a small low risk and risk-free assets like fixed deposit accounts and Singapore Savings bonds (hyperlink), and. To learn more about portfolio allocation in general, click here (hyperlink). 
                            </p>

                            <br></br>
                            <br></br>
                            <h2 align='left'>Your Recommended Portfolio Allocation</h2>
                            <br></br>
                            <Row>
                                <Col>
                                    <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
                                </Col>
                                <Col>
                                    <Tabs defaultActiveKey="equities" id="uncontrolled-tab-example">
                                        <Tab eventKey="equities" title="Equities">
                                            {equitiesTabContent}
                                        </Tab>
                                        <Tab eventKey="bonds" title="Bonds">
                                            {BondsTabContent}
                                        </Tab>

                                    </Tabs>
                                </Col>
                            </Row>


                            <br></br>
                            <br></br>
                            <h2>Planning For Retirement</h2>
                            <br></br>

                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Principal Amount ($):</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Amount Needed ($):</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Years Before Retirement:</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Expected Portfolio Return (%):</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Monthly Deposit Needed ($):</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="invested" style={{ display: "flex" }}>
                                            <Form.Label>Principal Amount ($):</Form.Label>
                                            <Form.Control style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="text" onChange={this.handleInputChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>



                            </Form>

                            <br></br>
                            <br></br>
                            <div>
                                {
                                    React.createElement(NVD3Chart, {
                                        xAxis: {
                                            tickFormat: function (d) { return d; },
                                            axisLabel: 'Time (ms)'
                                        },
                                        yAxis: {
                                            axisLabel: 'Voltage (v)',
                                            tickFormat: function (d) { return parseFloat(d).toFixed(2); }
                                        },
                                        type: 'lineChart',
                                        datum: data,
                                        x: 'x',
                                        y: 'y',
                                        height: 300,
                                        renderEnd: function () {
                                            console.log('renderEnd');
                                        }
                                    })
                                }
                            </div>

                            <br></br>
                            <br></br>
                            <br></br>

                            <Link to="/screener">
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
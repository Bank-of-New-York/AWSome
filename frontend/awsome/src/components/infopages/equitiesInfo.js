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

export default class EquitiesInfo extends Component {



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
                            <h2>Learning About Equities</h2>
                            <h4>Welcome to the resource page for higher risk assets known as equities.</h4>
                        </div>
                        <br></br>

                        <div>
                            <h4>
                                What are Equities: <br></br> <a href="https://smartasset.com/investing/what-are-equities">https://smartasset.com/investing/what-are-equities</a> 
                                <br></br>
                                <br></br>
                                Basic Guide to Stocks:<br></br> <a href="https://www.valuechampion.sg/basic-guide-stocks">https://www.valuechampion.sg/basic-guide-stocks</a>
                                <br></br>
                                <br></br>

                                Guide to Investing: <br></br> <a href="https://dollarsandsense.sg/beginners-guide-start-investing-singapore/">https://dollarsandsense.sg/beginners-guide-start-investing-singapore/</a>

                            </h4>
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
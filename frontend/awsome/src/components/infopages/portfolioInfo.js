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

export default class PortfolioInfo extends Component {



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
                            <h1>Portfolio Allocation</h1>
                            <h4>Welcome to the resource page for portfolio allocation. While our risk assessment page provides recommendations on which asset class to overweight based on your risk tolerance, we are not experts. Here are some resources to help you decide exactly how to allocate your assets between stocks and bonds/fixed deposits.</h4>
                        </div>
                        <br></br>

                        <div>
                            <h4>
                            
                            Vanguard: Historical returns by allocation <br></br>
                            <a href="https://personal.vanguard.com/us/insights/saving-investing/model-portfolio-allocations">https://personal.vanguard.com/us/insights/saving-investing/model-portfolio-allocations</a>
                            <br></br><br></br>
                            Investopedia: Achieving Optimal Asset Allocation<br></br>
                            <a href="https://www.investopedia.com/managing-wealth/achieve-optimal-asset-allocation/">https://www.investopedia.com/managing-wealth/achieve-optimal-asset-allocation/</a>
                            <br></br><br></br>
                            Financial Samurai:<br></br>
                            <a href="https://www.financialsamurai.com/the-proper-asset-allocation-of-stocks-and-bonds-by-age/">https://www.financialsamurai.com/the-proper-asset-allocation-of-stocks-and-bonds-by-age/</a>

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
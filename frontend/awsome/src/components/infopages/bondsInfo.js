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

export default class BondsInfo extends Component {



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
                            <h1>Your Results</h1>
                            <h4>Welcome to the resource page for low risk assets. The two asset classes here- Singapore Savings Bonds and Fixed Deposit Accounts- will provide small interest payments while successfully preserving your wealth over long periods of time.  </h4>
                        </div>
                        <br></br>

                        <div>
                            <h2>Fixed Deposit Accounts</h2>
                            <h4>
                                What are Fixed Deposit Accounts <br></br>
                                <a href="https://blog.moneysmart.sg/invest/what-every-singaporean-needs-to-know-about-fixed-deposit-accounts/">https://blog.moneysmart.sg/invest/what-every-singaporean-needs-to-know-about-fixed-deposit-accounts/  </a> 
                                <br></br><br></br>
                                Moneysmart: Compares Fixed Deposit Rates across various local banks<br></br>
                                <a href="https://blog.moneysmart.sg/fixed-deposits/best-fixed-deposit-accounts-singapore/">https://blog.moneysmart.sg/fixed-deposits/best-fixed-deposit-accounts-singapore/</a>
                                <br></br><br></br>
                                DBS Fixed Deposit Schedule<br></br>
                                <a href="https://www.dbs.com.sg/personal/rates-online/singapore-dollar-fixed-deposits.page">https://www.dbs.com.sg/personal/rates-online/singapore-dollar-fixed-deposits.page</a>  
                                <br></br><br></br>
                                UOB Fixed Deposit Information<br></br>
                                <a href="https://www.uob.com.sg/personal/save/fixed-deposit/singapore-dollar-fixed-deposit.page">https://www.uob.com.sg/personal/save/fixed-deposit/singapore-dollar-fixed-deposit.page</a>  
                                <br></br><br></br>
                                OCBC Fixed Deposit Information<br></br>
                                <a href="https://www.ocbc.com/personal-banking/deposits/fixed-deposit-account">https://www.ocbc.com/personal-banking/deposits/fixed-deposit-account</a>  
                                <br></br><br></br>
                            </h4>
                            <h2>Singapore Savings Bonds </h2>
                            <h4>
                                <br></br><br></br>
                                What are Singapore Savings Bonds<br></br>
                                <a href="https://www.singsaver.com.sg/blog/savings-bonds-singapore">https://www.singsaver.com.sg/blog/savings-bonds-singapore</a>  
                                <br></br><br></br>
                                Current Bond Information<br></br>
                                <a href="https://www.mas.gov.sg/bonds-and-bills/Singapore-Savings-Bonds">https://www.mas.gov.sg/bonds-and-bills/Singapore-Savings-Bonds</a>  
                             
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
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

var risk = sessionStorage.getItem("risk_level")
var bonds = sessionStorage.getItem("bonds%")
var stocks = sessionStorage.getItem("stocks%")



const datum = [
    { key: "Bonds", y: bonds, color: "#5CD4EF" },
    { key: "Equities", y: stocks, color: "#FFA861" },
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

const RiskLow = (
    <React.Fragment>
        <h2>Risk Appetite: <span class="text-success" >LOW</span></h2>
        <p>
            Based on our risk assessment, you have a low risk tolerance. Capital preservation is of paramount importance to you, and drawdowns could potentially be harmful to your long-term financial standing.
    </p>
    </React.Fragment>
);

const RiskMedium =
    <React.Fragment>
        <h2>Risk Appetite: <span class="text-success" >MEDIUM</span></h2>
        <h4>
            Based on our risk assessment, you have a medium risk tolerance. While you are willing to subject your capital to some volatility in exchange for higher returns, you still view capital preservation is an important facet of your investing activities.
    </h4>
    </React.Fragment>
    ;

const RiskHigh =
    <React.Fragment>
        <h2>Risk Appetite: <span class="text-success" >HIGH</span></h2>
        <h4>
            Based on our risk assessment, you have a high risk tolerance. You are comfortable with subjecting your capital to volatility, as long as they are able to yield high returns on your investment over time.
    </h4>
    </React.Fragment>
    ;

const equitiesTabContent =
    <Aux>
        <h3 align='center'>Equities</h3>

        <h6 style={{lineHeight:"20px"}}>
            Equities, also known as stocks, represent part-ownership in a company. Unlike the periodic interest that companies are required to pay on borrowings, companies are not legally required to pay their shareholders anything. <br></br><br></br>As a result, equity values are determined by expectations of future cash flows. However, short term equity prices are dependent on market forces of supply and demand, creating volatility.
        </h6>

    </Aux>
    ;

const BondsTabContent = (
    <Aux>
        <h3 align='center'>Bonds</h3>

        <h6 style={{lineHeight:"20px"}}>
            Bonds represent loans made by you, the investor to the borrower, which is usually a company or a government.<br></br><br></br> Because it is difficult to invest in corporate bonds without large sums of money, we are advocating Singapore Savings Bonds (SSB) and fixed deposit accounts as risk-free substitutes for regular bonds. <br></br><br></br>While SSB and fixed deposits provide an interest rate that is frequently below that of inflation, the risk of capital loss is virtually zero.
        </h6>

    </Aux>
);


var EQUITY_CAGR = 0.0724259;
var BOND_CAGR = 0.0095;

function calc_implied_return(bond_ratio, equity_ratio) {
    return bond_ratio * BOND_CAGR + equity_ratio * EQUITY_CAGR;
}


function calc_monthly_savings(r, retire_sum, principal, yrs) {
    retire_sum = parseInt(retire_sum)
    principal = parseInt(principal)
    yrs = parseInt(yrs)
    return (((retire_sum - (principal * (1 + r / 12) ** (12 * yrs))) * (r / 12)) / ((1 + r / 12) ** (12 * yrs) - 1)).toFixed(2)
};

export default class EquityResult extends Component {

    constructor() {
        super()
        this.state = {
            risk_level: "#",
            years_till_retire: 0,
            retirement_amount: 0,
            principal: 0,
            expected: 0,
            monthly: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        
        this.setState({
            [name] : value
        })
    }

    
    componentDidMount() {
        this.setState({ expected: (calc_implied_return(bonds/100, stocks/100) * 100).toFixed(2)})
    
        fetch("/api_update_user",
            {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
                }
            }).then(response =>
                response.json()
            ).then((values) => {
                var risk_level = values["risk_level"]
                console.log(values)
                this.setState({
                    risk_level: risk_level,
                    years_till_retire: values["years_till_retire"],
                    retirement_amount: values["retirement_amount"]
                })
    
            }).catch(error => {
                console.log(error)
                alert("There has been a problem")
            })
    }

    handleClick = () => {
        fetch("/api_update_user", {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
            },
            body: JSON.stringify({
                initial_deposit: this.state.principal,
                monthly_deposit: this.state.monthly
            })
        }).then((resp) => {
            console.log(resp.json())
            window.location.href="/retirementDashboard"
        }).catch(err =>{
            console.log(err)
            alert("There is a problem with submission")
        })
    }


    render() {

        const data = getDatum();


        


        if (this.state.risk_level !== "#") {
            return (

                <Container fluid>
                    <Row style={{ width: "80%" }}>
                        {this.state.risk_level !== "#" ?
                            <Col>
                                <br></br>
                                <br></br>
                                <br></br>
                                <div class="text-center">
                                    <h2>Your Assessment</h2>
                                </div>
                                <br></br>

                                <div className="center text-justify">

                                    {this.state.risk_level === "low" && RiskLow}
                                    {this.state.risk_level === "medium" && RiskMedium}
                                    {this.state.risk_level === "high" && RiskHigh}

                                    <br></br>
                                    <br></br>
                                    <h2 align='left'>Your Recommended Portfolio Allocation</h2>
                                    <br></br>
                                    <Row>
                                        <Col>
                                            <NVD3Chart id="chart" height={400} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
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
                                    <h4>The data below is based on the information you've input throughout this quiz. <strong style={{ fontWeight: "bold" }}><br></br><br></br>Input how much your first deposit</strong> would be to see how much you'd need to invest every month to meet your goal!</h4>
                                    <br></br>

                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="invested" style={{ display: "flex" }}>
                                                    <Form.Label>Amount Needed ($):</Form.Label>
                                                    <Form.Control name="retirement_amount" style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="number" onChange={this.handleInputChange} value={this.state.retirement_amount}></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="invested" style={{ display: "flex" }}>
                                                    <Form.Label>Years Before Retirement:</Form.Label>
                                                    <Form.Control name="years_till_retire" style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="number" onChange={this.handleInputChange} value={this.state.years_till_retire}></Form.Control>
                                                </Form.Group>

                                            </Col>
                                            <Col>
                                                <Form.Group controlId="invested" style={{ display: "flex" }}>
                                                    <Form.Label>First Deposit Amount ($):</Form.Label>
                                                    <Form.Control name="principal" style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="number" onChange={this.handleInputChange} value={this.state.principal}></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="invested" style={{ display: "flex" }}>
                                                    <Form.Label>Expected Portfolio Return (%):</Form.Label>
                                                    <Form.Control name="expected" style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="number" onChange={this.handleInputChange} value={this.state.expected}></Form.Control>
                                                </Form.Group>
                                                <br></br>
                                                <br></br>
                                                <Form.Group controlId="invested" style={{ display: "flex" }}>
                                                    <Form.Label>Monthly Deposit Needed ($):</Form.Label>
                                                    <Form.Control disabled name="monthly" style={{ marginLeft: "10px", width: "120px", marginTop: "-10px", marginBottom: "15px" }} type="number" onChange={this.handleInputChange} value={this.state.monthly}></Form.Control>
                                                </Form.Group>
                                                <br></br>
                                                <Button variant="primary" onClick={() => { var value = calc_monthly_savings(this.state.expected / 100, this.state.retirement_amount, this.state.principal, this.state.years_till_retire); console.log(value); this.setState({monthly: value})}}>Calculate</Button>


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


                                    <Button variant="primary" onClick={this.handleClick} >Next</Button>
    

                                </div>
                            </Col>
                            :
                            <Col>
                                <h1>Loading...</h1>
                            </Col>
                        }
                    </Row>
                    <br></br>
                    <br></br>
                    <br></br>

                </Container>
            )
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h1>LOADING...</h1>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}
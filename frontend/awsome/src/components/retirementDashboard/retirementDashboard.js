import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Form, Container,Button, Collapse, Popover, OverlayTrigger } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import "./retirementDashboard.css";
import Sidebar from "../sidebar/sidebar";


// function calc_chance_r(chance, yrs, bond_ratio, equity_ratio) {
//     var EQUITY_CAGR = 0.0724259;
//     var BOND_CAGR = 0.0095;
//     let width_p = chance ** (1 / yrs) - 0.5;
//       // width_p of 0.44406 should give z=-0.145
//       // width_p of 0.555939 should give z=0.1405
//     // let z = percentile_z(width_p);
//       let chance_equity_cagr = z * EQUITY_CAGR + BOND_CAGR;
//     let chance_r = chance_equity_cagr * equity_ratio + BOND_CAGR * bond_ratio;
//       return chance_r;
//   }

function getDatum() {
    var sin = [],
        sin2 = [],
        cos = [];
    for (var i = 0; i < 100; i++) {
        sin.push({
            x: i,
            y: Math.sin(i / 10)
        });
        sin2.push({
            x: i,
            y: Math.sin(i / 10) * 0.25 + 0.5
        });
        cos.push({
            x: i,
            y: .5 * Math.cos(i / 10)
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

var EQUITY_CAGR = 0.0724259;
var BOND_CAGR = 0.0095;

function calc_implied_return(bond_ratio, equity_ratio) {
    return bond_ratio * BOND_CAGR + equity_ratio * EQUITY_CAGR;
}

function handleCalculation (r, years, first_depo, monthly_depo) {
    let monthly_r = r / 100 / 12;
    let compound = [{ "x": 0, "y": first_depo }]

    for (let yr = 1; yr <= years; yr++) {
        let multiplier = Math.pow(1 + monthly_r, 12 * yr);
        let compound_principal = first_depo * multiplier;
        let compound_monthly = monthly_depo * (multiplier - 1) / monthly_r;
        compound.push({
            'x': yr,
            'y': parseFloat(compound_principal + compound_monthly).toFixed(2),
            "series": 0
        });
    }

    console.log("help", compound)

    return compound
}

class RetirementDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            first_depo: 0,
            monthly_depo: 0,
            years: 0,
            r: 0,
            retire_age: 0,
            amount_needed: 0,
            total: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        console.log(name, value)

        this.setState({
            [name]: value
        })
    }

    
    componentDidMount() {

   

        fetch("/api_update_user", {
            method: "GET",
            headers: {
                'Content-Type' : "application/json",
                "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
            }
        }).then((resp) => {
            return resp.json()
        }).then((values) => {

            var compound = handleCalculation((calc_implied_return(values["be_ratio"], 1-values["be_ratio"]) * 100).toFixed(2), values["years_till_retire"], values["initial_deposit"], values["monthly_deposit"])
            this.setState({ total: [{ values: compound, key: "Growth ($)", color: "#A389D4" }] })


            this.setState({
                be_ratio : values["be_ratio"],
                retire_age : values["years_till_retire"],
                amount_needed : values["retirement_amount"],
                first_depo : values["initial_deposit"],
                monthly_depo : values["monthly_deposit"],
                r : (calc_implied_return(values["be_ratio"], 1-values["be_ratio"]) * 100).toFixed(2)
            })
            
            console.log(values)
        })

        
    }

    

    handleSubmit = (e) => {

        var compound = this.handleCalculation(this.state.r, this.state.years, this.state.first_depo, this.state.monthly_depo)

        e.preventDefault()
        this.setState({ total: [{ values: compound, key: "compound", color: "#A389D4" }] })
        // this.final_compound = compound


    }



    render() {

        const datum = [
            { key: "Bonds", y: this.state.be_ratio * 100, color: "#5CD4EF" },
            { key: "Equities", y: 100 - this.state.be_ratio * 100, color: "#FFA861" },
        ];

        return (
            <Aux >
                <Container fluid>
                    <Row>
                        <Col s={3}>
                        <Sidebar/></Col>
                        <Col s={9}>
                            <Row>
                                <Col >
                                    <br></br>
                                    <h1>Your Profile</h1>
                                    <br></br>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <Card style={{ "height": "35vh", "width": "75vw" }} className='card-event'>
                                        <Card.Body>
                                            <Row style={{ width: "75vw", left: "-70px" }}>
                                                <Col l={2}>
                                                    <h3>Retire By:</h3>
                                                    <h3>{this.state.retire_age}</h3>
                                                </Col>
                                        
                                                <Col l={3} style={{ left: "-70px" }}>
                                                    <h3>Amount Needed:</h3>
                                                    <h3>${this.state.amount_needed}</h3>
                                                </Col>
                                                <Col l={6} style={{ left: "-70px", textAlign: "center" }} className="center">
                                                    <h5>Portfolio Composition</h5>
                                                    <NVD3Chart id="chart" height={150} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
                                                    
                                                </Col>
                                            </Row>

                                            <br></br>
                                            <br></br>
                                        </Card.Body>
                                    </Card>

                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col sm={5} >
                                    <br></br>
                                    <OverlayTrigger 
                                        placement="right" 
                                        overlay={
                                            <Popover id={"stockscore"}>
                                                <Popover.Title as="h3"><strong>Compounding Calculator</strong></Popover.Title>
                                                <Popover.Content>
                                                    Investments can help us grow our money, especially over the long term. To figure out how much growth you could potentially see based on your recommended investment portfolio, enter how much you'd like to invest and for how long.
                                                </Popover.Content> 
                                            </Popover>
                                        }>
                                    <Card className='Recent-Users' style={{ height: "97vh", top: "-20px" }}>
                                        <Card.Header>
                                            <Card.Title as='h5'>Compounding Calculator</Card.Title>
                                        </Card.Header>
                                        <Card.Body className='px-0 py-2' style={{ width: "25vw", overflow: "none" }}>
                                            <Form className="center">
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="first_depo">
                                                            <Form.Label>First Deposit ($)</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="first_depo" value={this.state.first_depo}></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="monthly_depo">
                                                            <Form.Label>Monthly Deposit ($)</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="monthly_depo" value={this.state.monthly_depo}></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="year">
                                                            <Form.Label>No. Years</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="years" value={this.state.retire_age}></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="r">
                                                            <Form.Label>Compound Annual Growth Rate (%)</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} value={this.state.r} name="r"></Form.Control>
                                                            <Form.Text className="text-muted text-left">Calculated based on your recommended investment portfolio</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <br></br>
                                                <Row>
                                                    <Col>
                                                        <Button style={{width: "20vw", fontSize: "20px"}} id="submit" variant="primary" type="submit" onClick={this.handleSubmit}>Calculate</Button>
                                                    </Col>
                                                </Row>

                                            </Form>

                                            <br></br>
                                        </Card.Body>
                                    </Card>
                                    
                                    </OverlayTrigger>

                                </Col>

                                <Col sm={7} >

                                    <Card style={{ height: "97vh" }}>
                                        <Card.Body>
                                            <h3 className='mb-4'>Growth Potential ($)</h3>
                                            {
                                                this.state.total &&
                                                <div>
                                                    {
                                                        React.createElement(NVD3Chart, {
                                                            xAxis: {
                                                                tickFormat: function (d) { return d },
                                                                axisLabel: 'Years',
                                                            },
                                                            yAxis: {
                                                                axisLabel: 'Growth ($)',
                                                                tickFormat: function (d) { return d }
                                                            },
                                                            type: 'lineChart',
                                                            datum: this.state.total,
                                                            x: 'x',
                                                            y: 'y',
                                                            height: 300,
                                                            width: 400,
                                                            yAxis: {
                                                                max: 10000
                                                            }
                                                    
                                                        })

                                                    }
                                                </div>
                                            }

                                        </Card.Body>
                                    </Card>

                                    {/* <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-google-plus text-c-red f-36" />
                                    </div>
                                    <div className="col text-right">
                                        <h3>10,500</h3>
                                        <h5 className="text-c-blue mb-0">+5.9% <span className="text-muted">Total Likes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '80%', height: '6px' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '50%', height: '6px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card> */}
                                </Col>




                            </Row>
                            <br></br>
                            <br></br>

                        </Col>
                    </Row>
                </Container>
            </Aux>
        );
    }
}

export default RetirementDashboard;
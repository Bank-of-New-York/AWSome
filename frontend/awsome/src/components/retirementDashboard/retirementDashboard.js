import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Form, Container,Button, Collapse } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';

// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import "./retirementDashboard.css";
import Sidebar from "../sidebar/sidebar";


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


class RetirementDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            first_depo: 0,
            monthly_depo: 0,
            years: 0,
            r: 0,
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

    final_compound = []

    handleSubmit = (e) => {

        let monthly_r = this.state.r / 12;
        let compound = [{ "x": 0, "y": this.state.first_depo }]

        for (let yr = 1; yr <= this.state.years; yr++) {
            let multiplier = Math.pow(1 + monthly_r, 12 * yr);
            let compound_principal = this.state.first_depo * multiplier;
            let compound_monthly = this.state.monthly_depo * (multiplier - 1) / monthly_r;
            console.log(yr, parseFloat(compound_principal + compound_monthly))
            compound.push({
                'x': yr,
                'y': parseFloat(compound_principal + compound_monthly),
                "series": 0
            });
        }



        e.preventDefault()
        this.setState({ total: [{ values: compound, key: "compound", color: "#A389D4" }] })
        // this.final_compound = compound


    }

    render() {

        console.log(this.state.total)
        const tabContent = (
            <Aux>
                <h3 align='center'>News</h3>

                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3784</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3544</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />2739</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Frida Thomse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />1032</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />8750</span>
                    </div>
                </div>

            </Aux>
        );

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
                                    <Card style={{ "height": "30vh", "width": "75vw" }} className='card-event center'>
                                        <Card.Body>
                                            <Row style={{ width: "75vw" }}>
                                                <Col l={2}>
                                                    <h3>Retire By:</h3>
                                                    <h3>62</h3>
                                                </Col>
                                                <Col l={1} style={{ left: "-70px" }}>
                                                    <div style={{ "height": "20vh" }} className="vertical-line"></div>
                                                </Col>
                                                <Col l={3} style={{ left: "-140px" }}>
                                                    <h3>Amount Needed:</h3>
                                                    <h3>$150,000</h3>
                                                </Col>
                                                <Col l={6} style={{ left: "-70px", textAlign: "left" }}>
                                                    <h5>Wedding: $10,000</h5>
                                                    <h5>Honeymoon: $10,000</h5>
                                                    <h5>House: $10,000</h5>
                                                    <h5>2 Children: $10,000</h5>
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
                                    <Card className='Recent-Users' style={{ height: "80vh", top: "-20px" }}>
                                        <Card.Header>
                                            <Card.Title as='h5'>Compounding Calculator</Card.Title>
                                        </Card.Header>
                                        <Card.Body className='px-0 py-2' style={{ width: "30vw", overflow: "none" }}>
                                            <Form>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="first_depo">
                                                            <Form.Label>First Deposit:</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="first_depo"></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="monthly_depo">
                                                            <Form.Label>Monthly Deposit:</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="monthly_depo"></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="year">
                                                            <Form.Label>No. Years:</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="years"></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="r">
                                                            <Form.Label>r:</Form.Label>
                                                            <Form.Control type="number" onChange={this.handleInputChange} name="r"></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Button id="submit" variant="primary" type="submit" onClick={this.handleSubmit}>Calculate</Button>

                                            </Form>

                                            <br></br>
                                        </Card.Body>
                                    </Card>


                                </Col>

                                <Col sm={7} >

                                    <Card style={{ height: "80vh" }}>
                                        <Card.Body>
                                            <h3 className='mb-4'>Growth Potential</h3>
                                            {
                                                this.state.total &&
                                                <div>
                                                    {
                                                        React.createElement(NVD3Chart, {
                                                            xAxis: {
                                                                tickFormat: function (d) { console.log("x", d); return d },
                                                                axisLabel: 'Date',
                                                            },
                                                            yAxis: {
                                                                axisLabel: 'Price ($ m)',
                                                                tickFormat: function (d) { console.log("y", d); return d }
                                                            },
                                                            type: 'lineChart',
                                                            datum: this.state.total,
                                                            x: 'x',
                                                            y: 'y',
                                                            height: 300,
                                                            width: 400,
                                                            renderEnd: function () {
                                                                console.log('renderEnd');
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
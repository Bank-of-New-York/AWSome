import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

// import HorizontalTimeline from "@nhuthuy96/react-horizontal-timeline"

import "./retirementDashboard.css"

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
            start_date: "2020-06-10",
            end_date: "2020-08-10",
            stock_symb: "MSFT",
            stock_prices: [],
            value: 0,
            previous: 0,
            timelineDates : ["2020-01-01", "2040-01-01", "2050-01-01"]
        }

    }

    componentDidMount() {
        fetch("http://localhost:5000/api_stock_prices",
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    stock_symb: this.state.stock_symb
                })
            }).then((response => {
                if (response) {

                    return response.json()
                } else {
                    console.log(response)
                    // alert("There has been a problem")
                }
            })).then(({ stock_prices }) => {
                this.processStockPrices(stock_prices)
            })
    }

    processStockPrices(prices0) {
        if (prices0 !== undefined) {
            const prices1 = prices0.map(({ x, y }) => {
                return { "x": Math.round(new Date(x).getTime() / 1000), "y": parseFloat(y) }
            }
            )
            console.log(prices1)
            this.setState({ stock_prices: [{ values: prices1, key: "price", color: "#A389D4" }] })
        }
    }


    render() {
        const data = getDatum();

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
                <Row style={{width: "93vw"}}>
                    <Col >
                        <br></br>
                        <h1>Retirement Plan</h1>
                        <br></br>
                    </Col>
                </Row>
                <Row style={{width: "93vw"}}>
                    
                    <Col>
                        <Card style={{"height" : "30vh", "width" : "90vw"}}className='card-event center'>
                            <Card.Body>
                                <Row style={{width: "80vw"}}>
                                    <Col l={2}>
                                        <h3>Retire By:</h3>
                                        <h3>62</h3>
                                    </Col>
                                    <Col l={1} style={{left: "-70px"}}>
                                        <div style={{"height" : "20vh"}} className="vertical-line"></div>
                                    </Col>
                                    <Col l={3} style={{left: "-140px"}}>
                                        <h3>Amount Needed:</h3>
                                        <h3>$150,000</h3>
                                    </Col>
                                    <Col l={6} style={{left: "-70px", textAlign: "left"}}>
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
                <Row style={{width: "93vw"}}>
                    <Col sm={6} >
                    <br></br>
                        <Card className='Recent-Users' style={{height: "40vh", top: "-20px"}}>
                            <Card.Header>
                                <Card.Title as='h5'>Suitable Stocks</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2' style={{width: "40vw"}}>
                                <Table responsive hover size="sm" >
                                    <tbody >
                                    <tr className="unread" >
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>9 MAY 17:38</h6>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15"/>19 MAY 12:56</h6>
                                        </td>
                                    </tr>
                            
                                    </tbody>
                                </Table>
                                <br></br>
                            </Card.Body>
                        </Card>

                        <br></br>

                        <Card className='Recent-Users' style={{height: "40vh", top: "-20px"}}>
                            <Card.Header>
                                <Card.Title as='h5'>Compounding Calculator</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2' style={{width: "40vw"}}>
                                <Table responsive hover size="sm" >
                                    <tbody >
                                    <tr className="unread" >
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>9 MAY 17:38</h6>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15"/>19 MAY 12:56</h6>
                                        </td>
                                    </tr>
                            
                                    </tbody>
                                </Table>
                                <br></br>
                            </Card.Body>
                        </Card>
                        
                    
                    </Col>

                    <Col xs={6} >

                        <Card style={{height: "84vh"}}>
                            <Card.Body>
                                <h3 className='mb-4'>Growth Potential</h3>
                                {
                                    this.state.stock_prices &&
                                    <div>
                                        {
                                            React.createElement(NVD3Chart, {
                                                xAxis: {
                                                    tickFormat: function (d) { var date = new Date(0); date.setUTCSeconds(d); return date.toISOString().substr(0,10); },
                                                    axisLabel: 'Date',
                                                },
                                                yAxis: {
                                                    axisLabel: 'Price ($ m)',
                                                    tickFormat: function (d) { return parseFloat(d).toFixed(2); }
                                                },
                                                type: 'lineChart',
                                                datum: this.state.stock_prices,
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

            </Aux>
        );
    }
}

export default RetirementDashboard;
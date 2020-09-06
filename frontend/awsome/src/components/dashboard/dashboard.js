import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab, Container } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import GaugeChart from "react-gauge-chart";

import NewsContent from './NewsContent.js';

import "./dashboard.css"
import Sidebar from '../sidebar/sidebar';

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

class StockDashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            start_date: "2020-06-10",
            end_date: "2020-08-10",
            stock_symb: "MSFT",
            stock_prices: [],
            yesterday_sentiment: 0,
            days_before_sentiment: 0
        }

    }


    componentDidMount() {
        fetch("/api_stock_trends", 
        {
          method: 'POST',
          headers: {
              'Content-Type' : "application/json",
              "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
          },
          body: JSON.stringify({
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            stock_symb: this.state.stock_symb
          })
        }).then(response => {
            return response.json()
        }

        ).then((stock_prices) => {
            console.log(stock_prices)
            this.processStockPrices(stock_prices["stock_prices"])

            this.setState({
                yesterday_sentiment: stock_prices["yesterday_sentiment"],
                days_before_sentiment: stock_prices["days_before_sentiment"]
            })
        }).catch(error => {
            console.log(error)
            alert("There has been a problem")
        })
    }


    processStockPrices(prices0) {
        if (prices0 !== undefined) {
            const prices1 = prices0.map(({ x, y }) => {
                return { "x": Math.round(new Date(x).getTime() / 1000), "y": parseFloat(y) }
            }
            )
            this.setState({ stock_prices: [{ values: prices1, key: "price", color: "#A389D4" }] })
        }
    }


    render() {
        const data = getDatum();


        return (
            <Container fluid>
                <Row>
                    <Col s={2}>
                        <Sidebar />

                    </Col>
                    <Col s={10} id="dashboard-body">
                        <Container fluid style={{ width: "78vw" }}>
                            <Aux >
                                <Row>
                                    <Col xs={11}>
                                        <br></br>
                                        <h1>Name of Stock</h1>
                                        <br></br>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col xs={8}>

                                        <Card >
                                            <Card.Body>
                                                <h3 className='mb-4'>Stock Prices</h3>
                                                {
                                                    this.state.stock_prices &&
                                                    <div>
                                                        {
                                                            React.createElement(NVD3Chart, {
                                                                xAxis: {
                                                                    tickFormat: function (d) { var date = new Date(0); date.setUTCSeconds(d); return date.toISOString().substr(0, 10); },
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
                                                                height: 250,
                                                                width: 500,
                                                                renderEnd: function () {
                                                                    console.log('renderEnd');
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                }

                                            </Card.Body>
                                        </Card>

                                    </Col>

                                    <Col xs={4} >
                                        <Card className='card-event center' >
                                            <Card.Body style={{ width: "20vw" }}>
                                                <Row >
                                                    <Col>
                                                        <br></br>

                                                        <h1>79</h1>
                                                        <p>Stock Score</p>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <br></br>
                                                <Row>
                                                    <Col>
                                                        <h3>Bullish Indicator</h3>
                                                        <GaugeChart textColor="black" id="bullish" nrOfLevels={3} percent={this.state.yesterday_sentiment  / 100 + 0.5 }
                                                            formatTextValue = {
                                                                value => this.state.yesterday_sentiment + "%"
                                                            } />
                                                        <h5>Previous Level: {this.state.days_before_sentiment}%</h5>
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
                                    <Col sm={7}>
                                        <br></br>
                                        <Card className='Recent-Users'>
                                            <Card.Header>
                                                <Card.Title as='h5'>Information</Card.Title>
                                            </Card.Header>
                                            <Card.Body className='px-0 py-2' style={{ overflowX: "scroll", width: "40vw" }}>
                                                <Table responsive hover >
                                                    <tbody >
                                                        <tr className="unread">
                                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                                            <td>
                                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                                            </td>
                                                        </tr>
                                                        <tr className="unread">
                                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></td>
                                                            <td>
                                                                <h6 className="mb-1">Karla Sorensen</h6>
                                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38</h6>
                                                            </td>
                                                        </tr>
                                                        <tr className="unread">
                                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                                            <td>
                                                                <h6 className="mb-1">Ida Jorgensen</h6>
                                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={5} >
                                        <br></br>

                                        <Card style={{ marginTop: "5px"}}>
                                            <NewsContent></NewsContent>

                                        </Card>

                                    </Col>



                                </Row>
                                <br></br>
                                <br></br>

                            </Aux>

                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default StockDashboard;
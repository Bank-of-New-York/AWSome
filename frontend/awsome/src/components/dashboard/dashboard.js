import React from 'react';
import { Row, Col, Card, Table, Container, Tabs, Tab } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';

import GaugeChart from "react-gauge-chart";

import NewsContent from './NewsContent.js';

import "./dashboard.css"
import Sidebar from '../sidebar/sidebar';

import Joyride from "react-joyride";
import Tour from "reactour";

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
            // start_date: "2020-06-10",
            // end_date: "2020-08-10",
            stock_symb: "MSFT",
            stock_prices: [],
            yesterday_sentiment: 0,
            days_before_sentiment: 0,
            stock_data: [],
            run: false,
            steps: [
                {
                    target : "#stockNames",
                    content : "Helllooo"
                }
            ]
            
        }


    }


    componentDidMount() {

        const stock_data = JSON.parse(sessionStorage.getItem("stock_data"))
        stock_data["final_score"] = stock_data["final_score"].toFixed(2)
        this.setState({ stock_data: stock_data, stock_symb: stock_data.name })
        fetch("/api_stock_trends",
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
                },
                body: JSON.stringify({
                    stock_symb: stock_data.yf_id
                })
            }).then(response => {
                return response.json()
            }

            ).then((stock_prices) => {
                this.processStockPrices(stock_prices["stock_prices"])

                this.setState({
                    yesterday_sentiment: stock_prices["yesterday_sentiment"],
                    days_before_sentiment: stock_prices["days_before_sentiment"]
                })
            }).catch(error => {
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
                <Joyride steps={this.state.steps}
                    continuous="true"
                    debug="true"
                    showProgress="true" />
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
                                            <h1 id="stockName">{this.state.stock_data.name}</h1>
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

                                                            <h1>{this.state.stock_data.final_score}</h1>
                                                            <a>Stock Score</a>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    <br></br>
                                                    <Row>
                                                        <Col>
                                                            <h3>Bullish Indicator</h3>
                                                            <GaugeChart textColor="black" id="bullish" nrOfLevels={3} percent={this.state.yesterday_sentiment / 100 + 0.5}
                                                                formatTextValue={
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
                                            <Tabs defaultActiveKey="key_metrics" id="uncontrolled-tab-example" >
                                                <Tab eventKey="key_metrics" title="Key Metrics" >
                                                    <Card className='Recent-Users' >
                                                        <Card.Body className='px-0 mx-0' fluid style={{ overflowY: "scroll", width: "40vw" }}>
                                                            <Table responsive hover >
                                                                <tbody >
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Market Cap</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.market_cap}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Total Asset</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.total_asset}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Debt</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.debt}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Gross Profit</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.gross_profit}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Beta</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.beta}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Revenue (3 yrs back)</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.revenue_3y_bk}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Revenue (1 yr back)</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.revenue_1y_bk}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Revenue (1 yr forward)</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.revenue_1y_fd}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Current P/E</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.current_pe}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Estimated PEG</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.est_peg}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Dividend</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.dividend}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Average Volume</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_vol}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">GPTA</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.gpta}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Avg Sales Growth</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_sales_growth}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Debt to MCAP</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.debt_to_mcap}</h6>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>
                                                    </Card>
                                                </Tab>
                                                <Tab eventKey="stock_score" title="Stock Score">
                                                    <Card className='Recent-Users'>
                                                        <Card.Body className='px-0 py-2' style={{ overflowY: "scroll", width: "40vw" }}>
                                                            <Table responsive hover >
                                                                <tbody >
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">GPTA Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.gpta_rank}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Beta Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.beta_rank}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Avg Sales Growth Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_sales_growth_rank}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Debt To Mcap</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.debt_to_mcap}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Final Score</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" /> {this.state.stock_data.final_score}</h6>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>
                                                    </Card>
                                                </Tab>
                                            </Tabs>

                                        </Col>
                                        <Col sm={5} >
                                            <br></br>

                                            <Card style={{ marginTop: "5px" }}>
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
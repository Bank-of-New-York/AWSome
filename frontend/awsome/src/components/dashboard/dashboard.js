import React from 'react';
import { Popover, Tooltip, Overlay, OverlayTrigger, Row, Col, Card, Table, Container, Tabs, Tab } from 'react-bootstrap';

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
                                        <OverlayTrigger 
                                            placement="right" 
                                            overlay={
                                                <Popover id={"stockprices"}>
                                                    <Popover.Title as="h3"><strong>Stock Prices</strong></Popover.Title>
                                                    <Popover.Content>
                                                        This stock price graph indicates how prices of this particular stock has changed over time. It's important to see and understand the trends in stock prices.<br></br><br></br> But it's also important to realise trends don't mean everything! E.g. COVID19 caused many stocks to plunge in price out of nowhere.
                                                    </Popover.Content> 
                                                </Popover>
                                            }>
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
                                            </OverlayTrigger>
                                        </Col>

                                        <Col xs={4} >
                                            <Card className='card-event center' >
                                                <Card.Body style={{ width: "20vw" }}>
                                                    <OverlayTrigger 
                                                        placement="left" 
                                                        overlay={
                                                            <Popover id={"stockscore"}>
                                                                <Popover.Title as="h3"><strong>Quality Score</strong></Popover.Title>
                                                                <Popover.Content>
                                                                    StockOverflow's Stock Quality Score is derived based on:
                                                                    <br></br>
                                                                    <ul>
                                                                        <li>Efficiency of the company's business model</li>
                                                                        <li>Ability for business to grow</li>
                                                                        <li>Business Cyclicality</li>
                                                                        <li>Management Prudency</li>
                                                                    </ul>  
                                                                    This indicator can help with making your initial decisions on which stocks to focus on. But make sure to take a look at all other metrics before making your final decision!
                                                                </Popover.Content> 
                                                            </Popover>
                                                        }>



                                                    <Row >
                                                        <Col>
                                                            <br></br>

                                                            <h1>{this.state.stock_data.final_score}</h1>
                                                            <a>Quality Score</a>
                                                        </Col>
                                                    </Row>
                                                    </OverlayTrigger>
                                   
                                                    <br></br>
                                                    <br></br>
                                                    <OverlayTrigger 
                                                        placement="left" 
                                                        overlay={
                                                            <Popover id={"stockscore"}>
                                                                <Popover.Title as="h3"><strong>Stock Sentiment</strong></Popover.Title>
                                                                <Popover.Content>
                                                                    The sentiment of a stock is a leading indicator of how stock prices could be, going forward. 
                                                                    if a large increase in sentiment occurs without a corresponding increase in stock price, the price
                                                                    could potentially increase in the near future as more people pick up on this.
                                                                    <br></br><br></br>
                                                                    It's also important to note that this is NOT the only indicator you should be looking at as investor outlook on a stock does not 
                                                                    necessarily determine whether it's a good stock to buy into - just an indication of current/future change
                                                                </Popover.Content> 
                                                            </Popover>
                                                        }>
                                                    <Row>
                                                        <Col>
                                                            <h3>Sentiment</h3>
                                                            <GaugeChart textColor="black" id="bullish" nrOfLevels={3} percent={this.state.yesterday_sentiment / 100 + 0.5}
                                                                formatTextValue={
                                                                    value => this.state.yesterday_sentiment + "%"
                                                                } />
                                                            <h5>Previous Level: {this.state.days_before_sentiment}%</h5>
                                                        </Col>
                                                    </Row>
                                                    </OverlayTrigger>
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
                                                                <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Market Cap</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Market Capitalization refers to the total dollar market value of a company's outstanding shares of stock.<br></br>
                                                                                Simply put: Market Cap refers to how much the comapny is worth based on the stock market
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Market Cap ($ mil)</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.market_cap / 1000000}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Gross Profit</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Gross profit refers to the profit a company makes after deducting costs.<br></br>
                                                                                This can indicate a company's efficiency at producing goods and services.
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Gross Profit</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.gross_profit}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Price-to-Earnings Ratio</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                P/E Ratio is the ratio for valuing a company by comparing its current share price relative to its per-share earnings. <br></br><br></br>
                                                                                P/E Ratios are used as indicators of the relative value of a company's shares, compared to its own historical records or to other companies/markets.<br></br><br></br>
                                                                                A high P/E ratio could mean the stock is over-valued or that investors may be expecting high future growth rates
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Current P/E</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.current_pe}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Price/Earnings to Growth Ratio</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                PEG ratio is a stock's P/E Ratio divided by the growth rate of its earning in specific time period. <br></br><br></br>
                                                                                PEG helps determine a stock's value while factoring their expected earning growth, and is a better indicator of the stock's true value than just P/E <br></br><br></br>
                                                                                e.g. A lower PEG may indicate the stock is undervalued.
                                                                                <br></br><br></br>
                                                                                Note: PEGs given by different sources will differ depending on whether 1-year or 3-year projected growth is used
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Estimated PEG</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.est_peg}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Dividend Yield</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Dividend yield is the ratio of dividend / price, representing how much a company pays out in dividends yearly compare to its stock price. <br></br><br></br>
                                                                                Mature companies, especially those in staple industries like utility often have higher dividend yields. <br></br><br></br>
                                                                                Note: Higher dividend yields =/= attractive investment opportunity as a declining stock price may also cause dividend yield to increase. Make sure to check the stock price graph and compare it to this value!
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Dividend Yield</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.dividend}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>

                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Volume</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Volume refers to amount of an asset/security that changes hands over a period of time (often a day)<br></br><br></br>
                                                                                Shares that are more active tend to be more liquid. Volume is also an important measure of the relative significance of a market move. The higher the volume during a price move, the more significant the move.
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Average Volume</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_vol}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>
                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Average Sales Growth</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Sales Growth rates refer to the percentage change of sales over a specific time period. They are used to express the annual change in sales as a percentage. <br></br><br></br>
                                                                                This is a great indicator for assessing a company's current and future performance.
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Avg Sales Growth</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_sales_growth}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    </OverlayTrigger>
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
                                                                <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Gross Profit to Assets</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                GPTA is a good measure of the company's profitablity and ability to use its assets to generate earnings. <br></br><br></br>
                                                                                Note: There are some concerns that GPTA may look higher than reality because it's based on the book value of their assets rather than their market value.
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Gross Profit to Assets Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.gpta_rank}</h6>
                                                                        </td>
                                                                    </tr></OverlayTrigger>
                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Beta</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Beta is a measure of a stock's volatility in relation to the overall market.<br></br><br></br>
                                                                                e.g. if a stock swings less than the market, it'll have a beta > 1.0<br></br><br></br>
                                                                                High-beta stocks are generally riskier but may provide higher (generally short-term) returns
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Beta Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.beta_rank}</h6>
                                                                        </td>
                                                                    </tr></OverlayTrigger>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Avg Sales Growth Rank</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />{this.state.stock_data.ave_sales_growth_rank}</h6>
                                                                        </td>
                                                                    </tr>
                                                                    <OverlayTrigger 
                                                                    placement="right" 
                                                                    overlay={
                                                                        <Popover id={"stockscore"}>
                                                                            <Popover.Title as="h3"><strong>Debt-to-Capitalization Ratio</strong></Popover.Title>
                                                                            <Popover.Content>
                                                                                Debt-to-capitalization ratio measures the total amount of company debt versus their total market cap. This is an indicator of the company's leverage, aka debt used to purchase assets.<br></br><br></br>
                                                                                A higher ratio normally means the company is more highly leverage, and therefore have a higher risk of financial distress (insolvency)
                                                                            </Popover.Content> 
                                                                        </Popover>
                                                                    }>
                                                                    <tr className="unread">
                                                                        <td>
                                                                            <h6 className="mb-1">Debt-to-Capitalization</h6>
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{this.state.stock_data.debt_to_mcap}</h6>
                                                                        </td>
                                                                    </tr></OverlayTrigger>

                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>
                                                    </Card>
                                                
                                                </Tab>
                                            
                                            
                                            </Tabs>

                                            

                                        </Col>
                                        <Col sm={5} >
                                            <br></br>

                                            <OverlayTrigger 
                                                placement="left" 
                                                overlay={
                                                    <Popover id={"stockscore"}>
                                                        <Popover.Title as="h3"><strong>News</strong></Popover.Title>
                                                        <Popover.Content>
                                                            Reading news about a particular company can help understand what incites excitement/fear in investors, and therefore how the market may respond to certain business decisions. Plus, a good understanding of global and local issues can help you gain a better understanding of market movements.
                                                        </Popover.Content> 
                                                    </Popover>
                                                }>
                                            <Card style={{ marginTop: "5px" }}>
                                                
                                                <NewsContent></NewsContent>

                                            </Card>
                                            </OverlayTrigger>

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
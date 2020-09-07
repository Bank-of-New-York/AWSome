import React from 'react';
import { Row, Col, Card, Table, Form, Button, Popover, OverlayTrigger} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import "./equityListing.css"

class EquityListing extends React.Component {

    constructor () {
        super()
        this.state = {
            stocks : [],
            minMarketCap: 0,
            maxMarketCap: 4000000
        }
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        sessionStorage.setItem(name, value)

        if (name == "minMarketCap") {
            sessionStorage.setItem("minMarketCap", value)

        }

        if (name == "maxMarketCap") {
            sessionStorage.setItem("maxMarketCap", value)
        }

        this.setState({
            [name]: value
        })
    }


    componentDidMount() {

        if (sessionStorage.getItem("minMarketCap") !== null) {
            this.setState({ minMarketCap : sessionStorage.getItem("minMarketCap")})
        }


        if (sessionStorage.getItem("maxMarketCap") != null) {
            this.setState({ maxMarketCap : sessionStorage.getItem("maxMarketCap")})
        }

        if (sessionStorage.getItem("stocks") == null) {
            fetch("/api_multiple_spfh", {
                method: "GET",
                headers: {
                    'Content-Type' : "application/json",
                    "Authorization": `Basic ${btoa(`${sessionStorage.getItem("token")}:`)}`
                }
            }).then((resp) => {
                return resp.json()
            }).then((values) => {

                values.sort(function(first, second) {
                    return -(first["final_score"] - second["final_score"])
                });

                this.setState({stocks : values})
                sessionStorage.setItem("stocks", JSON.stringify(values))
            })
        } else {
            this.setState({stocks : JSON.parse(sessionStorage.getItem("stocks"))})
        }
        
    }



    handleRowClick = (e) => {
        this.state.stocks.forEach(s => {
            if (s["id"] == e.target.id) {
                sessionStorage.setItem("stock_data", JSON.stringify(s))
                
            }
        });
        
        window.location.href = "/dashboard"
    }


    render() {



        return (
            <Aux>
                <Row>
                  <Col>
                  <Card style = {{ height: "30vh" }}>
                    <Card.Body>
                      <Row >
                        <Col style={{left: "-2vw", width: "20vw"}}>
                            <h2>Equity Listings</h2>
                        </Col>
                        <Col  style={{left: "0vw"}}>
                            <Row style={{ width: "55vw"}}>
                            <Col >
                                <Form.Group controlId="range1">
                                    <Form.Label>Min. Market Cap: {this.state.minMarketCap}</Form.Label>
                                    <Form.Control type="range" custom onChange={this.handleInputChange} defaultValue={this.state.minMarketCap} name="minMarketCap" max="200"/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="range2">
                                    <Form.Label>Max. Market Cap: {this.state.maxMarketCap}</Form.Label>
                                    <Form.Control type="range" custom onChange={this.handleInputChange} value={this.state.maxMarketCap} name="maxMarketCap" max="200"/>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Market Cap refers to how much the company is worth based on the stock market.<br></br>
                                Stocks with larger Market Caps are generally lower risk and lower return
                                </Col>
                            </Row>
                        </Col>
                        
   
                      </Row>

                    </Card.Body>
                        <br></br>
                  </Card>
                  </Col>
                </Row>
                <Row className= "mt-3">
                    <Col style={{width:"80vw"}}>
                        <Card style={{overflow: "scroll"}}>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <th>Name</th>
                                        <th>Market Cap<br></br>(billion)</th>
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
                                        <th>Current P/E</th></OverlayTrigger>

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
                                        <th>Estimated PEG</th>
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
                                        <th>Dividend Yield (%)</th></OverlayTrigger>

                                        <OverlayTrigger 
                                        placement="right" 
                                        overlay={
                                            <Popover id={"stockscore"}>
                                                <Popover.Title as="h3"><strong>Average Daily Trading Volume</strong></Popover.Title>
                                                <Popover.Content>
                                                    Volume refers to amount of an asset/security that changes hands over a period of time (often a day)<br></br><br></br>
                                                    Shares that are more active tend to be more liquid. Volume is also an important measure of the relative significance of a market move. The higher the volume during a price move, the more significant the move.
                                                </Popover.Content> 
                                            </Popover>
                                        }>
                                        <th>Average Daily<br></br>Trading Volume (mil)</th></OverlayTrigger>
                                        <th>Final Score</th>

                                    </thead>
                                    <tbody>
                                        {/* <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr> */}
                                    
                                        {this.state.stocks.map(stock => {

                                            if (stock.market_cap / 1000000000 <= this.state.maxMarketCap && stock.market_cap / 1000000000 >= this.state.minMarketCap) {
                                                return (
                                                <tr key={stock.id} onClick={(e) => {this.handleRowClick(e)}} data-user={stock.id}>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.name}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{(stock.market_cap / 1000000000).toFixed(2)}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.current_pe}</h4>
                                                    </td>
                                                    
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.est_peg}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.dividend}</h4>
                                                    </td>
                                                   
                                                    <td>
                                                        <h4>{(stock.ave_vol/1000000).toFixed(2)}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{(stock.final_score).toFixed(2)}</h4>
                                                    </td>

                                                    <td>
                                                        <Button id="more-info-btn" href="/dashboard">More Info</Button>
                                                    </td>
                                                    


                                                </tr>
                                            )
                                            }

                                            
                                        })}
                                    
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                  
            </Aux>
        );
    }
}

export default EquityListing;
import React from 'react';
import { Row, Col, Card, Table, Form, Button} from 'react-bootstrap';

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
                  <Card style = {{ height: "15vw" }}>
                    <Card.Header className="text-center" as="h2">Equity Listings</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Form.Group controlId="range1">
                            <Form.Label>Min. Market Cap</Form.Label>
                            <Form.Control type="range" custom onChange={this.handleInputChange} defaultValue={this.state.minMarketCap} name="minMarketCap" max="999999"/>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="range2">
                            <Form.Label>Max. Market Cap</Form.Label>
                            <Form.Control type="range" custom onChange={this.handleInputChange} defaultValue={this.state.maxMarketCap} name="maxMarketCap" max="999999"/>
                          </Form.Group>
                        </Col>
   
                      </Row>
                      
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
                <Row className= "mt-3">
                    <Col>
                        <Card style={{overflow: "scroll"}}>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <th>Name</th>
                                        <th>Market Cap</th>
                                        <th>Avg. Sales Growth</th>
                                        <th>Avg. Sales Growth Rank</th>
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

                                            if (stock.market_cap / 1000000 <= this.state.maxMarketCap && stock.market_cap / 1000000 >= this.state.minMarketCap) {
                                                return (
                                                <tr key={stock.id} onClick={(e) => {this.handleRowClick(e)}} data-user={stock.id}>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.name}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.market_cap / 1000000}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.ave_sales_growth}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.ave_sales_growth_rank}</h4>
                                                    </td>
                                                    <td id={stock.id}>
                                                        <h4 id={stock.id}>{stock.final_score}</h4>
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
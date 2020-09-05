import React from 'react';
import { Row, Button, Col, Card, Table, Tabs, Tab, Container, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import NVD3Chart from 'react-nvd3';


class CompoundCalculator extends React.Component {

    constructor() {
        super();
        this.state = {
            first_depo: 0,
            monthly_depo: 0,
            years: 0,
            r: 0,
            total: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        console.log(name, value)
        
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (e) => {

        let monthly_r = this.state.r / 12;
        let compound = [{"x" : 0, "y" : this.state.first_depo}]
                
        for (let yr = 1; yr <= this.state.years; yr++) {
            let multiplier = Math.pow(1 + this.state.monthly_r, 12 * yr);
            let compound_principal = this.state.first_depo * multiplier;
            let compound_monthly = this.state.monthly_depo * (multiplier - 1) / monthly_r;
            
            compound.push({
            'x': yr,
            'y': compound_principal + compound_monthly
            });
        }

        e.preventDefault()
        console.log(compound)

        this.setState({total: compound})

        
    }



    render() {

        return (
        
            <Container>
                <Row style={{width: "93vw"}}>
                    
                    <Col>
                        <Card className='card-event center'>
                            <Card.Body>
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

                          
                            </Card.Body>
                        </Card>

                        
                    </Col>
                    <Col>
                    <Card style={{height: "84vh"}}>
                            <Card.Body>
                                <h3 className='mb-4'>Growth Potential</h3>
                                {
                                    this.state.total &&
                                    <div>
                                        {
                                            React.createElement(NVD3Chart, {
                                                xAxis: {
                                                    tickFormat: function (d) { return d },
                                                    axisLabel: 'Date',
                                                },
                                                yAxis: {
                                                    axisLabel: 'Price ($ m)',
                                                    tickFormat: function (d) { return d; }
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

                    </Col>

                    
                </Row>
            </Container>
            
        );
    }
}

export default CompoundCalculator;
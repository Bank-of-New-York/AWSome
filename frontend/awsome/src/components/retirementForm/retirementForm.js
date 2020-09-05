import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import "./retirementForm.css"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Parser from "html-react-parser"

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};

    // if (droppableSource.droppableId == "droppable") {
    //     result[droppableDestination.droppableId] = destClone;
    // } else {
    //     result[droppableSource.droppableId] = sourceClone;
    //     result[droppableDestination.droppableId] = destClone;
    // }

    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#FFA861' : 'white',
    border: "#5CD4EF solid 2px",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#FFD6AB' : '#5CD4EF',
    padding: grid,
    width: 150,
    height: "422px"

});

const getOriginalListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#FFD6AB' : '#5CD4EF',
    padding: grid,
    width: 150,
    overflow: "scroll",
    height: "400px",

});

export default class RetirementForm extends Component {

    bto = {"3" : "$150,000", "4":"$300,000", "5":"$400,000"}

    constructor() {
        super()


        this.state = {
            btoroom: "$150,000",
            resaleroom: "$350,000",
            condoroom: "$640,000",
            privatecondoroom: "$800,000",
            children: 0,
            items: [
                { id: "item-0", content: "Car $70,000" }, 
                { id: "item-1", content: "University $40,000" }, 
                { id: "item-2", content: <><div>Children<input className='drag-input' type='number' name='children' placeholder="no." onChange={this.handleInputChange} ></input><div id="children"></div></div></> }, 
                { id: "item-3", content: "Wedding $30,000" },  
                { id: "item-4", content: <><div>BTO Flat
                                            <select className='drag-input' type='number' placeholder="no. rms" name='btoroom' onChange={this.handleInputChange} >
                                                <option value="$150,000" active="true">3 rms</option>
                                                <option value="$300,000">4 rms</option>
                                                <option value="$400,000">5 rms</option>
                                            </select>
                                            <div id="bto">$150,000</div></div></> }, 
                { id: "item-5", content: <><div>Resale Flat
                                            <select className='drag-input' type='number' placeholder="no. rms" name='resaleroom' onChange={this.handleInputChange} >
                                                <option value="$350,000" active="true">3 rms</option>
                                                <option value="$420,000">4 rms</option>
                                                <option value="$520,000">5 rms</option>
                                            </select>
                                            <div id="resale">$350,000</div></div>
                                            </> },  
                { id: "item-6", content: <><div>Executive Condo
                                            <select className='drag-input' type='number' placeholder="no. rms" name='condoroom' onChange={this.handleInputChange} >
                                                <option value="$640,000" active="true">2 rms</option>
                                                <option value="$780,000">3 rms</option>
                                                <option value="$1,100,000">4 rms</option>
                                                <option value="$1,600,000">5 rms</option>
                                                <option value="$1,900,000">Penthouse</option>
                                            </select>
                                            <div id="ex-condo">$640,000</div></div></> }, 
                { id: "item-7", content: <><div>Private Condo
                                            <select className='drag-input' type='number' placeholder="no. rms" name='privatecondoroom' onChange={this.handleInputChange} >
                                                <option value="$800,000" active="true">2 rms</option>
                                                <option value="$970,000">3 rms</option>
                                                <option value="$1,400,000">4 rms</option>
                                                <option value="$2,000,000">5 rms</option>
                                                <option value="$3,000,000">Penthouse</option>
                                            </select>
                                            <div id="priv-condo">$800,000</div></div></> },
                { id: "item-8", content: "Renovations $60,000"}],
            selected1: [],
            selected2: [],
            selected3: [],
            selected4: [],
            selected5: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;
        const name = target.name; 
        
        if (name == "btoroom") {
            document.querySelector("#bto").innerHTML = value;
        }

        if (name == "resaleroom") {
            document.querySelector("#resale").innerHTML = value;
        }

        if (name == "condoroom") {
            document.querySelector("#ex-condo").innerHTML = value;
        }

        if (name == "privatecondoroom") {
            document.querySelector("#priv-condo").innerHTML = value;
        }

        if (name == "children") {
            document.querySelector("#children").innerHTML = "$" + (value * 400000).toLocaleString();
        }

        this.setState({
            [name] : value
        })
    }


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected1',
        droppable3: 'selected2',
        droppable4: 'selected3',
        droppable5: 'selected4',
        droppable6: 'selected5',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        var id2List = {
            droppable: 'items',
            droppable2: 'selected1',
            droppable3: 'selected2',
            droppable4: 'selected3',
            droppable5: 'selected4',
            droppable6: 'selected5',
        };

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected1: items };
            } else if (source.droppableId === "droppable3") {
                state = {selected2: items}
            } else if (source.droppableId === "droppable4") {
                state = {selected3: items}
            } else if (source.droppableId === "droppable5") {
                state = {selected4: items}
            } 

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );


            Object.keys(result).forEach(droppable => {

                if (droppable=== "droppable") {
                    this.setState({
                        items : result[droppable]
                    })
                } else if (droppable === 'droppable2') {
                    this.setState({
                        selected1 : result[droppable]
                    })
                } else if (droppable === "droppable3") {
                    this.setState({
                        selected2 : result[droppable]
                    })
                } else if (droppable === "droppable4") {
                    this.setState({
                        selected3 : result[droppable]
                    })
                } else if (droppable === "droppable5") {
                    this.setState({
                        selected4 : result[droppable]
                    })
                } 
            });

            // this.setState({
            //     items: result.droppable,
            //     [id2List[result.droppableId]]: result.droppableId
            // });
        }
    };

    handleCalculation = () => {
        var total = 0
        var all = this.state.selected1.concat(this.state.selected2, this.state.selected3, this.state.selected4);
        all.forEach(item => {
            console.log(item, typeof item["content"])
            if (typeof item["content"] == "string") {
                total += parseInt(item["content"].replace(',', "").split(" ")[1].substr(1))
            } else {
                if (this.state.children > 0) {
                    total += this.state.children * 400000
                }
    
                Object.keys(this.state).forEach((i) => {
                    if (i.includes("room") && i == item["content"].props["children"].props["children"][1].props.name) {
                        total += parseInt(this.state[i].replace(',', "").substr(1))
                    }
                })
            }

            

        });
        console.log("total", total)
        console.log(document.querySelector("#totalneeded").innerHTML)
        document.querySelector("#totalneeded").innerHTML = "$" + (total).toLocaleString()

    }




    render() {

        console.log(this.state.btoroom)
        return (
            <Container fluid>

                <Row>
                    <Col xl={10}>
                        <br></br>
                        <h1 className="retire-title">Planning Your Future</h1>
                    </Col>

                </Row>

                <br></br>
                <br></br>

                <Row>
                    <Col xl={10}>

                        <div>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="first_name">
                                            <Form.Label>When do you plan to retire? </Form.Label>
                                            <Form.Control type="number" placeholder="62"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <h3>Total Needed:</h3>
                                        <h3 id="totalneeded">$0</h3>
                                    </Col>
                                    <Col>
                                        <Button id="submit" variant="primary" onClick={this.handleCalculation}>Calculate</Button>
                                    </Col>
                                </Row>

                                <br></br>
                                <br></br>

                                <Row>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <Col className="center">
                                            <h4>Drag and drop<br></br>to plan</h4>
                                            <Droppable id="droppable" droppableId="droppable">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getOriginalListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.items.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>20-30 yrs old</h4>
                                            <Droppable droppableId="droppable2">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected1.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>30-40 yrs old</h4>
                                            <Droppable droppableId="droppable3">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected2.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>50-60 yrs old</h4>
                                            <Droppable droppableId="droppable4">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected3.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4> 60 yrs old</h4>
                                            <Droppable droppableId="droppable5">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected4.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                    </DragDropContext>
                                </Row>


                                <br></br><br></br>

                                
                                <Link to="/equityResult">
                                    <Button id="submit" variant="primary" type="submit">Next</Button>
                                </Link>
                                
                            </Form>
                        </div>

                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
            </Container>
        )
    }
}
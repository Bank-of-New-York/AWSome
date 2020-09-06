import React from 'react';

import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { Table } from 'react-bootstrap';


class NewsContent extends React.Component {

  constructor() {
      super();
      this.state = {
          // articles: []
          articles : [
            {
              source: {
                name: "Bloomberg?"
              },
              title: "This is title 1 It is very long, may take more than one line. ",
              url: "1"
            },
            {
              source: {
                name: "Yahoo?"
              },
              title: "This is title 1 It is very long, may take more than one line. ",
              url: "2"
            },
            {
              source: {
                name: "Bloomberg?"
              },
              title: "This is title 2. short.",
              url: "3"
            },
            {
              source: {
                name: "Yahoo?"
              },
              title: "This is title 1 It is very long, may take more than one line. ",
              url: "4"
            },
            {
              source: {
                name: "Yahoo?"
              },
              title: "This is title 2. short.",
              url: "5"
            },
            {
              source: {
                name: "Bloomberg?"
              },
              title: "This is title 1 It is very long, may take more than one line. ",
              url: "6"
            },
            {
              source: {
                name: "Bloomberg?"
              },
              title: "This is title 2. short.",
              url: "7"
            }
          ]
      }
  }

  // Cannot call too many times during development

  // componentDidMount() {
  //   fetch("/api_general_news", 
  //     {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type' : "application/json"
  //       },
  //       body: JSON.stringify({
  //         stock_symb: this.props.stock_symb
  //       })
  //     }).then(response => 
  //         response.json()
  //     ).then( data  => {
  //         console.log(data)
  //         this.setState({ articles: data.articles })
  //     }).catch(error => {
  //         console.log(error)
  //         alert("There has been a problem")
  //     })
  // }

  render(){
    return(
      <Aux >
          <br></br>
          <h3 align='center'>News</h3>
          <Table responsive size="sm" style={{width: "90%", margin: "auto"}}>
          {
            this.state.articles ?
            this.state.articles
            .slice(0, 10)
            .map(article => 

              <tr key={article.url}>
                <td style={{whiteSpace: "unset"}} >
                <br></br>
                  <h5>{ article.source.name }</h5>
                  <p className="m-0 d-inline">{ article.title }</p>
                  
                </td>
                
              </tr>

             
            )
            :
            <p>Loading...</p>
          }
          </Table>

          
          
      </Aux>
    )
    }

}


export default NewsContent;
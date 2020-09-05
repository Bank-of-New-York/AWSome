import React from 'react';

import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';


class NewsContent extends React.Component {

  constructor() {
      super();
      this.state = {
          articles: []
      }
  }

  componentDidMount() {
    fetch("/api_general_news", 
      {
        method: 'POST',
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({
          stock_symb: "MSFT"
        })
      }).then(response => 
          response.json()
      ).then( data  => {
          console.log(data)
          this.setState({ articles: data.articles })
      }).catch(error => {
          console.log(error)
          alert("There has been a problem")
      })
  }

  render(){
    return(
      <Aux>
          <h3 align='center'>News</h3>

          {
            this.state.articles ?
            this.state.articles
            .slice(0, 10)
            .map(article => 
              <div key={article.url} className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={article.url}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <p className="m-0 d-inline">{ article.title }</p>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />{ article.source.name }</span>
                </div>
              </div>
            )
            :
            <p>Loading...</p>
          }
          
      </Aux>
    )
    }

}


export default NewsContent;
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import placeholder from '../images/placeholder.jpg'
export class News extends Component {
  constructor() {
    super()
    this.state = {
      articles: null,
      loading: false
    }
  }

  async componentDidMount(){
    //It runs after render method runs
    let url='https://newsapi.org/v2/top-headlines?country=in&apiKey=bbe2ef729099403d8b19ccf771ab4f80'
    let dataPromise=await fetch(url).then(response=>{
      if(response.ok){
        return response.json()
      }
      else{
        console.log("error")
      }
    }).then(response=>{
      //console.log(response.articles)
      
      let removedNull=response.articles
      removedNull.map(e=>{
        if (e.title===null){e.title=""}
        if(e.url===null){e.url=""}
        if(e.description===null){e.description=""}
        if(e.urlToImage===null){e.urlToImage=placeholder}
        this.setState({
          articles: removedNull,
          loading: true
        })
        //console.log(e)
      })
      return removedNull
    })
    .catch(error=>{
      console.log("Error catched")
    })
    //console.log(dataPromise)
  }

  render() {
    
    return (  
      <div className='container my-2'>
        <h1 className='text-center'>News - Top Headlines</h1>
        <div className='row'>
          
          {this.state.articles && this.state.articles.map((o) => {
            return <div className='col-md-3' key={o.url}>
              <NewsItem title={o.title} description={o.description} imageurl={o.urlToImage} newsurl={o.url} />
            </div>
          })}

        </div>
      </div>

    )
  }
}

export default News

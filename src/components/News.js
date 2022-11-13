import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import placeholder from '../images/placeholder.jpg'
import Spinner from './Spinner'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    apikey: 'notfound'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    apikey: PropTypes.string 
  }
  constructor() {
    super()
    this.state = {
      articles: [],
      loading: true,
      error: false,
      page: 0,
      totalResults: 0
    }
  }

  fetchNews = async (p) => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&pagesize=8&page=${p}&category=${this.props.category}&apiKey=${this.props.apikey}`
    let dataPromise = await fetch(url).then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        console.log("error")
      }
    }).then(response => {

      let removedNull = response.articles
      removedNull.map(e => {
        if (e.title === null) { e.title = "" }
        if (e.url === null) { e.url = "" }
        if (e.description === null) { e.description = "" }
        if (e.urlToImage === null) { e.urlToImage = placeholder }
        if(e.author===null || e.author==='') {e.author='Unknown'}
        if(e.source.name===null || e.source.name==='') {e.source.name='Unknown'}
        if(e.publishedAt===null || e.publishedAt==='') {e.publishedAt=new Date().toISOString()}
        e.publishedAt=new Date(e.publishedAt).toString()
        this.setState({
          articles: removedNull,
          loading: false,
          error: false,
          page: p,
          totalResults: response.totalResults
        })
      })
      return removedNull
    })
      .catch(error => {
        console.log("Error catched")
        this.setState({
          articles: [],
          loading: false,
          error: true,
          page: 0,
          totalResults: 0
        })
      })
  }


  async componentDidMount() {
    //It runs after render method runs
    this.fetchNews(1)
  }
  handlePrevClick = async () => {
    this.setState({
      articles: [],
      loading: true
    })
    this.fetchNews(this.state.page - 1)
  }
  handleNextClick = async () => {
    this.setState({
      articles: [],
      loading: true
    })
    this.fetchNews(this.state.page + 1)
  }


  render() {

    return (
      <>
        <div className='container my-2'>
          <h1 className='text-center my-5'>News - {(this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1))==='General'?'Top Headlines':this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)}</h1>
          {this.state.loading && <Spinner />}
          {this.state.error && <h1 className='text-center'>Some Error Occured!</h1>}
          <div className='row'>

            {this.state.articles.map((o) => {
              return <div className='col-lg-3 col-md-4 col-sm-6' key={o.url}>
                <NewsItem title={o.title} description={o.description} imageurl={o.urlToImage} newsurl={o.url} author={o.author} source={o.source.name} date={o.publishedAt} />
              </div>
            })}


          </div>
        </div>
        <div className='container d-flex justify-content-between my-5'>
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-primary btn-sm">&larr;Previous</button>
          <button disabled={this.state.totalResults <= this.state.page * 8} type="button" onClick={this.handleNextClick} className="btn btn-primary btn-sm">Next&rarr;</button>
        </div>
      </>
    )
  }
}

export default News

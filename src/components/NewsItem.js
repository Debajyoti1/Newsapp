import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {

  render() {
    let { title, description, imageurl, newsurl, author, source, date } = this.props
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageurl} className="card-img-top" alt={title.slice(0, 25)} style={{ maxHeight: "160px" }} />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0, 60)} <br/> <span className="badge text-bg-info">{source}</span></h5>
            <p className="card-text">{description.slice(0, 120) + '...'}</p>
            <p className="card-text"><small className="text-muted">By {author} on {date} </small></p>
            <a href={newsurl} target="blank" className="btn btn-primary btn-sm">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem

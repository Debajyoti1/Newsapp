import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {

  render() {
    let {title,description,imageurl,newsurl} = this.props
    return (
      <>
        <div className="card" style={{width: "18rem"}}>
          <img src={imageurl} className="card-img-top" alt={title.slice(0,25)} style={{maxHeight: "160px"}} />
            <div className="card-body">
              <h5 className="card-title">{title.slice(0,40)}</h5>
              <p className="card-text">{description.slice(0,80)+'...'}</p>
              <a href={newsurl} target="blank" className="btn btn-primary btn-sm">Read More</a>
            </div>
        </div>
        </>
    )
  }
}

export default NewsItem

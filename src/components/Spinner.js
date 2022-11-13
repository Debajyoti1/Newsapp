import React, { Component } from 'react'
import loading from '../images/loading.gif'
export class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{maxHeight: "150px"}}/>
      </div>
    )
  }
}

export default spinner

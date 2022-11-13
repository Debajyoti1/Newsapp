
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <Routes>
        <Route path='/' element={<News key="blank" apikey={this.apikey} />} />
        <Route path='/business' element={<News key="business" apikey={this.apikey} category='business' />} />
        <Route path='/entertainment' element={<News key="entertainment" apikey={this.apikey} category='entertainment' />} />
        <Route path='/health' element={<News key="health" apikey={this.apikey} category='health' />} />
        <Route path='/science' element={<News key="science" apikey={this.apikey} category='science' />} />
        <Route path='/sports' element={<News key="sports" apikey={this.apikey} category='sports' />} />
        <Route path='/technology' element={<News key="technology" apikey={this.apikey} category='technology' />} />
        </Routes>
        </Router>
      </div>
    )
  }
}


import React, { Component } from 'react'
import './App.css'
import { sampleText } from './sampleText'
import marked from 'marked'

class App extends Component {
  
  state = {
    text: sampleText
  }

  componentDidMount () {
    const text = localStorage.getItem('text')
    text ? this.setState({text}) : this.setState({text:sampleText})
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }
  
  handleChange = event => {
    const text = event.target.value 
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  render () {
    return (
      <div className='container'>
        <h1 style={{ textAlign: 'center', margin: '30px' }}>Realtime Markdown Editor</h1>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
              onChange= {this.handleChange}
              value={this.state.text}
              className='form-control'
              rows='35'
            />
          </div>
          <div className='col-sm-6'>
            <div>
              <div dangerouslySetInnerHTML={ this.renderText(this.state.text) }
              />
            </div>
          </div>
        </div>
        <footer style={{textAlign:'center', margin: '30px'}}>By Frederick Denis</footer>
      </div>
    )
  }
}

export default App

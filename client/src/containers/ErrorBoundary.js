import React, { Component } from 'react'
import { Redirect } from 'react-router';
export class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
      
      if (this.state.hasError) {
        console.log('caught error')
        return <Redirect to="/" />
      }
  
      return this.props.children; 
    }
  }
export default ErrorBoundary


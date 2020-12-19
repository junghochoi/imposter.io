import React, { Component } from 'react'
import { Redirect } from 'react-router';
export class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <Redirect to="/" />
      }
  
      return this.props.children; 
    }
  }
export default ErrorBoundary


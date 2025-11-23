import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log 3D-specific errors for debugging
    if (error.message?.includes('WebGL') || error.message?.includes('three') || error.message?.includes('Canvas')) {
      console.warn('3D rendering error detected. Falling back to static content.');
    }
  }

  render() {
    if (this.state.hasError) {
      // If there's a custom fallback, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback: return null (component won't render)
      // This prevents the app from breaking
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


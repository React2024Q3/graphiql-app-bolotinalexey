'use client';

import { Component } from 'react';

import { ErrorPage } from '../ErrorPage';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorPage error={error} />;
    }
    return this.props.children;
  }
}
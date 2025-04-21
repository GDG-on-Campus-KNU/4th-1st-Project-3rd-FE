import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ({ resetError }: { resetError: () => void }) => ReactNode;
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>{this.props.fallback({ resetError: this.resetError.bind(this) })}</>
      );
    }

    return this.props.children;
  }
}

// Створіть файл frontend/src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Error caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Щось пішло не так. Спробуйте оновити сторінку.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
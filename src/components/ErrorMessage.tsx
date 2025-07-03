import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center text-red-600 py-4 font-medium">
      {message || 'Something went wrong. Please try again.'}
    </div>
  );
};

export default ErrorMessage;

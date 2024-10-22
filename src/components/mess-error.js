import React from 'react';
import { WarningOutlined } from '@ant-design/icons';

const MessError = ({ message }) => {
  if (!message) {
    return ''; 
  }

  return (
    <span className={'error'}>
      <div className={'icon'}>
        <WarningOutlined className='w-[14px]' />
      </div>
      {message}
    </span>
  );
}

export default MessError;
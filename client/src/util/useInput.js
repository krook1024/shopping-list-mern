import React, { useState } from 'react';
import { Input } from 'reactstrap';

export default function useInput({ type, placeholder = '', id = '' }) {
    const [value, setValue] = useState('');
    const input = (
        <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            type={type}
            placholder={placeholder}
            id={id}
        />
    );
    return [value, input];
}

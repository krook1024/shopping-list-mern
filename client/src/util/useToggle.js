import React, { useState } from 'react';

export default function useToggle({ defaultValue = false } = {}) {
    const [value, setValue] = useState(defaultValue || false);
    const toggle = () => {
        setValue(!value);
    };
    return [value, toggle];
}

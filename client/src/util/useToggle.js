import { useState } from 'react';

export default function useToggle({
    defaultValue = null,
    extraFunc = () => {},
}) {
    const [value, setValue] = useState(defaultValue);
    const toggle = () => {
        setValue(!value);
        extraFunc();
    };
    return [value, toggle];
}

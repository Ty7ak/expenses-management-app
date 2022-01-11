import { useEffect, useRef } from 'react';

export function useRenderOnce() {
    const firstRender = useRef(true);
    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
}
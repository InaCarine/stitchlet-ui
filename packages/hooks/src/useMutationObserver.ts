'use client';

import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS: MutationObserverInit = { attributes: true, childList: true, subtree: true };

export const useMutationObserver = <T extends Element>(
  targetRef: React.RefObject<T | null>,
  callback: MutationCallback,
  options: MutationObserverInit = DEFAULT_OPTIONS
): MutationObserver | null => {
  const [observer, setObserver] = useState<MutationObserver | null>(null);

  useEffect(() => {
    if (!targetRef?.current) return;

    const obs = new MutationObserver(callback);
    setObserver(obs);
    obs.observe(targetRef.current, options);

    return () => {
      obs.disconnect();
      setObserver(null);
    };
  }, [targetRef, callback, options]);

  return observer;
};

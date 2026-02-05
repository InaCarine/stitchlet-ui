import { useCallback, useEffect, useRef, useState } from 'react';

import { isSSR } from './utils/isSSR';

type ChannelName = string;

const useBroadcastChannel = <T = unknown>(channelName: ChannelName) => {
  const [broadcastMessage, setBroadcastMessage] = useState<T | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const handleMessage = useCallback((event: MessageEvent<T>) => {
    setBroadcastMessage(event.data);
  }, []);

  const sendBroadcast = useCallback((msg: T) => {
    try {
      channelRef.current?.postMessage(msg);
    } catch {
      // Ignore errors if BroadcastChannel is not supported
    }
  }, []);

  useEffect(() => {
    if (isSSR() || !BroadcastChannel) return;

    let channel: BroadcastChannel | null = null;

    try {
      channel = new BroadcastChannel(channelName);
      channel.onmessage = handleMessage;
      channelRef.current = channel;
    } catch {
      // Ignore errors if BroadcastChannel is not supported
    }

    return () => {
      channel?.close();
      channelRef.current = null;
    };
  }, [channelName, handleMessage]);

  return { broadcastMessage, sendBroadcast };
};

export default useBroadcastChannel;

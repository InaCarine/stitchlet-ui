import { act, renderHook } from '@testing-library/react';

import useBroadcastChannel from '../useBroadcastChannel';

const originalBroadcastChannel = global.BroadcastChannel;

const closeMock = jest.fn();
const postMessageMock = jest.fn();

interface BroadcastChannelLike {
  name: string;
  onmessage: ((event: { data: unknown }) => void) | null;
  postMessage(msg: unknown): void;
  close(): void;
}

class BroadcastChannelMock implements BroadcastChannelLike {
  static instances: BroadcastChannelMock[] = [];
  name: string;
  onmessage: ((event: { data: unknown }) => void) | null = null;

  constructor(name: string) {
    this.name = name;
    this.onmessage = null;
    BroadcastChannelMock.instances.push(this);
  }

  postMessage(msg: unknown) {
    postMessageMock(msg);
    BroadcastChannelMock.instances.forEach((instance) => {
      if (instance !== this && instance.name === this.name && instance.onmessage) {
        instance.onmessage({ data: msg });
      }
    });
  }

  close() {
    closeMock();
    const idx = BroadcastChannelMock.instances.indexOf(this);
    if (idx !== -1) BroadcastChannelMock.instances.splice(idx, 1);
  }
}
// @ts-expect-error: Overriding global for test
global.BroadcastChannel = BroadcastChannelMock;

describe('Hooks', () => {
  describe('useBroadcastChannel', () => {
    afterEach(() => {
      BroadcastChannelMock.instances = [];
      closeMock.mockClear();
      postMessageMock.mockClear();
    });

    afterAll(() => {
      global.BroadcastChannel = originalBroadcastChannel;
    });

    it('should receive a message sent on the same channel', () => {
      const { result: sender } = renderHook(() => useBroadcastChannel('test-channel'));
      const { result: receiver } = renderHook(() => useBroadcastChannel('test-channel'));

      act(() => {
        sender.current.sendBroadcast('hello world');
      });

      expect(receiver.current.broadcastMessage).toBe('hello world');
    });

    it('should not receive messages sent on a different channel', () => {
      const { result: sender } = renderHook(() => useBroadcastChannel('channel-1'));
      const { result: receiver } = renderHook(() => useBroadcastChannel('channel-2'));

      act(() => {
        sender.current.sendBroadcast('should not be received');
      });

      expect(receiver.current.broadcastMessage).toBe(null);
    });

    it('should close the channel on unmount', () => {
      const { unmount } = renderHook(() => useBroadcastChannel('test-close'));
      const instanceCountBefore = BroadcastChannelMock.instances.length;

      unmount();

      expect(closeMock).toHaveBeenCalled();
      expect(BroadcastChannelMock.instances.length).toBe(instanceCountBefore - 1);
    });

    it('should handle multiple messages', () => {
      const { result: sender } = renderHook(() => useBroadcastChannel('multi-channel'));
      const { result: receiver } = renderHook(() => useBroadcastChannel('multi-channel'));

      act(() => {
        sender.current.sendBroadcast('first');
        sender.current.sendBroadcast('second');
      });

      expect(receiver.current.broadcastMessage).toBe('second');
      expect(postMessageMock).toHaveBeenCalledTimes(2);
    });

    it('should not receive messages after unmount', () => {
      const { result: sender } = renderHook(() => useBroadcastChannel('cleanup-channel'));
      const { result: receiver, unmount } = renderHook(() =>
        useBroadcastChannel('cleanup-channel')
      );

      unmount();

      act(() => {
        sender.current.sendBroadcast('should not be received');
      });

      expect(receiver.current.broadcastMessage).not.toBe('should not be received');
    });

    it('should send and receive object messages', () => {
      const { result: sender } = renderHook(() => useBroadcastChannel('obj-channel'));
      const { result: receiver } = renderHook(() => useBroadcastChannel('obj-channel'));

      const obj = { status: 'applied', jobId: '123' };

      act(() => {
        sender.current.sendBroadcast(obj);
      });

      expect(receiver.current.broadcastMessage).toEqual(obj);
    });
  });
});

import { MutableRefObject, useEffect, useState } from 'react';

export type UsePermissionState =
  | PermissionState
  | 'not-requested'
  | 'requested';

export function usePermission(
  descriptor: PermissionDescriptor,
): UsePermissionState {
  const [state, setState] = useState<UsePermissionState>('not-requested');

  useEffect(() => {
    let unmount: (() => void) | null = null;
    setState('requested');
    navigator.permissions.query(descriptor).then((status): void => {
      const handleChange = () => {
        setState(status.state);
      };
      setState(status.state);
      status.addEventListener('change', handleChange);
      unmount = () => {
        status.removeEventListener('change', handleChange);
      };
    });

    return () => {
      unmount?.();
    };
  }, [descriptor.name]);

  return state;
}

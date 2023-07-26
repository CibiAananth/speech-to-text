import { useEffect, useState, MutableRefObject } from 'react';
import { usePermission, UsePermissionState } from './usePermission';

export const useMediaDevices = (): {
  permissionStatus: UsePermissionState;
  stream: MediaStream | null;
  error: any;
} => {
  const permissionDescriptor = { name: 'microphone' as PermissionName };
  const permissionStatus = usePermission(permissionDescriptor);

  const constraints: MediaStreamConstraints = {
    audio: true,
    video: false,
  };
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let unmount: (() => void) | null = null;
    if (permissionStatus === 'granted') {
      const handleChange = () => {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => setStream(stream))
          .catch(e => {
            setError(e);
            setStream(null);
          });
      };
      // @ts-ignore
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.addEventListener('devicechange', handleChange);
        unmount = () => {
          navigator.mediaDevices.removeEventListener('change', handleChange);
        };
        handleChange();
      } else {
        setError('no getUserMedia');
      }
    } else {
      setError('no permission');
    }

    return () => {
      unmount?.();
    };
  }, [permissionStatus]);

  return { permissionStatus, stream, error };
};

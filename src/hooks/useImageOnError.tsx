import { useCallback } from 'react';

import fallback from '@_/images/imageErrorTmpFallback.avif';

export default function useImageOnError(defaultImageSrc?: string) {
  return useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const currentTarget = event.currentTarget;
      if (defaultImageSrc) currentTarget.src = defaultImageSrc;
      else {
        currentTarget.src = fallback;
      }
    },
    [defaultImageSrc],
  );
}

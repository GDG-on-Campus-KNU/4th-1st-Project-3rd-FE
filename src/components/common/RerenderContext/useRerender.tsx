import { useContext } from 'react';

import RerenderContext from '@_/components/common/RerenderContext/RerenderContext';

export function useRerender() {
  return useContext(RerenderContext);
}

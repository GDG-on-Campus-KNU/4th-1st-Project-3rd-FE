import { Fragment, PropsWithChildren, useCallback, useState } from 'react';

import RerenderContext from '@_/components/common/RerenderContext/RerenderContext';

export default function RerenderProvider({ children }: PropsWithChildren) {
  const [rerenderCnt, setRerenderCnt] = useState(0);
  const rerender = useCallback(() => setRerenderCnt((prev) => prev + 1), []);

  return (
    <Fragment key={rerenderCnt}>
      <RerenderContext.Provider value={rerender}>
        {children}
      </RerenderContext.Provider>
    </Fragment>
  );
}

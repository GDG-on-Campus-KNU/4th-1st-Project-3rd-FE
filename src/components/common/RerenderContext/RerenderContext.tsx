import { createContext } from 'react';

const RerenderContext = createContext<() => void>(() => {});

export default RerenderContext;

import type { ComponentType } from 'react';
import { Suspense } from 'react';
import Loading from './Loading.tsx';

const Loadable = (Component: ComponentType) => (props: Record<never, never>): JSX.Element => {
  return (
      <Suspense fallback={ <Loading loading={ true }/> }>
        <Component { ...props }/>
      </Suspense>
  )
}

export default Loadable

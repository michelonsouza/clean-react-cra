/* eslint-disable no-underscore-dangle */
export function disableDevtools(): void {
  const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

  if (
    isProduction &&
    typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
  ) {
    Object.entries((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(
      ([key, value]) => {
        if (key === 'renderers') {
          (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = new Map();
          return;
        }

        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
          typeof value === 'function' ? () => null : null;
      },
    );
  }
}

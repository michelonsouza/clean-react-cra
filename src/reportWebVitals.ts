import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    const reportAllChanges = process.env.NODE_ENV === 'development';

    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry, reportAllChanges);
      getFID(onPerfEntry, reportAllChanges);
      getFCP(onPerfEntry, reportAllChanges);
      getLCP(onPerfEntry, reportAllChanges);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

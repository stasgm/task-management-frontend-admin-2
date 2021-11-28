type Stages = 'PROD' | 'DEV' | 'LOCAL';
const apiUrl =
  ((process.env.REACT_APP_STAGE || 'DEV') as Stages) === 'PROD'
    ? process.env.REACT_APP_PROD_API_URL
    : (process.env.REACT_APP_STAGE as Stages) === 'LOCAL'
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_DEV_API_URL;
export const API_URL = apiUrl as string;
export const JWT_SECRET = '123456' as string;

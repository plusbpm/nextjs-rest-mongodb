import useRestClient from './useRestClient';

const useResults = () => {
  const { restClient } = useRestClient();
  return restClient.getResults();
};

export default useResults;

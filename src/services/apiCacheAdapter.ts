import useSWR from 'swr';

type FetcherType<TFetcherResponse> = (url: string) => Promise<TFetcherResponse>;

export function useApiCache<TResponse>(
  requestUrl: string,
  fetcher: FetcherType<TResponse>
) {
  const { data, error } = useSWR<TResponse>(requestUrl, async url => {
    return await fetcher(url);
  });

  return { data, error };
}

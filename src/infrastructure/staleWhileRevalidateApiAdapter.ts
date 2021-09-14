import useSWR from 'swr';

type FetcherType<TFetcherResponse> = (url: string) => Promise<TFetcherResponse>;
// TODO - Make interface
export function useStaleWhileRevalidateApi<TResponse>(
  requestUrl: string,
  fetcher: FetcherType<TResponse>
) {
  const { data, error } = useSWR<TResponse>(
    requestUrl,
    async url => await fetcher(url)
  );

  return { data, error };
}

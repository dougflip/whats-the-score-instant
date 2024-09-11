import { ReactNode } from "react";

type RemoteError = { message: string };

type RemoteDataProps<T> = {
  data: {
    isLoading: boolean;
    error: RemoteError | undefined;
    data: T | undefined;
  };
  render: (data: T) => ReactNode;
  loading?: () => ReactNode;
  error?: (error: RemoteError) => ReactNode;
};

/**
 * Wrapper over a remote data object that handles loading and error states.
 * Intended to be used with instantdb's results and helps to narrow types while rendering.
 * Defaults the loading and error states but they can be overridden.
 *
 * @example
 * <RemoteData
 *  data={games}
 *  render={({ games }) => <GameList games={games} />}
 * />
 */
export function RemoteData<T>({
  data,
  render,
  loading = () => <div>Loading...</div>,
  error = (err) => <div>Error: {err.message}</div>,
}: RemoteDataProps<T>) {
  if (data.isLoading) {
    return loading();
  }

  if (data.error) {
    return error(data.error);
  }

  if (data.data) {
    return render(data.data);
  }

  return null;
}

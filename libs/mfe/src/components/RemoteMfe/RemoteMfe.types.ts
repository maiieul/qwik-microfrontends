export interface RemoteData {
  name: string;
  url: string;
}

export interface Props {
  remote: RemoteData;
  removeLoader?: boolean;
}

type ErrorCause = {
  address: string;
  port: string;
};

export type FetchError = Error & {
  cause: {
    errors: ErrorCause[];
    code: string;
  };
};

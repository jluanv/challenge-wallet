import { useState } from "react";

type UseListFetchOptions<Param, Response> = {
	initialData: Response | null;
	action: (param: Param) => Promise<Response>;
};

export function useListFetch<Param, Response>({
	action,
	initialData,
}: UseListFetchOptions<Param, Response>) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);
	const [data, setData] = useState<Response | null>(initialData);

	const fetch = async (param: Param) => {
		setLoading(true);
		setError(null);

		try {
			const response = await action(param);
			setData(response);
			setLoading(false);
			return response;
		} catch (err) {
			setError(err);
			setLoading(false);
			throw err;
		}
	};

	return { fetch, loading, error, data, setData };
}

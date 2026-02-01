import { HTTPError } from "ky";

export const errorCatch = async (err: unknown) => {
	if (err instanceof HTTPError) {
		const error = await err.response.json();

		return {
			success: false,
			message: error.message as string,
		};
	}

	return {
		success: false,
		message: "Erro Inesperado, Tente novamente maistarde",
	};
};

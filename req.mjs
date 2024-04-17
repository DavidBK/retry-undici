import { request } from "undici";

const url = "http://localhost:3000";

export async function req() {
	const { body } = await request(url);
	return await body.text();
}

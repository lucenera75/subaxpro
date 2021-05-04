import express from 'express';
import morgan from 'morgan';
import appLogo from './lib/appLogo.js';
import axios from 'axios';
import xmlToJson from './lib/xmlToJson.js';

const app = express();
const port = process.env.port || 3000;
const { baseXmlApiUrl } = process.env;
const axiosClient = axios.create({
	baseURL: baseXmlApiUrl,
});
console.log(appLogo);
if (!baseXmlApiUrl) {
	console.error('********************************************');
	console.error('missing environment variable `baseXmlApiUrl`');
	console.error('********************************************');
	process.exit(0);
}
console.log(`Base URL is ${baseXmlApiUrl}`);
app.use(morgan('tiny', { immediate: true }));

app.get('/companies/:id', async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		console.error('requested non numeric id', id);
		res.status(400).send('invalid company parameter, must be a number');
		return;
	}
	console.log('retrieving company with id: ', id);
	try {
		const xmlResult = await axiosClient.get(`/${id}.xml`);
		const xmlData = xmlResult.data;
		console.log('retrieved data:', xmlData);
		const jsonResponse = await xmlToJson(xmlData);
		console.log('returning response', jsonResponse);
		res.send(jsonResponse);
	} catch (error) {
		console.error(error?.message || error);
		if (error?.response?.status === 404) {
			res.status(404).json({
				error: 'NOT_FOUND',
				error_description: `The requested entity with id '${id}' does not exist`,
			});
			return;
		}
		res.status(500).send('unexpected error');
	}
});

app.listen(port, () => {
	console.log(`
  -----------------------------------
	Listening port ${3000}
  ------------------------------------
	`);
});

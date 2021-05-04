import xml2js from 'xml2js';

export default async function (xmlData) {
	try {
		const parsedXmlData = await xml2js.parseStringPromise(xmlData);
		return {
			id: parsedXmlData.Data.id[0],
			name: parsedXmlData.Data.name[0],
			description: parsedXmlData.Data.description[0],
		};
	} catch (err) {
		throw new Error('Unable to parse correctly xmlData');
	}
}

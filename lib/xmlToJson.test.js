import xmlToJson from './xmlToJson';

test('correct company xmlData matches snapshot', async () => {
	const result = await xmlToJson(`
	<?xml version="1.0" encoding="UTF-8"?>
	<Data>
		<id>1</id>
		<name>MWNZ</name>
		<description>..is awesome</description>
	</Data>
	`);
	expect(result).toMatchSnapshot();
});

test('non correct company xmlData throws an error and does not return a result', async () => {
	let result;
	try {
		result = await xmlToJson(`
		SOME RANDOM STUFF
		`);
	} catch (err) {
		expect(err.message).toMatchSnapshot();
	}
	expect(result).toBeUndefined();
});

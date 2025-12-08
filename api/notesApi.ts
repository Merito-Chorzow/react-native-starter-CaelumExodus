export async function fetchNotes() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
	return res.json();
}
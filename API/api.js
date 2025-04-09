
const url = new URL('https://dattebayo-api.onrender.com/characters')

export default url;


export async function get(url) {
    try {
        let request = await fetch(url);
        let data = await request.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
console.log(get(url));

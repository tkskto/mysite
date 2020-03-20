export default class Loader {
    public loadJson = (): Promise<JSON> => {
        return fetch(`/assets/blog/articles.json`).then((response: Response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        });
    };

    public loadArticle = (_title): Promise<String> => {
        return fetch(`/assets/blog/articles/${encodeURI(_title)}.md`).then((response: Response) => {
            if (response.ok) {
                return response.text();
            }

            throw new Error(response.statusText);
        });
    }
}

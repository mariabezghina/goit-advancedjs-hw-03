export const fetchPhotosByQuery = query => {

    const fetchParams = new URLSearchParams(
        {
            key: '53227460-8ffef261ea458fd0efa7b626a',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    );
    return  fetch(`https://pixabay.com/api/?${fetchParams}`)
        .then (response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
};
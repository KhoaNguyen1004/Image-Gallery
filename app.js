const apiKey = 'upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk'; 
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=10`;
const searchApiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        loadImages(query, true); 
    }
});

const tags = ['dog', 'cat', 'puppy', 'art', 'natural', 'universe', 'AI', 'computer', 'wolf', 'kids'];
const tagContainer = document.querySelector('.tag-container');

tags.forEach(tag => {
    let button = document.createElement('button');
    button.textContent = tag;
    button.addEventListener('click', () => {
        loadImages(tag, true);
    });
    tagContainer.appendChild(button);
});

function loadImages(query, isSearch = false) {
    const url = isSearch ? `${searchApiUrl}&query=${query}&per_page=10` : apiUrl;
    axios.get(url)
        .then(response => {
            const images = isSearch ? response.data.results : response.data; // Axios automatically accesses `.data`
            displayImages(images);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = ''; // Clear existing images
    images.forEach((img, index) => {
        const link = document.createElement('a');
        link.href = `#lightbox-${index}`;
        link.className = 'lightbox-trigger';

        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        if (index >= 3) {
            imgElement.loading = "lazy";
        }

        link.appendChild(imgElement);
        imageGrid.appendChild(link);

        // Create the lightbox container
        const lightbox = document.createElement('div');
        lightbox.id = `lightbox-${index}`;
        lightbox.className = 'lightbox';
        
        const lightboxImage = document.createElement('img');
        lightboxImage.src = img.urls.regular; // Use a higher resolution image for the lightbox
        
        const closeButton = document.createElement('a');
        closeButton.href = '#';
        closeButton.textContent = 'Close';
        closeButton.style.color = 'white';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '24px';
        
        lightbox.appendChild(lightboxImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);
    });
}


window.onload = () => {
    loadImages(); 
};

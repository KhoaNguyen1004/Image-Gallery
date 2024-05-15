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

const likedImages = new Set(JSON.parse(localStorage.getItem('likedImages') || '[]'));

function loadImages(query, isSearch = false) {
    const url = isSearch ? `${searchApiUrl}&query=${query}&per_page=10` : apiUrl;
    axios.get(url)
        .then(response => {
            const images = isSearch ? response.data.results : response.data;
            images.sort((a, b) => likedImages.has(b.id) - likedImages.has(a.id));
            displayImages(images);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = '';

    images.forEach((img) => {
        const imageContainer = document.createElement('figure');
        imageContainer.className = 'image-container';

        const link = document.createElement('a');
        link.className = 'lightbox-trigger';

        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        imgElement.dataset.highres = img.urls.regular;
        imgElement.alt = img.description || 'Thumbnail';
        imgElement.dataset.imageId = img.id;

        link.appendChild(imgElement);
        imageContainer.appendChild(link);
        imageGrid.appendChild(imageContainer);

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const highResUrl = imgElement.dataset.highres;
            const lightboxImage = document.querySelector('.lightbox img');
            lightboxImage.src = highResUrl;
            lightboxImage.dataset.imageId = imgElement.dataset.imageId;
            if (likedImages.has(imgElement.dataset.imageId)) {
                lightboxImage.classList.add('liked');
            } else {
                lightboxImage.classList.remove('liked');
            }
            document.querySelector('.lightbox').style.display = 'flex';
        });
    });
}

function toggleLike(imageId) {
    if (likedImages.has(imageId)) {
        likedImages.delete(imageId);
    } else {
        likedImages.add(imageId);
    }
    localStorage.setItem('likedImages', JSON.stringify([...likedImages]));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
lightboxImage.addEventListener('dblclick', () => {
    const imageId = lightboxImage.dataset.imageId;
    toggleLike(imageId);
    if (likedImages.has(imageId)) {
        lightboxImage.classList.add('liked');
    } else {
        lightboxImage.classList.remove('liked');
    }
});

const closeBtn = document.querySelector('.close-lightbox');
closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    lightbox.style.display = 'none';
});

window.onload = () => {
    loadImages(); // Load initial images
};

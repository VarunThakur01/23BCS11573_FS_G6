const contentContainer = document.getElementById('content-container');
const loadingTrigger = document.getElementById('loading-trigger');

let isLoading = false;
let itemIndex = 1;

const mockData = [
    {
        title: "Exploring the Majestic Mountains",
        desc: "A beautiful journey through the tall peaks and snow-covered trails of the northern ranges.",
        img: "https://picsum.photos/id/10/200/200"
    },
    {
        title: "Culinary Arts & Flavors",
        desc: "Discovering exotic spices and master chef recipes from around the globe in a single day.",
        img: "https://picsum.photos/id/292/200/200"
    },
    {
        title: "The Future of Artificial Intelligence",
        desc: "How machine learning models and neural networks are shaping the software landscape.",
        img: "https://picsum.photos/id/180/200/200"
    },
    {
        title: "Urban Architecture Design",
        desc: "A deep dive into high-tech structures and sustainable skyscraper designs in modern cities.",
        img: "https://picsum.photos/id/84/200/200"
    },
    {
        title: "Deep Sea Ocean Discoveries",
        desc: "Exploring the darkest corners of the ocean and the mysterious creatures that live there.",
        img: "https://picsum.photos/id/866/200/200"
    },
    {
        title: "The Art of Minimalist Living",
        desc: "Finding peace and productivity by decluttering physical and digital workspace settings.",
        img: "https://picsum.photos/id/20/200/200"
    }
];

function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'card skeleton-card';
    
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image-wrapper';
    const skeletonImg = document.createElement('div');
    skeletonImg.className = 'skeleton skeleton-image';
    imgWrapper.appendChild(skeletonImg);
    
    const content = document.createElement('div');
    content.className = 'card-content';
    
    const skeletonTitle = document.createElement('div');
    skeletonTitle.className = 'skeleton skeleton-title';
    
    const skeletonText1 = document.createElement('div');
    skeletonText1.className = 'skeleton skeleton-text-1';
    
    const skeletonText2 = document.createElement('div');
    skeletonText2.className = 'skeleton skeleton-text-2';
    
    content.appendChild(skeletonTitle);
    content.appendChild(skeletonText1);
    content.appendChild(skeletonText2);
    
    card.appendChild(imgWrapper);
    card.appendChild(content);
    
    return card;
}

function createRealCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image-wrapper';
    const img = document.createElement('img');
    img.className = 'card-image';
    img.src = data.img;
    img.alt = data.title;
    imgWrapper.appendChild(img);
    
    const content = document.createElement('div');
    content.className = 'card-content';
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = `${itemIndex++}. ${data.title}`;
    
    const desc = document.createElement('div');
    desc.className = 'card-description';
    desc.textContent = data.desc;
    
    content.appendChild(title);
    content.appendChild(desc);
    
    card.appendChild(imgWrapper);
    card.appendChild(content);
    
    return card;
}

function loadMoreItems() {
    if (isLoading) return;
    isLoading = true;

    const skeletonCards = [];
    for (let i = 0; i < 3; i++) {
        const skeleton = createSkeletonCard();
        contentContainer.appendChild(skeleton);
        skeletonCards.push(skeleton);
    }

    setTimeout(() => {
        skeletonCards.forEach(skeleton => {
            const randomData = mockData[Math.floor(Math.random() * mockData.length)];
            const realCard = createRealCard(randomData);
            contentContainer.replaceChild(realCard, skeleton);
        });
        isLoading = false;
    }, 1500);
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMoreItems();
    }
}, {
    rootMargin: '100px'
});

observer.observe(loadingTrigger);

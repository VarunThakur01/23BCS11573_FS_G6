const feedList = document.getElementById('feed-list');
const loadingContainer = document.getElementById('loading-container');

let isLoading = false;
let currentPostCount = 0;

const mockPosts = [
    {
        author: "Sarah Jenkins",
        avatar: "https://picsum.photos/id/1027/100/100",
        time: "2 hours ago",
        content: "Just finished hiking up Mount Rainier! The weather was absolutely perfect, and the view from the top is something I will never forget.",
        image: "https://picsum.photos/id/1015/600/450"
    },
    {
        author: "David Vance",
        avatar: "https://picsum.photos/id/1005/100/100",
        time: "4 hours ago",
        content: "Exploring the quiet alleyways of Kyoto. There is something magical about the historical architecture and traditional lanterns lighting up at dusk.",
        image: "https://picsum.photos/id/1016/600/450"
    },
    {
        author: "Sophia Martinez",
        avatar: "https://picsum.photos/id/1011/100/100",
        time: "1 day ago",
        content: "Baking sourdough bread has become my new favorite weekend ritual. Today's loaf came out with the perfect crust and crumb structure!",
        image: "https://picsum.photos/id/292/600/450"
    },
    {
        author: "James Peterson",
        avatar: "https://picsum.photos/id/338/100/100",
        time: "3 days ago",
        content: "Had a wonderful evening sketching downtown architecture. The geometry and lighting on these old brick facades make for excellent study subjects.",
        image: "https://picsum.photos/id/1042/600/450"
    },
    {
        author: "Emily Watson",
        avatar: "https://picsum.photos/id/342/100/100",
        time: "5 days ago",
        content: "Spent the morning setting up a new home office workspace. Incorporating natural light and green plants has completely transformed my focus.",
        image: "https://picsum.photos/id/1062/600/450"
    }
];

function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    
    const header = document.createElement('div');
    header.className = 'post-header';
    
    const avatar = document.createElement('div');
    avatar.className = 'post-avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = post.avatar;
    avatarImg.alt = post.author;
    avatar.appendChild(avatarImg);
    
    const meta = document.createElement('div');
    meta.className = 'post-meta';
    
    const author = document.createElement('span');
    author.className = 'post-author';
    author.textContent = post.author;
    
    const time = document.createElement('span');
    time.className = 'post-time';
    time.textContent = post.time;
    
    meta.appendChild(author);
    meta.appendChild(time);
    
    header.appendChild(avatar);
    header.appendChild(meta);
    
    const body = document.createElement('div');
    body.className = 'post-body';
    
    const content = document.createElement('p');
    content.className = 'post-content';
    content.textContent = post.content;
    body.appendChild(content);
    
    if (post.image) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'post-image-wrapper';
        const img = document.createElement('img');
        img.className = 'post-image';
        img.src = post.image;
        img.alt = "Post image";
        imgWrapper.appendChild(img);
        body.appendChild(imgWrapper);
    }
    
    const actions = document.createElement('div');
    actions.className = 'post-actions';
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'action-btn';
    likeBtn.textContent = 'Like';
    
    const commentBtn = document.createElement('button');
    commentBtn.className = 'action-btn';
    commentBtn.textContent = 'Comment';
    
    const shareBtn = document.createElement('button');
    shareBtn.className = 'action-btn';
    shareBtn.textContent = 'Share';
    
    actions.appendChild(likeBtn);
    actions.appendChild(commentBtn);
    actions.appendChild(shareBtn);
    
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(actions);
    
    return card;
}

function loadPosts(count) {
    for (let i = 0; i < count; i++) {
        const postData = mockPosts[currentPostCount % mockPosts.length];
        currentPostCount++;
        const card = createPostCard(postData);
        feedList.appendChild(card);
    }
}

function fetchMorePosts() {
    if (isLoading) return;
    isLoading = true;
    
    loadingContainer.classList.add('active');
    
    setTimeout(() => {
        loadPosts(2);
        loadingContainer.classList.remove('active');
        isLoading = false;
    }, 1200);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        fetchMorePosts();
    }
});

loadPosts(3);

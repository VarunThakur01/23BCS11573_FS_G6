const postForm = document.getElementById('post-form');
const postInput = document.getElementById('post-input');
const charCounter = document.getElementById('char-counter');
const postsList = document.getElementById('posts-list');

const maxLimit = 200;

postInput.addEventListener('input', () => {
    let currentLength = postInput.value.length;
    
    if (currentLength > maxLimit) {
        postInput.value = postInput.value.slice(0, maxLimit);
        currentLength = maxLimit;
    }
    
    const remaining = maxLimit - currentLength;
    charCounter.textContent = `${remaining} characters remaining`;
    
    charCounter.className = '';
    
    if (currentLength >= maxLimit * 0.9) {
        charCounter.classList.add('danger');
    } else if (currentLength >= maxLimit * 0.8) {
        charCounter.classList.add('warning');
    }
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = postInput.value.trim();
    if (!text) return;
    
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.textContent = text;
    
    postsList.insertBefore(postCard, postsList.firstChild);
    
    postInput.value = '';
    charCounter.textContent = `${maxLimit} characters remaining`;
    charCounter.className = '';
});

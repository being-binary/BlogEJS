  // Sample function for liking a post. You can customize this based on your back-end implementation
  function toggleLike(postId) {
    // Make an AJAX request to like/unlike the post
    fetch(`/post/${postId}/like`, {
        method: 'POST', // Or PUT depending on how you handle likes
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload the page or update the like count dynamically
            location.reload();  // Or update the like count dynamically
        } else {
            alert('Something went wrong!');
        }
    })
    .catch(err => console.error(err));
}
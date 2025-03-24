  // Sample function for liking a post. You can customize this based on your back-end implementation
  console.log('helloWorld')
  function toggleLike( event , postId) {
    event.preventDefault()
    // Make an AJAX request to like/unlike the post
    fetch(`https://blogejs-magw.onrender.com/post/${postId}/like`, {
        method: 'POST', // Or PUT depending on how you handle likes
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload the page or update the like count dynamically
            location.reload();  // Or update the like count dynamically
        } else {
            console.log(data.msg)
        }
    })
    .catch(err => window.location.href  = '/user/login');
}
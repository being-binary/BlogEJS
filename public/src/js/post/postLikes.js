
  function toggleLike( event , postId) {
    event.preventDefault()
    loader()
    // Make an AJAX request to like/unlike the post
    fetch(`https://blogejs-magw.onrender.com/post/${postId}/like`, {
        method: 'POST', // Or PUT depending on how you handle likes
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        removeLoader()
        if (data.success) {
            toast.toastSuccess(data.msg)
            // Reload the page or update the like count dynamically
            location.reload();  // Or update the like count dynamically
        } else {
            toast.toastError(data.msg)
            console.log(data.msg)
        }
    })
    .catch(err => {toast.toastInfo("Something went wrong"); window.location.href  = '/user/login'});
}
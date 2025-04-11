const body = document.querySelector('body');

const loader = () => {
  const loading = document.createElement('div');
  loading.id = 'loader-screen';
  loading.style.height = '100vh';
  loading.style.width = '100%';
  loading.style.backgroundColor = '#31E5F9';
  loading.style.display = 'flex';
  loading.style.justifyContent = 'center';
  loading.style.alignItems = 'center';
  loading.style.position = 'fixed';
  loading.style.top = 0;
  loading.style.left = 0;
  loading.style.zIndex = 9999;
  loading.style.opacity = '0.9'

  const text = document.createElement('p');
  text.innerHTML = 'Loading...';
  text.style.fontSize = '36px';
  text.style.fontFamily = 'Arial, sans-serif';
  text.style.color = 'white'
  loading.append(text);
  body.append(loading);
};

const removeLoader = () => {
  const loader = document.getElementById('loader-screen');
  if (loader) {
    loader.style.transition = 'opacity 0.5s';
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
};

// Call the loader
loader();

// // Remove it after 3 seconds for demo purposes
setTimeout(removeLoader, 2000);

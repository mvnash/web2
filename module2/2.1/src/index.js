import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import wallpaper from './img/mov_wallpaper.jpg';
import prisonBreakImage from './img/pb.jpg';

renderImage(wallpaper);
renderImage(prisonBreakImage);

const h1 = document.createElement('h1');
h1.innerText = 'MyMovies';
document.querySelector('header').appendChild(h1);

function renderImage(image) {
  const img = document.createElement('img');
  img.src = image;
  document.querySelector('main').appendChild(img);
}

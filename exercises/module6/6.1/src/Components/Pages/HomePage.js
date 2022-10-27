/* eslint-disable no-console */
import { clearPage } from '../../utils/render';

const HomePage = async () => {
  try {
    clearPage();

    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const joke = await response.json();

    const main = document.querySelector('main');

    main.innerText = `Categorie: ${joke.category} \n ${joke.joke}`;

  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

export default HomePage;

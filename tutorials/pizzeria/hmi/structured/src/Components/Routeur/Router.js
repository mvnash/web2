import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
};

const Router = () => {
  onNavBarClick();
};

function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const uri = e.target?.dataset?.uri;
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);
      componentToRender();
    });
  });
}

export default Router;

import { clearPage, renderPageTitle } from '../../utils/render';

const AddPizzaPage = () => {
  clearPage();
  renderPageTitle('Add a pizza to the menu');
  renderAddPizzaForm();
};

function renderAddPizzaForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const title = document.createElement('input');
  title.type = 'text';
  title.id = 'title';
  title.placeholder = 'title of your pizza';
  title.required = true;
  title.className = 'form-control mb-3';
  const content = document.createElement('input');
  content.type = 'text';
  content.id = 'content';
  content.required = true;
  content.placeholder = 'Content of your pizza';
  content.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Add pizza to the menu';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(title);
  form.appendChild(content);
  form.appendChild(submit);
  main.appendChild(form);
}

export default AddPizzaPage;

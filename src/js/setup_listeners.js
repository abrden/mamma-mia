import { $ } from './helpers';

export default function (store) {
  $('#cart-icon, #close').on('click', () => {
    store.trigger('TOGGLE_SHOW_CART');
  });

  function getParentWithKey(element) {
    let parent = element.parentElement;

    while (parent && !parent.dataset.key) {
      parent = parent.parentElement;
    }

    return parent;
  }

  $('.add-to-cart').on('click', e => {
    const parent = getParentWithKey(e.currentTarget);

    const key = parseInt(parent.dataset.key, 10);
    store.trigger('ITEM_ADDED', { item: key });
  });

  $('.add-dish').on('click', e => {
    console.log("HOLA TOQUE EL BOTON")
    console.log("E", e);
    /* var btn = document.createElement("BUTTON");
    document.body.appendChild(btn); */
    var btn = e.getElementById("addDish").innerHTML = "Hello JavaScript!";
    e.body.appendChild(btn)
  });

  $('.login').on('click', e => {
    let parent = e.srcElement.parentElement;
    let user = parent.children[2].value;
    let password = parent.children[3].value;
    console.log(e);
    if (user == 'admin' && password == 'proyectos') {
      store.trigger('CREDENTIALS_CORRECT', store);
    } else {
      store.trigger('CREDENTIALS_REJECTED', store);
    }
  });

  $('body').on('click', e => {
    if (e.target.classList.contains('remove')) {
      const element = e.target;
      const parent = getParentWithKey(element);
      const key = parseInt(parent.dataset.key, 10);

      parent.parentElement.removeChild(parent);
      store.trigger('ITEM_REMOVED', { item: key });
    }
  });
}

import { addClass, addId, input, password, button, div, h1, h3, i, section, text, ul } from '../builders';
import { $ } from '../helpers';
import modalItem from './modalItem';

export default function modal(store) {
  const close = addId(addClass(i(), 'fa', 'fa-times', 'close'), 'close');
  const title = addClass(h1(text('Ingreso')), 'title');

  const userField = addClass(input("Usuario"), 'user', 'menu-item', 'is-fullwidth');
  const passwordField = addClass(password(), 'password', 'menu-item', 'is-fullwidth');

  const messageBoard = addClass(div(), 'message-board');

  const loginButton = addClass(button(text('Ingresar')), 'login', 'button', 'is-fullwidth');

  const modalContainer = addClass(div(close, title, userField, passwordField, messageBoard, loginButton), 'modal-container');

  const modalEle = addId(addClass(section(modalContainer), 'modal'), 'modal');

  store.on('TOGGLE_SHOW_CART', ({ cartVisible }) => {
    const ele = $('#modal');
    if (cartVisible) {
      ele.addClass('show');
    } else {
      ele.removeClass('show');
    }
  });

  store.on('ITEM_ADDED', ({ items, cart }) => {
    const cartArray = [...cart];
    const cartItems = cartArray.map(itemId => modalItem(items[itemId]));
    const cartList = addClass(ul(...cartItems), 'menu');
    $('#cart-items').children(cartList);
  });

  store.on('CREDENTIALS_CORRECT', (store) => {
    console.log('credentials correct');
    if (store.incorrectMsgShowing) {
      $('.message-board').removeChildWithId('incorrect-password');
    }
    store.incorrectMsgShowing = false;
    const ele = $('#modal');
    ele.removeClass('show')
    // TODO: Make dishes editable
  });

  store.on('CREDENTIALS_REJECTED', (store) => {
    if (!store.incorrectMsgShowing) {
      const msg = "Credenciales incorrectas. Inténtelo de nuevo o contacte al administrador.";
      const help = addId(addClass(h3(text(msg)), 'errorPanel'), 'incorrect-password');
      $('.message-board').addChildLast(help);
      store.incorrectMsgShowing = true;
    }
  });

  return modalEle;
}

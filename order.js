// Логика заказа: выбор блюд, блок «Ваш заказ», итоговая стоимость.
// Объект selected объявлен в display.js.

const emptyMessage = document.querySelector('#order-empty');
const orderItems = document.querySelector('#order-items');
const totalBlock = document.querySelector('#order-total');
const totalPrice = document.querySelector('#order-price');

// Перерисовывает блок «Ваш заказ» по текущему выбору
function updateOrder() {
  let total = 0;
  let hasSelection = false;

  document.querySelectorAll('.order-item').forEach(function (item) {
    const dish = selected[item.dataset.category];
    const text = item.querySelector('.order-dish');
    const hiddenInput = item.querySelector('input');

    if (dish) {
      text.textContent = dish.name + ' ' + dish.price + '₽';
      hiddenInput.value = dish.keyword; // уйдёт на сервер при отправке формы
      total += dish.price;
      hasSelection = true;
    } else {
      text.textContent = item.dataset.category === 'drink' ? 'Напиток не выбран' : 'Блюдо не выбрано';
      hiddenInput.value = '';
    }
  });

  // Ничего не выбрано: категории и стоимость скрыты, видна надпись
  emptyMessage.style.display = hasSelection ? 'none' : 'block';
  orderItems.style.display = hasSelection ? 'block' : 'none';
  totalBlock.style.display = hasSelection ? 'block' : 'none';
  totalPrice.textContent = total + '₽';
}

// Подсвечивает рамкой выбранную карточку в категории
function highlightSelected(category) {
  document.querySelectorAll('.dishes[data-category="' + category + '"] .dish').forEach(function (card) {
    const chosen = selected[category] && card.dataset.dish === selected[category].keyword;
    card.classList.toggle('selected', Boolean(chosen));
  });
}

// Один обработчик на все карточки: клик по кнопке «Добавить»
document.querySelectorAll('.dishes').forEach(function (container) {
  container.addEventListener('click', function (event) {
    if (!event.target.classList.contains('dish-button')) {
      return;
    }
    const card = event.target.closest('.dish');
    const dish = dishes.find(function (item) {
      return item.keyword === card.dataset.dish;
    });
    selected[dish.category] = dish;
    highlightSelected(dish.category);
    updateOrder();
  });
});

// Кнопка «Сбросить» очищает и выбор блюд
document.querySelector('.order-form').addEventListener('reset', function () {
  Object.keys(selected).forEach(function (category) {
    selected[category] = null;
    activeKind[category] = null;
  });
  document.querySelectorAll('.filter-button').forEach(function (button) {
    button.classList.remove('active');
  });
  Object.keys(selected).forEach(displayCategory);
  updateOrder();
});

updateOrder();

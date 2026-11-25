// Отображение блюд на странице: фильтрация, сортировка и создание карточек через DOM.

// Выбранные блюда по категориям (null — ничего не выбрано). Используется и в order.js
const selected = { soup: null, main: null, salad: null, drink: null, dessert: null };

// Активный фильтр по категориям (null — фильтр не выбран, показываются все блюда)
const activeKind = { soup: null, main: null, salad: null, drink: null, dessert: null };

// Создаёт HTML карточки одного блюда
function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish';
  card.dataset.dish = dish.keyword; // data-dish="gaspacho"
  if (selected[dish.category] && selected[dish.category].keyword === dish.keyword) {
    card.classList.add('selected'); // выбранное блюдо остаётся с рамкой после фильтрации
  }
  card.innerHTML =
    '<img class="dish-image" src="images/' + dish.image + '.jpg" alt="' + dish.name + '">' +
    '<p class="dish-price">' + dish.price + '₽</p>' +
    '<p class="dish-name">' + dish.name + '</p>' +
    '<p class="dish-weight">' + dish.count + '</p>' +
    '<button class="dish-button" type="button">Добавить</button>';
  return card;
}

// Выводит блюда одной категории: фильтр по kind, сортировка по алфавиту, отрисовка
function displayCategory(category) {
  const container = document.querySelector('.dishes[data-category="' + category + '"]');
  container.innerHTML = '';

  dishes
    .filter(function (dish) {
      return dish.category === category &&
        (activeKind[category] === null || dish.kind === activeKind[category]);
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name, 'ru');
    })
    .forEach(function (dish) {
      container.append(createDishCard(dish));
    });
}

// Выводит все категории при загрузке страницы
Object.keys(selected).forEach(displayCategory);

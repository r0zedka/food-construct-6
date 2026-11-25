// Проверка состава ланча при отправке формы и показ уведомлений.
// Объект selected (выбранные блюда по категориям) объявлен в display.js.

const form = document.querySelector('.order-form');
const submitButton = form.querySelector('button[type="submit"]');

// Возвращает текст уведомления или null, если набор блюд — один из 5 комбо
function getMissingMessage() {
  const hasSoup = selected.soup !== null;
  const hasMain = selected.main !== null;
  const hasSalad = selected.salad !== null;
  const hasDrink = selected.drink !== null;
  const hasDessert = selected.dessert !== null;

  // Ничего не выбрано
  if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
    return 'Ничего не выбрано. Выберите блюда для заказа';
  }
  // Выбран суп, но нет главного блюда и салата
  if (hasSoup && !hasMain && !hasSalad) {
    return 'Выберите главное блюдо/салат/стартер';
  }
  // Выбран салат, но нет супа и главного блюда
  if (hasSalad && !hasSoup && !hasMain) {
    return 'Выберите суп или главное блюдо';
  }
  // Выбран только напиток и/или десерт
  if (!hasSoup && !hasMain && !hasSalad) {
    return 'Выберите главное блюдо';
  }
  // Основные блюда есть, но нет напитка
  if (!hasDrink) {
    return 'Выберите напиток';
  }
  // Все 5 комбо содержат напиток и главное блюдо либо суп + салат
  if (hasMain || (hasSoup && hasSalad)) {
    return null;
  }
  return 'Выберите главное блюдо';
}

// Создаёт уведомление и добавляет его на страницу
function showNotification(text) {
  closeNotification();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.setAttribute('role', 'alert');

  const message = document.createElement('p');
  message.className = 'notification-text';
  message.textContent = text;

  const button = document.createElement('button');
  button.className = 'notification-button';
  button.type = 'button';
  button.textContent = 'Окей 👌';
  button.addEventListener('click', closeNotification);

  notification.append(message, button);
  document.body.append(notification);
}

// Убирает уведомление со страницы
function closeNotification() {
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
}

// Если состав ланча неверный — отменяем отправку и показываем уведомление.
// Возвращает true, если отправку нужно остановить.
function checkLunch(event) {
  const message = getMissingMessage();
  if (message === null) {
    return false;
  }
  event.preventDefault();
  showNotification(message);
  return true;
}

// Проверка при отправке формы
form.addEventListener('submit', checkLunch);

// Клик по «Отправить» срабатывает раньше проверки обязательных полей браузером,
// поэтому уведомление появляется даже при пустых полях формы
submitButton.addEventListener('click', checkLunch);

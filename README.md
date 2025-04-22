# Plushe Modal

Plushe Modal — это легковесная библиотека для создания модальных окон с настройками.

## Установка

```bash
npm install plushe-modal
```

## Использование

```js
import { ModalFactory } from "plushe-modal";
import modalData from "./data/modals.json";
const modalFactory = new ModalFactory(modalData);
```

## Настройки

- **animation.duration** : Длительность анимации (в миллисекундах) или `"off"` для отключения.
- **options.hasButton** : Показывать кнопку закрытия.
- **options.buttonText** : Текст кнопки закрытия.

### Пример настройки

```json
{
  "settings": {
    "animation": {
      "duration": 300
    }
  },
  "modals": [
    {
      "id": "modal1",
      "title": "Modal 1",
      "content": "This is modal 1",
      "options": {
        "hasButton": true,
        "buttonText": "Close",
        "modalClass": "modal1-alt"
      }
    },
    {
      "id": "modal2",
      "title": "Modal 2",
      "content": "This is modal 2",
      "options": {
        "hasButton": false
      }
    }
  ]
}
```

### HTML-разметка

Добавьте кнопки с атрибутом `data-modal`, чтобы открывать модалки:

```html
<button data-modal="modal1">Open Modal 1</button>
<button data-modal="modal2">Open Modal 2</button>
```

### Стили

Подключите стили для модалок. Вы можете использовать свои стили или добавить базовые:

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 300ms ease;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}
```

## Лицензия

Эта библиотека распространяется под лицензией MIT. Смотрите файл LICENSE для подробной информации.

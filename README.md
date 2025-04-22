# Plushe Modal

Plushe Modal — это легковесная библиотека для создания модальных окон с настройками.

## Установка

```bash
npm install plushe-modal
```

## Использование

```
import { ModalFactory } from "plushe-modal";
import modalData from "./data/modals.json";const modalFactory = new ModalFactory(modalData);
```

## Настройки

* **animation.duration** : Длительность анимации (в миллисекундах) или `"off"` для отключения.
* **options.hasButton** : Показывать кнопку закрытия.
* **options.buttonText** : Текст кнопки закрытия.

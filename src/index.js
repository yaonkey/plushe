import modalData from "./data/modals.json" with { type: "json" };

class Modal {
  constructor(id, title, content, options = {}, animationDuration) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.options = options;
    this.animationDuration = animationDuration;
    this.createModalElement();
  }

  createModalElement() {
    // Создаем overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = `${this.id}-overlay`;
    overlay.style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.transition = `opacity ${this.animationDuration}ms ease`;

    // Добавляем обработчик для закрытия модалки при клике на overlay
    overlay.addEventListener("click", () => {
      ModalFactory.hideAllModals();
    });

    // Создаем модалку
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = this.id;
    modal.style.opacity = "0";
    modal.style.transition = `opacity ${this.animationDuration}ms ease`;

    // Предотвращаем закрытие модалки при клике на неё
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // Добавляем класс, если указано в options
    if (this.options.modalClass) {
      modal.classList.add(this.options.modalClass);
    }

    // Добавляем заголовок
    if (this.title) {
      const title = document.createElement("h2");
      title.textContent = this.title;
      modal.appendChild(title);
    }

    // Добавляем контент
    if (this.content) {
      const content = document.createElement("p");
      content.textContent = this.content;
      modal.appendChild(content);
    }

    // Добавляем кнопку, если указано в options
    if (this.options.hasButton) {
      const button = document.createElement("button");
      button.textContent = this.options.buttonText || "Close";
      button.addEventListener("click", () => this.hide());
      modal.appendChild(button);
    }

    // Добавляем модалку и overlay в DOM
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  show() {
    const overlay = document.getElementById(`${this.id}-overlay`);
    const modal = document.getElementById(this.id);

    overlay.style.display = "flex";
    setTimeout(() => {
      overlay.style.opacity = "1";
      modal.style.opacity = "1";
    }, 10); // Небольшая задержка для запуска анимации
  }

  hide() {
    const overlay = document.getElementById(`${this.id}-overlay`);
    const modal = document.getElementById(this.id);

    overlay.style.opacity = "0";
    modal.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, this.animationDuration);
  }
}

class ModalFactory {
  constructor(data) {
    const { settings, modals } = data;
    this.animationDuration = settings.animation.duration || 0;
    this.modals = [];
    modals.forEach((modalData) => {
      const { id, title, content, options } = modalData;
      this.createModal(id, title, content, options);
    });

    // Добавляем обработчик кликов для элементов с data-modal
    document.addEventListener("click", (event) => {
      const modalId = event.target.getAttribute("data-modal");
      if (modalId) {
        this.showModal(modalId);
      }
    });
  }

  createModal(id, title, content, options) {
    const modal = new Modal(id, title, content, options, this.animationDuration);
    this.modals.push(modal);
  }

  showModal(id) {
    const modal = this.modals.find((m) => m.id === id);
    if (modal) {
      modal.show();
    } else {
      console.error(`Modal with id "${id}" not found.`);
    }
  }

  static hideAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.style.opacity = "0";
      const modal = overlay.querySelector(".modal");
      if (modal) modal.style.opacity = "0";

      setTimeout(() => {
        overlay.style.display = "none";
      }, ModalFactory.animationDuration);
    });
  }
}

// Создаём фабрику модалок с данными из modals.json
const modalFactory = new ModalFactory(modalData);
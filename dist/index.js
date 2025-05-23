"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Modal = /*#__PURE__*/function () {
  function Modal(id, title, content) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var animationDuration = arguments.length > 4 ? arguments[4] : undefined;
    _classCallCheck(this, Modal);
    this.id = id;
    this.title = title;
    this.content = content;
    this.options = options;
    this.animationDuration = animationDuration;
    this.createModalElement();
  }
  return _createClass(Modal, [{
    key: "createModalElement",
    value: function createModalElement() {
      var _this = this;
      // Создаем overlay
      var overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.id = "".concat(this.id, "-overlay");
      overlay.style.display = "none";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity ".concat(this.animationDuration, "ms ease");

      // Добавляем обработчик для закрытия модалки при клике на overlay
      overlay.addEventListener("click", function () {
        ModalFactory.hideAllModals();
      });

      // Создаем модалку
      var modal = document.createElement("div");
      modal.className = "modal";
      modal.id = this.id;
      modal.style.opacity = "0";
      modal.style.transition = "opacity ".concat(this.animationDuration, "ms ease");

      // Предотвращаем закрытие модалки при клике на неё
      modal.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      // Добавляем класс, если указано в options
      if (this.options.modalClass) {
        modal.classList.add(this.options.modalClass);
      }

      // Добавляем заголовок
      if (this.title) {
        var title = document.createElement("h2");
        title.textContent = this.title;
        modal.appendChild(title);
      }

      // Добавляем контент
      if (this.content) {
        var content = document.createElement("p");
        content.textContent = this.content;
        modal.appendChild(content);
      }

      // Добавляем кнопку, если указано в options
      if (this.options.hasButton) {
        var button = document.createElement("button");
        button.textContent = this.options.buttonText || "Close";
        button.addEventListener("click", function () {
          return _this.hide();
        });
        modal.appendChild(button);
      }

      // Добавляем модалку и overlay в DOM
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  }, {
    key: "show",
    value: function show() {
      var overlay = document.getElementById("".concat(this.id, "-overlay"));
      var modal = document.getElementById(this.id);
      overlay.style.display = "flex";
      setTimeout(function () {
        overlay.style.opacity = "1";
        modal.style.opacity = "1";
      }, 10); // Небольшая задержка для запуска анимации
    }
  }, {
    key: "hide",
    value: function hide() {
      var overlay = document.getElementById("".concat(this.id, "-overlay"));
      var modal = document.getElementById(this.id);
      overlay.style.opacity = "0";
      modal.style.opacity = "0";
      setTimeout(function () {
        overlay.style.display = "none";
      }, this.animationDuration);
    }
  }]);
}();
var ModalFactory = /*#__PURE__*/function () {
  function ModalFactory(data) {
    var _this2 = this;
    _classCallCheck(this, ModalFactory);
    var settings = data.settings,
      modals = data.modals;
    this.animationDuration = settings.animation.duration || 0;
    this.modals = [];
    modals.forEach(function (modalData) {
      var id = modalData.id,
        title = modalData.title,
        content = modalData.content,
        options = modalData.options;
      _this2.createModal(id, title, content, options);
    });

    // Добавляем обработчик кликов для элементов с data-modal
    document.addEventListener("click", function (event) {
      var modalId = event.target.getAttribute("data-modal");
      if (modalId) {
        _this2.showModal(modalId);
      }
    });
  }
  return _createClass(ModalFactory, [{
    key: "createModal",
    value: function createModal(id, title, content, options) {
      var modal = new Modal(id, title, content, options, this.animationDuration);
      this.modals.push(modal);
    }
  }, {
    key: "showModal",
    value: function showModal(id) {
      var modal = this.modals.find(function (m) {
        return m.id === id;
      });
      if (modal) {
        modal.show();
      } else {
        console.error("Modal with id \"".concat(id, "\" not found."));
      }
    }
  }], [{
    key: "hideAllModals",
    value: function hideAllModals() {
      document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
        overlay.style.opacity = "0";
        var modal = overlay.querySelector(".modal");
        if (modal) modal.style.opacity = "0";
        setTimeout(function () {
          overlay.style.display = "none";
        }, ModalFactory.animationDuration);
      });
    }
  }]);
}();
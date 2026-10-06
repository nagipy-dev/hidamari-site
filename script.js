// 全ページ共通のスクリプト。ページにない要素は、その処理を飛ばす

// ===== スマートフォンのメニュー開閉 =====
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.querySelector(".visually-hidden").textContent = open ? "メニューを閉じる" : "メニューを開く";
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("is-locked", open);
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
}

// ===== スクロールしたらヘッダーに下線を出す =====
const header = document.querySelector(".header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 8),
  { passive: true }
);

// ===== スクロールで現れる演出 =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== 施工事例：種類での絞り込み =====
const filters = document.querySelectorAll(".filter");
const works = [...document.querySelectorAll(".work")];
const worksCount = document.querySelector("#works-count");

function visibleWorks() {
  return works.filter((work) => !work.hidden);
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const type = filter.dataset.filter;
    filters.forEach((f) => f.setAttribute("aria-pressed", String(f === filter)));
    works.forEach((work) => {
      work.hidden = type !== "all" && work.dataset.type !== type;
    });
    worksCount.textContent = `${visibleWorks().length}件の事例を表示しています`;
  });
});

// ===== 施工事例：写真の拡大表示 =====
const lightbox = document.querySelector("#lightbox");

if (lightbox) {
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox__text");
  const counter = lightbox.querySelector(".lightbox__counter");
  let current = 0;
  let lastFocused = null;

  function show(index) {
    const list = visibleWorks();
    current = (index + list.length) % list.length;
    const work = list[current];
    const img = work.querySelector("img");
    image.src = img.src;
    image.alt = img.alt;
    caption.textContent = work.querySelector(".work__title").textContent;
    counter.textContent = `${current + 1} / ${list.length}`;
  }

  function open(work) {
    lastFocused = document.activeElement;
    show(visibleWorks().indexOf(work));
    lightbox.hidden = false;
    document.body.classList.add("is-locked");
    lightbox.querySelector(".lightbox__close").focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("is-locked");
    lastFocused?.focus();
  }

  works.forEach((work) => {
    work.querySelector(".work__button").addEventListener("click", () => open(work));
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", close);
  lightbox.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));

  // 写真の外側（暗い部分）をクリックしても閉じる
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);

    // フォーカスが拡大表示の外に出ないようにする
    if (event.key === "Tab") {
      const buttons = [...lightbox.querySelectorAll("button")];
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

// ===== お問い合わせフォームの入力チェック（見本のため送信はしない） =====
const form = document.querySelector("#contact-form");

if (form) {
  const done = document.querySelector("#form-done");

  // 入力欄ごとのチェック。ラジオボタンとチェックボックスはグループ単位で見る
  function validateRow(row) {
    const fields = [...row.querySelectorAll("input, textarea")];
    const radios = fields.filter((f) => f.type === "radio");
    const valid = radios.length
      ? radios.some((r) => r.checked)
      : fields.every((f) => f.checkValidity());
    row.classList.toggle("is-invalid", !valid);
    fields.forEach((f) => f.setAttribute("aria-invalid", String(!valid)));
    return valid;
  }

  const rows = [...form.querySelectorAll(".form__row[data-validate]")];

  rows.forEach((row) => {
    row.addEventListener("input", () => {
      if (row.classList.contains("is-invalid")) validateRow(row);
    });
    row.addEventListener("change", () => {
      if (row.classList.contains("is-invalid")) validateRow(row);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const results = rows.map(validateRow);
    const firstInvalid = rows[results.indexOf(false)];

    if (firstInvalid) {
      firstInvalid.querySelector("input, textarea").focus();
      return;
    }

    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
}

// ===== フッターの年を自動で更新 =====
document.querySelectorAll(".js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

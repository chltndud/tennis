// GitHub 저장소 주소
const REPO_URL = "https://github.com/chltndud/tennis";

const CATEGORIES = ["전체", "기술", "장비", "대회", "코트", "규칙"];
const posts = (window.POSTS || []).slice().sort((a, b) => b.date.localeCompare(a.date));

let currentCategory = "전체";
let keyword = "";

const listEl = document.getElementById("post-list");
const filtersEl = document.getElementById("filters");
const countEl = document.getElementById("result-count");
const searchEl = document.getElementById("search");
const modal = document.getElementById("post-modal");

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function renderFilters() {
  filtersEl.innerHTML = CATEGORIES.map((c) =>
    `<button data-cat="${c}" class="${c === currentCategory ? "active" : ""}">${c}</button>`
  ).join("");
}

function renderPosts() {
  const kw = keyword.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    const inCat = currentCategory === "전체" || p.category === currentCategory;
    const inKw = !kw || (p.title + p.summary + p.body).toLowerCase().includes(kw);
    return inCat && inKw;
  });

  countEl.textContent = `${filtered.length}개의 글`;

  if (filtered.length === 0) {
    listEl.innerHTML = `<p class="empty">조건에 맞는 글이 없습니다.</p>`;
    return;
  }

  listEl.innerHTML = filtered.map((p) => `
    <article class="card" data-id="${p.id}" tabindex="0">
      <div><span class="badge">${escapeHTML(p.category)}</span></div>
      <h3>${escapeHTML(p.title)}</h3>
      <p>${escapeHTML(p.summary)}</p>
      <div class="meta">${escapeHTML(p.author)} · ${escapeHTML(p.date)}</div>
    </article>
  `).join("");
}

function openPost(id) {
  const p = posts.find((x) => x.id === Number(id));
  if (!p) return;
  document.getElementById("modal-category").textContent = p.category;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-meta").textContent = `${p.author} · ${p.date}`;
  document.getElementById("modal-body").textContent = p.body;
  modal.showModal();
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  currentCategory = btn.dataset.cat;
  renderFilters();
  renderPosts();
});

searchEl.addEventListener("input", (e) => {
  keyword = e.target.value;
  renderPosts();
});

listEl.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openPost(card.dataset.id);
});
listEl.addEventListener("keydown", (e) => {
  const card = e.target.closest(".card");
  if (card && e.key === "Enter") openPost(card.dataset.id);
});

document.getElementById("modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

document.getElementById("issue-link").href = `${REPO_URL}/issues/new?title=${encodeURIComponent("[글 제안] ")}`;

renderFilters();
renderPosts();

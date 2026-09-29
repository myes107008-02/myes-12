// 週次課程專用腳本
document.addEventListener('DOMContentLoaded', () => {
  // 自動設定下拉選單目前選中的週次
  const currentPath = window.location.pathname;
  const selectEl = document.getElementById('weekSelect');
  if (selectEl) {
    Array.from(selectEl.options).forEach(opt => {
      if (currentPath.includes(opt.value.replace('../', ''))) {
        opt.selected = true;
      }
    });
  }
});

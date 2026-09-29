// 智光商工 × 安溪國中 115學年度技藝班班網 核心互動腳本

document.addEventListener('DOMContentLoaded', () => {
  // 行動版漢堡選單切換
  const navToggleBtn = document.getElementById('navToggleBtn');
  const mainNavLinks = document.getElementById('mainNavLinks');
  if (navToggleBtn && mainNavLinks) {
    navToggleBtn.addEventListener('click', () => {
      mainNavLinks.classList.toggle('show');
    });
  }

  // 16 週次課程篩選功能
  const filterBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const scheduleCards = document.querySelectorAll('.schedule-card');

  if (filterBtns.length > 0 && scheduleCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        scheduleCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'teacher-weng') {
            card.style.display = card.dataset.teacher?.includes('翁偉倬') ? 'flex' : 'none';
          } else if (filter === 'teacher-chou') {
            card.style.display = card.dataset.teacher?.includes('周櫻') ? 'flex' : 'none';
          } else if (filter === 'room-dream') {
            card.style.display = card.dataset.room?.includes('夢想家') ? 'flex' : 'none';
          } else if (filter === 'room-419') {
            card.style.display = card.dataset.room?.includes('419') ? 'flex' : 'none';
          }
        });
      });
    });
  }

  // 關鍵字搜尋功能（搜尋課程與公告）
  const searchInput = document.getElementById('globalSearchInput');
  const searchBtn = document.getElementById('globalSearchBtn');

  function performSearch() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (!query) {
      scheduleCards.forEach(card => card.style.display = 'flex');
      return;
    }

    scheduleCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'flex' : 'none';
    });

    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });

    // 捲動至課程列表區
    const scheduleSection = document.getElementById('schedule-section');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }
});

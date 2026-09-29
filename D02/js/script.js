/* ==========================================================================
   熏熏的文青風個人網站 - JavaScript Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. Theme Switcher (日暮暖陽 Cream / 深夜書房 Dark)
     -------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  const savedTheme = localStorage.getItem('xunxun_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = '深夜書房';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('xunxun_theme', 'light');
        themeIcon.textContent = '☀️';
        themeText.textContent = '日暮暖陽';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('xunxun_theme', 'dark');
        themeIcon.textContent = '🌙';
        themeText.textContent = '深夜書房';
      }
    });
  }

  /* --------------------------------------------------
     2. Avatar Switcher (Q版頭像 vs 經典實照)
     -------------------------------------------------- */
  const heroAvatarImg = document.getElementById('heroAvatarImg');
  const avatarCaption = document.getElementById('avatarCaption');
  const avatarSub = document.getElementById('avatarSub');
  const btnQ = document.getElementById('btnQAvatar');
  const btnReal = document.getElementById('btnRealAvatar');

  const avatarData = {
    q: {
      src: 'images/q_avatar.png',
      caption: 'AI Q版繪繪形象 🌸',
      sub: '由大頭照 1.jpg 詠唱生成的智慧靈魂'
    },
    real: {
      src: 'images/1.jpg',
      caption: '熏熏的日常寫照 📷',
      sub: '安溪國中 • 認真研習中的純真笑容'
    }
  };

  function switchAvatar(type) {
    if (!heroAvatarImg) return;
    heroAvatarImg.style.opacity = '0';
    setTimeout(() => {
      heroAvatarImg.src = avatarData[type].src;
      if (avatarCaption) avatarCaption.textContent = avatarData[type].caption;
      if (avatarSub) avatarSub.textContent = avatarData[type].sub;
      heroAvatarImg.style.opacity = '1';
    }, 200);

    if (type === 'q') {
      btnQ?.classList.add('active');
      btnReal?.classList.remove('active');
    } else {
      btnReal?.classList.add('active');
      btnQ?.classList.remove('active');
    }
  }

  btnQ?.addEventListener('click', () => switchAvatar('q'));
  btnReal?.addEventListener('click', () => switchAvatar('real'));


  /* --------------------------------------------------
     3. Touch Typing Practice Simulator (打字指法與速度實戰)
     -------------------------------------------------- */
  const typingSentences = [
    "我是熏熏，努力學習打字指法與網頁開發！",
    "探索商業經營與電子商務，打造智慧科技新視野。",
    "安溪國中與智光商工，期許成為全方位數位商管跨領域人才！",
    "指尖在鍵盤上流暢跳躍，程式碼構築出屬於我的數位夢想。"
  ];

  let currentSentenceIndex = 0;
  let startTime = null;
  let timerInterval = null;
  let isTypingStarted = false;

  const typingDisplay = document.getElementById('typingDisplay');
  const typingInput = document.getElementById('typingInput');
  const wpmVal = document.getElementById('wpmVal');
  const accuracyVal = document.getElementById('accuracyVal');
  const nextSentenceBtn = document.getElementById('nextSentenceBtn');
  const resetTypingBtn = document.getElementById('resetTypingBtn');

  function renderTypingDisplay() {
    if (!typingDisplay) return;
    const targetText = typingSentences[currentSentenceIndex];
    const userText = typingInput ? typingInput.value : '';

    let html = '';
    for (let i = 0; i < targetText.length; i++) {
      const char = targetText[i];
      if (i < userText.length) {
        if (userText[i] === char) {
          html += `<span class="char-correct">${char}</span>`;
        } else {
          html += `<span class="char-wrong">${char}</span>`;
        }
      } else if (i === userText.length) {
        html += `<span class="char-current">${char}</span>`;
      } else {
        html += `<span>${char}</span>`;
      }
    }
    typingDisplay.innerHTML = html;
  }

  function handleTypingInput() {
    if (!typingInput) return;
    const targetText = typingSentences[currentSentenceIndex];
    const userText = typingInput.value;

    if (!isTypingStarted && userText.length > 0) {
      isTypingStarted = true;
      startTime = new Date();
      timerInterval = setInterval(updateTypingStats, 500);
    }

    renderTypingDisplay();
    highlightVirtualKey(userText[userText.length - 1]);

    if (userText === targetText) {
      clearInterval(timerInterval);
      updateTypingStats();
      setTimeout(() => {
        alert('🎉 太棒了！打字練習完成！準確率 100%');
      }, 200);
    }
  }

  function updateTypingStats() {
    if (!startTime || !typingInput) return;
    const now = new Date();
    const timeInMinutes = (now - startTime) / 60000;
    const userText = typingInput.value;
    const targetText = typingSentences[currentSentenceIndex];

    // Calculate WPM (Words / Characters per minute)
    const charCount = userText.length;
    const wpm = timeInMinutes > 0 ? Math.round((charCount / 5) / timeInMinutes) * 10 : 0;
    if (wpmVal) wpmVal.textContent = Math.min(wpm, 150);

    // Calculate Accuracy
    let correctCount = 0;
    for (let i = 0; i < userText.length; i++) {
      if (userText[i] === targetText[i]) correctCount++;
    }
    const accuracy = userText.length > 0 ? Math.round((correctCount / userText.length) * 100) : 100;
    if (accuracyVal) accuracyVal.textContent = `${accuracy}%`;
  }

  function resetTyping() {
    clearInterval(timerInterval);
    isTypingStarted = false;
    startTime = null;
    if (typingInput) typingInput.value = '';
    if (wpmVal) wpmVal.textContent = '0';
    if (accuracyVal) accuracyVal.textContent = '100%';
    renderTypingDisplay();
  }

  function highlightVirtualKey(char) {
    if (!char) return;
    const keys = document.querySelectorAll('.kb-key');
    keys.forEach(k => {
      if (k.textContent.toLowerCase() === char.toLowerCase()) {
        k.classList.add('active');
        setTimeout(() => k.classList.remove('active'), 200);
      }
    });
  }

  if (typingInput) {
    typingInput.addEventListener('input', handleTypingInput);
  }
  if (nextSentenceBtn) {
    nextSentenceBtn.addEventListener('click', () => {
      currentSentenceIndex = (currentSentenceIndex + 1) % typingSentences.length;
      resetTyping();
    });
  }
  if (resetTypingBtn) {
    resetTypingBtn.addEventListener('click', resetTyping);
  }

  // Initial render
  renderTypingDisplay();

  /* --------------------------------------------------
     4. Literary Quote Generator (文青每日靈感)
     -------------------------------------------------- */
  const quotesList = [
    { text: "「在代碼的律動與指法間，看見數位未來的萬種可能。」", author: "— 熏熏的手札" },
    { text: "「學習不只是積累知識，更是將智慧轉換為創造力的旅程。」", author: "— 智光商工技藝講義" },
    { text: "「商業是連接人與需求的橋樑，而科技賦予這座橋樑無窮的智慧。」", author: "— 數位商管隨想" },
    { text: "「指尖敲擊出節奏，心懷安溪國中的初心，邁向廣闊的跨領域舞台。」", author: "— 熏熏的心情語錄" }
  ];

  const quoteTextElem = document.getElementById('quoteTextElem');
  const quoteAuthorElem = document.getElementById('quoteAuthorElem');
  const refreshQuoteBtn = document.getElementById('refreshQuoteBtn');

  if (refreshQuoteBtn) {
    refreshQuoteBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * quotesList.length);
      const q = quotesList[randomIndex];
      if (quoteTextElem) {
        quoteTextElem.style.opacity = '0';
        setTimeout(() => {
          quoteTextElem.textContent = q.text;
          if (quoteAuthorElem) quoteAuthorElem.textContent = q.author;
          quoteTextElem.style.opacity = '1';
        }, 200);
      }
    });
  }

  /* --------------------------------------------------
     5. Visitor Guestbook (給熏熏的心情留言)
     -------------------------------------------------- */
  const guestbookForm = document.getElementById('guestbookForm');
  const messageList = document.getElementById('messageList');

  const defaultMessages = [
    { name: '智光商工老師', text: '熏熏加油！指法練習進步神速，期許在數位商管領域大放異彩！', time: '今日 09:30' },
    { name: '安溪國中同學', text: '這個文青風網站超美的！Q版大頭照簡直太可愛啦 🌸', time: '昨日 16:45' }
  ];

  function loadMessages() {
    if (!messageList) return;
    const stored = JSON.parse(localStorage.getItem('xunxun_guestbook')) || defaultMessages;
    messageList.innerHTML = stored.map(m => `
      <div class="message-item">
        <div class="message-meta">
          <span>✍️ ${escapeHtml(m.name)}</span>
          <span style="font-weight:400; color:var(--text-light);">${m.time}</span>
        </div>
        <div class="message-body">${escapeHtml(m.text)}</div>
      </div>
    `).join('');
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('guestName');
      const textInput = document.getElementById('guestMsg');

      if (!nameInput.value.trim() || !textInput.value.trim()) return;

      const stored = JSON.parse(localStorage.getItem('xunxun_guestbook')) || defaultMessages;
      const newMsg = {
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        time: '剛剛'
      };

      stored.unshift(newMsg);
      localStorage.setItem('xunxun_guestbook', JSON.stringify(stored));

      nameInput.value = '';
      textInput.value = '';
      loadMessages();
      alert('🌸 感謝您的加油留言！留言已成功紀錄。');
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  loadMessages();

});

// D01 課程專用互動邏輯腳本

document.addEventListener('DOMContentLoaded', () => {
  // 1. 智光商工資處科 年級課程切換
  const gradeBtns = document.querySelectorAll('.grade-btn');
  const gradeContents = {
    g1: [
      { name: '商業概論', credits: '4 學分', desc: '了解現代化商業環境及管理基本概念，培養正確工作態度及創業精神。' },
      { name: '會計學 (一)', credits: '6 學分', desc: '了解財務會計基本理論及培養帳務處理能力，涵養誠信職業道德。' },
      { name: '資訊科技', credits: '2 學分', desc: '了解電腦基本概念及在現代生活與商業各領域的應用。' },
      { name: '數位科技概論', credits: '4 學分', desc: '了解數位科技系統平台與軟體應用，掌握通訊網路原理與網路服務。' },
      { name: '程式語言與設計', credits: '4 學分', desc: '了解程式語言在生活上的應用，具備撰寫程式語言基本邏輯。' },
      { name: '程式設計入門', credits: '2 學分', desc: '具備實作程式設計與邏輯運算思維實務能力。' },
      { name: '文書處理實習', credits: '6 學分', desc: '熟練資料輸入、文書軟體操作與專業文件編排，輔導考取電腦軟體應用丙級證照。', cert: '輔導：電腦軟體應用丙級' }
    ],
    g2: [
      { name: '經濟學', credits: '8 學分', desc: '了解經濟學意義及知識，培養邏輯分析及數量分析能力，建立正確經濟思維。' },
      { name: '會計學 (二) 與實作', credits: '8 學分', desc: '公司會計、資產評價、負債等概念及實務帳務處理，加強會計實作能力。' },
      { name: '數位科技應用', credits: '4 學分', desc: '整合商業科技應用，熟練簡報與進階試算表，處理生活與工作文件。' },
      { name: '專題實作 (一)', credits: '2 學分', desc: '學習小組專題製作方法與問題解決流程。' },
      { name: '網頁設計實習', credits: '2 學分', desc: '學習現代網頁設計概念及工具應用，輔導考取網頁設計丙級證照。', cert: '輔導：網頁設計丙級' },
      { name: '多媒體製作與應用', credits: '6 學分', desc: '影像處理、影音剪輯與多媒體數位內容創作應用。' },
      { name: '行動裝置程式設計入門', credits: '4 學分', desc: '了解行動裝置開發工具，具備製作手機 APP 的實務能力。' },
      { name: '微算機作業系統', credits: '4 學分', desc: '了解作業系統架構、安裝維護及硬體周邊操作管理方法。' }
    ],
    g3: [
      { name: '套裝軟體應用', credits: '6 學分', desc: '深度整合 Office 高階工具與資料庫操作，輔導取得電腦軟體應用乙級技術士證照。', cert: '核心目標：電腦軟體應用乙級技術士' },
      { name: '電子商務與數位行銷實習', credits: '6 學分', desc: '了解電商營運、社群經營、數位行銷漏斗與商業實務。' },
      { name: '專題實作 (二)', credits: '4 學分', desc: '統整三年所學專業知識與技能，產出具備市場應用價值的專題作品。' },
      { name: '動態網頁設計實習', credits: '4 學分', desc: '深入學習 JavaScript 與前後端動態網頁互動製作。' },
      { name: '資料庫與計算機應用', credits: '10 學分', desc: 'SQL 資料庫設計實務、大型試算表巨集與商業數據分析。' },
      { name: '金融證券投資理論與實作', credits: '4 學分', desc: '金融體系與常用商品知識，學習理財規劃與投資風險評估。' },
      { name: '直播與多媒體實務', credits: '4 學分', desc: '新媒體直播技術、口條表達與自媒體創新品牌塑造。' },
      { name: '商業溝通與專業英文', credits: '4 學分', desc: '職場專業英文詞彙、國際商務溝通與禮儀風範。' }
    ]
  };

  const curriculumGrid = document.getElementById('curriculumGrid');

  function renderCurriculum(gradeKey) {
    if (!curriculumGrid) return;
    const courses = gradeContents[gradeKey] || [];
    curriculumGrid.innerHTML = courses.map(c => `
      <div class="course-box">
        <div class="course-box-top">
          <span class="course-box-name">${c.name}</span>
          <span class="course-credits">${c.credits}</span>
        </div>
        <p class="course-box-desc">${c.desc}</p>
        ${c.cert ? `<span class="cert-highlight-badge">🏅 ${c.cert}</span>` : ''}
      </div>
    `).join('');
  }

  gradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gradeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCurriculum(btn.dataset.grade);
    });
  });

  // 初始渲染一年級課程
  renderCurriculum('g1');

  // 2. 鍵盤輸入指法對應表 (手指名稱、色標與按鍵對應)
  const keyToFingerMap = {
    '`': '左手小指 (Left Pinky)', '1': '左手小指 (Left Pinky)', 'q': '左手小指 (Left Pinky)', 'a': '左手小指 (基準鍵 Home Row)', 'z': '左手小指 (Left Pinky)',
    '2': '左手無名指 (Left Ring)', 'w': '左手無名指 (Left Ring)', 's': '左手無名指 (基準鍵 Home Row)', 'x': '左手無名指 (Left Ring)',
    '3': '左手中指 (Left Middle)', 'e': '左手中指 (Left Middle)', 'd': '左手中指 (基準鍵 Home Row)', 'c': '左手中指 (Left Middle)',
    '4': '左手食指 (Left Index)', '5': '左手食指 (Left Index)', 'r': '左手食指 (Left Index)', 't': '左手食指 (Left Index)', 'f': '左手食指 (基準定位鍵 ★)', 'g': '左手食指 (Left Index)', 'v': '左手食指 (Left Index)', 'b': '左手食指 (Left Index)',
    '6': '右手食指 (Right Index)', '7': '右手食指 (Right Index)', 'y': '右手食指 (Right Index)', 'u': '右手食指 (Right Index)', 'h': '右手食指 (Right Index)', 'j': '右手食指 (基準定位鍵 ★)', 'n': '右手食指 (Right Index)', 'm': '右手食指 (Right Index)',
    '8': '右手中指 (Right Middle)', 'i': '右手中指 (Right Middle)', 'k': '右手中指 (基準鍵 Home Row)', ',': '右手中指 (Right Middle)',
    '9': '右手無名指 (Right Ring)', 'o': '右手無名指 (Right Ring)', 'l': '右手無名指 (基準鍵 Home Row)', '.': '右手無名指 (Right Ring)',
    '0': '右手小指 (Right Pinky)', '-': '右手小指 (Right Pinky)', '=': '右手小指 (Right Pinky)', 'p': '右手小指 (Right Pinky)', '[': '右手小指 (Right Pinky)', ']': '右手小指 (Right Pinky)', ';': '右手小指 (基準鍵 Home Row)', "'": '右手小指 (Right Pinky)', '/': '右手小指 (Right Pinky)',
    ' ': '雙手大拇指 (Thumb - 空白鍵)'
  };

  const typingInput = document.getElementById('typingInput');
  const targetSample = document.getElementById('targetSample');
  const fingerGuidePill = document.getElementById('fingerGuidePill');
  const typedCountEl = document.getElementById('typedCount');
  const accuracyEl = document.getElementById('accuracyVal');

  function highlightVirtualKey(char) {
    const lowerChar = char.toLowerCase();
    const virtualKey = document.querySelector(`.kb-key[data-key="${lowerChar}"]`);
    if (virtualKey) {
      virtualKey.classList.add('active-key');
      setTimeout(() => {
        virtualKey.classList.remove('active-key');
      }, 200);
    }

    if (fingerGuidePill) {
      const finger = keyToFingerMap[lowerChar] || '按鍵操作中';
      fingerGuidePill.textContent = `🎯 建議指法：${finger}`;
    }
  }

  if (typingInput) {
    typingInput.addEventListener('keydown', (e) => {
      highlightVirtualKey(e.key);
    });

    typingInput.addEventListener('input', () => {
      const currentVal = typingInput.value;
      const targetText = targetSample ? targetSample.textContent : '';

      if (typedCountEl) {
        typedCountEl.textContent = currentVal.length;
      }

      // 計算正確度
      if (currentVal.length > 0 && accuracyEl) {
        let correct = 0;
        for (let i = 0; i < currentVal.length; i++) {
          if (currentVal[i] === targetText[i]) correct++;
        }
        const acc = Math.round((correct / currentVal.length) * 100);
        accuracyEl.textContent = `${acc}%`;
      }
    });
  }

  // 點擊虛擬鍵盤也可以觸發展示
  const allVirtualKeys = document.querySelectorAll('.kb-key');
  allVirtualKeys.forEach(k => {
    k.addEventListener('click', () => {
      const keyVal = k.dataset.key;
      if (keyVal) {
        highlightVirtualKey(keyVal);
        if (typingInput) {
          typingInput.value += (keyVal === 'space' ? ' ' : keyVal);
          typingInput.dispatchEvent(new Event('input'));
          typingInput.focus();
        }
      }
    });
  });

  // 3. Antigravity AI 網站生成示範區 (Interactive Demo)
  const presetPrompts = {
    profile: {
      title: "安溪國中同學個人商管學習名片",
      code: `<!-- Antigravity 自動生成：個人學習名片 -->
<div style="padding:20px; border-radius:12px; background:linear-gradient(135deg,#0b4f8a,#1e3a8a); color:white; font-family:sans-serif; text-align:center; box-shadow:0 8px 20px rgba(0,0,0,0.15);">
  <div style="font-size:2.5rem; margin-bottom:8px;">🎓</div>
  <h3 style="margin:0; font-size:1.3rem;">安溪國中技藝班學員名片</h3>
  <p style="margin:6px 0 16px; color:#93c5fd; font-size:0.9rem;">商管職群探索 • 智光商工資處科實習</p>
  <div style="display:flex; justify-content:center; gap:8px; margin-bottom:16px;">
    <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">文書處理</span>
    <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">網頁設計</span>
    <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">AI協作</span>
  </div>
  <button style="background:#c98a2c; color:white; border:none; padding:8px 18px; border-radius:20px; font-weight:bold; cursor:pointer;" onclick="alert('歡迎來到智光商工資處科！')">
    聯絡指導老師
  </button>
</div>`,
      previewHtml: `
        <div style="padding:20px; border-radius:12px; background:linear-gradient(135deg,#0b4f8a,#1e3a8a); color:white; font-family:sans-serif; text-align:center; box-shadow:0 8px 20px rgba(0,0,0,0.15);">
          <div style="font-size:2.5rem; margin-bottom:8px;">🎓</div>
          <h3 style="margin:0; font-size:1.3rem;">安溪國中技藝班學員名片</h3>
          <p style="margin:6px 0 16px; color:#93c5fd; font-size:0.9rem;">商管職群探索 • 智光商工資處科實習</p>
          <div style="display:flex; justify-content:center; gap:8px; margin-bottom:16px;">
            <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">文書處理</span>
            <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">網頁設計</span>
            <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:0.75rem;">AI協作</span>
          </div>
          <button style="background:#c98a2c; color:white; border:none; padding:8px 18px; border-radius:20px; font-weight:bold; cursor:pointer;" onclick="alert('歡迎來到智光商工資處科！夢想家電腦教室期待你的作品！')">
            聯絡指導老師
          </button>
        </div>
      `
    },
    typingScore: {
      title: "現代化個人打字速度計分卡",
      code: `<!-- Antigravity 自動生成：打字即時儀表板 -->
<div style="padding:20px; border-radius:12px; background:#ffffff; border:2px solid #e2e8f0; font-family:sans-serif;">
  <h4 style="margin:0 0 10px; color:#0b4f8a;">⌨️ 今日中英打挑戰成績</h4>
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; text-align:center;">
    <div style="background:#f8fafc; padding:12px; border-radius:8px;">
      <div style="font-size:1.4rem; font-weight:bold; color:#0284c7;">58</div>
      <div style="font-size:0.75rem; color:#64748b;">每分鐘字數 (WPM)</div>
    </div>
    <div style="background:#f8fafc; padding:12px; border-radius:8px;">
      <div style="font-size:1.4rem; font-weight:bold; color:#10b981;">98.5%</div>
      <div style="font-size:0.75rem; color:#64748b;">準確度</div>
    </div>
    <div style="background:#f8fafc; padding:12px; border-radius:8px;">
      <div style="font-size:1.4rem; font-weight:bold; color:#f59e0b;">S 級</div>
      <div style="font-size:0.75rem; color:#64748b;">綜合評定</div>
    </div>
  </div>
  <p style="font-size:0.8rem; color:#475569; margin:12px 0 0;">✨ 翁偉倬老師點評：基準鍵 F 與 J 定位精準，十指分工流暢！</p>
</div>`,
      previewHtml: `
        <div style="padding:20px; border-radius:12px; background:#ffffff; border:2px solid #e2e8f0; font-family:sans-serif;">
          <h4 style="margin:0 0 10px; color:#0b4f8a;">⌨️ 今日中英打挑戰成績</h4>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; text-align:center;">
            <div style="background:#f8fafc; padding:12px; border-radius:8px;">
              <div style="font-size:1.4rem; font-weight:bold; color:#0284c7;">58</div>
              <div style="font-size:0.75rem; color:#64748b;">每分鐘字數 (WPM)</div>
            </div>
            <div style="background:#f8fafc; padding:12px; border-radius:8px;">
              <div style="font-size:1.4rem; font-weight:bold; color:#10b981;">98.5%</div>
              <div style="font-size:0.75rem; color:#64748b;">準確度</div>
            </div>
            <div style="background:#f8fafc; padding:12px; border-radius:8px;">
              <div style="font-size:1.4rem; font-weight:bold; color:#f59e0b;">S 級</div>
              <div style="font-size:0.75rem; color:#64748b;">綜合評定</div>
            </div>
          </div>
          <p style="font-size:0.8rem; color:#475569; margin:12px 0 0;">✨ 翁偉倬老師點評：基準鍵 F 與 J 定位精準，十指分工流暢！</p>
        </div>
      `
    },
    countdown: {
      title: "技藝班成果發表倒數計時器",
      code: `<!-- Antigravity 自動生成：D16 成果發表倒數計時模組 -->
<div style="padding:22px; border-radius:12px; background:linear-gradient(135deg, #1e293b, #0f172a); color:white; font-family:sans-serif; text-align:center;">
  <h3 style="margin:0 0 8px; color:#38bdf8;">🎯 距離 D16 學期成果發表日 (1/12)</h3>
  <div style="font-size:2.2rem; font-weight:800; color:#fbbf24; margin:10px 0;">118 天 09 小時</div>
  <p style="font-size:0.82rem; color:#94a3b8; margin:0;">在夢想家電腦教室，用程式與網頁創造專屬奇蹟！</p>
</div>`,
      previewHtml: `
        <div style="padding:22px; border-radius:12px; background:linear-gradient(135deg, #1e293b, #0f172a); color:white; font-family:sans-serif; text-align:center;">
          <h3 style="margin:0 0 8px; color:#38bdf8;">🎯 距離 D16 學期成果發表日 (1/12)</h3>
          <div style="font-size:2.2rem; font-weight:800; color:#fbbf24; margin:10px 0;">118 天 09 小時</div>
          <p style="font-size:0.82rem; color:#94a3b8; margin:0;">在夢想家電腦教室，用程式與網頁創造專屬奇蹟！</p>
        </div>
      `
    }
  };

  const presetSelect = document.getElementById('promptPresetSelect');
  const btnGenerateAi = document.getElementById('btnGenerateAi');
  const codeDisplayPre = document.getElementById('aiCodeDisplay');
  const previewContainer = document.getElementById('aiPreviewContainer');

  function runAntigravityDemo(presetKey) {
    const data = presetPrompts[presetKey] || presetPrompts.profile;
    if (codeDisplayPre) {
      codeDisplayPre.textContent = "// 🤖 Antigravity 正在解析需求提示詞...\n// 構建語意化結構與現代 CSS...\n\n" + data.code;
    }
    if (previewContainer) {
      previewContainer.innerHTML = data.previewHtml;
    }
  }

  if (btnGenerateAi && presetSelect) {
    btnGenerateAi.addEventListener('click', () => {
      runAntigravityDemo(presetSelect.value);
    });
    presetSelect.addEventListener('change', () => {
      runAntigravityDemo(presetSelect.value);
    });

    // 預設執行第一個
    runAntigravityDemo('profile');
  }
});

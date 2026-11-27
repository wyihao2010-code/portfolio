const island = document.querySelector('#actual-island');
if (island) {
  const trigger = document.querySelector('#notch-trigger');
  const qLeft = document.querySelector('#quota-left');
  const qRight = document.querySelector('#quota-right');
  const setOpen = open => {
    island.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  const setButtonActive = mode => {
    document.querySelectorAll('[data-mode]').forEach(b => {
      const isMatch = b.dataset.mode === mode;
      b.classList.toggle('active', isMatch);
      b.setAttribute('aria-pressed', String(isMatch));
    });
  };
  const sideContents = {
    quota: [
      '<b>Codex · 5h</b><span>12月1日, 14:00</span><span>2小时30分钟</span><strong>80%</strong>',
      '<b>week</b><span>12月5日, 09:00</span><span>3天</span><strong>45%</strong>'
    ],
    antigravity: [
      '<b>AG · Gemini</b><span>实时配额</span><span>2小时45分钟</span><strong class="ok">92%</strong>',
      '<b>Claude &amp; GPT</b><span>自动池</span><span>5小时10分钟</span><strong>76%</strong>'
    ],
    hud: [
      '<b>电池供电</b><span>放电提醒</span><strong class="ok">80%</strong>',
      '<b>AirPods Pro</b><span>已连接</span><strong class="ok">92%</strong>'
    ]
  };
  let currentMode = 'quota';
  const applyMode = mode => {
    currentMode = mode;
    setButtonActive(mode);
    const notices = {
      solar: ['立春', '农历腊月十七'],
      birthday: ['王小明', '🎂 30岁生日'],
      holiday: ['劳动节', '5月1日']
    };
    const isCalendar = Boolean(notices[mode]);
    const isShelf = mode === 'attached' || mode === 'floating';
    island.classList.toggle('shelf', isShelf);
    island.classList.toggle('floating', mode === 'floating');
    island.classList.toggle('calendar', isCalendar);
    island.classList.toggle('hud', mode === 'hud');
    if (sideContents[mode] && qLeft && qRight) {
      qLeft.innerHTML = sideContents[mode][0];
      qRight.innerHTML = sideContents[mode][1];
    }
    if (isCalendar) {
      document.querySelector('.calendar-left').textContent = notices[mode][0];
      document.querySelector('.calendar-right').textContent = notices[mode][1];
    }
    setOpen(true);
  };
  trigger.addEventListener('click', () => setOpen(!island.classList.contains('open')));
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => applyMode(button.dataset.mode));
  });
  let lastWheelAt = 0;
  island.addEventListener('wheel', event => {
    if (currentMode !== 'quota' && currentMode !== 'antigravity') return;
    if (Math.abs(event.deltaY) < 4 && Math.abs(event.deltaX) < 4) return;
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelAt < 260) return;
    lastWheelAt = now;
    applyMode(currentMode === 'quota' ? 'antigravity' : 'quota');
  }, { passive: false });
}

const list = document.querySelector('#pop-list');
if (list) {
  const items = [
    { text: '灵感记录', kind: '文本', favorite: true },
    { text: '今天的待办事项', kind: '文本', favorite: false },
    { text: '项目资料', kind: '文件', favorite: false }
  ];
  const tools = [
    {
      name: '磁盘空间分析',
      desc: '旭日图扫描空间分布 · 收集器拖拽清理与撤销',
      hint: '支持扫描指定磁盘或文件夹<br>拖拽大文件至收集器，安全移入废纸篓并支持撤销'
    },
    {
      name: 'Markdown / TXT 阅读器',
      desc: '大纲导航 · 源码编辑自动保存 · 导出 PDF / HTML',
      hint: '支持多窗口打开 .md 与 .txt 文件<br>可随时切换阅读与源码编辑模式，并导出 PDF / HTML'
    }
  ];
  let tab = 'history';
  const searchWrap = document.querySelector('.pop-search');
  const search = document.querySelector('#pop-search');
  const filter = document.querySelector('#pop-filter');
  const popHint = document.querySelector('#pop-hint');
  function render() {
    list.replaceChildren();
    if (tab === 'tools') {
      if (searchWrap) searchWrap.classList.add('is-hidden');
      const wrap = document.createElement('div');
      wrap.className = 'pop-tools';
      tools.forEach(tool => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'pop-tool-card';
        const title = document.createElement('strong');
        title.textContent = tool.name;
        const sub = document.createElement('small');
        sub.textContent = tool.desc;
        card.append(title, sub);
        card.addEventListener('click', () => {
          wrap.querySelectorAll('.pop-tool-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          if (popHint) popHint.innerHTML = tool.hint;
        });
        wrap.append(card);
      });
      list.append(wrap);
      document.querySelector('#pop-count').textContent = `共 ${tools.length} 项工具`;
      return;
    }
    if (searchWrap) searchWrap.classList.remove('is-hidden');
    const shown = items.filter(i =>
      (tab === 'history' || i.favorite) &&
      (filter.value === '全部' || i.kind === filter.value) &&
      i.text.includes(search.value.trim())
    );
    if (!shown.length) {
      const empty = document.createElement('p');
      empty.className = 'pop-empty';
      empty.textContent = '没有匹配的记录';
      list.append(empty);
    }
    shown.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'pop-row';
      const number = document.createElement('span');
      number.className = 'pop-number';
      number.textContent = index + 1;
      const label = document.createElement('span');
      label.className = 'pop-name';
      label.textContent = (item.kind === '文件' ? '▰  ' : '') + item.text;
      const star = document.createElement('button');
      star.className = 'pop-star';
      star.textContent = item.favorite ? '★' : '☆';
      star.setAttribute('aria-label', (item.favorite ? '取消收藏' : '收藏') + item.text);
      star.addEventListener('click', () => {
        item.favorite = !item.favorite;
        render();
      });
      row.append(number, label, star);
      list.append(row);
    });
    document.querySelector('#fav-count').textContent = items.filter(i => i.favorite).length;
    document.querySelector('#pop-count').textContent = `共 ${shown.length} 项`;
  }
  document.querySelectorAll('[data-pop-tab]').forEach(button => {
    button.addEventListener('click', () => {
      tab = button.dataset.popTab;
      document.querySelectorAll('[data-pop-tab]').forEach(b => {
        b.classList.toggle('selected', b === button);
        b.setAttribute('aria-pressed', String(b === button));
      });
      if (popHint) {
        popHint.innerHTML = tab === 'tools'
          ? '点击工具卡片查看功能说明<br>已集成于菜单栏弹窗「工具」标签页'
          : '点击 ☆ 收藏示例内容<br>切换「工具」查看内置效率工具';
      }
      render();
    });
  });
  search.addEventListener('input', render);
  filter.addEventListener('change', render);
  render();
}

const captureTools = {
  select: ['移动选区', '调整截图范围，拖动边界或控制点', '选区位置 · 选区大小'],
  edit: ['编辑标注', '选择并调整已有标注', '选择 · 移动 · 调整'],
  pen: ['画笔', '自由绘制，圈出画面中的重点', '颜色 · 笔画粗细'],
  rectangle: ['矩形', '框选重点区域', '颜色 · 粗细 · 填充 · 线型 · 圆角 · 透明度'],
  line: ['直线', '添加简洁的线条标记', '颜色 · 笔画粗细'],
  arrow: ['箭头', '指向需要关注的位置', '颜色 · 粗细 · 标准或尖尾样式'],
  ruler: ['尺子', '辅助测量和标记长度与角度', '长度 · 角度 · 线型'],
  text: ['文字', '在截图中添加说明', '颜色 · 字号'],
  mosaic: ['马赛克', '遮挡不希望显示的局部内容', '颗粒大小'],
  step: ['步骤', '为操作流程添加顺序标记', '颜色 · 字号'],
  ocr: ['识别文字', '提取截图中的文字，供选择和复制', '文字识别 · 选择 · 复制'],
  translate: ['翻译', '识别并翻译截图中的文字，支持原位覆盖或侧边面板', '原位覆盖 · 侧边面板 · AI 翻译'],
  ask: ['AI 问答', '针对当前截图内容直接向 AI 发起多轮提问', '多轮对话 · 自定义 API / ChatGPT 订阅'],
  recording: ['录屏', '在截图流程中直接切换至屏幕录制', '区域录制 · 快捷入口']
};

document.querySelectorAll('[data-capture-tool]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-capture-tool]').forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    const [title, description, properties] = captureTools[button.dataset.captureTool];
    document.querySelector('#capture-tool-title').textContent = title;
    document.querySelector('#capture-explanation').textContent = description;
    document.querySelector('#capture-properties').textContent = properties;
  });
});

// Compact line icons follow the app's toolbar order and proportions.
const captureIconPaths = {
  select: '<path d="M4 10V4h6M4 4l6 6M20 14v6h-6m6 0-6-6"/>',
  edit: '<path d="M12 3a9 9 0 0 0-6.2 15.5M12 6a6 6 0 0 0-4 10.5M12 9a3 3 0 0 0-1.5 5.6"/><path d="m12 11 2 9 2-3 3 2-4-7z"/>',
  pen: '<path d="m7 20 3-13 2-4 2 4 3 13M9 14h6M12 3v3"/>',
  rectangle: '<rect x="3" y="5" width="18" height="14" rx="2"/>',
  line: '<path d="M5 19 19 5"/>',
  arrow: '<path d="M5 19 19 5M10 5h9v9"/>',
  ruler: '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 8v4m3-4v3m3-3v4m3-4v3m3-3v4"/>',
  text: '<path d="M5 5h14M12 5v14M9 19h6"/>',
  mosaic: '<g fill="currentColor" stroke="none"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/><rect x="17" y="3" width="4" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/><rect x="17" y="10" width="4" height="5" rx="1"/><rect x="3" y="17" width="5" height="4" rx="1"/><rect x="10" y="17" width="5" height="4" rx="1"/><rect x="17" y="17" width="4" height="4" rx="1"/></g>',
  step: '<circle cx="12" cy="12" r="9"/><path d="M9 8 7.5 16M14 8l-1.5 8M6.5 11h9M6 14h9"/>',
  ocr: '<path d="M8 3H6a3 3 0 0 0-3 3v2m13-5h2a3 3 0 0 1 3 3v2M3 16v2a3 3 0 0 0 3 3h2m13-5v2a3 3 0 0 1-3 3h-2M7 9h10M7 12h10M7 15h7"/>',
  translate: '<path d="M3 4h11v10H9l-3 3v-3H3zM6 7h5M8.5 5.5v1.5m-2 1c1 2 2 3 4 4m0-4c-1 2-2 3-4 4M14 9h7v9h-2v3l-3-3h-2M16 13h4m-2-2-1.5 5m1.5-5 1.5 5"/>',
  ask: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  recording: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>',
  undo: '<path d="M9 7 4 12l5 5M4 12h11a5 5 0 0 1 5 5"/>',
  redo: '<path d="m15 7 5 5-5 5m5-5H9a5 5 0 0 0-5 5"/>',
  more: '<circle cx="10" cy="12" r="7"/><g fill="currentColor" stroke="none"><circle cx="7" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="13" cy="12" r="1"/></g><path d="m19 11 2 2 2-2"/>',
  save: '<path d="M12 3v11m-4-4 4 4 4-4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
  copy: '<rect x="6" y="5" width="12" height="15" rx="2"/><path d="M9 3h9l3 3v12M13 5v4h5"/>',
  cancel: '<path d="M5 5l14 14M19 5 5 19"/>',
  done: '<path d="m4 12 5 6L20 5"/>'
};

const captureToolbar = document.querySelector('.capture-toolbar');
if (captureToolbar) {
  const makeIcon = key => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${captureIconPaths[key]}</svg>`;
  captureToolbar.querySelectorAll('[data-capture-tool]').forEach(element => {
    element.innerHTML = makeIcon(element.dataset.captureTool);
  });
  const actionKeys = ['undo', 'redo', 'more', 'save', 'copy', 'cancel', 'done'];
  captureToolbar.querySelectorAll('.capture-action').forEach((element, index) => {
    element.innerHTML = makeIcon(actionKeys[index]);
  });
  const divider = captureToolbar.querySelector('.capture-divider');
  if (divider) divider.remove();
  const tooltip = document.createElement('div');
  tooltip.className = 'capture-tooltip';
  tooltip.setAttribute('aria-hidden', 'true');
  document.body.append(tooltip);
  function showTip(element) {
    const r = element.getBoundingClientRect();
    tooltip.textContent = element.getAttribute('aria-label') || element.title;
    tooltip.style.left = `${r.left + r.width / 2}px`;
    tooltip.style.top = `${r.top - 8}px`;
    tooltip.classList.add('visible');
  }
  captureToolbar.querySelectorAll('[data-capture-tool], .capture-action').forEach(element => {
    const label = element.getAttribute('aria-label') || element.title;
    element.dataset.tip = label;
    element.removeAttribute('title');
    element.addEventListener('pointerenter', () => {
      element.title = element.dataset.tip;
      showTip(element);
      element.removeAttribute('title');
    });
    element.addEventListener('pointerleave', () => tooltip.classList.remove('visible'));
    if (element.matches('button')) {
      element.addEventListener('focus', () => showTip(element));
      element.addEventListener('blur', () => tooltip.classList.remove('visible'));
    }
  });
  document.querySelector('.capture-toolbar-wrap').addEventListener('scroll', () => tooltip.classList.remove('visible'));
}

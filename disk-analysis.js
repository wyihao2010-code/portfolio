(() => {
  const svg = document.getElementById('disk-sunburst');
  if (!svg) return;

  // 演示用目录树数据（单位：GB，演示用途，不读取真实磁盘）
  const VOLUMES = {
    macintosh: {
      id: 'macintosh',
      name: 'Macintosh HD',
      isDirectory: true,
      children: [
        {
          id: 'macintosh/users',
          name: '用户（Users）',
          isDirectory: true,
          children: [
            {
              id: 'macintosh/users/dev',
              name: '开发与构建缓存',
              isDirectory: true,
              children: [
                {
                  id: 'macintosh/users/dev/derived',
                  name: 'Xcode DerivedData',
                  isDirectory: true,
                  children: [
                    { id: 'macintosh/users/dev/derived/clipstash', name: 'ClipStash-BuildCache', isDirectory: false, gb: 18.4 },
                    { id: 'macintosh/users/dev/derived/voicememory', name: 'VoiceMemory-Index', isDirectory: false, gb: 14.2 },
                    { id: 'macintosh/users/dev/derived/simulators', name: 'iOS 模拟器运行时', isDirectory: false, gb: 12.6 }
                  ]
                },
                {
                  id: 'macintosh/users/dev/models',
                  name: '本地 AI 模型缓存',
                  isDirectory: true,
                  children: [
                    { id: 'macintosh/users/dev/models/whisper', name: 'Whisper-Large-v3.bin', isDirectory: false, gb: 16.8 },
                    { id: 'macintosh/users/dev/models/embeddings', name: 'Embedding-Weights.gguf', isDirectory: false, gb: 11.4 }
                  ]
                },
                { id: 'macintosh/users/dev/npm', name: 'node_modules 与包缓存', isDirectory: false, gb: 15.2 }
              ]
            },
            {
              id: 'macintosh/users/media',
              name: '影片与素材库',
              isDirectory: true,
              children: [
                {
                  id: 'macintosh/users/media/recordings',
                  name: '屏幕录制与剪辑工程',
                  isDirectory: true,
                  children: [
                    { id: 'macintosh/users/media/recordings/demo4k', name: 'ClipStash_演示_4K.mov', isDirectory: false, gb: 24.5 },
                    { id: 'macintosh/users/media/recordings/raw', name: '未压缩 ProRes 素材.mov', isDirectory: false, gb: 19.3 }
                  ]
                },
                { id: 'macintosh/users/media/photos', name: '照片图库本地副本', isDirectory: false, gb: 26.8 },
                { id: 'macintosh/users/media/exports', name: '旧版导出成片.mp4', isDirectory: false, gb: 9.4 }
              ]
            },
            {
              id: 'macintosh/users/downloads',
              name: '下载（Downloads）',
              isDirectory: true,
              children: [
                { id: 'macintosh/users/downloads/dmg', name: '历史安装包集合.dmg', isDirectory: false, gb: 14.6 },
                { id: 'macintosh/users/downloads/archive', name: '设计素材归档.zip', isDirectory: false, gb: 11.8 },
                { id: 'macintosh/users/downloads/pdf', name: '行业研报与 PDF', isDirectory: false, gb: 5.2 }
              ]
            }
          ]
        },
        {
          id: 'macintosh/apps',
          name: '应用程序',
          isDirectory: true,
          children: [
            { id: 'macintosh/apps/xcode', name: 'Xcode.app', isDirectory: false, gb: 34.2 },
            { id: 'macintosh/apps/creative', name: '剪辑与设计套件', isDirectory: false, gb: 22.4 },
            { id: 'macintosh/apps/tools', name: '日常效率工具', isDirectory: false, gb: 11.8 }
          ]
        },
        {
          id: 'macintosh/library',
          name: '资源库与容器',
          isDirectory: true,
          children: [
            { id: 'macintosh/library/docker', name: '容器镜像卷.raw', isDirectory: false, gb: 28.6 },
            { id: 'macintosh/library/caches', name: '应用缓存与日志', isDirectory: false, gb: 15.4 },
            { id: 'macintosh/library/audio', name: '音频插件与音源', isDirectory: false, gb: 9.2 }
          ]
        },
        {
          id: 'macintosh/system',
          name: '系统数据与快照',
          isDirectory: true,
          children: [
            { id: 'macintosh/system/snapshots', name: '本地时间机器快照', isDirectory: false, gb: 16.4 },
            { id: 'macintosh/system/macos', name: 'macOS 系统镜像', isDirectory: false, gb: 10.4 }
          ]
        }
      ]
    },
    workspace: {
      id: 'workspace',
      name: '项目工作盘',
      isDirectory: true,
      children: [
        {
          id: 'workspace/video',
          name: '视频与动效工程',
          isDirectory: true,
          children: [
            {
              id: 'workspace/video/remotion',
              name: 'Remotion 渲染缓存',
              isDirectory: true,
              children: [
                { id: 'workspace/video/remotion/frames', name: '中间帧序列缓存', isDirectory: false, gb: 22.8 },
                { id: 'workspace/video/remotion/renders', name: '历史导出版本.mp4', isDirectory: false, gb: 16.4 }
              ]
            },
            { id: 'workspace/video/broll', name: '4K 空镜与音效库', isDirectory: false, gb: 28.2 }
          ]
        },
        {
          id: 'workspace/datasets',
          name: '研究语料与模型',
          isDirectory: true,
          children: [
            { id: 'workspace/datasets/audio', name: '会议语音测试样本', isDirectory: false, gb: 24.6 },
            { id: 'workspace/datasets/checkpoints', name: '实验模型权重归档', isDirectory: false, gb: 31.4 },
            { id: 'workspace/datasets/logs', name: '评测日志与快照', isDirectory: false, gb: 8.6 }
          ]
        },
        {
          id: 'workspace/backups',
          name: '阶段归档与备份',
          isDirectory: true,
          children: [
            { id: 'workspace/backups/q3', name: '2026-Q3 项目全量归档.tar', isDirectory: false, gb: 26.5 },
            { id: 'workspace/backups/assets', name: '旧版设计稿与导出', isDirectory: false, gb: 14.3 }
          ]
        },
        {
          id: 'workspace/temp',
          name: '临时导出与草稿',
          isDirectory: true,
          children: [
            { id: 'workspace/temp/preview', name: '高分辨率预览图包', isDirectory: false, gb: 8.4 },
            { id: 'workspace/temp/scratch', name: '待清理临时文件', isDirectory: false, gb: 5.2 }
          ]
        }
      ]
    }
  };

  // 严格还原 DiskColorMath（DiskAnalysisView.swift）350° 高饱和光谱算法
  const SPECTRUM_L = [64, 73, 70, 72, 65, 64, 64];
  const SPECTRUM_S = [85, 98, 95, 95, 91, 92, 85];
  const RING_BOUNDS = [0, 0.34, 0.54, 0.72, 0.87, 0.99];

  function colorFromStyle(style, lightnessDelta = 0) {
    if (style.isGray) {
      const lift = Math.min(Math.max(style.depth - 1, 0), 6) * 2.2;
      const l = Math.min(62, 32 + lift + lightnessDelta);
      return `hsl(220 7% ${l.toFixed(1)}%)`;
    }
    const h = ((style.hue % 360) + 360) % 360;
    const idx = Math.min(Math.floor(h / 60), 5);
    const t = (h - idx * 60) / 60;
    const baseL = SPECTRUM_L[idx] + (SPECTRUM_L[idx + 1] - SPECTRUM_L[idx]) * t;
    const sat = SPECTRUM_S[idx] + (SPECTRUM_S[idx + 1] - SPECTRUM_S[idx]) * t;
    const depthLift = Math.min(Math.max(style.depth - 1, 0), 6) * 1.8;
    const finalL = Math.min(82, baseL + depthLift + lightnessDelta);
    return `hsl(${h.toFixed(1)} ${sat.toFixed(1)}% ${finalL.toFixed(1)}%)`;
  }

  function rawSize(node) {
    if (!node.isDirectory) return node.gb || 0;
    return (node.children || []).reduce((sum, child) => sum + rawSize(child), 0);
  }

  function buildStyleMap(root) {
    const map = new Map();
    map.set(root.id, { depth: 0, hue: 36, isGray: false });
    function walk(node, depth, start, end) {
      const total = rawSize(node);
      let cursor = start;
      const span = end - start;
      const sorted = [...(node.children || [])].sort((a, b) => rawSize(b) - rawSize(a));
      for (const child of sorted) {
        const size = rawSize(child);
        const fraction = total > 0 ? Math.min(1, size / total) : 0;
        const childEnd = Math.min(end, cursor + span * fraction);
        const childHue = (cursor + childEnd) / 2;
        const isGray = !child.isDirectory;
        map.set(child.id, { depth: depth + 1, hue: childHue, isGray });
        if (child.isDirectory) {
          walk(child, depth + 1, cursor, childEnd);
        }
        cursor = childEnd;
      }
    }
    walk(root, 0, 0, 350);
    return map;
  }

  function formatGBParts(gb) {
    if (gb < 1) {
      return { num: Math.round(gb * 1024).toString(), unit: 'MB' };
    }
    return { num: gb.toFixed(1), unit: 'GB' };
  }

  function formatGB(gb) {
    const p = formatGBParts(gb);
    return `${p.num} ${p.unit}`;
  }

  // DOM 引用
  const breadcrumbsEl = document.getElementById('disk-breadcrumbs');
  const centerBtn = document.getElementById('sunburst-center');
  const centerBackEl = document.getElementById('center-back');
  const centerNameEl = document.getElementById('center-name');
  const centerSizeEl = document.getElementById('center-size');
  const centerMetaEl = document.getElementById('center-meta');
  const listTitleEl = document.getElementById('list-title');
  const listSummaryEl = document.getElementById('list-summary');
  const listEl = document.getElementById('disk-list');
  const noticeEl = document.getElementById('disk-notice');
  const undoBtn = document.getElementById('disk-undo-btn');
  const resetBtn = document.getElementById('disk-reset-btn');
  const collectorEl = document.getElementById('disk-collector');
  const collectorDrawerEl = document.getElementById('collector-drawer');
  const collectorDrawerCountEl = document.getElementById('collector-drawer-count');
  const collectorItemsEl = document.getElementById('collector-items');
  const collectorToggleEl = document.getElementById('collector-toggle');
  const collectorSummaryEl = document.getElementById('collector-summary');
  const collectorTrashBtn = document.getElementById('collector-trash-btn');
  const collectorClearBtn = document.getElementById('collector-clear-btn');

  // 应用状态
  let volumeKey = 'macintosh';
  let styleMap = buildStyleMap(VOLUMES[volumeKey]);
  let path = [VOLUMES[volumeKey]];
  let hoveredId = null;
  let collected = new Map(); // id -> node
  let trashedIds = new Set();
  let undoBatches = [];
  let collectorExpanded = false;
  let noticeTimer = null;

  function showNotice(text) {
    noticeEl.textContent = text;
    if (noticeTimer) clearTimeout(noticeTimer);
    if (text) {
      noticeTimer = setTimeout(() => {
        noticeEl.textContent = '';
      }, 3600);
    }
  }

  function isExcluded(id, includeCollected = true) {
    if (trashedIds.has(id)) return true;
    if (includeCollected && collected.has(id)) return true;
    return false;
  }

  function activeSize(node, includeCollected = true) {
    if (isExcluded(node.id, includeCollected)) return 0;
    if (!node.isDirectory) return node.gb || 0;
    return (node.children || []).reduce((sum, child) => sum + activeSize(child, includeCollected), 0);
  }

  function visibleChildren(node) {
    return (node.children || [])
      .filter(child => !isExcluded(child.id, true) && activeSize(child, true) > 0)
      .sort((a, b) => activeSize(b, true) - activeSize(a, true));
  }

  function findNodeById(root, id) {
    if (root.id === id) return root;
    if (!root.children) return null;
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
    return null;
  }

  function findPathToId(root, targetId, acc = []) {
    const next = [...acc, root];
    if (root.id === targetId) return next;
    if (!root.children) return null;
    for (const child of root.children) {
      const found = findPathToId(child, targetId, next);
      if (found) return found;
    }
    return null;
  }

  function currentNode() {
    return path[path.length - 1];
  }

  function ensureValidCurrentPath() {
    while (path.length > 1 && activeSize(currentNode(), true) <= 0) {
      path.pop();
    }
  }

  function polar(cx, cy, r, angleRad) {
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad)
    };
  }

  function annularPath(cx, cy, rInner, rOuter, startAngle, endAngle) {
    const span = endAngle - startAngle;
    // 处理接近整圆的单个目录扇区
    const clampedEnd = span >= Math.PI * 1.999 ? startAngle + Math.PI * 1.998 : endAngle;
    const largeArc = clampedEnd - startAngle > Math.PI ? 1 : 0;
    const p1 = polar(cx, cy, rOuter, startAngle);
    const p2 = polar(cx, cy, rOuter, clampedEnd);
    const p3 = polar(cx, cy, rInner, clampedEnd);
    const p4 = polar(cx, cy, rInner, startAngle);
    return [
      `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
      `A ${rOuter.toFixed(2)} ${rOuter.toFixed(2)} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
      `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
      `A ${rInner.toFixed(2)} ${rInner.toFixed(2)} 0 ${largeArc} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
      'Z'
    ].join(' ');
  }

  function updateCenter(nodeOverride) {
    const cur = currentNode();
    const target = nodeOverride || cur;
    const size = activeSize(target, true);
    const parts = formatGBParts(size);
    const canBack = path.length > 1 && !nodeOverride;

    centerBtn.classList.toggle('can-back', path.length > 1);
    centerBackEl.textContent = path.length > 1 ? '← 返回上级' : '根目录';
    centerNameEl.textContent = target.name;
    centerSizeEl.innerHTML = `<b>${parts.num}</b><small>${parts.unit}</small>`;

    if (nodeOverride && nodeOverride.id !== cur.id) {
      const parentSize = activeSize(cur, true);
      const pct = parentSize > 0 ? Math.round((size / parentSize) * 100) : 0;
      centerMetaEl.textContent = nodeOverride.isDirectory
        ? `占比 ${pct}% · 点击下钻`
        : `占比 ${pct}% · 叶子文件`;
    } else {
      const count = visibleChildren(cur).length;
      centerMetaEl.textContent = count > 0
        ? `${count} 个可见项目`
        : (canBack ? '点击返回上级' : '所有演示项已移入收集器');
    }
  }

  function setHover(id) {
    hoveredId = id;
    svg.classList.toggle('has-hover', Boolean(id));
    svg.querySelectorAll('.sunburst-sector').forEach(el => {
      const sid = el.dataset.id;
      const isActive = sid === id;
      const isRelated = Boolean(id) && (sid.startsWith(id + '/') || id.startsWith(sid + '/'));
      el.classList.toggle('is-active', isActive);
      el.classList.toggle('is-related', isRelated);
    });
    listEl.querySelectorAll('.disk-row').forEach(row => {
      const rid = row.dataset.id;
      const match = Boolean(id) && (rid === id || id.startsWith(rid + '/'));
      row.classList.toggle('is-active', match);
    });
    if (id) {
      const node = findNodeById(VOLUMES[volumeKey], id);
      updateCenter(node);
    } else {
      updateCenter(null);
    }
  }

  function bounceNode(id) {
    const sector = svg.querySelector(`.sunburst-sector[data-id="${CSS.escape(id)}"]`);
    if (sector) {
      sector.classList.remove('is-bouncing');
      void sector.offsetWidth;
      sector.classList.add('is-bouncing');
    }
    const row = listEl.querySelector(`.disk-row[data-id="${CSS.escape(id)}"]`);
    if (row) {
      row.classList.remove('is-bouncing');
      void row.offsetWidth;
      row.classList.add('is-bouncing');
      setTimeout(() => row.classList.remove('is-bouncing'), 220);
    }
    showNotice('叶子文件无法继续下钻，可拖入或点击 + 加入收集器');
  }

  function drillInto(node) {
    if (!node.isDirectory) {
      bounceNode(node.id);
      return;
    }
    const nextPath = findPathToId(VOLUMES[volumeKey], node.id);
    if (nextPath) {
      path = nextPath;
      hoveredId = null;
      renderAll();
    }
  }

  function collectNode(node) {
    if (node.id === VOLUMES[volumeKey].id || trashedIds.has(node.id) || collected.has(node.id)) return;
    // 如果新收集项包含已有子项，自动去重保留父级
    for (const existingId of Array.from(collected.keys())) {
      if (existingId.startsWith(node.id + '/')) {
        collected.delete(existingId);
      }
    }
    collected.set(node.id, node);
    hoveredId = null;
    ensureValidCurrentPath();
    showNotice(`已加入收集器：${node.name}`);
    renderAll();
  }

  function removeCollected(id) {
    collected.delete(id);
    if (collected.size === 0) collectorExpanded = false;
    renderAll();
  }

  function renderBreadcrumbs() {
    breadcrumbsEl.replaceChildren();
    path.forEach((node, index) => {
      if (index > 0) {
        const sep = document.createElement('span');
        sep.className = 'crumb-sep';
        sep.textContent = '›';
        sep.setAttribute('aria-hidden', 'true');
        breadcrumbsEl.append(sep);
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'crumb-btn' + (index === path.length - 1 ? ' current' : '');
      const style = styleMap.get(node.id) || { depth: 0, hue: 38, isGray: false };
      const dot = document.createElement('span');
      dot.className = 'crumb-dot';
      dot.style.background = index === 0 ? '#d2ae74' : colorFromStyle(style);
      btn.append(dot, document.createTextNode(node.name));
      if (index < path.length - 1) {
        btn.addEventListener('click', () => {
          path = path.slice(0, index + 1);
          hoveredId = null;
          renderAll();
        });
      }
      breadcrumbsEl.append(btn);
    });
  }

  function renderSunburst() {
    svg.replaceChildren();
    svg.classList.remove('has-hover');
    const cur = currentNode();
    const total = activeSize(cur, true);
    const cx = 280;
    const cy = 280;
    const maxR = 256;

    if (total <= 0) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', String(cx));
      ring.setAttribute('cy', String(cy));
      ring.setAttribute('r', '150');
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', 'rgba(255,255,255,0.12)');
      ring.setAttribute('stroke-dasharray', '6 6');
      svg.append(ring);
      return;
    }

    const ns = 'http://www.w3.org/2000/svg';
    const maxDepth = 4;

    function renderRing(node, depth, startAngle, endAngle) {
      if (depth > maxDepth) return;
      const children = visibleChildren(node);
      if (!children.length) return;
      const nodeTotal = activeSize(node, true);
      if (nodeTotal <= 0) return;

      const rInner = RING_BOUNDS[depth] * maxR + 1.5;
      const rOuter = RING_BOUNDS[depth + 1] * maxR - 1.2;
      let angleCursor = startAngle;

      for (const child of children) {
        const size = activeSize(child, true);
        const span = (endAngle - startAngle) * (size / nodeTotal);
        if (span < 0.014) {
          angleCursor += span;
          continue;
        }
        const a0 = angleCursor;
        const a1 = angleCursor + span;
        const style = styleMap.get(child.id) || { depth, hue: 200, isGray: !child.isDirectory };
        const sector = document.createElementNS(ns, 'path');
        sector.setAttribute('d', annularPath(cx, cy, rInner, rOuter, a0, a1));
        sector.setAttribute('fill', colorFromStyle(style));
        sector.setAttribute('stroke-width', span < 0.05 ? '0.7' : '1.4');
        sector.setAttribute('class', 'sunburst-sector');
        sector.dataset.id = child.id;
        sector.setAttribute('tabindex', '0');
        sector.setAttribute('role', 'button');
        sector.setAttribute('aria-label', `${child.name}，${formatGB(size)}`);

        sector.addEventListener('pointerenter', () => setHover(child.id));
        sector.addEventListener('pointerleave', () => setHover(null));
        sector.addEventListener('focus', () => setHover(child.id));
        sector.addEventListener('blur', () => setHover(null));
        sector.addEventListener('click', () => drillInto(child));
        sector.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drillInto(child);
          }
        });

        // SVG 拖拽到收集器（通过 pointer 辅助兼容）
        sector.setAttribute('draggable', 'true');
        sector.addEventListener('dragstart', e => {
          if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', child.id);
            e.dataTransfer.effectAllowed = 'move';
          }
          collectorEl.classList.add('is-drop-target');
        });
        sector.addEventListener('dragend', () => {
          collectorEl.classList.remove('is-drop-target');
        });

        svg.append(sector);

        if (child.isDirectory && depth < maxDepth) {
          renderRing(child, depth + 1, a0, a1);
        }
        angleCursor = a1;
      }
    }

    renderRing(cur, 1, -Math.PI / 2, Math.PI * 1.5);
  }

  function renderList() {
    const cur = currentNode();
    const children = visibleChildren(cur);
    const total = activeSize(cur, true);

    listTitleEl.textContent = cur.name;
    listSummaryEl.textContent = `共 ${children.length} 项 · ${formatGB(total)}`;
    listEl.replaceChildren();

    if (!children.length) {
      const empty = document.createElement('div');
      empty.className = 'disk-empty-state';
      empty.textContent = '当前目录下已没有剩余展示项，可点击上方「一键撤销」或「重置演示」。';
      listEl.append(empty);
      return;
    }

    const maxChildSize = Math.max(...children.map(c => activeSize(c, true)), 0.1);

    children.forEach(child => {
      const size = activeSize(child, true);
      const ratio = Math.max(4, Math.round((size / maxChildSize) * 100));
      const style = styleMap.get(child.id) || { depth: 1, hue: 200, isGray: !child.isDirectory };
      const color = colorFromStyle(style);

      const row = document.createElement('div');
      row.className = 'disk-row';
      row.dataset.id = child.id;
      row.setAttribute('role', 'listitem');
      row.setAttribute('draggable', 'true');

      const swatch = document.createElement('span');
      swatch.className = 'row-swatch' + (child.isDirectory ? '' : ' is-file');
      swatch.style.background = color;

      const main = document.createElement('div');
      main.className = 'row-main';

      const titleLine = document.createElement('div');
      titleLine.className = 'row-title-line';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'row-name';
      nameSpan.textContent = child.name;
      const kindSpan = document.createElement('span');
      kindSpan.className = 'row-kind';
      kindSpan.textContent = child.isDirectory ? '文件夹 ›' : '文件';
      titleLine.append(nameSpan, kindSpan);

      const meter = document.createElement('div');
      meter.className = 'row-meter';
      const bar = document.createElement('i');
      bar.style.width = `${ratio}%`;
      bar.style.background = color;
      meter.append(bar);
      main.append(titleLine, meter);

      const sizeSpan = document.createElement('span');
      sizeSpan.className = 'row-size';
      sizeSpan.textContent = formatGB(size);

      const collectBtn = document.createElement('button');
      collectBtn.type = 'button';
      collectBtn.className = 'row-collect-btn';
      collectBtn.textContent = '+';
      collectBtn.title = `将「${child.name}」加入收集器`;
      collectBtn.setAttribute('aria-label', `将 ${child.name} 加入收集器`);
      collectBtn.addEventListener('click', e => {
        e.stopPropagation();
        collectNode(child);
      });

      row.addEventListener('pointerenter', () => setHover(child.id));
      row.addEventListener('pointerleave', () => setHover(null));
      row.addEventListener('click', () => drillInto(child));
      row.addEventListener('dragstart', e => {
        if (e.dataTransfer) {
          e.dataTransfer.setData('text/plain', child.id);
          e.dataTransfer.effectAllowed = 'move';
        }
        collectorEl.classList.add('is-drop-target');
      });
      row.addEventListener('dragend', () => {
        collectorEl.classList.remove('is-drop-target');
      });

      row.append(swatch, main, sizeSpan, collectBtn);
      listEl.append(row);
    });
  }

  function renderCollector() {
    const entries = Array.from(collected.values());
    const count = entries.length;
    const totalGB = entries.reduce((sum, node) => sum + activeSize(node, false), 0);

    collectorEl.classList.toggle('has-items', count > 0);
    collectorTrashBtn.disabled = count === 0;
    undoBtn.classList.toggle('is-hidden', undoBatches.length === 0);
    if (undoBatches.length > 0) {
      undoBtn.textContent = `一键撤销 (${undoBatches.length})`;
    }

    if (count === 0) {
      collectorSummaryEl.innerHTML = '<strong>收集器</strong><small>拖拽项目到此处或点击 + 预演清理</small>';
      collectorDrawerEl.hidden = true;
      collectorToggleEl.setAttribute('aria-expanded', 'false');
      return;
    }

    collectorSummaryEl.innerHTML = `<strong>待处理 ${count} 项 · ${formatGB(totalGB)}</strong><small>${collectorExpanded ? '点击收起清单' : '点击展开查看清单'}</small>`;
    collectorDrawerCountEl.textContent = `${count} 项`;
    collectorDrawerEl.hidden = !collectorExpanded;
    collectorToggleEl.setAttribute('aria-expanded', String(collectorExpanded));

    collectorItemsEl.replaceChildren();
    entries.forEach(node => {
      const item = document.createElement('div');
      item.className = 'collector-item';
      const style = styleMap.get(node.id) || { depth: 1, hue: 200, isGray: !node.isDirectory };
      const dot = document.createElement('span');
      dot.className = 'row-swatch' + (node.isDirectory ? '' : ' is-file');
      dot.style.background = colorFromStyle(style);

      const name = document.createElement('span');
      name.className = 'collector-item-name';
      name.textContent = node.name;

      const size = document.createElement('span');
      size.className = 'collector-item-size';
      size.textContent = formatGB(activeSize(node, false));

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'collector-remove-btn';
      removeBtn.textContent = '×';
      removeBtn.setAttribute('aria-label', `移出 ${node.name}`);
      removeBtn.addEventListener('click', () => removeCollected(node.id));

      item.append(dot, name, size, removeBtn);
      collectorItemsEl.append(item);
    });
  }

  function renderAll() {
    renderBreadcrumbs();
    renderSunburst();
    renderList();
    renderCollector();
    updateCenter(null);
  }

  // 事件绑定
  centerBtn.addEventListener('click', () => {
    if (path.length > 1) {
      path.pop();
      hoveredId = null;
      renderAll();
    }
  });

  collectorToggleEl.addEventListener('click', () => {
    if (collected.size === 0) return;
    collectorExpanded = !collectorExpanded;
    renderCollector();
  });

  collectorClearBtn.addEventListener('click', () => {
    collected.clear();
    collectorExpanded = false;
    showNotice('已清空收集器');
    renderAll();
  });

  collectorTrashBtn.addEventListener('click', () => {
    if (collected.size === 0) return;
    const batch = Array.from(collected.keys());
    const released = Array.from(collected.values()).reduce((sum, n) => sum + activeSize(n, false), 0);
    batch.forEach(id => trashedIds.add(id));
    undoBatches.push(batch);
    collected.clear();
    collectorExpanded = false;
    ensureValidCurrentPath();
    showNotice(`已模拟移入废纸篓 ${batch.length} 项（释放 ${formatGB(released)}），可点击「一键撤销」恢复`);
    renderAll();
  });

  undoBtn.addEventListener('click', () => {
    const last = undoBatches.pop();
    if (!last) return;
    last.forEach(id => trashedIds.delete(id));
    showNotice(`已从废纸篓恢复 ${last.length} 项`);
    renderAll();
  });

  function resetVolume(nextKey) {
    volumeKey = nextKey;
    styleMap = buildStyleMap(VOLUMES[volumeKey]);
    path = [VOLUMES[volumeKey]];
    hoveredId = null;
    collected.clear();
    trashedIds.clear();
    undoBatches = [];
    collectorExpanded = false;
    document.querySelectorAll('[data-volume]').forEach(btn => {
      const match = btn.dataset.volume === volumeKey;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', String(match));
    });
    renderAll();
  }

  document.querySelectorAll('[data-volume]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.volume === volumeKey) return;
      resetVolume(btn.dataset.volume);
      showNotice(`已切换至 ${VOLUMES[volumeKey].name} 演示视图`);
    });
  });

  resetBtn.addEventListener('click', () => {
    resetVolume(volumeKey);
    showNotice('已重置演示数据');
  });

  // 收集器拖拽投放区
  collectorEl.addEventListener('dragover', e => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    collectorEl.classList.add('is-drop-target');
  });

  collectorEl.addEventListener('dragleave', () => {
    collectorEl.classList.remove('is-drop-target');
  });

  collectorEl.addEventListener('drop', e => {
    e.preventDefault();
    collectorEl.classList.remove('is-drop-target');
    const id = e.dataTransfer ? e.dataTransfer.getData('text/plain') : '';
    if (!id) return;
    const node = findNodeById(VOLUMES[volumeKey], id);
    if (node) collectNode(node);
  });

  renderAll();
})();

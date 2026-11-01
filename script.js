const share = document.querySelector('#reading-share');
const copy = document.querySelector('#copy-share');
const status = document.querySelector('#copy-status');
copy.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(share.textContent);
    status.textContent = '已复制，可在微信中尝试使用';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(share);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = '请手动复制已选中的分享信息';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// A restrained light response follows the pointer on devices that support hover.
if (window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--y', `${event.clientY - bounds.top}px`);
    });
  });
}

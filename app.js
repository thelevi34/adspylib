const config = window.ADSPYLIB_CONFIG || {};
document.getElementById('year').textContent = new Date().getFullYear();
if (config.priceLabel) document.getElementById('priceText').textContent = config.priceLabel;
let requestMessage = '';
document.querySelectorAll('[data-order]').forEach(button => button.addEventListener('click', () => {
  requestMessage = button.dataset.order === 'trial' ? 'سلام، بغيت نجرب ADSPYLIB لمدة 24 ساعة. ممكن تفاصيل التفعيل؟' : 'سلام، مهتم بنسخة ADSPYLIB Pro. ممكن الثمن ومدة الرخصة وطريقة التفعيل؟';
  if (/^\d{8,15}$/.test(config.whatsapp)) { window.open('https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(requestMessage), '_blank', 'noopener,noreferrer'); return; }
  if (config.email) { window.location.href = 'mailto:' + encodeURIComponent(config.email) + '?subject=ADSPYLIB&body=' + encodeURIComponent(requestMessage); return; }
  document.getElementById('contactMessage').textContent = requestMessage;
  document.getElementById('copyStatus').textContent = '';
  document.getElementById('contactDialog').showModal();
}));
document.querySelectorAll('dialog .close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } }));
document.getElementById('copyMessage').addEventListener('click', async () => { try { await navigator.clipboard.writeText(requestMessage); document.getElementById('copyStatus').textContent = 'تم نسخ الرسالة ✓'; } catch { document.getElementById('copyStatus').textContent = 'يمكنك تحديد رسالة الطلب ونسخها يدوياً.'; } });
document.querySelectorAll('.view-ad').forEach(button => button.addEventListener('click', () => { document.getElementById('creativePreview').replaceChildren(button.closest('.ad').querySelector('.creative').cloneNode(true)); document.getElementById('creativeDialog').showModal(); }));
let timer; let count = 128;
document.getElementById('scan').addEventListener('click', function() {
  if(timer) { clearInterval(timer); timer=null; this.textContent='▶ Resume demo'; document.getElementById('status').textContent='Demo paused'; return; }
  this.textContent='Ⅱ Pause demo'; document.getElementById('status').textContent='Demo scanning…';
  timer=setInterval(()=> { count+=3; document.getElementById('adsCount').innerHTML=count+'<span>↗</span>'; document.getElementById('progress').textContent=count+' illustrative ads · Demo only'; if(count>=158) { clearInterval(timer); timer=null; this.textContent='↻ Restart demo'; document.getElementById('status').textContent='Demo complete'; count=128; } },500);
});

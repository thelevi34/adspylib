const config = window.ADSPYLIB_CONFIG || {};
document.getElementById('year').textContent = new Date().getFullYear();
const phone = /^\d{8,15}$/.test(config.whatsapp || '') ? config.whatsapp : '212679093864';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const message = link.dataset.message || 'سلام، بغيت نشري أداة ADSPYLIB بـ 150 درهم برخصة مدى الحياة. كيفاش نفعّلها؟';
  link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
});
// Keep the supplied image until the real promotional video is ready.
if (typeof config.videoUrl === 'string' && config.videoUrl.trim()) {
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'none';
  video.poster = document.getElementById('promoPoster').getAttribute('src');
  video.src = config.videoUrl.trim();
  video.setAttribute('aria-label', 'فيديو تعريفي بأداة ADSPYLIB');
  document.getElementById('demo').replaceChildren(video);
}
const featureDetails = {
  discovery: {
    title: 'إعلانات المنافسين قدّامك',
    description: 'خلّي البحث ديالك منظم وركّز على إعلانات المنافسين والكرياتيفات اللي كتهمّك.',
    icon: 'icon-search', color: 'blue',
    points: ['اختار المنصة اللي باغي تستكشف فيها إعلانات المنافسين.', 'استكشف الإعلانات وعاين الكرياتيفات باش تجمع أفكار لبحثك.', 'الإعلانات المعروضة ماشي دليل على المبيعات أو الربح.']
  },
  platforms: {
    title: 'ثلاث منصات، أداة وحدة',
    description: 'ADSPYLIB شاملة Meta Ads وTikTok Ads وGoogle Ads باش توسّع البحث ديالك.',
    icon: 'icon-platforms', color: 'green',
    points: ['Meta Ads: استكشف إعلانات المنافسين على منصات Meta.', 'TikTok Ads: اكتشف الإعلانات والكرياتيفات على TikTok.', 'Google Ads: وسّع البحث ديالك لإعلانات Google.']
  },
  control: {
    title: 'تحكّم فالبحث ديالك',
    description: 'سيّر عملية مسح الإعلانات على حساب الوتيرة ديالك من شريط الأداة.',
    icon: 'icon-control', color: 'purple',
    points: ['بدا مسح الإعلانات ملي يكون البحث ديالك واجد.', 'وقف المسح وقت ما بغيتي.', 'تبع التقدم ديال البحث مباشرة من شريط الأداة.']
  }
};
const featureDialog = document.getElementById('featureDialog');
let featureOpener = null;
document.querySelectorAll('[data-feature]').forEach(button => {
  button.addEventListener('click', () => {
    const detail = featureDetails[button.dataset.feature];
    if (!detail) return;
    featureOpener = button;
    document.getElementById('featureDialogTitle').textContent = detail.title;
    document.getElementById('featureDialogDescription').textContent = detail.description;
    const icon = document.getElementById('featureDialogIcon');
    icon.className = 'feature-icon ' + detail.color;
    icon.querySelector('use').setAttribute('href', '#' + detail.icon);
    document.getElementById('featureDialogDetails').replaceChildren(...detail.points.map(point => {
      const item = document.createElement('li');
      item.textContent = point;
      return item;
    }));
    featureDialog.showModal();
    document.documentElement.classList.add('modal-open');
  });
});
featureDialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
  button.addEventListener('click', () => featureDialog.close());
});
featureDialog.addEventListener('click', event => {
  if (event.target !== featureDialog) return;
  const rect = featureDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) featureDialog.close();
});
featureDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('modal-open');
  if (featureOpener) featureOpener.focus({preventScroll: true});
});
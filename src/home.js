import { outfitCases } from './case-data.js'
import { imagePlaceholder, initShell } from './shared.js'

initShell('index.html')

const layoutVariant = new URLSearchParams(window.location.search).get('layout') === 'b' ? 'b' : 'a'
document.body.dataset.homeLayout = layoutVariant

const heroCarousel = document.querySelector('[data-hero-carousel]')
if (heroCarousel) {
  const slides = [...heroCarousel.querySelectorAll('[data-hero-slide]')]
  const dots = [...heroCarousel.querySelectorAll('[data-hero-dot]')]

  const showSlide = (index) => {
    const nextSlide = slides[index]
    if (!nextSlide?.dataset.imageSrc) return

    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index))
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index
      dot.classList.toggle('is-active', isActive)
      dot.setAttribute('aria-pressed', String(isActive))
    })
  }

  dots.forEach((dot, index) => {
    const hasImage = Boolean(slides[index]?.dataset.imageSrc)
    dot.disabled = !hasImage
    dot.addEventListener('click', () => showSlide(index))
  })
}

const isMobileHome = document.body.classList.contains('mobile-home')
const requestedFeaturedVariant = new URLSearchParams(window.location.search).get('featured')
const featuredVariant = !isMobileHome && ['v1', 'v2'].includes(requestedFeaturedVariant)
  ? requestedFeaturedVariant
  : 'current'
document.body.dataset.featuredVariant = featuredVariant

const featuredClosing = document.querySelector('[data-featured-closing]')
if (featuredClosing) featuredClosing.hidden = featuredVariant !== 'v1'

const scenes = [
  { id: 'interview', number: '01', name: '面试', image: 'assets/scenes/interview.png', alt: '白色建筑与极简职业着装场景' },
  { id: 'internship', number: '02', name: '实习第一天', image: isMobileHome ? 'assets/scenes/internship.png' : 'assets/scenes/internship-building.png', alt: '低饱和工作日着装场景' },
  { id: 'commute', number: '03', name: '日常通勤', image: 'assets/scenes/commute.png', alt: '街头咖啡与日常通勤场景' },
  { id: 'date', number: '04', name: '约会', image: 'assets/scenes/date.png', alt: '白裙与柔和光线的约会场景' },
  { id: 'weekend', number: '05', name: '周末出行', image: isMobileHome ? 'assets/scenes/weekend.jpg' : 'assets/scenes/internship.png', alt: '轻松周末出行场景' },
  { id: 'travel', number: '06', name: '旅行', image: 'assets/scenes/travel.png', alt: '行李箱与户外旅行场景' },
]

const sceneCollage = document.querySelector('[data-scene-collage]')
if (sceneCollage) {
  sceneCollage.className = 'scene-rail'
  sceneCollage.setAttribute('aria-label', '场景选择')
  sceneCollage.innerHTML = scenes.map((scene) => `
    <a class="scene-rail-item scene-frame--${scene.id}" href="cases.html?scene=${scene.id}">
      <span class="scene-rail-media"><img src="${scene.image}" alt="${scene.alt}" /></span>
      <span class="scene-rail-caption"><small>${scene.number}</small><strong>${scene.name}</strong></span>
    </a>`).join('')

  let dragStartX = 0
  let dragStartScroll = 0
  let hasDragged = false
  let activePointer = null

  sceneCollage.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    activePointer = event.pointerId
    dragStartX = event.clientX
    dragStartScroll = sceneCollage.scrollLeft
    hasDragged = false
    sceneCollage.classList.add('is-dragging')
  })

  sceneCollage.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointer) return
    const distance = event.clientX - dragStartX
    if (Math.abs(distance) > 5 && !hasDragged) {
      hasDragged = true
      sceneCollage.setPointerCapture(event.pointerId)
    }
    if (!hasDragged) return
    event.preventDefault()
    sceneCollage.scrollLeft = dragStartScroll - distance
  })

  const stopDragging = (event) => {
    if (event.pointerId !== activePointer) return
    sceneCollage.classList.remove('is-dragging')
    if (sceneCollage.hasPointerCapture(event.pointerId)) sceneCollage.releasePointerCapture(event.pointerId)
    activePointer = null
  }

  sceneCollage.addEventListener('pointerup', stopDragging)
  sceneCollage.addEventListener('pointercancel', stopDragging)
  sceneCollage.addEventListener('dragstart', (event) => event.preventDefault())
  sceneCollage.addEventListener('click', (event) => {
    if (!hasDragged) return
    event.preventDefault()
    hasDragged = false
  })

  const sceneScrollArrow = document.querySelector('[data-scene-scroll-arrow]')
  const updateSceneScrollArrow = () => {
    if (!sceneScrollArrow) return
    const isAtEnd = sceneCollage.scrollLeft + sceneCollage.clientWidth >= sceneCollage.scrollWidth - 1
    sceneScrollArrow.classList.toggle('is-hidden', isAtEnd)
    sceneScrollArrow.disabled = isAtEnd
  }

  sceneScrollArrow?.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const firstCard = sceneCollage.querySelector('.scene-rail-item')
    const cardWidth = firstCard?.getBoundingClientRect().width ?? sceneCollage.clientWidth * 0.45
    const gap = Number.parseFloat(getComputedStyle(sceneCollage).columnGap || getComputedStyle(sceneCollage).gap) || 0
    sceneCollage.scrollBy({ left: cardWidth + gap, behavior: 'smooth' })
  })

  sceneCollage.addEventListener('scroll', updateSceneScrollArrow, { passive: true })
  window.addEventListener('resize', updateSceneScrollArrow)
  requestAnimationFrame(updateSceneScrollArrow)
}

const featuredList = document.querySelector('[data-featured-list]')
if (featuredList) {
  const featuredCase = outfitCases.find((item) => item.id === 'date') ?? outfitCases[1]
  const featuredLook = 'assets/featured-date-look.jpg'
  const featuredDetailImages = {
    top: 'assets/cases/details/date-top.png?v=202607202313',
    skirt: 'assets/cases/details/date-skirt.png?v=202607202313',
    shoesBag: 'assets/cases/details/date-shoes-bag.png?v=202607202313',
    accessories: 'assets/cases/details/date-accessories.png?v=202607202313',
  }
  const featuredMain = isMobileHome
    ? imagePlaceholder('约会完整 Look 占位')
    : `<img src="${featuredLook}" alt="白色约会穿搭完整 Look" />`
  const featuredEyebrow = isMobileHome ? '本期 01 / 约会' : 'DATE LOOK'
  const featuredTitle = isMobileHome ? featuredCase.title : '温柔氛围感约会穿搭'
  const featuredSummary = isMobileHome
    ? featuredCase.summary
    : '蕾丝上衣 + 白色半裙，轻盈优雅<br />适合咖啡馆、展览、下午约会等场景'
  const featuredLinkText = isMobileHome ? '查看本期搭配' : '查看完整搭配'
  const featuredTags = isMobileHome || featuredVariant === 'v2'
    ? ''
    : `<div class="featured-tags" aria-label="本期风格标签">
         <span>温柔气质</span>
         <span>通勤约会</span>
         <span>小个子友好</span>
       </div>`
  const featuredInfo = featuredVariant === 'v2'
    ? `<dl class="featured-info" aria-label="本期搭配信息">
         <div><dt>风格</dt><dd>温柔 / 轻法式</dd></div>
         <div><dt>场景</dt><dd>约会 / 咖啡店 / 展览</dd></div>
         <div><dt>适合身高</dt><dd>150—160cm</dd></div>
         <div><dt>整套预算</dt><dd>300—500元</dd></div>
       </dl>`
    : ''
  const featuredDetails = isMobileHome
    ? `<div class="featured-topic-detail" data-image-slot="featured-detail-1"><img class="featured-detail-asset" src="${featuredDetailImages.top}" alt="白色蕾丝上衣细节" /></div>
       <div class="featured-topic-detail" data-image-slot="featured-detail-2"><img class="featured-detail-asset" src="${featuredDetailImages.skirt}" alt="白色缎面半裙细节" /></div>
       <div class="featured-topic-detail" data-image-slot="featured-detail-3"><img class="featured-detail-asset" src="${featuredDetailImages.shoesBag}" alt="酒红色鞋包细节" /></div>
       <div class="featured-topic-detail" data-image-slot="featured-detail-4"><img class="featured-detail-asset" src="${featuredDetailImages.accessories}" alt="金色配饰细节" /></div>`
    : featuredVariant === 'v2'
      ? `<figure class="featured-detail-card"><div class="featured-topic-detail featured-detail--top"><img class="featured-detail-asset" src="${featuredDetailImages.top}" alt="上衣细节" /></div><figcaption>上衣细节</figcaption></figure>
         <figure class="featured-detail-card"><div class="featured-topic-detail featured-detail--skirt"><img class="featured-detail-asset" src="${featuredDetailImages.skirt}" alt="下装细节" /></div><figcaption>下装细节</figcaption></figure>
         <figure class="featured-detail-card"><div class="featured-topic-detail featured-detail--shoes"><img class="featured-detail-asset" src="${featuredDetailImages.shoesBag}" alt="鞋包细节" /></div><figcaption>鞋包细节</figcaption></figure>
         <figure class="featured-detail-card"><div class="featured-topic-detail featured-detail--bag"><img class="featured-detail-asset" src="${featuredDetailImages.accessories}" alt="配饰细节" /></div><figcaption>配饰细节</figcaption></figure>`
      : featuredVariant === 'v1'
        ? `<div class="featured-topic-detail featured-detail--top"><img class="featured-detail-asset" src="${featuredDetailImages.top}" alt="上衣细节" /></div>
           <div class="featured-topic-detail featured-detail--skirt"><img class="featured-detail-asset" src="${featuredDetailImages.skirt}" alt="下装细节" /></div>`
        : `<div class="featured-topic-detail featured-detail--top"><img class="featured-detail-asset" src="${featuredDetailImages.top}" alt="上衣细节" /></div>
           <div class="featured-topic-detail featured-detail--skirt"><img class="featured-detail-asset" src="${featuredDetailImages.skirt}" alt="下装细节" /></div>
           <div class="featured-topic-detail featured-detail--shoes"><img class="featured-detail-asset" src="${featuredDetailImages.shoesBag}" alt="鞋包细节" /></div>
           <div class="featured-topic-detail featured-detail--bag"><img class="featured-detail-asset" src="${featuredDetailImages.accessories}" alt="配饰细节" /></div>`
  featuredList.innerHTML = `
    <article class="featured-topic">
      <div class="featured-topic-main" data-image-slot="featured">${featuredMain}</div>
      <div class="featured-topic-copy">
        <p class="content-status">${featuredEyebrow}</p>
        <h3>${featuredTitle}</h3>
        <p>${featuredSummary}</p>
        ${featuredTags}
        ${featuredInfo}
        <a class="editorial-link" href="cases.html?case=${featuredCase.id}">${featuredLinkText} <span>→</span></a>
      </div>
      <div class="featured-topic-details" aria-label="服装与配饰细节">${featuredDetails}</div>
    </article>`
}

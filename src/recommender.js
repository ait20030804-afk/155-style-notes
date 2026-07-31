import { budgetLabels, sceneLabels, stageLabels, styleLabels } from './case-data.js'
import { getRecommendation } from './recommendation-engine.js'
import { initShell } from './shared.js'

initShell('recommender.html')

const form = document.querySelector('[data-recommendation-form]')
const resultContent = document.querySelector('[data-result-content]')
const selectionSummary = document.querySelector('[data-selection-summary]')
const matchModal = document.querySelector('[data-match-modal]')
const modalDialog = matchModal.querySelector('.match-modal-dialog')
const modalCloseButton = matchModal.querySelector('[data-modal-close]')
const sceneFromUrl = new URLSearchParams(window.location.search).get('scene')
let previousFocus = null
let closeTimer = null

const summaryIcons = {
  stage: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3.5"/><path d="M5.5 20v-2.1A6.5 6.5 0 0 1 12 11.5a6.5 6.5 0 0 1 6.5 6.4V20"/></svg>',
  scene: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  style: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 11 8-8h7l3 3v7l-8 8L3 11Z"/><circle cx="16.5" cy="7.5" r="1"/></svg>',
  budget: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 7c-2.6 1.5-4 4-4 7 0 4 3.1 7 8 7s8-3 8-7c0-3-1.4-5.5-4-7"/><path d="M8 7h8l2-4-4 1-2-2-2 2-4-1 2 4Z"/><path d="M9.5 12h5M12 9.5v7"/></svg>',
}

const scenePreviewData = {
  interview: {
    image: 'assets/cases/interview.jpg',
    reason: '适合需要得体、利落，又不显得过分成熟的面试场景。',
  },
  internship: {
    image: 'assets/cases/internship.jpg',
    reason: '适合实习第一天，在利落感与年轻、自然的状态之间保持平衡。',
  },
  commute: {
    image: 'assets/cases/commute.jpg',
    reason: '适合日常通勤，兼顾舒适度、清爽感和容易执行的搭配节奏。',
  },
  date: {
    image: 'assets/cases/date.jpg',
    title: '温柔氛围感约会穿搭',
    reason: '适合咖啡馆、展览、下午约会等轻松精致场景。',
  },
  weekend: {
    image: 'assets/cases/weekend.jpg',
    reason: '适合周末出行，轻松有层次，也方便较长时间的活动。',
  },
  travel: {
    image: 'assets/cases/travel.jpg',
    reason: '适合旅行和城市漫步，兼顾轻便、舒适与完整造型。',
  },
}

if (sceneFromUrl && ['interview', 'internship', 'commute', 'date', 'weekend', 'travel'].includes(sceneFromUrl)) {
  const sceneInput = form.elements.namedItem('scene')
  for (const input of sceneInput) {
    if (input.value === sceneFromUrl) input.checked = true
  }
}

function renderSelectionSummary() {
  const values = [
    ['stage', stageLabels[getSelectedValue('stage')]],
    ['scene', sceneLabels[getSelectedValue('scene')]],
    ['style', styleLabels[getSelectedValue('style')]],
    ['budget', budgetLabels[getSelectedValue('budget')]],
  ].filter(([, label]) => label)

  selectionSummary.hidden = values.length === 0
  selectionSummary.innerHTML = values.map(([type, label]) => `
    <span class="selection-chip" data-summary-type="${type}">
      ${summaryIcons[type]}
      <span>${label}</span>
    </span>`).join('')
}

function setError(field, message) {
  const output = form.querySelector(`[data-error="${field}"]`)
  if (output) {
    output.textContent = message
    output.hidden = !message
  }
  const control = form.elements.namedItem(field)
  if (control instanceof HTMLElement) control.setAttribute('aria-invalid', message ? 'true' : 'false')
}

function getSelectedValue(name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`)
  return selected?.value ?? ''
}

function validate(values) {
  const errors = {}
  if (!values.stage) errors.stage = '请选择身份阶段。'
  if (!values.scene) errors.scene = '请选择使用场景。'
  if (!values.budget) errors.budget = '请选择本次新增购置预算。'
  if (!values.style) errors.style = '请选择风格偏好。'
  return errors
}

function openMatchModal() {
  if (closeTimer) window.clearTimeout(closeTimer)
  previousFocus = document.activeElement
  matchModal.hidden = false
  document.body.classList.add('match-modal-open')
  requestAnimationFrame(() => {
    matchModal.classList.add('is-open')
    modalCloseButton.focus()
  })
}

function closeMatchModal() {
  matchModal.classList.remove('is-open')
  document.body.classList.remove('match-modal-open')
  closeTimer = window.setTimeout(() => {
    matchModal.hidden = true
    previousFocus?.focus()
  }, 180)
}

matchModal.addEventListener('click', (event) => {
  if (event.target === matchModal || event.target.closest('[data-modal-close], [data-reselect]')) closeMatchModal()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !matchModal.hidden) closeMatchModal()
})

modalDialog.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return
  const focusable = [...modalDialog.querySelectorAll('a[href], button:not([disabled])')]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
})

form.addEventListener('input', (event) => {
  if (event.target.name) setError(event.target.name, '')
  renderSelectionSummary()
})

renderSelectionSummary()

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const values = {
    height: Number(form.elements.height.value),
    stage: getSelectedValue('stage'),
    scene: getSelectedValue('scene'),
    budget: getSelectedValue('budget'),
    style: getSelectedValue('style'),
  }
  const errors = validate(values)

  for (const field of ['stage', 'scene', 'budget', 'style']) setError(field, errors[field] ?? '')

  if (Object.keys(errors).length > 0) {
    const firstError = form.querySelector(`[data-error="${Object.keys(errors)[0]}"]`)
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  const recommendation = getRecommendation(values)
  if (!recommendation) return

  const previewData = scenePreviewData[values.scene]
  const targetParams = new URLSearchParams({
    case: recommendation.outfitCase.id,
    height: String(values.height),
    stage: stageLabels[values.stage],
    scene: sceneLabels[values.scene],
    style: styleLabels[values.style],
    budget: budgetLabels[values.budget],
  })
  const modalTitle = previewData.title ?? recommendation.outfitCase.title
  const previewMarkup = `<img src="${previewData.image}" alt="${modalTitle}预览" />`
  const actionMarkup = `<a class="match-modal-primary" href="cases.html?${targetParams.toString()}">查看完整搭配 <span aria-hidden="true">→</span></a>`

  resultContent.innerHTML = `
    <article class="match-modal-result">
      <div class="match-modal-preview match-modal-preview--${values.scene}">${previewMarkup}</div>
      <div class="match-modal-content">
        <p class="match-modal-eyebrow">MATCHED LOOK / 匹配结果</p>
        <h2 id="match-modal-title">${modalTitle}</h2>
        <p class="match-modal-reason">${previewData.reason}</p>
        <p class="match-modal-conditions">${values.height}cm · ${stageLabels[values.stage]} · ${sceneLabels[values.scene]} · ${styleLabels[values.style]} · ${budgetLabels[values.budget]}</p>
        <div class="match-modal-actions">
          ${actionMarkup}
          <button class="match-modal-secondary" type="button" data-reselect>重新选择</button>
        </div>
      </div>
    </article>`
  openMatchModal()
})

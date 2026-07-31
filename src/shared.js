import { budgetLabels, sceneLabels, stageLabels, styleLabels } from './case-data.js'

const navItems = [
  ['index.html', '首页'],
  ['recommender.html', '穿搭推荐'],
  ['cases.html', '场景穿搭志'],
  ['about.html', '关于'],
]

export function initShell(activePage) {
  const header = document.querySelector('[data-site-header]')
  const footer = document.querySelector('[data-site-footer]')
  const isMobileHome = document.body.classList.contains('mobile-home')
  const homeHref = isMobileHome ? 'mobile.html' : 'index.html'
  const currentPage = isMobileHome && activePage === 'index.html' ? homeHref : activePage
  const visibleNavItems = navItems.map(([href, label]) => [href === 'index.html' ? homeHref : href, label])

  if (header) {
    header.className = 'site-header'
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="${homeHref}" aria-label="155 STYLE NOTES 首页">155 STYLE NOTES</a>
        <nav class="main-nav" aria-label="主导航">
          ${visibleNavItems.map(([href, label]) => `
            <a class="nav-link${currentPage === href ? ' is-active' : ''}" ${currentPage === href ? 'aria-current="page"' : ''} href="${href}">${label}</a>
          `).join('')}
        </nav>
      </div>`
  }

  if (footer) {
    footer.className = 'site-footer'
    footer.innerHTML = `
      <div class="footer-inner">
        <p class="brand">155 STYLE NOTES</p>
        <p>小个子女生的场景穿搭笔记</p>
      </div>`
  }
}

export function imagePlaceholder(label = '图片占位') {
  return `<div class="image-placeholder" role="img" aria-label="${label}，示例内容，待替换"><span>${label}</span><small>示例内容／待替换</small></div>`
}

export function caseDetailMarkup(outfitCase, selectedBudget, selectedStyle) {
  const guidance = selectedBudget ? outfitCase.budgetGuidance[selectedBudget] : null
  return `
    <div class="case-detail">
      <div class="detail-heading">
        <div><p class="content-status">示例内容／待替换</p><h3>${outfitCase.title}</h3></div>
      </div>
      <div class="detail-lead">
        ${imagePlaceholder('完整 Look 主图占位')}
        <dl class="metadata-list">
          <div><dt>适用场景</dt><dd>${sceneLabels[outfitCase.scene]}</dd></div>
          <div><dt>适用身份</dt><dd>${outfitCase.suitableStages.map((stage) => stageLabels[stage]).join('、')}</dd></div>
          <div><dt>风格方向</dt><dd>${styleLabels[selectedStyle] ?? styleLabels[outfitCase.primaryStyle]}</dd></div>
          <div><dt>新增购置预算</dt><dd>${selectedBudget ? budgetLabels[selectedBudget] : '示例内容／待替换'}</dd></div>
        </dl>
      </div>
      <section class="detail-section">
        <h4>核心单品</h4>
        <div class="item-placeholder-grid">
          ${outfitCase.items.map((item) => `
            <div class="item-placeholder">
              ${imagePlaceholder('单品图片占位')}
              <p>${item.category}</p><strong>${item.placeholderName}</strong>
            </div>`).join('')}
        </div>
      </section>
      <div class="detail-columns">
        <section class="detail-section"><h4>搭配与色彩逻辑</h4><p>${outfitCase.summary}</p><p>${outfitCase.colorLogic}</p></section>
        <section class="detail-section"><h4>小个子比例建议</h4><ul>${outfitCase.proportionNotes.map((note) => `<li>${note}</li>`).join('')}</ul></section>
        <section class="detail-section"><h4>场景适配理由</h4><p>${outfitCase.sceneReason}</p></section>
        <section class="detail-section">
          <h4>预算与可替换单品</h4>
          <p>${guidance?.note ?? '示例内容／待替换：正式案例将补充新增购置预算与选品层级。'}</p>
          <p>${guidance?.replacement ?? outfitCase.alternatives[0]}</p>
          <p class="supporting-note">鞋包或基础款可优先使用衣橱已有单品替换。</p>
        </section>
      </div>
    </div>`
}

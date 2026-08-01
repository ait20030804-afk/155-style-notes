
import { budgetLabels, caseById, outfitCases, sceneLabels, stageLabels, styleLabels } from './case-data.js'
import { imagePlaceholder, initShell } from './shared.js'

initShell('cases.html')

const casePagePath = window.location.pathname.endsWith('/cases-v2.html') ? 'cases-v2.html' : 'cases.html'

const caseImagePaths = {
  interview: 'assets/cases/interview.jpg',
  internship: 'assets/cases/internship.jpg',
  commute: 'assets/cases/commute.jpg',
  date: 'assets/cases/date.jpg',
  weekend: 'assets/cases/weekend.jpg',
  travel: 'assets/cases/travel.jpg',
}

const detailItemsByCaseId = {
  interview: [
    {
      name: '深棕西装外套',
      description: '颜色稳，也不会像纯黑那么重。',
      image: 'assets/cases/details/interview-blazer.png',
      alt: '深棕西装外套细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8cIFOaHJuzvj88g?tk=iAz1gG2uh2N',
        },
      ],
    },
    {
      name: '深棕针织上装',
      description: '和外套顺在一起，里面更干净。',
      image: 'assets/cases/details/interview-top.png',
      alt: '深棕针织上装细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82JpZ0Bqw6fBXwg?tk=42uWgG2DqKX',
        },
      ],
    },
    {
      name: '米白高腰阔腿裤',
      description: '米白减轻阔腿裤的量感，裤脚不要堆在鞋面。',
      image: 'assets/cases/details/interview-trousers.png',
      alt: '米白高腰阔腿裤细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82JqtHvxCwAH6Co?tk=E2TEgG2y2nC',
        },
      ],
    },
    {
      name: '深棕鞋包',
      description: '鞋包同色，把深棕从上装延续到脚下。',
      image: 'assets/cases/details/interview-shoes-bag.png',
      alt: '深棕鞋履与托特包细节图',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'bag',
          label: '相似包袋',
          url: 'https://e.tb.cn/h.8Wc89zhW5JO5y4i?tk=ribAgG2CuZw',
          imageUrl: 'assets/cases/products/interview-brown-bag.jpg',
        },
        {
          type: 'shoes',
          label: '相似鞋款',
          url: 'https://e.tb.cn/h.8WcQ1azeNLIc7oc?tk=KKYBgG2z7BG',
          imageUrl: 'assets/cases/products/interview-brown-shoes.jpg',
        },
      ],
    },
  ],
  internship: [
    {
      name: '浅棕色针织衫',
      description: '系在腰间，多一点松弛感。',
      image: 'assets/cases/details/internship-outer.png',
      alt: '浅棕色针织衫细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82W6XDhwQzsHjZt?tk=8udcgtnlvNU',
          imageUrl: '',
        },
      ],
    },
    {
      name: '奶油黄衬衫',
      description: '颜色柔和，穿起来更轻松。',
      image: 'assets/cases/details/internship-inner.png',
      alt: '奶油黄衬衫细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82W67FSFe0N3I3H?tk=gXXtgtnlLyC',
          imageUrl: '',
        },
      ],
    },
    {
      name: '深灰高腰西装裤',
      description: '垂直裤线收住下半身，裤脚保持利落。',
      image: 'assets/cases/details/internship-trousers.png',
      alt: '深灰高腰西装裤细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82WhGI8Qww5oe07?tk=2sG9gtnmcLV',
          imageUrl: '',
        },
      ],
    },
    {
      name: '棕色包袋与黑色尖头鞋',
      description: '用棕色把整套自然连起来。',
      image: 'assets/cases/details/internship-shoes-bag.png',
      alt: '棕色包袋与尖头鞋细节图',
      productLinks: [
        {
          type: 'bag',
          label: '相似包袋',
          url: 'https://e.tb.cn/h.82Wi9zX6Qh4eOix?tk=yGSDgtnNQlh',
          imageUrl: 'assets/cases/products/internship-similar-bag.jpg',
        },
        {
          type: 'shoes',
          label: '相似鞋款',
          url: 'https://e.tb.cn/h.8ceEohonIMc5Inj?tk=PBHLgtnNjT6',
          imageUrl: 'assets/cases/products/internship-similar-shoes.jpg',
        },
      ],
    },
  ],
  commute: [
    {
      name: '白色衬衫',
      description: '版型留一点松量，日常穿不会太拘谨。',
      image: 'assets/cases/details/commute-top.png',
      alt: '白色衬衫上衣细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.82reKCLX5jp72cn?tk=PFXigGd9sdA',
          productName: '白衬衫女正肩轻奢休闲上衣春秋新款内搭纯棉简约工装职业打底衬衣',
        },
      ],
    },
    {
      name: '浅蓝高腰牛仔裤',
      description: '浅蓝降低通勤装的正式感，日常穿也更轻松。',
      image: 'assets/cases/details/commute-bottom.jpg',
      alt: '浅蓝高腰牛仔裤细节图',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8cs5wBWkQ5oGWVB?tk=Dmt8gGdTiRQ',
          productName: 'popchee｜白玉猫眼｜夏季微风蓝阔腿牛仔裤～淡淡的很舒服',
        },
      ],
    },
    {
      name: '棕色鞋包',
      description: '棕色比黑色柔和，和牛仔蓝放在一起很耐看。',
      image: 'assets/cases/details/commute-shoes-bag.jpg',
      alt: '棕色鞋履与托特包细节图',
      productLinks: [
        {
          type: 'bag',
          label: '棕色包袋',
          url: 'https://e.tb.cn/h.8WcBre7Bn1yjyUt?tk=Jhk6gGdkYGj',
          productName: '【三川田】男女同款麂皮绒托特包秋冬复古大容量慵懒松弛感腋下包',
          imageUrl: 'assets/cases/products/commute-brown-bag.jpg',
        },
        {
          type: 'shoes',
          label: '棕色鞋款',
          url: 'https://e.tb.cn/h.8XKcNAX9e5uJ7kF?tk=JMWTgGdiq3r',
          productName: '迪克丝简约美学平底低跟复古小众棕色牛皮拖鞋春秋穆勒鞋慵懒感',
          imageUrl: 'assets/cases/products/commute-brown-shoes.png',
        },
      ],
    },
    {
      name: '金色配饰',
      description: '耳环、戒指和墨镜点到为止，给白衬衫补一点层次。',
      image: 'assets/cases/details/commute-accessories.jpg',
      alt: '太阳镜与金色配饰细节图',
      productLinks: [
        {
          type: 'sunglasses',
          label: '墨镜',
          url: 'https://e.tb.cn/h.82rWsnYfFe87Dzc?tk=wiUSgGdj7lO',
          productName: '英国MAGKISS儿童太阳眼镜男童女童宝宝防紫外线墨镜时尚潮酷遮阳',
          imageUrl: 'assets/cases/products/commute-sunglasses.jpg',
        },
        {
          type: 'earrings',
          label: '金色耳环',
          url: 'https://e.tb.cn/h.8csl6K6ObSDubSm?tk=qIEngGdlwDQ',
          productName: '复古金色港风圈圈耳环女2026新款爆款轻奢高级感耳圈金属耳夹耳饰',
          imageUrl: 'assets/cases/products/commute-gold-earrings.png',
        },
      ],
    },
  ],
  date: [
    {
      name: '白色蕾丝上衣',
      image: 'assets/cases/details/date-top.png?v=202607202313',
      alt: '白色蕾丝上衣细节图',
      description: '方领留出肩颈，蕾丝细节集中在上半身。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8XKTFFPSM6JmWNp?tk=3dvzgGdnVAx',
        },
      ],
    },
    {
      name: '白色缎面半裙',
      image: 'assets/cases/details/date-skirt.png?v=202607202313',
      alt: '白色缎面半裙细节图',
      description: '光泽藏在裙摆里，走动时更有层次。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8XKTFFPSM6JmWNp?tk=3dvzgGdnVAx',
        },
      ],
    },
    {
      name: '酒红色鞋包',
      image: 'assets/cases/details/date-shoes-bag.png?v=202607202313',
      alt: '酒红色肩背包与鞋履细节图',
      description: '深红压住一身白，也让这套多一点情绪。',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'bag',
          label: '相似包袋',
          url: 'https://e.tb.cn/h.82rRyerNqVt0uy5?tk=EGoogGdqvig',
          imageUrl: 'assets/cases/products/date-burgundy-bag.jpg',
        },
        {
          type: 'shoes',
          label: '相似鞋款',
          url: 'https://e.tb.cn/h.8XKSt04Qae8x74l?tk=sSlFgGdLgWf',
          imageUrl: 'assets/cases/products/date-burgundy-shoes.jpg',
        },
      ],
    },
    {
      name: '金色配饰',
      image: 'assets/cases/details/date-accessories.png?v=202607202313',
      alt: '金色项链与耳饰细节图',
      description: '选小体量的款式，贴着皮肤点一下就够。',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'necklace',
          label: '相似项链',
          url: 'https://e.tb.cn/h.82rn6wul0OLl1Pz?tk=HSjqgGdv9ji',
          imageUrl: 'assets/cases/products/date-gold-necklace.png',
        },
        {
          type: 'earrings',
          label: '相似耳环',
          url: 'https://e.tb.cn/h.82rQSlhydLdB6Pe?tk=aHRVgGdruyc',
          imageUrl: 'assets/cases/products/date-gold-earrings.png',
        },
      ],
    },
  ],
  weekend: [
    {
      name: '浅黄色针织外套',
      image: 'assets/cases/details/weekend-outer.png?v=202607202114',
      alt: '浅黄色针织外套细节图',
      description: '轻薄针织带一点透感，柔软，也适合叠穿。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8XKMV0qs1iLllNF?tk=p8lXgGdEyOV',
        },
      ],
    },
    {
      name: '白色吊带上衣',
      image: 'assets/cases/details/weekend-top.png?v=202607202114',
      alt: '白色吊带上衣细节图',
      description: '露出肩颈线条，也让轻薄针织穿起来更舒展。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8csyFtmlzLPwq2w?tk=seTygGdBKhI',
        },
      ],
    },
    {
      name: '白色休闲短裤',
      image: 'assets/cases/details/weekend-bottom.png?v=202607202114',
      alt: '白色休闲短裤细节图',
      description: '裤腿留一点宽松，不贴腿，走动和久坐都更自在。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8csvrji696gkQnR?tk=oLzsgGdDXca',
        },
      ],
    },
    {
      name: '浅棕色鞋包',
      image: 'assets/cases/details/weekend-shoes-bag.png?v=202607202114',
      alt: '浅色鞋履与棕色托特包细节图',
      description: '鞋包用浅棕色收住暖调，小方跟增加一点高度。',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'bag',
          label: '相似包袋',
          url: 'https://e.tb.cn/h.8WX8xQRFV1b5CUK?tk=lamPgGdyycT',
          imageUrl: 'assets/cases/products/weekend-light-brown-bag.jpg',
        },
        {
          type: 'shoes',
          label: '相似鞋款',
          url: 'https://e.tb.cn/h.82rIdu9S3P7lwdI?tk=dYIYgGWZbdD',
          imageUrl: 'assets/cases/products/weekend-light-shoes.png',
        },
      ],
    },
  ],
  travel: [
    {
      name: '白色短袖上衣',
      image: 'assets/cases/details/travel-top.png?v=202607202106',
      alt: '白色短袖上衣细节图',
      description: '短款落在裙腰附近，腰线自然上移。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8XKstiHCmyoXMWN?tk=5HcYgGW0p3s',
        },
      ],
    },
    {
      name: '浅色碎花半裙',
      image: 'assets/cases/details/travel-skirt.png?v=202607202106',
      alt: '浅色碎花半裙细节图',
      description: '裙摆带一点弧度，走动时更轻盈。',
      productLinks: [
        {
          label: '查看相似款',
          url: 'https://e.tb.cn/h.8WXPtIh3lpYu9FR?tk=gdk3gGWZuqb',
        },
      ],
    },
    {
      name: '红色鞋包',
      image: 'assets/cases/details/travel-shoes-bag.png?v=202607202106',
      alt: '红色鞋履与肩背包细节图',
      description: '包和鞋同色系，省掉搭配的心思。',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'bag',
          label: '红色包袋',
          url: 'https://e.tb.cn/h.8WXm7IyreCorGu3?tk=h5pggGWYRrX',
          imageUrl: 'assets/cases/products/travel-red-bag.jpg',
        },
        {
          type: 'shoes',
          label: '红色凉拖',
          url: 'https://e.tb.cn/h.8cHYA1ZZwt1mQeI?tk=MzG5gGWX8N0',
          imageUrl: 'assets/cases/products/travel-red-shoes.jpg',
        },
      ],
    },
    {
      name: '金色配饰',
      image: 'assets/cases/details/travel-accessories.png?v=202607202106',
      alt: '金色项链耳环与戒指细节图',
      description: '细链条或小耳环选一件就够，给浅色穿搭补一点光泽。',
      productPickerNote: '选一件，看看相似款。',
      productLinks: [
        {
          type: 'necklace',
          label: '金色项链',
          url: 'https://e.tb.cn/h.8cHX68RSMqbhey1?tk=oWFwgGW2br3',
          imageUrl: 'assets/cases/products/travel-gold-necklace.png',
        },
        {
          type: 'earrings',
          label: '金色耳环',
          url: 'https://e.tb.cn/h.82rDirvSivmuufg?tk=fsshgGWW1bZ',
          imageUrl: 'assets/cases/products/travel-gold-earrings.jpg',
        },
      ],
    },
  ],
}

function caseImage(outfitCase) {
  return `<img src="${caseImagePaths[outfitCase.id]}" alt="${sceneLabels[outfitCase.scene]}场景穿搭" />`
}

const list = document.querySelector('[data-case-list]')
const count = document.querySelector('[data-result-count]')
const filterButtons = [...document.querySelectorAll('[data-filter]')]
const urlParams = new URLSearchParams(window.location.search)
const caseFromUrl = caseById.get(urlParams.get('case'))
const validStages = new Set(Object.values(stageLabels))
const validStyles = new Set(Object.values(styleLabels))
const validBudgets = new Set(Object.values(budgetLabels))
const requestedStage = urlParams.get('stage')
const requestedScene = urlParams.get('scene')
const requestedStyle = urlParams.get('style')
const requestedBudget = urlParams.get('budget')
const requestedHeight = Number(urlParams.get('height'))
const validSceneIds = new Set(outfitCases.map((item) => item.scene))
const filterSceneFromUrl = !caseFromUrl && validSceneIds.has(requestedScene) ? requestedScene : null
let personalization = caseFromUrl
  && Number.isInteger(requestedHeight)
  && requestedHeight >= 150
  && requestedHeight <= 160
  && validStages.has(requestedStage)
  && requestedScene === sceneLabels[caseFromUrl.scene]
  && validStyles.has(requestedStyle)
  && validBudgets.has(requestedBudget)
  ? { caseId: caseFromUrl.id, height: requestedHeight, stage: requestedStage, scene: requestedScene, style: requestedStyle, budget: requestedBudget }
  : null
let activeFilter = caseFromUrl?.scene ?? filterSceneFromUrl ?? 'all'
let selectedId = caseFromUrl?.id ?? null

function personalizedBanner(outfitCase) {
  if (!personalization || personalization.caseId !== outfitCase.id) return ''
  return `
    <aside class="personalized-match-banner">
      根据你的选择：<strong>${personalization.stage}</strong> · <strong>${personalization.scene}</strong> · <strong>${personalization.style}</strong> · <strong>${personalization.budget}</strong>
    </aside>`
}

const expandedPreviewById = {
  interview: {
    deck: '面试这天，穿得稳一点。',
    tags: ['求职者', '干净', '500—1000元'],
    logic: '深棕比纯黑柔和，配上米白阔腿裤，正式感更轻一些。',
    noteTip: '内搭收进裤腰，露出高腰位置，长外套也不会压住比例。',
  },
  internship: {
    deck: '第一天上班，穿得清爽一点。',
    tags: ['实习生', '利落', '500—800元'],
    logic: '奶油黄衬衫配深灰西装裤，简单、干净，也不会显得太拘谨。',
    noteTip: '上衣收进裤腰，腰线会更清楚。',
  },
  commute: {
    deck: '白衬衫和牛仔裤，也能让上班这件事没那么严肃。',
    tags: ['刚入职', '简约', '500–800元'],
    logic: '白衬衫配浅蓝牛仔裤，干净，但不会太像学生。',
    noteTip: '衬衫收进裤腰，裤脚别堆在鞋面，比例会更清楚。',
  },
  date: {
    deck: '白色蕾丝遇上酒红色，连心动都有了颜色。',
    tags: ['约会', '温柔', '300–900元'],
    logic: '白色蕾丝与缎面放在一起，温柔里带着一点光泽感。',
    noteTip: '酒红色鞋包收在下半身，让一身白有了落点。',
  },
  weekend: {
    deck: '拎包出门的那一刻，才算真正放假。',
    tags: ['休闲', '清爽', '200–500元'],
    logic: '轻薄针织叠在吊带外，保留肩颈线条，也让上半身更有轮廓。',
    noteTip: '短上衣停在腰线附近，高腰短裤露出更多腿部线条，小个子穿起来更利落。',
  },
  travel: {
    deck: '穿上喜欢的一身，快乐就不用等到目的地。',
    tags: ['旅行', '松弛', '400–800元'],
    logic: '白色和碎花放在一起，干净但不无聊。',
    noteTip: '红色只留在包和鞋上，点到为止，和碎花互相呼应。',
  },
}

function expandedPreview(outfitCase) {
  const preview = expandedPreviewById[outfitCase.id]
  if (!preview) {
    return `
      <div class="case-expanded-editorial">
        <p class="case-expanded-eyebrow">SCENE EDIT / 示例内容</p>
        <h2>${outfitCase.title}</h2>
        <p class="case-expanded-deck">这一套正式穿搭内容正在整理中。</p>
        <p class="case-expanded-body">后续将在这里补充完整 Look、搭配重点和适用场景。</p>
      </div>`
  }

  if (outfitCase.id === 'interview' || outfitCase.id === 'internship' || outfitCase.id === 'commute' || outfitCase.id === 'date' || outfitCase.id === 'weekend' || outfitCase.id === 'travel') {
    return `
      <div class="case-expanded-editorial case-expanded-editorial--internship">
        <h2>${outfitCase.title}</h2>
        <p class="case-expanded-deck">${preview.deck}</p>
        <div class="case-expanded-tags" aria-label="穿搭标签">
          ${preview.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
      </div>`
  }

  return `
    <div class="case-expanded-editorial">
      <p class="case-expanded-eyebrow">${preview.eyebrow}</p>
      <h2>${outfitCase.title}</h2>
      <p class="case-expanded-deck">${preview.deck}</p>
      <p class="case-expanded-body">${preview.note}</p>
      <div class="case-look-index">
        <span>LOOK</span>
        <p>${preview.items.map((item) => `<span>${item}</span>`).join('<i aria-hidden="true">·</i>')}</p>
      </div>
      <p class="case-expanded-scenes"><span>适合场景</span>${preview.scenes}</p>
    </div>`
}

function detailLogic(outfitCase) {
  return expandedPreviewById[outfitCase.id]?.logic
    ?? '示例内容／待替换：这里会用两到三行说明色彩关系、整体轮廓与小个子比例重点，不重复展示完整 Look 主图。'
}

function budgetAndReplacement(outfitCase) {
  if (outfitCase.id === 'interview') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>针织上装可以换成米白衬衫，鞋包先用已有的深色款。</span>
      </aside>`
  }

  if (outfitCase.id === 'internship') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>针织衫和鞋包，可以先从衣橱里找相近款。</span>
      </aside>`
  }

  if (outfitCase.id === 'commute') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>鞋包不用完全成套，颜色接近就够了。</span>
      </aside>`
  }

  if (outfitCase.id === 'date') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>鞋包不用都换成酒红色，留一件做点缀就够了。</span>
      </aside>`
  }

  if (outfitCase.id === 'weekend') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>针织衫也可以披在肩上，白色吊带和短裤单穿依然完整。</span>
      </aside>`
  }

  if (outfitCase.id === 'travel') {
    return `
      <aside class="internship-replacement-hint" aria-label="替换提示">
        <strong>换着穿</strong>
        <span>把碎花半裙换成白色阔腿裤，红色包换成深色，这套就能穿回日常。</span>
      </aside>`
  }

  const preview = expandedPreviewById[outfitCase.id]
  const budget = preview?.budget ?? '示例内容／待替换：后续补充本次新增购置预算，并优先说明可使用的衣橱已有基础款。'
  const replacements = preview?.replacements ?? ['示例内容／待替换：后续补充同结构的替换单品。']
  const principle = preview?.principle ?? '替换时保留原方案的比例结构，正式内容待补充。'

  return `
    <footer class="editorial-detail-footer">
      <button class="editorial-budget-toggle" type="button" data-budget-toggle aria-expanded="false" aria-controls="budget-${outfitCase.id}">
        预算有限？查看替换思路 <span aria-hidden="true">↓</span>
      </button>
      <div class="editorial-budget-collapse" id="budget-${outfitCase.id}" data-budget-panel aria-hidden="true">
        <div class="editorial-budget-inner">
          <header><p>BUDGET & OPTIONS</p><h4>预算与替换</h4></header>
          <div class="editorial-budget-grid">
            <section><h5>预算建议</h5><p class="editorial-budget-copy">${budget}</p></section>
            <section><h5>替换思路</h5><div class="editorial-replacement-list">${replacements.map((item) => `<p>${item}</p>`).join('')}</div></section>
          </div>
          <p class="editorial-replace-principle">${principle}</p>
          <small>内容为排版示例，待正式选品后替换。</small>
        </div>
      </div>
    </footer>`
}

function caseDetailNavigation(outfitCase) {
  if (outfitCase.id === 'interview') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}">← 返回全部穿搭</a>
        <a href="${casePagePath}?case=internship">下一套 实习第一天穿搭 →</a>
      </nav>`
  }

  if (outfitCase.id === 'internship') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}?case=interview">← 上一套 面试穿搭</a>
        <a href="${casePagePath}?case=commute">下一套 日常通勤穿搭 →</a>
      </nav>`
  }

  if (outfitCase.id === 'commute') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}?case=internship">← 上一套 实习第一天穿搭</a>
        <a href="${casePagePath}?case=date">下一套 约会穿搭 →</a>
      </nav>`
  }

  if (outfitCase.id === 'date') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}?case=commute">← 上一套 日常通勤穿搭</a>
        <a href="${casePagePath}?case=weekend">下一套 周末出行穿搭 →</a>
      </nav>`
  }

  if (outfitCase.id === 'weekend') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}?case=date">← 上一套 约会穿搭</a>
        <a href="${casePagePath}?case=travel">下一套 旅行穿搭 →</a>
      </nav>`
  }

  if (outfitCase.id === 'travel') {
    return `
      <nav class="case-detail-navigation" aria-label="相邻穿搭">
        <a href="${casePagePath}?case=weekend">← 上一套 周末出行穿搭</a>
        <a href="${casePagePath}">返回全部穿搭 →</a>
      </nav>`
  }

  return ''
}

function detailItemMedia(item, index, outfitCase) {
  if (!item.image) return imagePlaceholder('单品图片占位')

  const mediaClass = item.mediaClass ? ` ${item.mediaClass}` : ''
  const productLinks = outfitCase.id === 'interview'
    || outfitCase.id === 'internship'
    || outfitCase.id === 'commute'
    || outfitCase.id === 'date'
    || outfitCase.id === 'weekend'
    || outfitCase.id === 'travel'
    ? item.productLinks
    : null
  if (!productLinks?.length) {
    return `<figure class="editorial-item-media${mediaClass}"><img src="${item.image}" alt="${item.alt}" /></figure>`
  }

  const overlayLabel = productLinks.length > 1 ? '查看相似单品' : productLinks[0].label
  const triggerAttributes = productLinks.length === 1
    ? `href="${productLinks[0].url}" target="_blank" rel="noopener noreferrer"`
    : `href="${productLinks[0].url}" target="_blank" rel="noopener noreferrer" data-product-picker="${index}" data-product-case="${outfitCase.id}" aria-haspopup="dialog"`

  return `
    <figure class="editorial-item-media${mediaClass} internship-product-media">
      <a class="internship-product-trigger" ${triggerAttributes} aria-label="${overlayLabel}：${item.name}">
        <img src="${item.image}" alt="${item.alt}" />
        <span class="internship-product-overlay">${overlayLabel} <span aria-hidden="true">↗</span></span>
      </a>
    </figure>`
}

function editorialDetail(outfitCase) {
  const detailItems = detailItemsByCaseId[outfitCase.id]
    ?? outfitCase.items.map((item) => ({ name: item.placeholderName }))
  const usesCompactDetailTemplate = outfitCase.id === 'interview'
    || outfitCase.id === 'internship'
    || outfitCase.id === 'commute'
    || outfitCase.id === 'date'
    || outfitCase.id === 'weekend'
    || outfitCase.id === 'travel'

  return `
    <div class="editorial-case-detail editorial-case-detail--${outfitCase.id}${usesCompactDetailTemplate ? ' editorial-case-detail--internship' : ''}" id="detail-${outfitCase.id}">
      ${usesCompactDetailTemplate
        ? `<header class="internship-style-note-heading"><p>STYLE NOTE</p><h3>穿搭手记</h3></header>`
        : `<header><p>EDITOR'S NOTE</p><h3>为什么这样搭</h3></header>`}
      <div class="editorial-detail-intro">
        <p>${detailLogic(outfitCase)}</p>
        ${usesCompactDetailTemplate ? `<small>${expandedPreviewById[outfitCase.id].noteTip}</small>` : ''}
      </div>
      <section class="editorial-items" aria-label="核心单品">
        ${detailItems.map((item, index) => `
          <div class="editorial-item ${index % 2 ? 'is-reversed' : ''}">
            ${detailItemMedia(item, index, outfitCase)}
            <div><span>0${index + 1}</span><h4>${item.name}</h4><p>${item.description ?? '示例内容／待替换：这里会说明这件单品在整套穿搭中的作用，以及可以怎样替换。'}</p></div>
          </div>`).join('')}
      </section>
      ${budgetAndReplacement(outfitCase)}
      ${caseDetailNavigation(outfitCase)}
    </div>`
}

function syncFilterButtons() {
  for (const button of filterButtons) {
    const active = button.dataset.filter === activeFilter
    button.classList.toggle('is-active', active)
    button.setAttribute('aria-pressed', String(active))
  }
}

function render() {
  const visibleCases = activeFilter === 'all' ? outfitCases : outfitCases.filter((item) => item.scene === activeFilter)
  count.textContent = `当前显示 ${visibleCases.length} 个案例`
  list.innerHTML = visibleCases.map((outfitCase) => {
    const isSelected = selectedId === outfitCase.id
    const sourceIndex = outfitCases.findIndex((item) => item.id === outfitCase.id)
    const caseNumber = sourceIndex + 1
    const variant = ['a', 'b', 'c'][sourceIndex % 3]
    const stages = outfitCase.suitableStages.map((stage) => stageLabels[stage]).join('、')

    return `
      <article class="case-story case-story--${variant} case-story--index-${caseNumber}" id="case-${outfitCase.id}">
        <div class="case-story-media">${caseImage(outfitCase)}</div>
        <div class="case-story-copy">
          ${isSelected ? personalizedBanner(outfitCase) : ''}
          ${isSelected ? expandedPreview(outfitCase) : `
            <p class="content-status">${String(caseNumber).padStart(2, '0')} / ${sceneLabels[outfitCase.scene]}</p>
            <h2>${outfitCase.title}</h2>
            <p>为${sceneLabels[outfitCase.scene]}准备的一套${styleLabels[outfitCase.primaryStyle]}方向穿搭，适合${stages}参考。${outfitCase.summary}</p>`}
            <button class="editorial-link" type="button" data-case-toggle="${outfitCase.id}" aria-expanded="${isSelected}" aria-controls="detail-${outfitCase.id}">${outfitCase.id === 'interview' || outfitCase.id === 'internship' || outfitCase.id === 'commute' || outfitCase.id === 'date' || outfitCase.id === 'travel'
              ? (isSelected ? '收起详情 <span>↑</span>' : '查看详情 <span>↓</span>')
              : (isSelected ? '收起搭配 <span>↑</span>' : '查看搭配 <span>→</span>')}</button>
        </div>
        ${isSelected ? editorialDetail(outfitCase) : ''}
      </article>`
  }).join('')
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter
    selectedId = null
    personalization = null
    history.replaceState(null, '', casePagePath)
    syncFilterButtons()
    render()
  })
}

let productPicker = null
let productPickerCloseTimer = null
let bodyOverflowBeforePicker = ''

function closeProductPicker() {
  if (!productPicker) return
  productPicker.classList.remove('is-open')
  productPicker.classList.add('is-closing')
  document.body.style.overflow = bodyOverflowBeforePicker
  clearTimeout(productPickerCloseTimer)
  productPickerCloseTimer = window.setTimeout(() => {
    productPicker?.remove()
    productPicker = null
  }, 200)
}

function openProductPicker(item) {
  if (!item?.productLinks || item.productLinks.length < 2) return
  closeProductPicker()
  clearTimeout(productPickerCloseTimer)

  productPicker = document.createElement('div')
  productPicker.className = 'internship-product-picker'
  productPicker.setAttribute('role', 'presentation')
  productPicker.innerHTML = `
    <div class="internship-product-picker-backdrop" data-product-picker-close></div>
    <section class="internship-product-picker-dialog" role="dialog" aria-modal="true" aria-labelledby="internship-product-picker-title">
      <button class="internship-product-picker-close" type="button" data-product-picker-close aria-label="关闭">×</button>
      <p class="internship-product-picker-kicker">SHOP THE LOOK</p>
      <h3 id="internship-product-picker-title">选择想看的单品</h3>
      <div class="internship-product-picker-options">
        ${item.productLinks.map((product, index) => `
          <a class="internship-product-picker-option" href="${product.url}" target="_blank" rel="noopener noreferrer">
            <span class="internship-product-picker-category">${product.type?.toUpperCase() ?? 'ITEM'}</span>
            ${product.imageUrl
              ? `<span class="internship-product-picker-media"><img src="${product.imageUrl}" alt="${product.label}" /></span>`
              : `<span class="internship-product-picker-fallback" aria-hidden="true"><small>${product.type?.toUpperCase() ?? 'ITEM'}</small></span>`}
            <span class="internship-product-picker-copy">
              <strong>${product.label}</strong>
              <span class="internship-product-picker-link">查看相似款 <i aria-hidden="true">↗</i></span>
            </span>
          </a>`).join('')}
      </div>
    </section>`

  bodyOverflowBeforePicker = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.body.append(productPicker)
  requestAnimationFrame(() => {
    productPicker?.classList.add('is-open')
    productPicker?.querySelector('.internship-product-picker-close')?.focus()
  })
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-product-picker-close]')) closeProductPicker()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productPicker) closeProductPicker()
})

list.addEventListener('click', (event) => {
  const productTrigger = event.target.closest('[data-product-picker]')
  if (productTrigger) {
    event.preventDefault()
    const productCaseId = productTrigger.dataset.productCase || 'internship'
    const productItems = detailItemsByCaseId[productCaseId]
    openProductPicker(productItems?.[Number(productTrigger.dataset.productPicker)])
    return
  }

  const budgetToggle = event.target.closest('[data-budget-toggle]')
  if (budgetToggle) {
    const panel = document.getElementById(budgetToggle.getAttribute('aria-controls'))
    const isOpen = budgetToggle.getAttribute('aria-expanded') === 'true'
    budgetToggle.setAttribute('aria-expanded', String(!isOpen))
    budgetToggle.innerHTML = isOpen
      ? '预算有限？查看替换思路 <span aria-hidden="true">↓</span>'
      : '收起预算与替换 <span aria-hidden="true">↑</span>'
    panel?.classList.toggle('is-open', !isOpen)
    panel?.setAttribute('aria-hidden', String(isOpen))
    return
  }

  const button = event.target.closest('[data-case-toggle]')
  if (!button) return
  selectedId = selectedId === button.dataset.caseToggle ? null : button.dataset.caseToggle
  personalization = null
  history.replaceState(null, '', selectedId ? `${casePagePath}?case=${selectedId}` : casePagePath)
  render()
  if (selectedId) document.getElementById(`case-${selectedId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

syncFilterButtons()
render()
if (selectedId) requestAnimationFrame(() => document.getElementById(`case-${selectedId}`)?.scrollIntoView({ block: 'start' }))

export const stageLabels = {
  student: '在校生',
  intern: '实习生',
  graduate: '应届求职者',
  newcomer: '职场新人',
}

export const sceneLabels = {
  interview: '面试',
  internship: '实习第一天',
  commute: '日常通勤',
  date: '约会',
  weekend: '周末出行',
  travel: '旅行',
}

export const budgetLabels = {
  under300: '300元以内',
  '300to500': '300—500元',
  '500to800': '500—800元',
  over800: '800元以上',
}

export const styleLabels = {
  minimal: '简约',
  gentle: '温柔',
  sharp: '利落',
  casual: '休闲',
  none: '无明确偏好',
}

const budgetTiers = Object.keys(budgetLabels)

function makeItems(scene) {
  const sceneItems = {
    interview: ['外套占位', '上装占位', '高腰下装占位', '鞋包占位'],
    internship: ['短款外套占位', '内搭占位', '高腰裤装占位', '鞋包占位'],
    commute: ['通勤外搭占位', '上装占位', '高腰下装占位', '鞋包占位'],
    date: ['轻薄外搭占位', '上装占位', '高腰下装占位', '鞋包占位'],
    weekend: ['外搭占位', '舒适上装占位', '下装占位', '鞋包占位'],
    travel: ['便携外套占位', '基础内搭占位', '下装占位', '鞋包占位'],
  }

  return sceneItems[scene].map((placeholderName, index) => ({
    id: `${scene}-item-${index + 1}`,
    category: `核心单品 ${index + 1}`,
    placeholderName,
  }))
}

function makeBudgetGuidance() {
  return Object.fromEntries(
    budgetTiers.map((tier) => [tier, {
      note: '示例内容／待替换：此处用于补充当前预算下的选品层级。',
      replacement: '示例内容／待替换：此处用于补充不改变核心搭配的替换建议。',
    }]),
  )
}

function createCase(id, title, scene, primaryStyle, suitableStages, preferredHeight, featured) {
  return {
    id,
    title,
    scene,
    primaryStyle,
    suitableStages,
    preferredHeight,
    featured,
    summary: '示例内容／待替换：此处用于放置这套穿搭的简短说明。',
    items: makeItems(scene),
    colorLogic: '示例内容／待替换：此处用于放置正式方案的色彩说明。',
    proportionNotes: [
      '示例内容／待替换：腰线与上下身比例说明位置。',
      '示例内容／待替换：裤长、裙长或外套长度说明位置。',
    ],
    sceneReason: '示例内容／待替换：此处用于说明为什么适合当前场景。',
    budgetGuidance: makeBudgetGuidance(),
    alternatives: [
      '示例内容／待替换：核心单品替换项一。',
      '示例内容／待替换：核心单品替换项二。',
    ],
  }
}

export const outfitCases = [
  createCase('interview', '面试穿搭', 'interview', 'minimal', ['student', 'intern', 'graduate', 'newcomer'], [150, 154], true),
  createCase('internship', '实习第一天穿搭', 'internship', 'sharp', ['student', 'intern', 'graduate'], [155, 160], false),
  createCase('commute', '日常通勤穿搭', 'commute', 'minimal', ['intern', 'graduate', 'newcomer'], [150, 154], false),
  createCase('date', '约会穿搭', 'date', 'gentle', ['student', 'intern', 'graduate', 'newcomer'], [155, 160], true),
  createCase('weekend', '周末出行穿搭', 'weekend', 'casual', ['student', 'intern', 'graduate', 'newcomer'], [150, 154], false),
  createCase('travel', '旅行穿搭', 'travel', 'casual', ['student', 'intern', 'graduate', 'newcomer'], [155, 160], true),
]

export const caseById = new Map(outfitCases.map((item) => [item.id, item]))

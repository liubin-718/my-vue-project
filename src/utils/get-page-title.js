import defaultSettings from '@/settings'

const title = defaultSettings.title || 'My Vue Project'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

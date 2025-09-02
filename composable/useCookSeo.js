
export const useCookSeo = (dataSeo = {}) => {
  const defaultSeo = {
    title: 'Cook – Swiss Army Tool for Developers',
    description:
      'Cook helps you ship faster by removing dev pain points — automation, boilerplates, local tunneling, and more.',
    ogTitle: 'Cook by TheAlphaOnes',
    ogDescription:
      'A clean, elegant CLI to speed up your dev workflow. Build more, setup less.',
    ogImage: 'https://cook.taohq.org/og-img.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@thenormvg',
    themeColor: '#1E1E1E',
  }

  const seo = {
    ...defaultSeo,
    ...dataSeo,
  }

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImage: seo.ogImage,
    ogType: seo.ogType,
    twitterCard: seo.twitterCard,
    twitterSite: seo.twitterSite,
    themeColor: seo.themeColor,
  })
}

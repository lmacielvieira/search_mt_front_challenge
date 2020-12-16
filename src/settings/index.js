export * from './images'
export * from './routes'
export * from './mock'
export * from './keys'

// lang switcher
export const SETTINGS =
  localStorage.getItem('cs-lang') === 'en-us'
    ? // eslint-disable-next-line global-require
      require('./en-us')
    : // eslint-disable-next-line global-require
      require('./en-us') // change it according to project languages

if (!localStorage.getItem('cs-lang')) {
  localStorage.setItem('cs-lang', 'en-us')
}

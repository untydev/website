const themeToggleBtn = document.getElementById('themeToggleBtn')
const darkElements = document.getElementsByClassName('is-dark')
const lightElements = document.getElementsByClassName('is-light')

const applyDarkTheme = () => {
  document.documentElement.classList.add('dark')

  for (const elem of darkElements) {
    elem.classList.remove('hidden')
  }

  for (const elem of lightElements) {
    elem.classList.add('hidden')
  }
}

const applyLightTheme = () => {
  document.documentElement.classList.remove('dark')

  for (const elem of darkElements) {
    elem.classList.add('hidden')
  }

  for (const elem of lightElements) {
    elem.classList.remove('hidden')
  }
}

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  applyDarkTheme()
  localStorage.setItem('theme', 'dark')
} else {
  applyLightTheme()
  localStorage.setItem('theme', 'light')
}

if (themeToggleBtn != null) {
  themeToggleBtn.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
      applyLightTheme()
      localStorage.setItem('theme', 'light')
    } else {
      applyDarkTheme()
      localStorage.setItem('theme', 'dark')
    }
  })
}

const styleHeaderSwitch = {
  hidden: header => {
    if (header.classList.contains('fixed')) {
      header.classList.remove('fixed')
      header.classList.add('hidden')
    } else if (header.classList.contains('relative')) {
      header.classList.remove('relative')
      header.classList.add('hidden')
    }
  },

  relative: header => {
    if (header.classList.contains('fixed')) {
      header.classList.remove('fixed')
      header.classList.add('relative')
    }
  },

  fixed: header => {
    if (header.classList.contains('hidden')) {
      header.classList.remove('hidden')
      header.classList.add('fixed')
    }
  }
}

export const { hidden, relative, fixed } = styleHeaderSwitch

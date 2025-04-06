export const animateSearchBar = (element) => {
  if (!element) return

  // Use setTimeout to ensure the animation starts after the component is mounted
  setTimeout(() => {
    element.style.transform = 'translateY(0)'
    element.style.opacity = '1'
  }, 100)
}

export const animateResults = (container) => {
  if (!container) return

  // Select all cards within the container
  const cards = container.querySelectorAll('.card')

  // If no cards with class "card" are found, try to animate all direct children
  if (cards.length === 0) {
    const children = container.children
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        if (child.firstChild) {
          child.firstChild.style.opacity = '1'
          child.firstChild.style.transform = 'translateY(0)'
        }
      }, 100 + index * 100)
    })
    return
  }

  // Animate cards if found
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    }, 100 + index * 100) // Stagger the animations
  })
}

export const pulseAnimation = (element) => {
  if (!element) return

  // Add a CSS class that has the pulse animation
  element.classList.add('pulse-animation')
}

export const typewriterEffect = (element, text, speed = 50) => {
  if (!element) return

  let i = 0
  element.textContent = ''

  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(typing)
    }
  }, speed)

  return typing
}

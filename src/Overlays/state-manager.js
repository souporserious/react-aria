const toggles = {}
const popovers = {}
const members = {}

export function registerPopover(id, popover) {
  popovers[id] = popover
}

export function unregisterPopover(id, popover) {
  delete popovers[id]
}

export function getPopover(id) {
  return popovers[id]
}

export function openPopover(id, options) {
  popovers[id].open(options)
}

export function closePopover(id, options) {
  popovers[id].close(options)
}

export function togglePopover(id, options) {
  popovers[id].toggle(options)
}

export function registerToggle(id, toggle) {
  toggles[id] = toggle
}

export function unregisterToggle(id) {
  delete toggles[id]
}

export function getToggle(id) {
  return toggles[id]
}

import { PropTypes } from 'react'

const keybindingPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
])

export default {
  keybindings: PropTypes.shape({
    next: keybindingPropType,
    prev: keybindingPropType,
    first: keybindingPropType,
    last: keybindingPropType
  }),
  wrap: PropTypes.bool,
  stringSearch: PropTypes.bool,
  stringSearchDelay: PropTypes.number
}

import { CONSTANT as prodConstant } from './environment.prod.js'
import { CONSTANT as devConstant } from './environment.dev.js'

let CONSTANT

console.log('VITE_NODE_ENV', import.meta.env.VITE_NODE_ENV)

if (import.meta.env.VITE_NODE_ENV === 'production') {
  CONSTANT = prodConstant
} else {
  CONSTANT = devConstant
}

export { CONSTANT }

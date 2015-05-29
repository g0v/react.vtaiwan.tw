
var i = {}
['init', 'spec', 'ref', 'act'].forEach((n) => (
      import v from `./${n}.png`
      i[n] = v
      ))
export default i

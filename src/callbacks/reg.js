import config from '../config'

const host = config.host + ":" + config.port
export default
function reg (req, res) {
  console.log('here is reg')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end("<script>window.top.location.href='" + host + "'</script>")
}

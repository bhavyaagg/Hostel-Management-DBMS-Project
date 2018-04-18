/**
 * Created by bhavyaagg on 17/04/18.
 */

const errorFunction = (req, res) => {
  return (err) => {
    console.log(err);
    res.send(err);
  }
}
module.exports = {
  errorFunction
}
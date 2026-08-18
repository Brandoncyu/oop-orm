const db = require('../db')
class Theatre {
  constructor({id, name, address}) {
    this._id = id
    this._name = name
    this._address = address
  }
  get id() {
    return this._id
  }
  set id(val) {
    throw new Error('CANNOT SET ID')
  }
  get removed() {
    return false
  }
  set removed(id) {
    throw new ERROR('CANNOT REMOVE ID MANUALLY')
  }
  static async all() {
    let theatres = await db('theatres')
    return theatres.map(element => new Theatre(element))
  }
  static async find(id) {
    let theatres = await db('theatres')
    let returnValue = theatres.find(element => element.id == id)
    if (!returnValue) {
      throw new ERROR('ID DOES NOT EXIST')
    }
    return new Theatre(returnValue)
  }
  async save(id) {
    const theatres = await db('theatres')
    if (!this.id) {
      theatres.push()
    } else {
      const theatres = await db('theatres').where({id: this.id}).update({name: this.name, address: this.address}).returning('*')
      console.log(theatres)
      return new Theatre(theatres[0])
    }
    return this
  }
}

module.exports = Theatre

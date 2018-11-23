
import https from 'https'
import Models from '../models/Models'

/* eslint-disable */

const NBR_RESULTS = 1
const DEFAULT_PWD = '$2b$10$w31EDrOF8vbIhGr6qigdBe.4y4BiYFGhuex24dFZmPIvqkUiw.ZBy'//'Qwertyuiop00'

const seederRU = {
  createRandomUser (req, res) {
    https.get(`https://randomuser.me/api/?results=${NBR_RESULTS}&?nat=FR`, (result) => {
      const { statusCode } = result
      const contentType = result.headers['content-type']
      console.log('statusCode', statusCode)
      console.log('contentType', contentType)

      result.setEncoding('utf8')
      let rawData = ''
      result.on('data', (chunk) => { rawData += chunk })
      result.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          dbAddRandomUser(parsedData)
          return (res.status('200').type('json').json({
            success: true,
            msg: '',
            result: parsedData
          }))
        } catch (err) {
          console.error(err.message)
        }
      })
    })
  }
}

export default seederRU

//The maximum is exclusive and the minimum is inclusive
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.floor(Math.random() * (max - min)) + min)
}

async function mappedInsertRandomUser (data) {
  console.log('mappedInsertRandomUser', data)

  const usersMdl = new Models('Users')
  const geolocationMdl = new Models('Geolocation')
  const picturesMdl = new Models('Pictures')

  let interets = ''
  for (let i = 0; i < 5; i++) {
    let rand = getRandomInt(0, 53)
    if (rand >= 23 && rand <= 52 && interets.includes(String(rand))) {
      interets = interets.concat(`${String(rand)},`)
    }
  }
  
  let randNum = getRandomInt(0, 5)
  let randGender = (randNum === 0) ? 2 : data.gender === 'male' ? 0 : 1
  console.log('randGender', randNum, '->', randGender)

  const sqlRep = await usersMdl.insert({
    where: {
      UserToken: 'disconnected',
      Login: data.login.username,
      Password: DEFAULT_PWD,
      FirstName: data.name.first,
      LastName: data.name.last,
      Age: data.dob.age,
      Mail: data.email,
      Gender: randGender,
      Orientation: getRandomInt(0, 3),
      Bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non augue fermentum, gravida nisi et, lobortis enim. Nunc volutpat pulvinar augue, nec efficitur mi blandit ut. Fusce metus dui, blandit a est sed, iaculis ultricies elit. Nullam luctus aliquet nulla, a elementum massa scelerisque at.',
      Interest: interets,
      Popularity: getRandomInt(-100, 100)
    }
  })

  // console.log('sqlRep', sqlRep)
  const newUID = sqlRep.insertId

  const picRep = await picturesMdl.insert({
    where: {
      PicOwner: newUID,
      PicPath: data.picture.large,
      IsMain: 1
    }
  })
  console.log('picRep', picRep)

  // Todo insert geoloc info



  return (true)
}

function dbAddRandomUser (parsedData) {
  try {
    if (parsedData.info.results < 1) {
      return (false)
    }
  } catch (error) {
    console.log('dbAddRandomUser', error)
  }


  Object.entries(parsedData).forEach(([key, val]) => {
    // console.log('key', key)
    // console.log('val', val)
    if (key === 'results') {
      mappedInsertRandomUser(...val)
    }
  });


  return (true)
}

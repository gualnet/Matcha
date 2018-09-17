// import csv from 'csv'
import fs from 'fs'
import { parse } from 'path';


const SRCDIR = './seeder_ressources/'
const nameCSVFile = `${SRCDIR}Prenoms.csv`
const surnameCSVFile = `${SRCDIR}surname.csv`
const nameJSONFile = `${SRCDIR}Prenoms.json`
const surnameJSONFile = `${SRCDIR}surname.json`

const Name = () => {
  let fd = fs.openSync(`${file}`, 'r+')
  let csvData = fs.readFileSync(fd, 'utf8')
  console.log('TRUNCATE RET: ', csvData)
  fs.closeSync(fd)
  csvData = csvData.split('\n')
  delete csvData[0]
  let i = 0
  let objData = {}
  csvData.forEach(element => {
    console.log(element)
    objData[i] = {
      Name: element.split(';')[0],
      Gender: element.split(';')[1],
      Language: element.split(';')[2]
    }
    i++
  })
  console.log(objData)

  const newFile = file.replace('.csv', '_json')
  fd = fs.openSync(`${newFile}`, 'w+')
  fs.writeFileSync(fd, JSON.stringify(objData))
  fs.closeSync(fd)
}
// Name()

const Surname = () => {
  let fd = fs.openSync(file, 'r+')
  let csvData = fs.readFileSync(fd, 'utf8')
  fs.closeSync(fd)
  // console.log('TRUNCATE RET: ', csvData)

  csvData = csvData.split('\r')
  // console.log('TRUNCATE RET: ', csvData)

  delete csvData[0]
  let i = 0
  let objData = {}
  csvData.forEach(element => {
    console.log(element)
    objData[i] = {
      Surname: element.split(',')[0]
    }
    i++
  })
  console.log(objData)
  const newFile = file.replace('.csv', '_json')
  fd = fs.openSync(`${newFile}`, 'w+')
  fs.writeFileSync(fd, JSON.stringify(objData))
  fs.closeSync(fd)
}
// Surname()

const randomMerge = () => {
  let fd = fs.openSync(nameJSONFile, 'r')
  const nameObj = JSON.parse(fs.readFileSync(fd, 'utf8'))
  fs.closeSync(fd)
  console.log('NameObj', nameObj[0].Name, 'entries')
  console.log('NameObj', Object.entries(nameObj).length, 'entries')
  fd = fs.openSync(surnameJSONFile, 'r')
  const surnameObj = JSON.parse(fs.readFileSync(fd, 'utf8'))
  fs.closeSync(fd)
  console.log('SurnameObj', Object.entries(surnameObj).length, 'entries')

  // Todo del non ascii char

  for (let i = 0; i < 1000; i++) {
    let randName = Math.floor(Math.random() * Object.entries(nameObj).length) + 1
    let randSurname = Math.floor(Math.random() * Object.entries(surnameObj).length) + 1
    let name = nameObj[randName].Name
    let gender = nameObj[randName].Gender
    let surname = surnameObj[randSurname].Surname
    console.log(`${i}:`, name.replace('(1)', '').replace('(2)', ''), surname, '\t', gender, '\trandom:', randName, '| ', randSurname)


  }
}
randomMerge()

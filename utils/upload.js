const formidable = require('formidable')
const fs = require('fs')


const uploadFn = async (req)=>{
    const form = formidable();

    return new Promise((res,rej)=>{
        form.parse(req, (err, fields, files) => {
            if (err) {
                return rej(err);
            }
            res({ fields, files })
        })
    })
}

const moveFn = async (source,destination) => {
    return new Promise((res,rej) => {
        fs.copyFile(source, destination, (err) => {
          if (err)
            return rej(err)
          fs.unlink(source, (err2) => {
            if (err2)
              return rej(err2)
            res()
          })
        })
    })
}

module.exports = {
    uploadFn,
    moveFn
}
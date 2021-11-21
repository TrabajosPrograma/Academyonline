const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const cursos = require('../models/cursos');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.create =(req,res) => {
    console.log("");
}


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'
  
    cursos.find()
      .select("-photo")
      .populate('category')
      .sort([[sortBy, order]])
      .exec((err, cursos) => {
        if (err) {
          return res.status(400).json({
            error: "Curso no Disponible"
          })
        }
        res.json(cursos);
      })
  }
  
  exports.read = (req, res) => {
    req.cursos.photo = undefined;
    return res.json(req.cursos);
  }
  
  exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Imagen no descarga"
        })
      }
  
      const { name, description, price, category, quantity } = fields
      let cursos = new SVGPathSegCurvetoQuadraticSmoothAbs(fields);
  
      // 1KB = 1000 bytes
      // 1MB = 1,000,000 bytes 
      // 1 Byte = 8 bits
  
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Imagen podria ser mayor de 1MB en tamaño"
          })
        }
        cursos.photo.data = fs.readFileSync(files.photo.path)
        cursos.photo.contentType = files.photo.type
      }
  
      cursos.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(error)
          })
        }
        res.json(result);
      })
  
    })
  }
  
  exports.remove = (req, res) => {
    let cursos = req.cursos
    cursos.remove((err, deletedCursos) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json({
        message: "Curso no existe"
      })
    })
  }
  
  exports.cursoById = (req, res, next, id) => {
    Cursos.findById(id)
      .populate("category")
      .exec((err, cursos) => {
        if (err || !cursos) {
          return res.status(400).json({
            error: "No se encuentra el curso"
          });
        }
        req.cursos = cursos;
        next();
      })
  }
  
  exports.photo = (req, res, next ) => {
    if (req.cursos.photo.data) {
      res.set('Content-Type', req.cursos.photo.contentType)
      return res.send(req.cursos.photo.data)
    }
    next();
  }
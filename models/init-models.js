var DataTypes = require("sequelize").DataTypes;
var _albuns = require("./albuns");
var _albuns_areas = require("./albuns_areas");
var _albuns_foruns = require("./albuns_foruns");
var _albuns_grupos = require("./albuns_grupos");
var _albuns_locais = require("./albuns_locais");
var _albuns_utilizadores = require("./albuns_utilizadores");
var _areas = require("./areas");
var _areas_utilizadores = require("./areas_utilizadores");
var _classificacoes = require("./classificacoes");
var _classificacoes_locais = require("./classificacoes_locais");
var _comentarios = require("./comentarios");
var _forums = require("./forums");
var _forums_grupos = require("./forums_grupos");
var _forums_locais = require("./forums_locais");
var _fotos = require("./fotos");
var _grupos = require("./grupos");
var _grupos_areas = require("./grupos_areas");
var _grupos_locais = require("./grupos_locais");
var _grupos_utilizadores = require("./grupos_utilizadores");
var _locais = require("./locais");
var _locais_areas = require("./locais_areas");
var _locais_foruns = require("./locais_foruns");
var _locais_precos = require("./locais_precos");
var _precos = require("./precos");
var _tipos_utilizadores = require("./tipos_utilizadores");
var _utilizadores = require("./utilizadores");
var _utilizadores_albuns = require("./utilizadores_albuns");
var _utilizadores_areas = require("./utilizadores_areas");
var _utilizadores_classificacoes = require("./utilizadores_classificacoes");
var _utilizadores_comentarios = require("./utilizadores_comentarios");
var _utilizadores_foruns = require("./utilizadores_foruns");
var _utilizadores_grupos = require("./utilizadores_grupos");
var _utilizadores_locais = require("./utilizadores_locais");

function initModels(sequelize) {
  var albuns = _albuns(sequelize, DataTypes);
  var albuns_areas = _albuns_areas(sequelize, DataTypes);
  var albuns_foruns = _albuns_foruns(sequelize, DataTypes);
  var albuns_grupos = _albuns_grupos(sequelize, DataTypes);
  var albuns_locais = _albuns_locais(sequelize, DataTypes);
  var albuns_utilizadores = _albuns_utilizadores(sequelize, DataTypes);
  var areas = _areas(sequelize, DataTypes);
  var areas_utilizadores = _areas_utilizadores(sequelize, DataTypes);
  var classificacoes = _classificacoes(sequelize, DataTypes);
  var classificacoes_locais = _classificacoes_locais(sequelize, DataTypes);
  var comentarios = _comentarios(sequelize, DataTypes);
  var forums = _forums(sequelize, DataTypes);
  var forums_grupos = _forums_grupos(sequelize, DataTypes);
  var forums_locais = _forums_locais(sequelize, DataTypes);
  var fotos = _fotos(sequelize, DataTypes);
  var grupos = _grupos(sequelize, DataTypes);
  var grupos_areas = _grupos_areas(sequelize, DataTypes);
  var grupos_locais = _grupos_locais(sequelize, DataTypes);
  var grupos_utilizadores = _grupos_utilizadores(sequelize, DataTypes);
  var locais = _locais(sequelize, DataTypes);
  var locais_areas = _locais_areas(sequelize, DataTypes);
  var locais_foruns = _locais_foruns(sequelize, DataTypes);
  var locais_precos = _locais_precos(sequelize, DataTypes);
  var precos = _precos(sequelize, DataTypes);
  var tipos_utilizadores = _tipos_utilizadores(sequelize, DataTypes);
  var utilizadores = _utilizadores(sequelize, DataTypes);
  var utilizadores_albuns = _utilizadores_albuns(sequelize, DataTypes);
  var utilizadores_areas = _utilizadores_areas(sequelize, DataTypes);
  var utilizadores_classificacoes = _utilizadores_classificacoes(sequelize, DataTypes);
  var utilizadores_comentarios = _utilizadores_comentarios(sequelize, DataTypes);
  var utilizadores_foruns = _utilizadores_foruns(sequelize, DataTypes);
  var utilizadores_grupos = _utilizadores_grupos(sequelize, DataTypes);
  var utilizadores_locais = _utilizadores_locais(sequelize, DataTypes);

  albuns.belongsToMany(areas, { as: 'area_id_areas', through: albuns_areas, foreignKey: "album_id", otherKey: "area_id" });
  albuns.belongsToMany(forums, { as: 'forum_id_forums', through: albuns_foruns, foreignKey: "album_id", otherKey: "forum_id" });
  albuns.belongsToMany(grupos, { as: 'grupo_id_grupos', through: albuns_grupos, foreignKey: "album_id", otherKey: "grupo_id" });
  albuns.belongsToMany(locais, { as: 'local_id_locais', through: albuns_locais, foreignKey: "album_id", otherKey: "local_id" });
  albuns.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores', through: albuns_utilizadores, foreignKey: "album_id", otherKey: "utilizador_id" });
  albuns.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_albuns', through: utilizadores_albuns, foreignKey: "album_id", otherKey: "utilizador_id" });
  areas.belongsToMany(albuns, { as: 'album_id_albuns', through: albuns_areas, foreignKey: "area_id", otherKey: "album_id" });
  areas.belongsToMany(grupos, { as: 'grupo_id_grupos_grupos_areas', through: grupos_areas, foreignKey: "area_id", otherKey: "grupo_id" });
  areas.belongsToMany(locais, { as: 'local_id_locais_locais_areas', through: locais_areas, foreignKey: "area_id", otherKey: "local_id" });
  areas.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_areas_utilizadores', through: areas_utilizadores, foreignKey: "area_id", otherKey: "utilizador_id" });
  areas.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_areas', through: utilizadores_areas, foreignKey: "area_id", otherKey: "utilizador_id" });
  classificacoes.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_classificacos', through: utilizadores_classificacoes, foreignKey: "classificacao_id", otherKey: "utilizador_id" });
  comentarios.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_comentarios', through: utilizadores_comentarios, foreignKey: "comentario_id", otherKey: "utilizador_id" });
  forums.belongsToMany(albuns, { as: 'album_id_albuns_albuns_foruns', through: albuns_foruns, foreignKey: "forum_id", otherKey: "album_id" });
  forums.belongsToMany(grupos, { as: 'grupo_id_grupos_forums_grupos', through: forums_grupos, foreignKey: "forum_id", otherKey: "grupo_id" });
  forums.belongsToMany(locais, { as: 'local_id_locais_forums_locais', through: forums_locais, foreignKey: "forum_id", otherKey: "local_id" });
  forums.belongsToMany(locais, { as: 'local_id_locais_locais_foruns', through: locais_foruns, foreignKey: "forum_id", otherKey: "local_id" });
  forums.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_foruns', through: utilizadores_foruns, foreignKey: "forum_id", otherKey: "utilizador_id" });
  grupos.belongsToMany(albuns, { as: 'album_id_albuns_albuns_grupos', through: albuns_grupos, foreignKey: "grupo_id", otherKey: "album_id" });
  grupos.belongsToMany(areas, { as: 'area_id_areas_grupos_areas', through: grupos_areas, foreignKey: "grupo_id", otherKey: "area_id" });
  grupos.belongsToMany(forums, { as: 'forum_id_forums_forums_grupos', through: forums_grupos, foreignKey: "grupo_id", otherKey: "forum_id" });
  grupos.belongsToMany(locais, { as: 'local_id_locais_grupos_locais', through: grupos_locais, foreignKey: "grupo_id", otherKey: "local_id" });
  grupos.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_grupos_utilizadores', through: grupos_utilizadores, foreignKey: "grupo_id", otherKey: "utilizador_id" });
  grupos.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_grupos', through: utilizadores_grupos, foreignKey: "grupo_id", otherKey: "utilizador_id" });
  locais.belongsToMany(albuns, { as: 'album_id_albuns_albuns_locais', through: albuns_locais, foreignKey: "local_id", otherKey: "album_id" });
  locais.belongsToMany(areas, { as: 'area_id_areas_locais_areas', through: locais_areas, foreignKey: "local_id", otherKey: "area_id" });
  locais.belongsToMany(forums, { as: 'forum_id_forums_forums_locais', through: forums_locais, foreignKey: "local_id", otherKey: "forum_id" });
  locais.belongsToMany(forums, { as: 'forum_id_forums_locais_foruns', through: locais_foruns, foreignKey: "local_id", otherKey: "forum_id" });
  locais.belongsToMany(grupos, { as: 'grupo_id_grupos_grupos_locais', through: grupos_locais, foreignKey: "local_id", otherKey: "grupo_id" });
  locais.belongsToMany(precos, { as: 'preco_id_precos', through: locais_precos, foreignKey: "local_id", otherKey: "preco_id" });
  locais.belongsToMany(utilizadores, { as: 'utilizador_id_utilizadores_utilizadores_locais', through: utilizadores_locais, foreignKey: "local_id", otherKey: "utilizador_id" });
  precos.belongsToMany(locais, { as: 'local_id_locais_locais_precos', through: locais_precos, foreignKey: "preco_id", otherKey: "local_id" });
  utilizadores.belongsToMany(albuns, { as: 'album_id_albuns_albuns_utilizadores', through: albuns_utilizadores, foreignKey: "utilizador_id", otherKey: "album_id" });
  utilizadores.belongsToMany(albuns, { as: 'album_id_albuns_utilizadores_albuns', through: utilizadores_albuns, foreignKey: "utilizador_id", otherKey: "album_id" });
  utilizadores.belongsToMany(areas, { as: 'area_id_areas_areas_utilizadores', through: areas_utilizadores, foreignKey: "utilizador_id", otherKey: "area_id" });
  utilizadores.belongsToMany(areas, { as: 'area_id_areas_utilizadores_areas', through: utilizadores_areas, foreignKey: "utilizador_id", otherKey: "area_id" });
  utilizadores.belongsToMany(classificacoes, { as: 'classificacao_id_classificacos', through: utilizadores_classificacoes, foreignKey: "utilizador_id", otherKey: "classificacao_id" });
  utilizadores.belongsToMany(comentarios, { as: 'comentario_id_comentarios', through: utilizadores_comentarios, foreignKey: "utilizador_id", otherKey: "comentario_id" });
  utilizadores.belongsToMany(forums, { as: 'forum_id_forums_utilizadores_foruns', through: utilizadores_foruns, foreignKey: "utilizador_id", otherKey: "forum_id" });
  utilizadores.belongsToMany(grupos, { as: 'grupo_id_grupos_grupos_utilizadores', through: grupos_utilizadores, foreignKey: "utilizador_id", otherKey: "grupo_id" });
  utilizadores.belongsToMany(grupos, { as: 'grupo_id_grupos_utilizadores_grupos', through: utilizadores_grupos, foreignKey: "utilizador_id", otherKey: "grupo_id" });
  utilizadores.belongsToMany(locais, { as: 'local_id_locais_utilizadores_locais', through: utilizadores_locais, foreignKey: "utilizador_id", otherKey: "local_id" });
  albuns_areas.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(albuns_areas, { as: "albuns_areas", foreignKey: "album_id"});
  albuns_foruns.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(albuns_foruns, { as: "albuns_foruns", foreignKey: "album_id"});
  albuns_grupos.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(albuns_grupos, { as: "albuns_grupos", foreignKey: "album_id"});
  albuns_locais.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(albuns_locais, { as: "albuns_locais", foreignKey: "album_id"});
  albuns_utilizadores.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(albuns_utilizadores, { as: "albuns_utilizadores", foreignKey: "album_id"});
  fotos.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(fotos, { as: "fotos", foreignKey: "album_id"});
  utilizadores_albuns.belongsTo(albuns, { as: "album", foreignKey: "album_id"});
  albuns.hasMany(utilizadores_albuns, { as: "utilizadores_albuns", foreignKey: "album_id"});
  albuns_areas.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(albuns_areas, { as: "albuns_areas", foreignKey: "area_id"});
  areas_utilizadores.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(areas_utilizadores, { as: "areas_utilizadores", foreignKey: "area_id"});
  forums.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(forums, { as: "forums", foreignKey: "area_id"});
  grupos_areas.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(grupos_areas, { as: "grupos_areas", foreignKey: "area_id"});
  locais_areas.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(locais_areas, { as: "locais_areas", foreignKey: "area_id"});
  utilizadores_areas.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(utilizadores_areas, { as: "utilizadores_areas", foreignKey: "area_id"});
  classificacoes_locais.belongsTo(classificacoes, { as: "classificacao", foreignKey: "classificacao_id"});
  classificacoes.hasMany(classificacoes_locais, { as: "classificacoes_locais", foreignKey: "classificacao_id"});
  utilizadores_classificacoes.belongsTo(classificacoes, { as: "classificacao", foreignKey: "classificacao_id"});
  classificacoes.hasMany(utilizadores_classificacoes, { as: "utilizadores_classificacos", foreignKey: "classificacao_id"});
  utilizadores_comentarios.belongsTo(comentarios, { as: "comentario", foreignKey: "comentario_id"});
  comentarios.hasMany(utilizadores_comentarios, { as: "utilizadores_comentarios", foreignKey: "comentario_id"});
  albuns_foruns.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(albuns_foruns, { as: "albuns_foruns", foreignKey: "forum_id"});
  comentarios.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(comentarios, { as: "comentarios", foreignKey: "forum_id"});
  forums_grupos.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(forums_grupos, { as: "forums_grupos", foreignKey: "forum_id"});
  forums_locais.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(forums_locais, { as: "forums_locais", foreignKey: "forum_id"});
  locais_foruns.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(locais_foruns, { as: "locais_foruns", foreignKey: "forum_id"});
  utilizadores_foruns.belongsTo(forums, { as: "forum", foreignKey: "forum_id"});
  forums.hasMany(utilizadores_foruns, { as: "utilizadores_foruns", foreignKey: "forum_id"});
  albuns_grupos.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(albuns_grupos, { as: "albuns_grupos", foreignKey: "grupo_id"});
  forums_grupos.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(forums_grupos, { as: "forums_grupos", foreignKey: "grupo_id"});
  grupos_areas.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(grupos_areas, { as: "grupos_areas", foreignKey: "grupo_id"});
  grupos_locais.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(grupos_locais, { as: "grupos_locais", foreignKey: "grupo_id"});
  grupos_utilizadores.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(grupos_utilizadores, { as: "grupos_utilizadores", foreignKey: "grupo_id"});
  utilizadores_grupos.belongsTo(grupos, { as: "grupo", foreignKey: "grupo_id"});
  grupos.hasMany(utilizadores_grupos, { as: "utilizadores_grupos", foreignKey: "grupo_id"});
  albuns_locais.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(albuns_locais, { as: "albuns_locais", foreignKey: "local_id"});
  classificacoes_locais.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(classificacoes_locais, { as: "classificacoes_locais", foreignKey: "local_id"});
  forums_locais.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(forums_locais, { as: "forums_locais", foreignKey: "local_id"});
  grupos_locais.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(grupos_locais, { as: "grupos_locais", foreignKey: "local_id"});
  locais_areas.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(locais_areas, { as: "locais_areas", foreignKey: "local_id"});
  locais_foruns.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(locais_foruns, { as: "locais_foruns", foreignKey: "local_id"});
  locais_precos.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(locais_precos, { as: "locais_precos", foreignKey: "local_id"});
  utilizadores_locais.belongsTo(locais, { as: "local", foreignKey: "local_id"});
  locais.hasMany(utilizadores_locais, { as: "utilizadores_locais", foreignKey: "local_id"});
  locais_precos.belongsTo(precos, { as: "preco", foreignKey: "preco_id"});
  precos.hasMany(locais_precos, { as: "locais_precos", foreignKey: "preco_id"});
  utilizadores.belongsTo(tipos_utilizadores, { as: "tipo", foreignKey: "tipoid"});
  tipos_utilizadores.hasMany(utilizadores, { as: "utilizadores", foreignKey: "tipoid"});
  albuns_utilizadores.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(albuns_utilizadores, { as: "albuns_utilizadores", foreignKey: "utilizador_id"});
  areas_utilizadores.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(areas_utilizadores, { as: "areas_utilizadores", foreignKey: "utilizador_id"});
  classificacoes.belongsTo(utilizadores, { as: "usuario", foreignKey: "usuario_id"});
  utilizadores.hasMany(classificacoes, { as: "classificacos", foreignKey: "usuario_id"});
  comentarios.belongsTo(utilizadores, { as: "usuario", foreignKey: "usuario_id"});
  utilizadores.hasMany(comentarios, { as: "comentarios", foreignKey: "usuario_id"});
  grupos_utilizadores.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(grupos_utilizadores, { as: "grupos_utilizadores", foreignKey: "utilizador_id"});
  utilizadores_albuns.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_albuns, { as: "utilizadores_albuns", foreignKey: "utilizador_id"});
  utilizadores_areas.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_areas, { as: "utilizadores_areas", foreignKey: "utilizador_id"});
  utilizadores_classificacoes.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_classificacoes, { as: "utilizadores_classificacos", foreignKey: "utilizador_id"});
  utilizadores_comentarios.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_comentarios, { as: "utilizadores_comentarios", foreignKey: "utilizador_id"});
  utilizadores_foruns.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_foruns, { as: "utilizadores_foruns", foreignKey: "utilizador_id"});
  utilizadores_grupos.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_grupos, { as: "utilizadores_grupos", foreignKey: "utilizador_id"});
  utilizadores_locais.belongsTo(utilizadores, { as: "utilizador", foreignKey: "utilizador_id"});
  utilizadores.hasMany(utilizadores_locais, { as: "utilizadores_locais", foreignKey: "utilizador_id"});

  return {
    albuns,
    albuns_areas,
    albuns_foruns,
    albuns_grupos,
    albuns_locais,
    albuns_utilizadores,
    areas,
    areas_utilizadores,
    classificacoes,
    classificacoes_locais,
    comentarios,
    forums,
    forums_grupos,
    forums_locais,
    fotos,
    grupos,
    grupos_areas,
    grupos_locais,
    grupos_utilizadores,
    locais,
    locais_areas,
    locais_foruns,
    locais_precos,
    precos,
    tipos_utilizadores,
    utilizadores,
    utilizadores_albuns,
    utilizadores_areas,
    utilizadores_classificacoes,
    utilizadores_comentarios,
    utilizadores_foruns,
    utilizadores_grupos,
    utilizadores_locais,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

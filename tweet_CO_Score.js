db.CO.find({$text:{$search:"Colorado Boulder flood september flooding rain emergency Denver impact warning flash nws creek boulderflood Coflood cowx news CORecall"}},
{score:{$meta:"textScore"}}
).forEach(function(doc)
{db.score_CO.save(doc)})


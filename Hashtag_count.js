db.geo_en.aggregate([

{$unwind:'$twitter_entities.hashtags'},
{$group:{_id:'$twitter_entities.hashtags.text',
         tagCount:{$sum:1}
 }},
 {$sort:{tagCount:-1}},
{$limit:40}
])

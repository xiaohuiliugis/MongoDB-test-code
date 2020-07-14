db.en_twitter.aggregate({$match:
    {$or:[{"actor.location.displayName":/colorado/},  {"actor.location.displayName":'co'}, 

           {"actor.location.displayName":/boulder/},    {"actor.location.displayName":/front range/},

           {"actor.location.displayName":/el paso/},    {"actor.location.displayName":/denver metro/},

           {"actor.location.displayName":/boulder,co/},    {"actor.location.displayName":/denver,co/},

           {"actor.location.displayName":/boulder,colorado/},    {"actor.location.displayName":/denver,colorado/},

           {"actor.location.displayName":/colorado,us/},    {"actor.location.displayName":/denver metro/},

           {"actor.location.displayName":/denver/},     {"actor.location.displayName":/deadman hill/},

           {"actor.location.displayName":/joe wright/}, {"actor.location.displayName":/fort collins/},

           {"actor.location.displayName":/sugarloaf/},  {"actor.location.displayName":/fort carson/},

           {"actor.location.displayName":/adams county/},      {"actor.location.displayName":/arapahoe county/},

           {"actor.location.displayName":/broomfield/}, {"actor.location.displayName":/fremont county/},

           {"actor.location.displayName":/jefferson county/},{"actor.location.displayName":/fremont county/},

           {"actor.location.displayName":/larimer/},

           {"actor.location.displayName":/logan county/},{"actor.location.displayName":/morgan county/},

           {"actor.location.displayName":/pueblo county/},{"actor.location.displayName":/weld county/},

           {"actor.location.displayName":/clear creek/}]
    }
    {$or: [{"actor.location.displayName":{$ne:/texas/}},{"actor.location.displayName":{$ne:/utah/}},{},]
},{$out:"en_geo_co"}) 
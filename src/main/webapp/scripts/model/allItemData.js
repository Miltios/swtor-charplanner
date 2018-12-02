let allItemData = {
    items:[{
        id:'1',
        name:'GEMINI MK-4 Relic of Serendipitous Assault',
        slot: 'relic',
        rating: 246,
        color:'purple',
        specs: ['ptTank', 'ptSust', 'ptBurst', 'mercHealer', 'mercBurst', 'mercSust', 'opHealer', 'opBurst', 'opSust', 'sniperBurst', 'sniperSust', 'sniperHybrid', 'sinTank', 'sinBurst', 'sinSust', 'sorcHealer', 'sorcBurst', 'sorcSust', 'maraSust', 'maraBurst', 'maraHybrid', 'juggTank', 'juggSust', 'juggBurst'],
        stats:{
            'endurance':263,
            'power':104
        },
        dynamicSlot: null,
        description:'Equip: Healing an ally or performing a damaging attack on an enemy both have a 30% chance to grant 1181 Power for <<1>> seconds. This effect can only occur once every <<2>> seconds.'
    },{
        id:'2',
        name:'GEMINI MK-4 Relic of Serendipitous Assault',
        slot: 'relic',
        rating: 248,
        color:'gold',
        specs: ['ptTank', 'ptSust', 'ptBurst', 'mercHealer', 'mercBurst', 'mercSust', 'opHealer', 'opBurst', 'opSust', 'sniperBurst', 'sniperSust', 'sniperHybrid', 'sinTank', 'sinBurst', 'sinSust', 'sorcHealer', 'sorcBurst', 'sorcSust', 'maraSust', 'maraBurst', 'maraHybrid', 'juggTank', 'juggSust', 'juggBurst'],
        stats:{
            'endurance':254,
            'power':110,
            'crit':66
        },
        dynamicSlot: null,
        description:'Equip: Healing an ally or performing a damaging attack on an enemy both have a 30% chance to grant 1221 Power for <<1>> seconds. This effect can only occur once every <<2>> seconds.'
    },{
        id:'3',
        name:'GEMINI MK-5 Relic of Shield Amplification',
        slot: 'relic',
        rating: 248,
        color:'gold',
        specs: ['juggTank', 'sinTank', 'ptTank'],
        stats:{
          'shield':66,
          'defense':110,
          'mastery':254
        },
        dynamicSlot: null,
        description:'Equip: Shielding an incoming attack grants 1221 Absorption Rating for <<1>> seconds. This effect can only occur once every <<2>> seconds.'
    },{
         id:'4',
         name:'GEMINI MK-5 War Leader\'s Lightsaber',
         slot: 'mainhand',
         rating: 248,
         color:'gold',
         specs: ['juggTank', 'sinTank', 'ptTank'],
         stats:{
           'shield':66,
           'defense':110,
           'mastery':254
         },
         dynamicSlot: 'hilt',
         description:'Equip: Shielding an incoming attack grants 1221 Absorption Rating for <<1>> seconds. This effect can only occur once every <<2>> seconds.'
     }]
}

declareReady('allItemData.js', null);
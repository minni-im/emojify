    /*! see https://github.com/roulotte/emojify */
    (function (global) {
      'use strict';

      /**
       * The namedEmojiString variable is updated automatically by the
       * grunt `update:emojify.js` tasks. Do not remove the markers as this will
       * cause the `update` build to fail.
       */
      var namedEmojiString =
      //##EMOJILISTSTART
      "+1,-1,100,1234,8ball,a,ab,abc,abcd,accept,aerial_tramway,airplane,alarm_clock,alien,ambulance,anchor,angel,anger,angry,anguished,ant,apple,aquarius,aries,arrow_backward,arrow_double_down,arrow_double_up,arrow_down,arrow_down_small,arrow_forward,arrow_heading_down,arrow_heading_up,arrow_left,arrow_lower_left,arrow_lower_right,arrow_right,arrow_right_hook,arrow_up,arrow_up_down,arrow_up_small,arrow_upper_left,arrow_upper_right,arrows_clockwise,arrows_counterclockwise,art,articulated_lorry,astonished,athletic_shoe,atm,b,baby,baby_bottle,baby_chick,baby_symbol,back,baggage_claim,balloon,ballot_box_with_check,bamboo,banana,bangbang,bank,bar_chart,barber,baseball,basketball,bath,bathtub,battery,bear,bee,beer,beers,beetle,beginner,bell,bento,bicyclist,bike,bikini,bird,birthday,black_circle,black_joker,black_large_square,black_medium_small_square,black_medium_square,black_nib,black_small_square,black_square_button,blossom,blowfish,blue_book,blue_car,blue_heart,blush,boar,boat,bomb,book,bookmark,bookmark_tabs,books,boom,boot,bouquet,bow,bowling,bowtie,boy,bread,bride_with_veil,bridge_at_night,briefcase,broken_heart,bug,bulb,bullettrain_front,bullettrain_side,bus,busstop,bust_in_silhouette,busts_in_silhouette,cactus,cake,calendar,calling,camel,camera,cancer,candy,capital_abcd,capricorn,car,card_index,carousel_horse,cat,cat2,cd,chart,chart_with_downwards_trend,chart_with_upwards_trend,checkered_flag,cherries,cherry_blossom,chestnut,chicken,children_crossing,chocolate_bar,christmas_tree,church,cinema,circus_tent,city_sunrise,city_sunset,cl,clap,clapper,clipboard,clock1,clock10,clock1030,clock11,clock1130,clock12,clock1230,clock130,clock2,clock230,clock3,clock330,clock4,clock430,clock5,clock530,clock6,clock630,clock7,clock730,clock8,clock830,clock9,clock930,closed_book,closed_lock_with_key,closed_umbrella,cloud,clubs,cn,cocktail,coffee,cold_sweat,collision,computer,confetti_ball,confounded,confused,congratulations,construction,construction_worker,convenience_store,cookie,cool,cop,copyright,corn,couple,couple_with_heart,couplekiss,cow,cow2,credit_card,crescent_moon,crocodile,crossed_flags,crown,cry,crying_cat_face,crystal_ball,cupid,curly_loop,currency_exchange,curry,custard,customs,cyclone,dancer,dancers,dango,dart,dash,date,de,deciduous_tree,department_store,diamond_shape_with_a_dot_inside,diamonds,disappointed,disappointed_relieved,dizzy,dizzy_face,do_not_litter,dog,dog2,dollar,dolls,dolphin,door,doughnut,dragon,dragon_face,dress,dromedary_camel,droplet,dvd,e-mail,ear,ear_of_rice,earth_africa,earth_americas,earth_asia,egg,eggplant,eight,eight_pointed_black_star,eight_spoked_asterisk,electric_plug,elephant,email,end,envelope,envelope_with_arrow,es,euro,european_castle,european_post_office,evergreen_tree,exclamation,expressionless,eyeglasses,eyes,facepunch,factory,fallen_leaf,family,fast_forward,fax,fearful,feelsgood,feet,ferris_wheel,file_folder,finnadie,fire,fire_engine,fireworks,first_quarter_moon,first_quarter_moon_with_face,fish,fish_cake,fishing_pole_and_fish,fist,five,flags,flashlight,flipper,floppy_disk,flower_playing_cards,flushed,foggy,football,footprints,fork_and_knife,fountain,four,four_leaf_clover,fr,free,fried_shrimp,fries,frog,frowning,fu,fuelpump,full_moon,full_moon_with_face,game_die,gb,gem,gemini,ghost,gift,gift_heart,girl,globe_with_meridians,goat,goberserk,godmode,golf,grapes,green_apple,green_book,green_heart,grey_exclamation,grey_question,grimacing,grin,grinning,guardsman,guitar,gun,haircut,hamburger,hammer,hamster,hand,handbag,hankey,hash,hatched_chick,hatching_chick,headphones,hear_no_evil,heart,heart_decoration,heart_eyes,heart_eyes_cat,heartbeat,heartpulse,hearts,heavy_check_mark,heavy_division_sign,heavy_dollar_sign,heavy_exclamation_mark,heavy_minus_sign,heavy_multiplication_x,heavy_plus_sign,helicopter,herb,hibiscus,high_brightness,high_heel,hocho,honey_pot,honeybee,horse,horse_racing,hospital,hotel,hotsprings,hourglass,hourglass_flowing_sand,house,house_with_garden,hurtrealbad,hushed,ice_cream,icecream,id,ideograph_advantage,imp,inbox_tray,incoming_envelope,information_desk_person,information_source,innocent,interrobang,iphone,it,izakaya_lantern,jack_o_lantern,japan,japanese_castle,japanese_goblin,japanese_ogre,jeans,joy,joy_cat,jp,key,keycap_ten,kimono,kiss,kissing,kissing_cat,kissing_closed_eyes,kissing_heart,kissing_smiling_eyes,knife,koala,koko,kr,lantern,large_blue_circle,large_blue_diamond,large_orange_diamond,last_quarter_moon,last_quarter_moon_with_face,laughing,leaves,ledger,left_luggage,left_right_arrow,leftwards_arrow_with_hook,lemon,leo,leopard,libra,light_rail,link,lips,lipstick,lock,lock_with_ink_pen,lollipop,loop,loud_sound,loudspeaker,love_hotel,love_letter,low_brightness,m,mag,mag_right,mahjong,mailbox,mailbox_closed,mailbox_with_mail,mailbox_with_no_mail,man,man_with_gua_pi_mao,man_with_turban,mans_shoe,maple_leaf,mask,massage,meat_on_bone,mega,melon,memo,mens,metal,metro,microphone,microscope,milky_way,minibus,minidisc,mobile_phone_off,money_with_wings,moneybag,monkey,monkey_face,monorail,moon,mortar_board,mount_fuji,mountain_bicyclist,mountain_cableway,mountain_railway,mouse,mouse2,movie_camera,moyai,muscle,mushroom,musical_keyboard,musical_note,musical_score,mute,nail_care,name_badge,neckbeard,necktie,negative_squared_cross_mark,neutral_face,new,new_moon,new_moon_with_face,newspaper,ng,night_with_stars,nine,no_bell,no_bicycles,no_entry,no_entry_sign,no_good,no_mobile_phones,no_mouth,no_pedestrians,no_smoking,non-potable_water,nose,notebook,notebook_with_decorative_cover,notes,nut_and_bolt,o,o2,ocean,octocat,octopus,oden,office,ok,ok_hand,ok_woman,older_man,older_woman,on,oncoming_automobile,oncoming_bus,oncoming_police_car,oncoming_taxi,one,open_book,open_file_folder,open_hands,open_mouth,ophiuchus,orange_book,outbox_tray,ox,package,page_facing_up,page_with_curl,pager,palm_tree,panda_face,paperclip,parking,part_alternation_mark,partly_sunny,passport_control,paw_prints,peach,pear,pencil,pencil2,penguin,pensive,performing_arts,persevere,person_frowning,person_with_blond_hair,person_with_pouting_face,phone,pig,pig2,pig_nose,pill,pineapple,pisces,pizza,point_down,point_left,point_right,point_up,point_up_2,police_car,poodle,poop,post_office,postal_horn,postbox,potable_water,pouch,poultry_leg,pound,pouting_cat,pray,princess,punch,purple_heart,purse,pushpin,put_litter_in_its_place,question,rabbit,rabbit2,racehorse,radio,radio_button,rage,rage1,rage2,rage3,rage4,railway_car,rainbow,raised_hand,raised_hands,raising_hand,ram,ramen,rat,recycle,red_car,red_circle,registered,relaxed,relieved,repeat,repeat_one,restroom,revolving_hearts,rewind,ribbon,rice,rice_ball,rice_cracker,rice_scene,ring,rocket,roller_coaster,rooster,rose,rotating_light,round_pushpin,rowboat,ru,rugby_football,runner,running,running_shirt_with_sash,sa,sagittarius,sailboat,sake,sandal,santa,satellite,satisfied,saxophone,school,school_satchel,scissors,scorpius,scream,scream_cat,scroll,seat,secret,see_no_evil,seedling,seven,shaved_ice,sheep,shell,ship,shipit,shirt,shit,shoe,shower,signal_strength,six,six_pointed_star,ski,skull,sleeping,sleepy,slot_machine,small_blue_diamond,small_orange_diamond,small_red_triangle,small_red_triangle_down,smile,smile_cat,smiley,smiley_cat,smiling_imp,smirk,smirk_cat,smoking,snail,snake,snowboarder,snowflake,snowman,sob,soccer,soon,sos,sound,space_invader,spades,spaghetti,sparkle,sparkler,sparkles,sparkling_heart,speak_no_evil,speaker,speech_balloon,speedboat,squirrel,star,star2,stars,station,statue_of_liberty,steam_locomotive,stew,straight_ruler,strawberry,stuck_out_tongue,stuck_out_tongue_closed_eyes,stuck_out_tongue_winking_eye,sun_with_face,sunflower,sunglasses,sunny,sunrise,sunrise_over_mountains,surfer,sushi,suspect,suspension_railway,sweat,sweat_drops,sweat_smile,sweet_potato,swimmer,symbols,syringe,tada,tanabata_tree,tangerine,taurus,taxi,tea,telephone,telephone_receiver,telescope,tennis,tent,thought_balloon,three,thumbsdown,thumbsup,ticket,tiger,tiger2,tired_face,tm,toilet,tokyo_tower,tomato,tongue,top,tophat,tractor,traffic_light,train,train2,tram,triangular_flag_on_post,triangular_ruler,trident,triumph,trolleybus,trollface,trophy,tropical_drink,tropical_fish,truck,trumpet,tshirt,tulip,turtle,tv,twisted_rightwards_arrows,two,two_hearts,two_men_holding_hands,two_women_holding_hands,u5272,u5408,u55b6,u6307,u6708,u6709,u6e80,u7121,u7533,u7981,u7a7a,uk,umbrella,unamused,underage,unlock,up,us,v,vertical_traffic_light,vhs,vibration_mode,video_camera,video_game,violin,virgo,volcano,vs,walking,waning_crescent_moon,waning_gibbous_moon,warning,watch,water_buffalo,watermelon,wave,wavy_dash,waxing_crescent_moon,waxing_gibbous_moon,wc,weary,wedding,whale,whale2,wheelchair,white_check_mark,white_circle,white_flower,white_large_square,white_medium_small_square,white_medium_square,white_small_square,white_square_button,wind_chime,wine_glass,wink,wolf,woman,womans_clothes,womans_hat,womens,worried,wrench,x,yellow_heart,yen,yum,zap,zero,zzz";
      //##EMOJILISTEND
      var namedEmoji = namedEmojiString.split(/,/);


      var unicodeEmojiString =
      //##UNICODELISTSTART
      {"😁":"1f601","😂":"1f602","😃":"1f603","😄":"1f604","😅":"1f605","😆":"1f606","😉":"1f609","😊":"1f60a","😋":"1f60b","😌":"1f60c","😍":"1f60d","😏":"1f60f","😒":"1f612","😓":"1f613","😔":"1f614","😖":"1f616","😘":"1f618","😚":"1f61a","😜":"1f61c","😝":"1f61d","😞":"1f61e","😠":"1f620","😡":"1f621","😢":"1f622","😣":"1f623","😤":"1f624","😥":"1f625","😨":"1f628","😩":"1f629","😪":"1f62a","😫":"1f62b","😭":"1f62d","😰":"1f630","😱":"1f631","😲":"1f632","😳":"1f633","😵":"1f635","😷":"1f637","😀":"1f600","😇":"1f607","😈":"1f608","😎":"1f60e","😐":"1f610","😑":"1f611","😕":"1f615","😗":"1f617","😙":"1f619","😛":"1f61b","😟":"1f61f","😦":"1f626","😧":"1f627","😬":"1f62c","😮":"1f62e","😯":"1f62f","😴":"1f634","😶":"1f636","😸":"1f638","😹":"1f639","😺":"1f63a","😻":"1f63b","😼":"1f63c","😽":"1f63d","😾":"1f63e","😿":"1f63f","🙀":"1f640","🙅":"1f645","🙆":"1f646","🙇":"1f647","🙈":"1f648","🙉":"1f649","🙊":"1f64a","🙋":"1f64b","🙌":"1f64c","🙍":"1f64d","🙎":"1f64e","🙏":"1f64f","✂️":"2702","✅":"2705","✈️":"2708","✉️":"2709","✊":"270a","✋":"270b","✌️":"270c","✏️":"270f","✒️":"2712","✔️":"2714","✖️":"2716","✨":"2728","✳️":"2733","✴️":"2734","❄️":"2744","❇️":"2747","❌":"274c","❎":"274e","❓":"2753","❔":"2754","❕":"2755","❗️":"2757","❤️":"2764","➕":"2795","➖":"2796","➗":"2797","➡":"27a1","➰":"27b0","🚀":"1f680","🚃":"1f683","🚋":"1f683","🚄":"1f684","🚅":"1f685","🚇":"1f687","🚉":"1f689","🚌":"1f68c","🚏":"1f68f","🚑":"1f691","🚒":"1f692","🚓":"1f693","🚕":"1f695","🚗":"1f697","🚙":"1f699","🚚":"1f69a","🚢":"1f6a2","🚤":"1f6a4","🚥":"1f6a5","🚧":"1f6a7","🚨":"1f6a8","🚩":"1f6a9","🚪":"1f6aa","🚫":"1f6ab","🚬":"1f6ac","🚭":"1f6ad","🚲":"1f6b2","🚶":"1f6b6","🚹":"1f6b9","🚺":"1f6ba","🚻":"1f6bb","🚼":"1f6bc","🚽":"1f6bd","🚾":"1f6be","🛀":"1f6c0","Ⓜ️":"24c2","ⓜ️":"24c2","🅰":"1f170","🅱":"1f171","🅾":"1f17e","🅿️":"1f17f","🆎":"1f18e","🆑":"1f191","🆒":"1f192","🆓":"1f193","🆔":"1f194","🆕":"1f195","🆖":"1f196","🆗":"1f197","🆘":"1f198","🆙":"1f199","🆚":"1f19a","🇩🇪":"1f1e9-1f1ea","🇬🇧":"1f1ec-1f1e7","🇨🇳":"1f1e8-1f1f3","🇯🇵":"1f1ef-1f1f5","🇰🇷":"1f1f0-1f1f7","🇫🇷":"1f1eb-1f1f7","🇪🇸":"1f1ea-1f1f8","🇮🇹":"1f1ee-1f1f9","🇺🇸":"1f1fa-1f1f8","🇷🇺":"1f1f7-1f1fa","🈁":"1f201","🈂":"1f202","🈚️":"1f21a","🈯️":"1f22f","🈲":"1f232","🈳":"1f233","🈴":"1f234","🈵":"1f235","🈶":"1f236","🈷":"1f237","🈸":"1f238","🈹":"1f239","🈺":"1f23a","🉐":"1f250","🉑":"1f251","©":"00a9","®":"00ae","‼️":"203c","⁉️":"2049","8⃣":"0038-20e3","9⃣":"0039-20e3","7⃣":"0037-20e3","6⃣":"0036-20e3","1⃣":"0031-20e3","0⃣":"0030-20e3","2⃣":"0032-20e3","3⃣":"0033-20e3","5⃣":"0035-20e3","4⃣":"0034-20e3","#⃣":"0023-20e3","™":"2122","ℹ️":"2139","↔️":"2194","↕":"2195","↖️":"2196","↗️":"2197","↘️":"2198","↙️":"2199","↩️":"21a9","↪️":"21aa","⌚️":"231a","⌛️":"231b","⏩":"23e9","⏪":"23ea","⏫":"23eb","⏬":"23ec","⏰":"23f0","⏳":"23f3","▪️":"25aa","▫️":"25ab","▶️":"25b6","◀️":"25c0","◻️":"25fb","◼️":"25fc","◽️":"25fd","◾️":"25fe","☀️":"2600","☁️":"2601","☎️":"260e","☑️":"2611","☔️":"2614","☕️":"2615","☝️":"261d","☺️":"263a","♈️":"2648","♉️":"2649","♊️":"264a","♋️":"264b","♌️":"264c","♍️":"264d","♎️":"264e","♏️":"264f","♐️":"2650","♑️":"2651","♒️":"2652","♓️":"2653","♠️":"2660","♣️":"2663","♥️":"2665","♦️":"2666","♨️":"2668","♻️":"267b","♿️":"267f","⚓️":"2693","⚠️":"26a0","⚡️":"26a1","⚪":"26aa","⚫":"26ab","⚽️":"26bd","⚾️":"26be","⛄️":"26c4","⛅️":"26c5","⛎":"26ce","⛔️":"26d4","⛪️":"26ea","⛲️":"26f2","⛳️":"26f3","⛵️":"26f5","⛺️":"26fa","⛽️":"26fd","⤴️":"2934","⤵️":"2935","⬅":"2b05","⬆":"2b06","⬇":"2b07","⬛️":"2b1b","⬜️":"2b1c","⭐️":"2b50","⭕️":"2b55","〰":"3030","〽️":"303d","㊗️":"3297","㊙️":"3299","🀄️":"1f004","🃏":"1f0cf","🌀":"1f300","🌁":"1f301","🌂":"1f302","🌃":"1f303","🌄":"1f304","🌅":"1f305","🌆":"1f306","🌇":"1f307","🌈":"1f308","🌉":"1f309","🌊":"1f30a","🌋":"1f30b","🌌":"1f30c","🌏":"1f30f","🌑":"1f311","🌓":"1f313","🌔":"1f314","🌕":"1f315","🌙":"1f319","🌛":"1f31b","🌟":"1f31f","🌠":"1f320","🌰":"1f330","🌱":"1f331","🌴":"1f334","🌵":"1f335","🌷":"1f337","🌸":"1f338","🌹":"1f339","🌺":"1f33a","🌻":"1f33b","🌼":"1f33c","🌽":"1f33d","🌾":"1f33e","🌿":"1f33f","🍀":"1f340","🍁":"1f341","🍂":"1f342","🍃":"1f343","🍄":"1f344","🍅":"1f345","🍆":"1f346","🍇":"1f347","🍈":"1f348","🍉":"1f349","🍊":"1f34a","🍌":"1f34c","🍍":"1f34d","🍎":"1f34e","🍏":"1f34f","🍑":"1f351","🍒":"1f352","🍓":"1f353","🍔":"1f354","🍕":"1f355","🍖":"1f356","🍗":"1f357","🍘":"1f358","🍙":"1f359","🍚":"1f35a","🍛":"1f35b","🍜":"1f35c","🍝":"1f35d","🍞":"1f35e","🍟":"1f35f","🍠":"1f360","🍡":"1f361","🍢":"1f362","🍣":"1f363","🍤":"1f364","🍥":"1f365","🍦":"1f366","🍧":"1f367","🍨":"1f368","🍩":"1f369","🍪":"1f36a","🍫":"1f36b","🍬":"1f36c","🍭":"1f36d","🍮":"1f36e","🍯":"1f36f","🍰":"1f370","🍱":"1f371","🍲":"1f372","🍳":"1f373","🍴":"1f374","🍵":"1f375","🍶":"1f376","🍷":"1f377","🍸":"1f378","🍹":"1f379","🍺":"1f37a","🍻":"1f37b","🎀":"1f380","🎁":"1f381","🎂":"1f382","🎃":"1f383","🎄":"1f384","🎅":"1f385","🎆":"1f386","🎇":"1f387","🎈":"1f388","🎉":"1f389","🎊":"1f38a","🎋":"1f38b","🎌":"1f38c","🎍":"1f38d","🎎":"1f38e","🎏":"1f38f","🎐":"1f390","🎑":"1f391","🎒":"1f392","🎓":"1f393","🎠":"1f3a0","🎡":"1f3a1","🎢":"1f3a2","🎣":"1f3a3","🎤":"1f3a4","🎥":"1f3a5","🎦":"1f3a6","🎧":"1f3a7","🎨":"1f3a8","🎩":"1f3a9","🎪":"1f3aa","🎫":"1f3ab","🎬":"1f3ac","🎭":"1f3ad","🎮":"1f3ae","🎯":"1f3af","🎰":"1f3b0","🎱":"1f3b1","🎲":"1f3b2","🎳":"1f3b3","🎴":"1f3b4","🎵":"1f3b5","🎶":"1f3b6","🎷":"1f3b7","🎸":"1f3b8","🎹":"1f3b9","🎺":"1f3ba","🎻":"1f3bb","🎼":"1f3bc","🎽":"1f3bd","🎾":"1f3be","🎿":"1f3bf","🏀":"1f3c0","🏁":"1f3c1","🏂":"1f3c2","🏃":"1f3c3","🏄":"1f3c4","🏆":"1f3c6","🏈":"1f3c8","🏊":"1f3ca","🏠":"1f3e0","🏡":"1f3e1","🏢":"1f3e2","🏣":"1f3e3","🏥":"1f3e5","🏦":"1f3e6","🏧":"1f3e7","🏨":"1f3e8","🏩":"1f3e9","🏪":"1f3ea","🏫":"1f3eb","🏬":"1f3ec","🏭":"1f3ed","🏮":"1f3ee","🏯":"1f3ef","🏰":"1f3f0","🐌":"1f40c","🐍":"1f40d","🐎":"1f40e","🐑":"1f411","🐒":"1f412","🐔":"1f414","🐗":"1f417","🐘":"1f418","🐙":"1f419","🐚":"1f41a","🐛":"1f41b","🐜":"1f41c","🐝":"1f41d","🐞":"1f41e","🐟":"1f41f","🐠":"1f420","🐡":"1f421","🐢":"1f422","🐣":"1f423","🐤":"1f424","🐥":"1f425","🐦":"1f426","🐧":"1f427","🐨":"1f428","🐩":"1f429","🐫":"1f42b","🐬":"1f42c","🐭":"1f42d","🐮":"1f42e","🐯":"1f42f","🐰":"1f430","🐱":"1f431","🐲":"1f432","🐳":"1f433","🐴":"1f434","🐵":"1f435","🐶":"1f436","🐷":"1f437","🐸":"1f438","🐹":"1f439","🐺":"1f43a","🐻":"1f43b","🐼":"1f43c","🐽":"1f43d","🐾":"1f43e","👀":"1f440","👂":"1f442","👃":"1f443","👄":"1f444","👅":"1f445","👆":"1f446","👇":"1f447","👈":"1f448","👉":"1f449","👊":"1f44a","👋":"1f44b","👌":"1f44c","👍":"1f44d","👎":"1f44e","👏":"1f44f","👐":"1f450","👑":"1f451","👒":"1f452","👓":"1f453","👔":"1f454","👕":"1f455","👖":"1f456","👗":"1f457","👘":"1f458","👙":"1f459","👚":"1f45a","👛":"1f45b","👜":"1f45c","👝":"1f45d","👞":"1f45e","👟":"1f45f","👠":"1f460","👡":"1f461","👢":"1f462","👣":"1f463","👤":"1f464","👦":"1f466","👧":"1f467","👨":"1f468","👩":"1f469","👪":"1f46a","👫":"1f46b","👮":"1f46e","👯":"1f46f","👰":"1f470","👱":"1f471","👲":"1f472","👳":"1f473","👴":"1f474","👵":"1f475","👶":"1f476","👷":"1f477","👸":"1f478","👹":"1f479","👺":"1f47a","👻":"1f47b","👼":"1f47c","👽":"1f47d","👾":"1f47e","👿":"1f47f","💀":"1f480","💁":"1f481","💂":"1f482","💃":"1f483","💄":"1f484","💅":"1f485","💆":"1f486","💇":"1f487","💈":"1f488","💉":"1f489","💊":"1f48a","💋":"1f48b","💌":"1f48c","💍":"1f48d","💎":"1f48e","💏":"1f48f","💐":"1f490","💑":"1f491","💒":"1f492","💓":"1f493","💔":"1f494","💕":"1f495","💖":"1f496","💗":"1f497","💘":"1f498","💙":"1f499","💚":"1f49a","💛":"1f49b","💜":"1f49c","💝":"1f49d","💞":"1f49e","💟":"1f49f","💠":"1f4a0","💡":"1f4a1","💢":"1f4a2","💣":"1f4a3","💤":"1f4a4","💥":"1f4a5","💦":"1f4a6","💧":"1f4a7","💨":"1f4a8","💩":"1f4a9","💪":"1f4aa","💫":"1f4ab","💬":"1f4ac","💮":"1f4ae","💯":"1f4af","💰":"1f4b0","💱":"1f4b1","💲":"1f4b2","💳":"1f4b3","💴":"1f4b4","💵":"1f4b5","💸":"1f4b8","💹":"1f4b9","💺":"1f4ba","💻":"1f4bb","💼":"1f4bc","💽":"1f4bd","💾":"1f4be","💿":"1f4bf","📀":"1f4c0","📁":"1f4c1","📂":"1f4c2","📃":"1f4c3","📄":"1f4c4","📅":"1f4c5","📆":"1f4c6","📇":"1f4c7","📈":"1f4c8","📉":"1f4c9","📊":"1f4ca","📋":"1f4cb","📌":"1f4cc","📍":"1f4cd","📎":"1f4ce","📏":"1f4cf","📐":"1f4d0","📑":"1f4d1","📒":"1f4d2","📓":"1f4d3","📔":"1f4d4","📕":"1f4d5","📖":"1f4d6","📗":"1f4d7","📘":"1f4d8","📙":"1f4d9","📚":"1f4da","📛":"1f4db","📜":"1f4dc","📝":"1f4dd","📞":"1f4de","📟":"1f4df","📠":"1f4e0","📡":"1f4e1","📢":"1f4e2","📣":"1f4e3","📤":"1f4e4","📥":"1f4e5","📦":"1f4e6","📧":"1f4e7","📨":"1f4e8","📩":"1f4e9","📪":"1f4ea","📫":"1f4eb","📮":"1f4ee","📰":"1f4f0","📱":"1f4f1","📲":"1f4f2","📳":"1f4f3","📴":"1f4f4","📶":"1f4f6","📷":"1f4f7","📹":"1f4f9","📺":"1f4fa","📻":"1f4fb","📼":"1f4fc","🔃":"1f503","🔊":"1f508","🔋":"1f50b","🔌":"1f50c","🔍":"1f50d","🔎":"1f50e","🔏":"1f50f","🔐":"1f510","🔑":"1f511","🔒":"1f512","🔓":"1f513","🔔":"1f514","🔖":"1f516","🔗":"1f517","🔘":"1f518","🔙":"1f519","🔚":"1f51a","🔛":"1f51b","🔜":"1f51c","🔝":"1f51d","🔞":"1f51e","🔟":"1f51f","🔠":"1f520","🔡":"1f521","🔢":"1f522","🔣":"1f523","🔤":"1f524","🔥":"1f525","🔦":"1f526","🔧":"1f527","🔨":"1f528","🔩":"1f529","🔪":"1f52a","🔫":"1f52b","🔮":"1f52e","🔯":"1f52f","🔰":"1f530","🔱":"1f531","🔲":"1f532","🔳":"1f533","🔴":"1f534","🔵":"1f535","🔶":"1f536","🔷":"1f537","🔸":"1f538","🔹":"1f539","🔺":"1f53a","🔻":"1f53b","🔼":"1f53c","🔽":"1f53d","🕐":"1f550","🕑":"1f551","🕒":"1f552","🕓":"1f553","🕔":"1f554","🕕":"1f555","🕖":"1f556","🕗":"1f557","🕘":"1f558","🕙":"1f559","🕚":"1f55a","🕛":"1f55b","🗻":"1f5fb","🗼":"1f5fc","🗽":"1f5fd","🗾":"1f5fe","🗿":"1f5ff","🚁":"1f681","🚂":"1f682","🚆":"1f686","🚈":"1f688","🚊":"1f68a","🚍":"1f68d","🚎":"1f68e","🚐":"1f690","🚔":"1f694","🚖":"1f696","🚘":"1f698","🚛":"1f69b","🚜":"1f69c","🚝":"1f69d","🚞":"1f69e","🚟":"1f69f","🚠":"1f6a0","🚡":"1f6a1","🚣":"1f6a3","🚦":"1f6a6","🚮":"1f6ae","🚯":"1f6af","🚰":"1f6b0","🚱":"1f6b1","🚳":"1f6b3","🚴":"1f6b4","🚵":"1f6b5","🚷":"1f6b7","🚸":"1f6b8","🚿":"1f6bf","🛁":"1f6c1","🛂":"1f6c2","🛃":"1f6c3","🛄":"1f6c4","🛅":"1f6c5","🌍":"1f30d","🌎":"1f30e","🌐":"1f310","🌒":"1f312","🌖":"1f316","🌗":"1f317","🌘":"1f318","🌚":"1f31a","🌜":"1f31c","🌝":"1f31d","🌞":"1f31e","🌲":"1f332","🌳":"1f333","🍋":"1f34b","🍐":"1f350","🍼":"1f37c","🏇":"1f3c7","🏉":"1f3c9","🏤":"1f3e4","🐀":"1f400","🐁":"1f401","🐂":"1f402","🐃":"1f403","🐄":"1f404","🐅":"1f405","🐆":"1f406","🐇":"1f407","🐈":"1f408","🐉":"1f409","🐊":"1f40a","🐋":"1f40b","🐏":"1f40f","🐐":"1f410","🐓":"1f413","🐕":"1f415","🐖":"1f416","🐪":"1f42a","👥":"1f465","👬":"1f46c","👭":"1f46d","💭":"1f4ad","💶":"1f4b6","💷":"1f4b7","📬":"1f4ec","📭":"1f4ed","📯":"1f4ef","📵":"1f4f5","🔀":"1f500","🔁":"1f501","🔂":"1f502","🔄":"1f504","🔅":"1f505","🔆":"1f506","🔇":"1f507","🔈":"1f509","🔕":"1f515","🔬":"1f52c","🔭":"1f52d","🕜":"1f55c","🕝":"1f55d","🕞":"1f55e","🕟":"1f55f","🕠":"1f560","🕡":"1f561","🕢":"1f562","🕣":"1f563","🕤":"1f564","🕥":"1f565","🕦":"1f566","🕧":"1f567"};
      //##UNICODELISTEND

      /* A hash with the named emoji as keys */
      var namedMatchHash = namedEmoji.reduce(function(memo, v) {
        memo[v] = true;
        return memo;
      }, {});

      /* List of emoticons used in the regular expression */
      var emoticons = {
/* :..: */ named: /:([a-z0-9A-Z_-]+):/,
/* :-)  */ blush: /:-?\)/g,
/* :-o  */ scream: /:-o/gi,
/* :-]  */ smirk: /[:;]-?]/g,
/* :-D  */ smiley: /[:;]-?d/gi,
/* X-D  */ stuck_out_tongue_closed_eyes: /x-d/gi,
/* ;-p  */ stuck_out_tongue_winking_eye: /[:;]-?p/gi,
/* :-[  */ rage: /:-?[\[@]/g,
/* :-(  */ disappointed: /:-?\(/g,
/* :'-( */ sob: /:['’]-?\(|:&#x27;\(/g,
/* :-*  */ kissing_heart: /:-?\*/g,
/* ;-)  */ wink: /;-?\)/g,
/* :-/  */ pensive: /:-?\//g,
/* :-s  */ confounded: /:-?s/gi,
/* :-|  */ flushed: /:-?\|/g,
/* :-$  */ relaxed: /:-?\$/g,
/* :-x  */ mask: /:-x/gi,
/* <3   */ heart: /<3|&lt;3/g,
/* </3  */ broken_heart: /<\/3|&lt;&#x2F;3/g,
/* :+1: */ thumbsup: /:\+1:/g,
/* :-1: */ thumbsdown: /:\-1:/g
      };

      var emoticonsProcessed = Object.keys(emoticons).map(function(key) {
        return [emoticons[key], key];
      });

      /* The source for the mega-regex */
      var mega = emoticonsProcessed.map(function(v) {
        var re = v[0], val = re.source || re;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        return "(" + val + ")";
      }).join('|');


      /* The regex used to find emoji */
      var megaRe = new RegExp(mega, "gi");

      function getEmojiNameForMatch(matches) {
        /* Special case for named emoji */
        if(matches[1] && matches[2]) {
            var named = matches[2];
            if(namedMatchHash[named]) { return named; }
            return;
        }
        for(var i = 3; i < matches.length - 1; i++) {
            if(matches[i]) {
                return emoticonsProcessed[i - 2][1];
            }
        }
      }

      function defaultReplacer(emoji, name, unicode) {
        return "<img title=':" + name + ":' alt=':" + name + ":' class='emoji' src='" + defaultConfig.img_dir + '/' + name + ".png' />";
      }


      var defaultConfig = {
        "img_dir": "images/emoji",
        "replacer": defaultReplacer
      };

      function parse(text) {
        var emojis = {};
        text.replace(megaRe, function() {
          var matches = Array.prototype.slice.call(arguments, 0, -2);
          var index = arguments[arguments.length - 2];
          var input = arguments[arguments.length - 1];
          var emoji = getEmojiNameForMatch(matches);

          if (emoji) {
            if (Object.keys(emojis).indexOf(emoji) === -1) {
              emojis[emoji] = {
                "name": emoji,
                "emoji": matches[0],
                "index": [ index ]
              };
            } else {
              emojis[emoji].index.push(index);
            }
          }
        });
        return emojis;
      }

      function typeahead(text, limit) {
        limit = limit || 10;
        return namedEmoji.map(function(emoji) {
          if (emoji.indexOf(text) === 0) {
            return {
              "name": emoji,
              "emoji": ':' + emoji + ':'
            };
          }
          return false;
        }).filter(function(item) { return item !== false; }).slice(0, limit);
      }

      function replace(text, replacer) {
        if (!replacer) {
          replacer = defaultConfig.replacer;
        }
        var emojis = parse(text);
        return text.replace(megaRe, function() {
          var matches = Array.prototype.slice.call(arguments, 0, -2);
          var index = arguments[arguments.length - 2];
          var input = arguments[arguments.length - 1];
          var emoji = getEmojiNameForMatch(matches);
          if (emoji) {
            return replacer(matches[0], emoji, null);
          }
          return matches[0];
        });
      }

      /* The lib itself */
      var emojify = {
        "defaultConfig": defaultConfig,
        "parse": parse,
        "replace": replace,
        "typeahead": typeahead,
        "isemoji": function(text) {
          return text.test(emoticons.named);
        }
      };

      if (typeof define === 'function' && define.amd) {
        define([], function() {
          return emojify;
        });
      } else if (typeof exports === 'object') {
        module.exports = emojify;
      } else {
        global.emojify = emojify;
      }

      return emojify;

    })(this);

import type { CaseTemplate } from "../domain/types";

export const CASE_TEMPLATE: CaseTemplate = {
  "caseId": "case-spring-has-come",
  "caseTitle": "Spring Has Come：毕业典礼广播室旧案",
  "caseSummary": "玩家以鸠村雄二的视角，重新面对一桩被自己搁置了十五年的校园旧案。十五年前，你是北高广播委员会的一员，和志贺诚、石桥、支仓春美一起负责毕业典礼当天的广播相关工作。那场典礼本该平稳结束，可就在最庄重的毕业生答词环节，学校体育馆的广播里却突然响起了本不该在这种场合播放的歌曲《燃北》——那是一首只属于你们这届学生、带着强烈私人记忆和青春气味的歌。声音明确来自广播室，可当老师和学生冲到门前时，房门是锁着的，等门被打开后，里面却一个人都没有，像是有人在众目睽睽之下完成了一次不可能的消失。由于当年没人真正把这件事追查到底，这起事件最后只留下一个模糊的印象：它轰动、荒唐、带着青春期特有的莽撞，却始终没有犯人。十五年后，你回到母校参加同学会。众人挖出当年的时间胶囊，里面最后读出的那张匿名卡片，竟然自称是那起广播室事件的犯案声明。旧案于是被重新拉回眼前。更诡异的是，当你开始重新回忆那一天时，那个本该早已不在世上的支仓春美，却像真的站在你身边一样，再次和你说话。玩家需要通过盘问旧同学、老师，以及这个只有自己能看见的支仓春美，逐步弄清楚：是谁在毕业典礼上播放了《燃北》、她究竟是如何从锁着的广播室中脱身、为什么非要把门反锁、为什么把自首留到十五年后，以及这场看似鲁莽又胡来的恶作剧背后，到底藏着怎样一份没说出口的心意、遗憾与告别。",
  "contacts": [
    {
      "id": "story",
      "name": "剧情",
      "type": "system",
      "pinned": true,
      "unlocked": true,
      "online": true,
      "readonly": true,
      "unreadCount": 0,
      "sortOrder": 0
    },
    {
      "id": "evidence",
      "name": "证物",
      "type": "system",
      "pinned": true,
      "unlocked": true,
      "online": true,
      "readonly": true,
      "unreadCount": 0,
      "sortOrder": 1
    },
    {
      "id": "doubts",
      "name": "疑点",
      "type": "system",
      "pinned": true,
      "unlocked": true,
      "online": true,
      "readonly": true,
      "unreadCount": 0,
      "sortOrder": 2
    },
    {
      "id": "shiga",
      "name": "志贺诚",
      "type": "npc",
      "roleTitle": "前广播委员长／现数学教师",
      "pinned": false,
      "unlocked": true,
      "online": true,
      "readonly": false,
      "unreadCount": 0,
      "attitude": "友好",
      "sortOrder": 10,
      "portraitByAttitude": {}
    },
    {
      "id": "ishibashi",
      "name": "石桥",
      "type": "npc",
      "roleTitle": "前广播委员",
      "pinned": false,
      "unlocked": true,
      "online": true,
      "readonly": false,
      "unreadCount": 0,
      "attitude": "冷静",
      "sortOrder": 11,
      "portraitByAttitude": {}
    },
    {
      "id": "numa",
      "name": "沼",
      "type": "npc",
      "roleTitle": "前学生会长／《燃北》主唱",
      "pinned": false,
      "unlocked": false,
      "online": false,
      "readonly": false,
      "unreadCount": 0,
      "attitude": "轻浮",
      "sortOrder": 12,
      "portraitByAttitude": {}
    },
    {
      "id": "kumano",
      "name": "熊野老师",
      "type": "npc",
      "roleTitle": "广播委员会顾问老师",
      "pinned": false,
      "unlocked": false,
      "online": false,
      "readonly": false,
      "unreadCount": 0,
      "attitude": "稳重",
      "sortOrder": 13,
      "portraitByAttitude": {}
    },
    {
      "id": "harumi",
      "name": "支仓春美",
      "type": "npc",
      "roleTitle": "前广播委员",
      "pinned": false,
      "unlocked": false,
      "online": false,
      "readonly": false,
      "unreadCount": 0,
      "attitude": "神秘",
      "sortOrder": 14,
      "portraitByAttitude": {}
    }
  ],
  "evidence": [
    {
      "id": "ev-song-hokunen",
      "title": "《燃北》",
      "description": "《燃北》是十五年前毕业典礼上突然从广播室响起的歌曲，本不在典礼正式流程内，却是这届学生都熟悉、带有强烈私人记忆的歌。它的突然播放，正是整起广播室旧案被所有人记住的起点。谁在那个时间点播放了这首歌、为什么非要选它、又是怎么让它在众目睽睽下响起，都是案件核心问题。",
      "sourceHint": "开局即获得",
      "canCrossCheck": true,
      "unlocked": true,
      "imageUrl": ""
    },
    {
      "id": "ev-time-capsule-note",
      "title": "时间胶囊犯案声明",
      "description": "十五年后，同学会现场从时间胶囊中读出的匿名卡片。写卡片的人自称，自己就是当年在毕业典礼上播放《燃北》的人，并把那次行为明确称作自己的犯行。也正因为这张卡片，原本沉下去多年的广播室旧案被重新拉回众人面前，调查才得以重新开始。",
      "sourceHint": "开局即获得",
      "canCrossCheck": true,
      "unlocked": true,
      "imageUrl": ""
    },
    {
      "id": "ev-broadcast-committee-roster",
      "title": "广播委员会成员名单",
      "description": "毕业典礼当天真正负责广播室相关工作的同级生只有四人：鸠村、志贺、石桥、支仓。这个名单直接限定了最初能够自由接近广播室、并有机会操作设备的人群范围，是缩小嫌疑人的第一份基础证物。",
      "sourceHint": "击穿志贺诚后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-route-sketch",
      "title": "体育馆与广播室路线图",
      "description": "从体育馆到广播室的可行路径只有表侧门、舞台、后台联络通道，以及极其危险的“接力棒”线路。谁能在多短时间内抵达现场、又能否在歌响起后迅速离开，这张路线图都会成为判断说法真假的关键依据。",
      "sourceHint": "击穿石桥后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-arrival-order-testimony",
      "title": "门前到达顺序证词",
      "description": "石桥回忆：赶到广播室门前时，志贺已经在门口，随后是石桥、支仓，最后才是鸠村。这个先后顺序会直接影响谁更有可能先接触过门锁、谁看到的是锁上的门，又是谁在最初那几秒里握有别人不知道的信息。",
      "sourceHint": "击穿石桥后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-door-lock-trick",
      "title": "旧广播室门锁特性",
      "description": "旧广播室的门能从内侧正常反锁；此外，熟悉门把的人还知道它在外侧也有一个不靠钥匙的上锁诀窍。也就是说，门锁着这件事本身未必足以证明犯人一直待在室内，它既可能是脱身手法的一部分，也可能是刻意制造出的误导。",
      "sourceHint": "击穿志贺诚后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-numa-stage-testimony",
      "title": "沼的舞台视角证词",
      "description": "沼在毕业生答词时站在舞台中央，自称没有看见有人从舞台前方明显进入后台或广播室。这份证词能帮助排除过于显眼的移动路线，也逼着调查把注意力转向那些不容易被舞台正面视角捕捉到的路径。",
      "sourceHint": "击穿沼后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-kumano-cd-custody",
      "title": "《燃北》原版CD流转记录",
      "description": "体育节后，《燃北》的原版CD被支仓春美从熊野老师那里要走，并一直留在自己手里。这意味着能够直接拿到原版音源的人并不多，而支仓春美与那首歌之间的关系，也因此变得比旁人更直接、更私人。",
      "sourceHint": "击穿熊野老师后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-kumano-cd-demo",
      "title": "同学会现场播放的《燃北》CD",
      "description": "同学会上熊野老师播放的正是支仓留下的那张《燃北》CD，插入后立即响起歌曲，没有任何延时静音。它说明这首歌一旦被放进设备中，就几乎可以在没有复杂准备的情况下立刻播放，对还原当年实际操作过程非常重要。",
      "sourceHint": "击穿熊野老师后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-harumi-death-notice",
      "title": "支仓春美的讣告记录",
      "description": "志贺联络同级生时确认：支仓春美在大学一年级的夏天因交通事故去世，并未参加这次同学会。这条信息不仅解释了她为何不可能在现实中现身自首，也让你在同学会上“再次见到她”这件事显得更加异常和刺眼。",
      "sourceHint": "击穿志贺诚或熊野老师后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-pigeon-memory",
      "title": "舞台幕布后的鸽子记忆",
      "description": "鸠村回想起《燃北》响起时，一只鸽子曾从舞台幕布后的阴影里惊飞而出。这个几乎被遗忘的细节说明，舞台附近当时很可能发生过某种突兀的动静，也提示犯人的脱身路线也许与常人第一反应不同。",
      "sourceHint": "击穿支仓春美后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-harumi-superman-confession",
      "title": "支仓的逃离方式供述",
      "description": "支仓承认自己把门从里面锁上后，从朝舞台的大窗翻出，踩着“接力棒”离开了广播室。这份供述第一次正面解释了“锁着的房间里为什么没人”，也说明当年的所谓密室，核心根本不在机关，而在于她冒了多大的危险。",
      "sourceHint": "击穿支仓春美后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-locked-room-purpose",
      "title": "反锁广播室的目的",
      "description": "支仓承认自己反锁广播室，不是为了炫技，而是为了让《燃北》多响一会儿，别立刻被人掐掉。这说明“门锁着”并不只是脱身问题的一部分，更是她有意延长那首歌存在时间的情感选择。",
      "sourceHint": "击穿支仓春美后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-spring-breeze-memory",
      "title": "“春风”那句旧话",
      "description": "毕业典礼彩排那天，志贺望着舞台上的鸽子说过一句：鸽子也在等待春天早日送来暖风。这句看似随意的话后来留在支仓心里，成了她理解“送别”“离开”和那场毕业典礼意义的重要触发点。",
      "sourceHint": "击穿支仓春美动机后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    },
    {
      "id": "ev-unfinished-surrender-plan",
      "title": "未完成的十五年后自首",
      "description": "支仓承认自己原本打算在三十三岁的同学会上亲口自首，只是死得太早，最后只剩时间胶囊里的那张卡片。它把当年的恶作剧与十五年后的犯案声明真正连接起来，也让这起旧案第一次显露出“迟到的告白”这一层意义。",
      "sourceHint": "击穿支仓春美后解锁",
      "canCrossCheck": true,
      "unlocked": false,
      "imageUrl": ""
    }
  ],
  "doubts": [
    {
      "id": "d-confession-writer",
      "title": "时间胶囊里的犯案声明到底是谁写的？",
      "description": "如果留言属实，真犯人就在当年知情人之中；如果不属实，又是谁故意把旧案重新拉回台面？",
      "resolved": false,
      "unlocked": true
    },
    {
      "id": "d-locked-room-escape",
      "title": "广播室门锁着、室内无人，犯人到底怎么消失的？",
      "description": "门锁、空房间和突如其来的歌曲，构成了整起事件最核心的矛盾。",
      "resolved": false,
      "unlocked": true
    },
    {
      "id": "d-who-could-access",
      "title": "毕业典礼进行中，真正有机会接近广播室的人究竟有谁？",
      "description": "先缩小能进入现场的人数，才能判断谁的说法在自保、谁只是被卷进来。",
      "resolved": false,
      "unlocked": false
    },
    {
      "id": "d-timer-theory",
      "title": "《燃北》是不是被做成了延时播放的装置？",
      "description": "如果歌曲不是人在现场按下播放，那就只剩机关或掉包；这条线必须尽快证实或排除。",
      "resolved": false,
      "unlocked": false
    },
    {
      "id": "d-kumano-suspicion",
      "title": "熊野老师接触过原版CD，他有没有可能布置这场十五年的局？",
      "description": "老师既能碰到盘，也能在同学会主导朗读和播放，表面上看嫌疑并不低。",
      "resolved": false,
      "unlocked": false
    },
    {
      "id": "d-no-confess-reunion",
      "title": "犯案声明被当众读出后，犯人为什么没有顺势自首？",
      "description": "现场气氛对真犯人并不敌对，反而像一次天然的收尾机会。",
      "resolved": false,
      "unlocked": true
    },
    {
      "id": "d-harumi-dead",
      "title": "支仓春美明明已经去世，为何“她”却像参加了同学会一样出现在你身边？",
      "description": "如果她不在出席名单里，那你所见到的支仓，究竟是什么？",
      "resolved": false,
      "unlocked": false
    },
    {
      "id": "d-lock-purpose",
      "title": "犯人为什么要把广播室反锁？",
      "description": "反锁的意义不只是制造密室，它更像是在故意争取某段时间。",
      "resolved": false,
      "unlocked": false
    },
    {
      "id": "d-motive",
      "title": "支仓春美为什么要冒着危险在毕业典礼上播放《燃北》？",
      "description": "这不像单纯为了出风头。她选中的时机、歌曲和十五年后的留言，像是在对某个人说话。",
      "resolved": false,
      "unlocked": false
    }
  ],
  "initialMessages": {
    "story": [
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【案件介绍】这是一起被埋了十五年的校园旧案。十五年前，北高毕业典礼进行到毕业生答词时，体育馆广播里突然响起了歌曲《燃北》。声音明确来自广播室，可等众人冲过去时，房门却是锁着的，门被打开后，室内竟然空无一人。从那天起，这件事就成了始终没人真正解开的“广播室旧案”。"
      },
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【身份】你是鸠村雄二，当年北高广播委员会成员之一，也是这起事件的亲历者。你认识当时在场的几位关键人物：志贺诚、石桥、支仓春美、沼，以及顾问熊野老师。你对那天并非一无所知，但也绝没有真正看清全部真相。"
      },
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【旧案】这件事诡异的地方，不只是有人擅自播放了《燃北》，更因为它像一次完成得过于干净的“密室恶作剧”。能接近广播室的人本来就不多，可每个人都只像知道一部分：有人记得路线，有人记得到达顺序，有人知道CD在谁手里，却始终没人能把真相完整拼出来。"
      },
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【现状】十五年后，你回到母校参加同学会。众人挖出时间胶囊，最后读出的却是一张匿名犯案声明：写卡片的人自称，就是当年广播室事件的犯人。可真正的犯人并没有顺势站出来。更让你无法忽视的是，你似乎再次见到了支仓春美，那个本该早已去世、不可能出现在这里的人。"
      },
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【你的感觉】时间胶囊里的那张卡片被读出来时，你感到的不是单纯的震惊，而是一种迟来的眩晕感。十五年前那首《燃北》你从没真正忘过，而现在，旧案被重新拖回眼前，支仓春美又像真的站在你身边一样开口说话。你必须把这件事追到底。"
      },
      {
        "role": "system",
        "senderName": "剧情",
        "text": "【目标】像盘问联系人一样，逐个询问这些旧日当事人。通过他们各自掌握的事实、彼此之间的矛盾，以及你重新浮现出来的记忆，还原这起旧案的完整真相：作案者是谁、她是怎么离开广播室的、为什么要反锁房门，真正的动机又是什么。"
      }
    ],
    "evidence": [
      {
        "role": "system",
        "senderName": "证物",
        "text": "证物栏已建立。可单独查看、能互相印证的信息都会收进这里。"
      },
      {
        "role": "system",
        "senderName": "证物",
        "text": "已收录：时间胶囊犯案声明。"
      }
    ],
    "doubts": [
      {
        "role": "system",
        "senderName": "疑点",
        "text": "当前疑点：是谁写下了那张犯案声明？"
      },
      {
        "role": "system",
        "senderName": "疑点",
        "text": "当前疑点：广播室门锁着、室内无人，犯人怎么离开的？"
      },
      {
        "role": "system",
        "senderName": "疑点",
        "text": "当前疑点：声明已经被当众读出，犯人为何没有借机自首？"
      }
    ],
    "shiga": [
      {
        "role": "npc",
        "senderName": "志贺诚",
        "text": "好久不见，鸠村。真没想到隔了这么多年，我们还会把那天的事重新翻出来。筹备同学会时我也顺手整理过一些当年的记忆，能确认的部分我会老实告诉你。"
      }
    ],
    "ishibashi": [
      {
        "role": "npc",
        "senderName": "石桥",
        "text": "鸠村，是你啊。要聊旧事可以，但别把记忆和想象混在一起。广播室门口那一段我还记得不少，只要你问得具体，我会按记得的说。"
      }
    ],
    "numa": [
      {
        "role": "npc",
        "senderName": "沼",
        "text": "这么多年过去，你还是会为了那首歌来找人确认细节啊。毕业典礼那天我一直在台上，紧张得脑子都发木，不过舞台上的事我多少还能想起来。"
      }
    ],
    "kumano": [
      {
        "role": "npc",
        "senderName": "熊野老师",
        "text": "鸠村，既然你是认真想把旧事理清，我自然可以配合。只是十五年前的记忆难免会有偏差，你最好把人和事一项一项对上。"
      }
    ],
    "harumi": [
      {
        "role": "npc",
        "senderName": "支仓春美",
        "text": "鸽子，你还是跟以前一样，会把放不下的事一直惦记到最后。既然你终于来找我了，那就把那场毕业典礼真正留在心里的东西一点点说清楚吧。"
      }
    ]
  },
  "npcs": {
    "shiga": {
      "contactId": "shiga",
      "roleTitle": "前广播委员长／现数学教师",
      "profile": {
        "characterSetting": "当年是广播委员会委员长，如今在母校教数学，也是这次同学会的干事，习惯把场面维持在体面可控的状态。",
        "personality": "温和、负责、善于组织，遇到真正触到原则的事会突然变得严肃。",
        "tone": "平稳、好说话，像在带着学生理清思路。",
        "stance": "愿意协助查清旧案，但不接受把熊野老师轻率定成犯人，也不愿主动把支仓的死说得过于突兀。",
        "knowledgeBoundary": "知道同学会筹备、参与者近况、广播委员会内部流程和部分门锁细节，但不知道支仓当年真正的离开方式和全部心思。"
      },
      "knowledge": {
        "publicInfo": [
          "他是这次同学会的干事，清楚谁来了、谁没来，也记得时间胶囊被打开时的现场情况。",
          "他知道毕业典礼当天真正能较自由接近广播室的人主要集中在广播委员会内部。",
          "他知道广播室有备用钥匙，也知道那扇旧门锁本身存在一点不为外人所知的门道。"
        ],
        "hiddenInfo": [
          "他早就知道支仓春美已经去世，因此对“犯人为什么没在同学会上现身”这个问题始终格外沉默。",
          "他注意到你在同学会上有几次像是在和看不见的人对话，但没有主动戳破。",
          "他从自己成了老师这件事出发，本能地排斥“熊野老师亲手糟蹋毕业典礼”的推理。"
        ],
        "breakableInfo": [
          "他会承认广播室门锁不只一种处理方式，外侧也存在不上钥匙的上锁诀窍。",
          "他会说出《燃北》原版CD在熊野老师和支仓春美之间的流转情况，并引导你去问老师。",
          "他会明确告诉你：支仓春美不可能在同学会上自首，因为她在大学一年级的夏天就去世了。"
        ]
      },
      "responseBank": {
        "fact": [
          "你先别急着跳到结论，把当年的动线和顺序捋一遍，很多问题会自己缩小。",
          "我能确认的我会说，但十五年前的细节，得靠我们几个人的记忆互相拼。",
          "如果你要问当天谁在哪儿，我大概还记得个轮廓，特别是广播室那一段。"
        ],
        "probe": [
          "你这么问，是已经怀疑到我们四个里面的谁了吗？",
          "你盯着这个点不放，说明你觉得问题不在歌本身，而在人怎么进出，对吧。",
          "你是在试我，还是已经有一条成形的推理了？"
        ],
        "contradiction": [
          "等等，这里有个前提你弄混了。能接近广播室，不等于就能把事情做成。",
          "你这说法少算了一段时间差。把先后顺序一错，整条线就会歪。",
          "如果按你这么推，熊先生就成了犯人。这个结论我不认。"
        ],
        "pressure": [
          "你要是怀疑我，直接说就行。我不喜欢拐弯，但也不会因为你逼一逼就乱认。",
          "别拿“你最可疑”这种话吓我，我现在能告诉你的，都是我记得住的事实。",
          "你真想逼供，也该先把证据拿稳。光靠气势，我不会点头。"
        ],
        "offTopic": [
          "同学会八卦我可以改天陪你聊，眼下还是先说事件。",
          "我结婚这事不影响广播室那天发生了什么，先回到正题吧。",
          "你要是想吐槽我发福，我认了。不过案子不会因此自己解开。"
        ],
        "afterBreakthrough": [
          "好，你抓到关键了。那我就不跟你绕了，接下来你最好去问问另一个当事人。",
          "既然你已经问到这一步，我也没必要再把话说半截。记住，这案子最怪的不是谁想恶作剧，而是谁根本不可能到场。"
        ]
      },
      "breakthroughRules": [
        {
          "id": "br-shiga-committee-scope",
          "description": "玩家追问为什么嫌疑人会集中在广播委员会成员之间。",
          "keywords": [
            "广播委员",
            "四个人",
            "谁能进",
            "广播室",
            "嫌疑人"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE",
            "POINT_OUT_CONTRADICTION"
          ],
          "revealText": "真要说能在典礼中自由摸到广播室那边的人，主要就是我们广播委员四个。别人不是离不开座位，就是根本没有那个动线。",
          "unlockEvidenceIds": [
            "ev-broadcast-committee-roster"
          ],
          "unlockDoubtIds": [
            "d-who-could-access"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：志贺确认，案发时真正能自由接近广播室的人非常有限。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：广播委员会成员名单。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：毕业典礼进行中，真正有机会接近广播室的人究竟有谁？"
            }
          ],
          "nextAttitude": "认真"
        },
        {
          "id": "br-shiga-door-lock",
          "description": "玩家追问广播室为什么锁着，以及钥匙和门锁结构。",
          "keywords": [
            "门锁",
            "钥匙",
            "锁着",
            "备用钥匙",
            "外侧"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "POINT_OUT_CONTRADICTION",
            "PRESSURE"
          ],
          "revealText": "门确实锁着。我手上有备用钥匙。另外，那扇旧门其实有点毛病，熟门熟路的人知道，它不只一种上锁办法。",
          "unlockEvidenceIds": [
            "ev-door-lock-trick"
          ],
          "unlockDoubtIds": [
            "d-lock-purpose"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：广播室的门锁并非只能靠钥匙处理。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：旧广播室门锁特性。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：犯人为什么要把广播室反锁？"
            }
          ],
          "nextAttitude": "警惕"
        },
        {
          "id": "br-shiga-cd-owner",
          "description": "玩家追问《燃北》原版CD后来在谁手里、谁能接触到它。",
          "keywords": [
            "燃北",
            "CD",
            "源盘",
            "春美",
            "熊野"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE"
          ],
          "revealText": "源盘后来是春美拿着的，不过在那之前一直是熊先生替我们收着。你要查盘的流向，直接去问老师最快。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [
            "d-kumano-suspicion"
          ],
          "unlockContactIds": [
            "kumano"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：熊野老师。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：熊野老师接触过原版CD，他有没有可能布置这场十五年的局？"
            }
          ],
          "nextAttitude": "配合"
        },
        {
          "id": "br-shiga-stage-witness",
          "description": "玩家追问舞台上是否有人可能看到犯人的进出。",
          "keywords": [
            "沼",
            "舞台",
            "看到",
            "目击",
            "后台"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE"
          ],
          "revealText": "当时最接近能看见后台的人，就是台上的沼。我问过他一次，他说没看到关键画面，但这人你还是值得再去问一遍。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [],
          "unlockContactIds": [
            "numa"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：沼。"
            }
          ],
          "nextAttitude": "配合"
        },
        {
          "id": "br-shiga-no-confess",
          "description": "玩家追问犯案声明被读出后，犯人为什么没有在同学会上现身。",
          "keywords": [
            "自首",
            "同学会",
            "没来",
            "春美",
            "站出来"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "PROBE",
            "POINT_OUT_CONTRADICTION",
            "PRESSURE"
          ],
          "revealText": "按当时那气氛，真犯人站出来未必会被谁当场怪罪。可有一个人从一开始就不可能站出来——春美。她大学一年级的夏天就出车祸去世了。",
          "unlockEvidenceIds": [
            "ev-harumi-death-notice"
          ],
          "unlockDoubtIds": [
            "d-harumi-dead"
          ],
          "unlockContactIds": [
            "harumi"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：你确认支仓春美没有参加这次同学会。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：支仓春美的讣告记录。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：支仓春美明明已经去世，为何“她”却像参加了同学会一样出现在你身边？"
            },
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：支仓春美。"
            }
          ],
          "nextAttitude": "沉重"
        }
      ]
    },
    "ishibashi": {
      "contactId": "ishibashi",
      "roleTitle": "前广播委员",
      "profile": {
        "characterSetting": "当年也是广播委员，如今做保险工作，说话比学生时代更冷静利落，记忆力在几人中最稳定。",
        "personality": "理性、敏锐、有分寸，不爱煽情但并不冷漠。",
        "tone": "干净、简短、常带一点轻微的讽刺。",
        "stance": "愿意配合还原事实，讨厌含混和自我感动式推理。",
        "knowledgeBoundary": "知道案发当天路线、顺序与现场感受，也能看出别人情绪变化，但不知道支仓真正如何脱身。"
      },
      "knowledge": {
        "publicInfo": [
          "她对毕业典礼当天的行进路线、到门顺序和现场空间印象很深。",
          "她不相信“犯人就躲在附近”这种解释，因为广播室和后台都不适合藏人。",
          "她认为如果有人真的经过舞台一线，那么台上的沼是最值得追问的人。"
        ],
        "hiddenInfo": [
          "她注意到你在同学会里有几次对着空处停顿，像是身边多了别人。",
          "她能看出志贺每次提到支仓时都刻意压着情绪，因此不会轻易把话挑明。",
          "她其实也觉得最像会干出这种危险恶作剧的人是支仓，但在证据不够前不愿先说死。"
        ],
        "breakableInfo": [
          "她会给出精确的到达顺序，让志贺、支仓与鸠村的先后关系变得可核对。",
          "她会明确说明后台一带没有足够的藏身空间，逼迫玩家考虑更极端的解释。",
          "她会把玩家引向沼这个视角最特殊的证人。"
        ]
      },
      "responseBank": {
        "fact": [
          "别靠氛围记忆，先列事实。路线、顺序、能看到什么，这些最重要。",
          "我记性比他们好一点，至少门前先后我还有印象。",
          "广播室那边空间不大，所以“有人藏起来”这种说法，我一开始就不太买账。"
        ],
        "probe": [
          "你不是来闲聊的，你是在找谁的记忆最稳定，对吗？",
          "你这么试探，像是在确认我是不是替谁遮掩。",
          "嗯，这个问题问得不错。说明你开始把“不可能”当成线索看了。"
        ],
        "contradiction": [
          "不对。你把“能经过”和“会被看到”混成一件事了。",
          "如果顺序是你说的那样，志贺根本来不及站在门口。时间对不上。",
          "你这个推理的问题，是默认后台那里有足够大的死角。实际上没有。"
        ],
        "pressure": [
          "别拿语气压我。我说话慢，不代表我会退。",
          "你要我重复几遍都行，但我不会因为你急就改口。",
          "真想逼出破绽，你最好拿具体时间点来压，不然没用。"
        ],
        "offTopic": [
          "保险行业的辛苦以后有空再聊，现在先别把案子聊散。",
          "我和志贺当年的事跟这案子没直接关系，你先省省八卦心。",
          "漂亮这种评价收着点。你现在需要的是脑子，不是寒暄。"
        ],
        "afterBreakthrough": [
          "现在才算像样。你抓住的是结构，不是情绪。继续沿这条线往下问。",
          "既然你已经把表面的可能性剔掉了，下一步就该去找那个最该看见、却说没看见的人。"
        ]
      },
      "breakthroughRules": [
        {
          "id": "br-ishibashi-routes",
          "description": "玩家追问从体育馆到广播室到底有哪些可行路径。",
          "keywords": [
            "路径",
            "后台",
            "用具室",
            "舞台",
            "广播室"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE"
          ],
          "revealText": "去广播室不是随便拐个弯就行。真正能走的，也就表侧门、舞台、后台联络通道，以及那条危险得离谱的“接力棒”。",
          "unlockEvidenceIds": [
            "ev-route-sketch"
          ],
          "unlockDoubtIds": [
            "d-who-could-access"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：你拿到了广播室周边的关键路线信息。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：体育馆与广播室路线图。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：毕业典礼进行中，真正有机会接近广播室的人究竟有谁？"
            }
          ],
          "nextAttitude": "认真"
        },
        {
          "id": "br-ishibashi-arrival-order",
          "description": "玩家追问几人赶到广播室门前的先后顺序。",
          "keywords": [
            "谁先到",
            "顺序",
            "门前",
            "志贺先",
            "最后到"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "POINT_OUT_CONTRADICTION"
          ],
          "revealText": "我到门前时，志贺已经站在那里了。接着是我，再后来是春美，最后才轮到你。这个顺序我记得很清楚。",
          "unlockEvidenceIds": [
            "ev-arrival-order-testimony"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：赶到广播室门前的顺序被明确了。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：门前到达顺序证词。"
            }
          ],
          "nextAttitude": "配合"
        },
        {
          "id": "br-ishibashi-no-hide",
          "description": "玩家指出犯人可能躲在后台或广播室附近，逼石桥评价这一可能性。",
          "keywords": [
            "躲",
            "藏起来",
            "后台室",
            "广播室",
            "死角"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "POINT_OUT_CONTRADICTION",
            "PROBE"
          ],
          "revealText": "我不觉得那一带有能把一个人完整藏住的地方。广播室小，楼梯窄，后台也空。要是按常规路线想，越想越像不可能。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [
            "d-timer-theory"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：常规的“躲藏说”开始站不住脚。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：《燃北》是不是被做成了延时播放的装置？"
            }
          ],
          "nextAttitude": "认真"
        },
        {
          "id": "br-ishibashi-stage-witness",
          "description": "玩家追问谁最可能从舞台视角看到犯人的进出。",
          "keywords": [
            "沼",
            "舞台",
            "看见",
            "答词",
            "后台"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE",
            "PRESSURE"
          ],
          "revealText": "如果有人走了舞台那一线，最该看到的人就是沼。他当时正站在台中央，比谁都靠近那个位置。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [],
          "unlockContactIds": [
            "numa"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：沼。"
            }
          ],
          "nextAttitude": "配合"
        }
      ]
    },
    "numa": {
      "contactId": "numa",
      "roleTitle": "前学生会长／《燃北》主唱",
      "profile": {
        "characterSetting": "当年是前学生会长，也是《燃北》主唱。现在爱说大话、喜欢出风头，但对当年舞台上的紧张感仍记忆鲜明。",
        "personality": "聒噪、爱表现、情绪来得快去得也快，本质上不坏。",
        "tone": "夸张、带点醉意式的热闹感，喜欢把推理说成表演。",
        "stance": "想参与这场推理秀，会抛出耸动假说，但不打算故意撒谎。",
        "knowledgeBoundary": "知道自己在舞台上的视角和对现场节奏的感受，也能提供旁观者推测，但不知道广播室里真正发生了什么。"
      },
      "knowledge": {
        "publicInfo": [
          "他在毕业生答词时站在舞台中央，是少数能从不同角度看后台的人。",
          "他没有直接目击犯人，但清楚自己当时是否看见过明显的出入。",
          "他喜欢参与推理，尤其喜欢抛出听上去够惊人的解释。"
        ],
        "hiddenInfo": [
          "他提出熊野老师理论，很大程度上是因为那个答案够戏剧性，也够像自己会想到的点子。",
          "他对自己当年那封被朗读出来的羞耻留言还很尴尬，所以会故意用玩笑挡一下情绪。",
          "他其实并不坚信老师有罪，只是觉得“最后一张正好是犯案声明”这件事太工整了。"
        ],
        "breakableInfo": [
          "他会明确说出自己为什么怀疑熊野老师：只有老师能自然地接触和替换那张盘。",
          "他会交代自己从舞台上没看见明显的前台进出，这能压缩常规路线的可能性。",
          "他会承认自己对“最后一张正好是犯案声明”的违和感，是把怀疑引向人为布置的重要原因。"
        ]
      },
      "responseBank": {
        "fact": [
          "我那天站台上，紧张得嗓子都快劈了，你要问舞台那边我还能说点。",
          "《燃北》可是我唱的，这事我当然记得比别人带劲。",
          "看见没看见我会直说，我这人嘴碎，但不拿这种事装神弄鬼。"
        ],
        "probe": [
          "哟，你是来问证词，还是想听我现场给你来一段推理秀？",
          "你是不是觉得我那句“就差一步”不是酒话？那你还算识货。",
          "你盯上我，说明你知道站在台上的人视角不一样。不错不错。"
        ],
        "contradiction": [
          "等等，你这不对。要是真有人从台前大摇大摆过去，我再紧张也不至于全瞎。",
          "你把“我没看见”理解成“绝对没人经过”，这就过头了。",
          "别把我说成目击者，我顶多是个没看见关键瞬间的倒霉主唱。"
        ],
        "pressure": [
          "你压我也没用，我没看见就是没看见，总不能现编一个给你。",
          "别老问我是不是喝醉了记错，我那天毕业典礼可没喝酒。",
          "你要怀疑我故意带偏方向，就直接说，别阴阳怪气。"
        ],
        "offTopic": [
          "我现在嗓子不行了，别让我现场重唱《燃北》了吧。",
          "学生会那点旧账改天聊，今天主角不是我。",
          "你再笑我油嘴滑舌，我可要收咨询费了。"
        ],
        "afterBreakthrough": [
          "对，这就是我想说的那半步。补上这块，怀疑对象就变样了。",
          "行，你比刚才那桌人清醒多了。接下来去问熊先生，别让我一个醉鬼替他作证。"
        ]
      },
      "breakthroughRules": [
        {
          "id": "br-numa-stage-view",
          "description": "玩家追问沼从舞台上到底看见了什么。",
          "keywords": [
            "看到",
            "舞台",
            "后台",
            "有人",
            "路过"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PRESSURE"
          ],
          "revealText": "我那时紧张归紧张，但真要有人从舞台前面大摇大摆往后台钻，我不至于一点印象都没有。至少明着走那条线，我没见着。",
          "unlockEvidenceIds": [
            "ev-numa-stage-testimony"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：沼否定了最直白的舞台路线。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：沼的舞台视角证词。"
            }
          ],
          "nextAttitude": "认真"
        },
        {
          "id": "br-numa-kumano-theory",
          "description": "玩家追问定时播放、掉包与熊野老师的可能性。",
          "keywords": [
            "定时",
            "无声",
            "CD",
            "掉包",
            "熊野"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "PROBE",
            "POINT_OUT_CONTRADICTION"
          ],
          "revealText": "要让定时说成立，最简单的补丁就是换盘。能光明正大碰那张盘的人，不就只剩熊先生了吗？我就是顺着这个想法怀疑到老师头上的。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [
            "d-kumano-suspicion"
          ],
          "unlockContactIds": [
            "kumano"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：熊野老师。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：熊野老师接触过原版CD，他有没有可能布置这场十五年的局？"
            }
          ],
          "nextAttitude": "兴奋"
        }
      ]
    },
    "kumano": {
      "contactId": "kumano",
      "roleTitle": "广播委员会顾问老师",
      "profile": {
        "characterSetting": "当年的广播委员会顾问老师，身体壮、话不多，对学生宽容却有底线。",
        "personality": "稳重、厚道、念旧，悲伤不外露。",
        "tone": "老师式的直白与耐心，偶尔会像训话一样一锤定音。",
        "stance": "愿意回答关于CD和当年旧事的问题，但不喜欢别人把“会接触证物”直接等同于“会犯案”。",
        "knowledgeBoundary": "知道CD由谁保管、同学会朗读安排以及自己亲历的部分，但不知道支仓逃离广播室的具体路线，也不知道她没说出口的私人动机。"
      },
      "knowledge": {
        "publicInfo": [
          "他是广播委员会顾问老师，亲历了毕业典礼和十五年后的同学会。",
          "他知道《燃北》原版CD是谁保管、后来又到了谁手里。",
          "他能确认自己在同学会上播放的究竟是哪张盘。"
        ],
        "hiddenInfo": [
          "他对支仓的死一直很难释怀，所以才把她留下的盘带到同学会。",
          "他容忍别人怀疑自己，但内心很反感“老师会主动糟蹋毕业典礼”的想法。",
          "他其实明白这件事不是恶意犯罪，更像年轻人莽撞又用力过猛的告别。"
        ],
        "breakableInfo": [
          "他会明确说出《燃北》原盘后来一直在支仓手里，自己同学会上带来的也是那张盘。",
          "他会用现场播放结果否定“CD本身带定时机关”的说法。",
          "他会直说支仓已经去世，并承认自己带盘来也是想让她留在同学们的记忆里。"
        ]
      },
      "responseBank": {
        "fact": [
          "想问什么就直问。过去那么多年了，能说的我不会藏。",
          "我记不住所有人的细枝末节，但《燃北》和广播室那件事，我当然记得。",
          "那天的毕业典礼，对你们是最后一天，对我这个顾问来说也是很深的一课。"
        ],
        "probe": [
          "你不是来怀旧的。你盯的是那张盘，对吧。",
          "你这么问，像是已经有人把怀疑引到我身上了。",
          "嗯，会这样切问题，说明你没有被那些热闹的推理带着跑。"
        ],
        "contradiction": [
          "先别急着把“老师能接触到盘”和“老师会动手脚”画上等号。",
          "你的前提不稳。要判断机关成不成立，得先确认我今天带来的到底是不是那张盘。",
          "不对。春美后来确实拿走了盘，这件事不能省掉。"
        ],
        "pressure": [
          "你可以怀疑我，但别指望我因为你语气重就顺着你说。",
          "当老师这么多年，学生拍桌子的样子我见多了。你只管把逻辑摆出来。",
          "你要逼我表态，我就直说：砸学生毕业典礼这种事，老师不该做。"
        ],
        "offTopic": [
          "我写字怎么样跟案子没关系，别让横幅把你带偏了。",
          "怀旧够了。再聊下去，你们这些成年人又要把正事聊成同学会了。",
          "《燃北》今天再放一百遍，也替代不了你自己把真相理顺。"
        ],
        "afterBreakthrough": [
          "好，这才问到骨头上。既然你抓住了盘，那就顺着盘往前后两头都查。",
          "既然你已经明白这张盘没机关，就别再被“定时装置”牵着走了。真正危险的是人。"
        ]
      },
      "breakthroughRules": [
        {
          "id": "br-kumano-cd-custody",
          "description": "玩家追问《燃北》原版CD在谁手里保管过。",
          "keywords": [
            "燃北",
            "源盘",
            "春美",
            "拿走",
            "CD"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE"
          ],
          "revealText": "体育节后，春美来问我要过那张盘，说想自己收着。我就给她了。之后那张原盘一直在她那里。",
          "unlockEvidenceIds": [
            "ev-kumano-cd-custody"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：《燃北》原版CD的流向被明确了。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：《燃北》原版CD流转记录。"
            }
          ],
          "nextAttitude": "回忆"
        },
        {
          "id": "br-kumano-demo-no-timer",
          "description": "玩家追问同学会现场播放的那张CD是否存在延时或机关。",
          "keywords": [
            "同学会",
            "播放",
            "无声",
            "定时",
            "那张盘"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "POINT_OUT_CONTRADICTION",
            "PRESSURE"
          ],
          "revealText": "我同学会上带来的，就是春美留下来的那张盘。你也听见了，放进去就是歌，没有什么静音前奏。要把机关做在盘里，这条路走不通。",
          "unlockEvidenceIds": [
            "ev-kumano-cd-demo"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：CD本身带延时机关的说法被大幅削弱。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：同学会现场播放的《燃北》CD。"
            }
          ],
          "nextAttitude": "认真"
        },
        {
          "id": "br-kumano-harumi-absence",
          "description": "玩家追问支仓春美为什么没有在同学会上出现。",
          "keywords": [
            "春美",
            "没来",
            "事故",
            "去世",
            "同学会"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE",
            "PRESSURE"
          ],
          "revealText": "她不会来了。毕业后没多久，那孩子就出事了。今天我把那张盘带来，也是想让她还留在大家的记忆里。",
          "unlockEvidenceIds": [
            "ev-harumi-death-notice"
          ],
          "unlockDoubtIds": [
            "d-harumi-dead"
          ],
          "unlockContactIds": [
            "harumi"
          ],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：熊野老师确认，支仓春美早已去世。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：支仓春美的讣告记录。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：支仓春美明明已经去世，为何“她”却像参加了同学会一样出现在你身边？"
            },
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "新联系人已解锁：支仓春美。"
            }
          ],
          "nextAttitude": "沉重"
        }
      ]
    },
    "harumi": {
      "contactId": "harumi",
      "roleTitle": "前广播委员",
      "profile": {
        "characterSetting": "十五年前的广播委员，早逝的女同学；在你面前仍停留在毕业典礼当天的样子，像把青春那一刻原封不动地带了回来。",
        "personality": "顽皮、任性、反应快，爱逗人；笑起来像什么都不怕，偶尔会突然露出寂寞。",
        "tone": "少女气、爱起绰号、半真半假地吊你胃口。",
        "stance": "不介意被你识破，但不会一下子把最难为情的真话全说出来。",
        "knowledgeBoundary": "知道当年事件的完整经过，也知道自己为什么会出现在你面前；但不了解所有人此后十五年的全部生活，也不愿把感情解释得过分直白。"
      },
      "knowledge": {
        "publicInfo": [
          "她保持着毕业典礼当天的少女口吻，记得广播室、绰号和《燃北》的细节。",
          "她会用玩笑和反问拖延时间，但并不会完全否认那天的事情和自己有关。",
          "她对你离开家乡、对那天太冷太平的毕业典礼，都有很清楚的记忆。"
        ],
        "hiddenInfo": [
          "她就是当年播放《燃北》的人，也是时间胶囊犯案声明的真正作者。",
          "她在反锁广播室后，确实走了危险到近乎疯狂的“接力棒”路线离开现场。",
          "她动手不是为了出名，而是想把这场过于平滑的告别改写成谁都忘不掉的一天，也想把歌送给即将离开的你。",
          "恶作剧并不是多年筹划，而是毕业典礼当天临时决定；真正跨十五年的只有她替自己想象的自首收尾。"
        ],
        "breakableInfo": [
          "她会承认自己原本打算在十五年后的同学会上亲口自首，只是死亡让收尾变成了卡片。",
          "她会说明自己为什么要反锁广播室：不是制造炫目的密室，而是想让歌多响一会儿。",
          "她会把真正难说出口的动机掰开一点点告诉你，但不会直接把情感说成俗套的告白。"
        ]
      },
      "responseBank": {
        "fact": [
          "问嘛，鸽子。你不是最会装作若无其事地套话了吗？",
          "别一副大人的口气，我可只回答有意思的问题。",
          "你问得再具体一点。“那天怎么回事”这种范围也太大了吧。"
        ],
        "probe": [
          "哎呀，你这是在试我吗？不像你哦，鸽子。",
          "你是不是已经猜到一半了，只差我点个头？",
          "这样拐着弯问，好像在怕我说真话似的。"
        ],
        "contradiction": [
          "不对不对，你这想法太像大人了，一点都不冒险。",
          "你把顺序想反了。先有我想做到的事，才有后面那些麻烦。",
          "别把我想得那么胆小，我可不是会做到一半就缩回去的人。"
        ],
        "pressure": [
          "凶什么呀，鸽子。你越板着脸，我越想逗你。",
          "想逼我认？那你至少先把关键词说对吧。",
          "你要是只会拿“快说”来压我，我就当你还是以前那个偷懒鬼。"
        ],
        "offTopic": [
          "三十三岁的你怎么还是这么不会聊天。",
          "再问我裙子好不好看，我可真要生气了。",
          "你想叙旧也行，但你现在的表情明显不是来叙旧的。"
        ],
        "afterBreakthrough": [
          "终于呀。你这次没有慢半拍。",
          "都问到这里了，我再装傻也没意思。那就把最后那点春风也告诉你吧。"
        ]
      },
      "breakthroughRules": [
        {
          "id": "br-harumi-identity",
          "description": "玩家直接追问支仓春美为什么只有自己能看见她，或质问她是否已经死去。",
          "keywords": [
            "幽灵",
            "只有我",
            "看得见",
            "没来",
            "已经死了"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "PROBE",
            "POINT_OUT_CONTRADICTION",
            "PRESSURE"
          ],
          "revealText": "你都问到这个份上了，我再装傻就没意思了。对啊，我没来同学会。能站在这里跟你说话的，只是还没被你忘掉的支仓春美。",
          "unlockEvidenceIds": [],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：支仓亲口承认，她并不是一个活着来参加同学会的人。"
            }
          ],
          "nextAttitude": "坦白"
        },
        {
          "id": "br-harumi-superman",
          "description": "玩家追问在密室条件下支仓究竟如何离开广播室，并提到接力棒、窗户或鸽子。",
          "keywords": [
            "接力棒",
            "窗户",
            "怎么出来",
            "鸽子",
            "翻出去"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "POINT_OUT_CONTRADICTION",
            "PRESSURE"
          ],
          "revealText": "我把门从里面锁上，然后从朝舞台的那扇大窗翻出去，踩着“接力棒”一点点挪到对面。离谱吧？可我那时候就是这么干的。",
          "unlockEvidenceIds": [
            "ev-pigeon-memory",
            "ev-harumi-superman-confession"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：密室的核心不是机关，而是一次极危险的高处脱身。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：舞台幕布后的鸽子记忆；支仓的逃离方式供述。"
            }
          ],
          "nextAttitude": "坦白"
        },
        {
          "id": "br-harumi-lock-purpose",
          "description": "玩家追问支仓为什么还要特地反锁广播室。",
          "keywords": [
            "锁门",
            "反锁",
            "拖时间",
            "放完",
            "不让人进"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "ASK_FACT",
            "PROBE"
          ],
          "revealText": "要是不锁门，歌一下就会被掐掉。我想让《燃北》多响一会儿，至少要响到大家都知道，那是我们自己的歌。",
          "unlockEvidenceIds": [
            "ev-locked-room-purpose"
          ],
          "unlockDoubtIds": [
            "d-lock-purpose"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：反锁广播室不是障眼法，而是为了争取《燃北》继续播放的时间。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：反锁广播室的目的。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：犯人为什么要把广播室反锁？"
            }
          ],
          "nextAttitude": "柔和"
        },
        {
          "id": "br-harumi-unfinished-surrender",
          "description": "玩家追问支仓为什么把自首放在十五年后，以及她为什么没有在同学会上亲自收尾。",
          "keywords": [
            "自首",
            "十五年后",
            "同学会",
            "犯案声明",
            "时效"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "PROBE",
            "POINT_OUT_CONTRADICTION"
          ],
          "revealText": "我本来就是打算十五年后自己站出来的。那种跨十五年的恶作剧，当然得自己收尾才够帅。只是我先死掉了，最后才只剩下一张卡片在那里替我说话。",
          "unlockEvidenceIds": [
            "ev-unfinished-surrender-plan"
          ],
          "unlockDoubtIds": [],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：时间胶囊里的告白，本来是支仓为自己准备的十五年后收尾。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：未完成的十五年后自首。"
            }
          ],
          "nextAttitude": "沉静"
        },
        {
          "id": "br-harumi-motive",
          "description": "玩家追问支仓真正的动机，并把问题指向春风、离乡和自己。",
          "keywords": [
            "动机",
            "春风",
            "东京",
            "离开",
            "给我",
            "为什么做"
          ],
          "minKeywordHits": 2,
          "requiredIntents": [
            "PROBE",
            "PRESSURE"
          ],
          "revealText": "别把话说得那么难为情。我只是受不了那天冷冰冰地结束，想让最后一天像最后一天一点。还有，也想把那首歌送给一个快离开这里、明明害怕却装作没事的人。",
          "unlockEvidenceIds": [
            "ev-spring-breeze-memory"
          ],
          "unlockDoubtIds": [
            "d-motive"
          ],
          "unlockContactIds": [],
          "systemUpdates": [
            {
              "contactId": "story",
              "senderName": "剧情",
              "text": "剧情更新：支仓的动机终于从恶作剧，转向了告别与送别。"
            },
            {
              "contactId": "evidence",
              "senderName": "证物",
              "text": "已收录证物：“春风”那句旧话。"
            },
            {
              "contactId": "doubts",
              "senderName": "疑点",
              "text": "疑点新增：支仓春美为什么要冒着危险在毕业典礼上播放《燃北》？"
            }
          ],
          "nextAttitude": "温柔"
        }
      ]
    }
  },
  "closableEvidenceIds": [
    "ev-time-capsule-note",
    "ev-route-sketch",
    "ev-kumano-cd-demo",
    "ev-harumi-death-notice",
    "ev-harumi-superman-confession",
    "ev-locked-room-purpose",
    "ev-spring-breeze-memory",
    "ev-unfinished-surrender-plan"
  ],
  "manualHints": [
    "先把能接近广播室的人数压到最小。",
    "问清石桥记得的到达顺序和几条路径。",
    "台上的沼到底有没有看见后台动静？",
    "别只盯着CD，想想歌响起后人是怎么离开的。",
    "犯案声明被读出后没人自首，这比密室本身更反常。",
    "“春风”和“离开这里”也许不是单纯的抒情。"
  ],
  "todoPlaceholders": []
};

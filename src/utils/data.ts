import { IServersInfoData } from "../types/servers";

export const payeerData = {
  m_shop: "1625120381",
  m_curr: "RUB",
};

export const paypalychData = {
  action: "initPayment",
  project: 565,
  currency: "RUB",
};

export const serversData: IServersInfoData = {
  TechnoMagic: {
    info: {
      description: `TechnoMagic - это сервер, где вы сможете погрузиться в захватывающий мир, 
      создавать магические артефакты и разрабатывать передовые технологии. 
      Мы уверены, что вас ждут увлекательные приключения и множество задач, 
      которые вы сможете решать вместе с другими игроками.`,
      mods: [
        { name: "Industrial Craft 2" },
        { name: "Advanced Solar Panels" },
        { name: "GraviSuite" },
        { name: "BiblioCraft", version: "1.1" },
        { name: "DropPhysic", version: "1.1" },
        { name: "DynamicSurroundings", version: "1.1" },
        { name: "ForbiddenMagic" },
        { name: "Forestry", version: "4.2" },
        { name: "IronChest", version: "6.0" },
        { name: "JourneyMap", version: "5.1" },
        { name: "MixMod", version: "1.2" },
        { name: "OpenBlocks", version: "1.6" },
        { name: "TCInventoryScan", version: "1.0" },
        { name: "TaintedMagic", version: "1.2" },
        { name: "Thaumcraft", version: "4.2.3.5" },
        { name: "ThaumicEnergistics", version: "1.1" },
        { name: "ThaumicTinkerer", version: "2.5" },
        { name: "TwilightForest", version: "2.3" },
        { name: "BuildCraft", version: "7.1" },
      ],
    },
    icon: "techno-magic.png",
    donates: [
      {
        name: "Premium",
        color: "#55F",
        price: 200,
        commands: [
          { name: "god", description: "Режим бога" },
          { name: "fly", description: "Режим полета" },
        ],
        abilities: ["Цветной ник в чате и над головой", "7 приватных регионов"],
      },
    ],
  },
  Industrial: {
    info: {
      description: `При создании серверов Industrial мы объединили все лучшее из доступных
      индустриальных модов. Наша цель - предоставить игрокам максимальное удовольствие 
      и возможность насладиться полным спектром индустриальных возможностей, 
      благодаря тщательно подобранным и интегрированным модификациям.`,
      mods: [
        { name: "Industrial Craft 2" },
        { name: "Advanced Solar Panels" },
        { name: "GraviSuite" },
        { name: "BuildCraft", version: "3.4.3" },
        { name: "Forestry" },
        { name: "IC2 Backpack" },
        { name: "Applied Energistics" },
        { name: "Iron Chest", version: "5.2.8" },
      ],
      bannedItems: [
        { mod: "BuildCraft", item: "Карьер" },
        { mod: "BuildCraft", item: "ДВС и Паровой двигатель" },
        { mod: "Forestry", item: "Все виды сумок" },
        { mod: "Forestry", item: "Письмо" },
        { mod: "Industrial Craft 2", item: "Все виды динамита и бомб" },
        { mod: "Industrial Craft 2", item: "Воронка" },
      ],
    },
    icon: "industrial.png",
    donates: [
      {
        name: "Premium",
        color: "#55F",
        price: 199,
        commands: [
          { name: "god", description: "Режим бога" },
          { name: "fly", description: "Режим полета" },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
        ],
        abilities: ["Цветной ник в чате и над головой", "7 приватных регионов"],
        kitsImage: "kit-premium.png",
      },
      {
        name: "Emerald",
        color: "#5F5",
        price: 300,
        commands: [
          { name: "god", description: "Режим бога" },
          {
            name: "tpa [nick] ",
            description: "Запросить разрешение на телепорт к игроку",
          },
          {
            name: "hat",
            description: "Возможность надевать любой блок на голову",
          },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
          {
            name: "feed",
            description: "Полностью восстанавливает голод. Может заменить пищу",
          },
          {
            name: "near",
            description: "Посмотреть, какие игроки находятся не далеко от тебя",
          },
          {
            name: "ptime reset|day|night|dawn",
            description:
              "Позволяет устанавливать персональное время на сервере",
          },
          {
            name: "clearinventory",
            description: "Очистить свой инвентарь",
          },
        ],
        abilities: [
          "Сохранение инвентаря после смерти",
          "Вход на заполненный сервер",
          "Цветной ник в чате и над головой",
          "Доступ к использованию разрушителя",
          "10 приватных регионов",
        ],
        kitsImage: "kit-emerald.png",
      },
      {
        name: "Quantum",
        color: "#5FF",
        price: 495,
        commands: [
          { name: "god", description: "Режим бога" },
          {
            name: "tpa [nick] ",
            description: "Запросить разрешение на телепорт к игроку",
          },
          {
            name: "hat",
            description: "Возможность надевать любой блок на голову",
          },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
          {
            name: "feed",
            description: "Полностью восстанавливает голод. Может заменить пищу",
          },
          {
            name: "near",
            description: "Посмотреть, какие игроки находятся не далеко от тебя",
          },
          {
            name: "ptime reset|day|night|dawn",
            description:
              "Позволяет устанавливать персональное время на сервере",
          },
          {
            name: "clearinventory",
            description: "Очистить свой инвентарь",
          },
        ],
        abilities: [
          "Сохранение инвентаря после смерти",
          "Вход на заполненный сервер",
          "Цветной ник в чате и над головой",
          "Доступ к использованию разрушителя",
          "10 приватных регионов",
        ],
        kitsImage: "kit-quantum.png",
      },
      {
        name: "SuperB",
        color: "#0A0",
        price: 990,
        commands: [
          { name: "god", description: "Режим бога" },
          {
            name: "tpa [nick] ",
            description: "Запросить разрешение на телепорт к игроку",
          },
          {
            name: "hat",
            description: "Возможность надевать любой блок на голову",
          },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
          {
            name: "feed",
            description: "Полностью восстанавливает голод. Может заменить пищу",
          },
          {
            name: "near",
            description: "Посмотреть, какие игроки находятся не далеко от тебя",
          },
          {
            name: "ptime reset|day|night|dawn",
            description:
              "Позволяет устанавливать персональное время на сервере",
          },
          {
            name: "clearinventory",
            description: "Очистить свой инвентарь",
          },
        ],
        abilities: [
          "Сохранение инвентаря после смерти",
          "Вход на заполненный сервер",
          "Цветной ник в чате и над головой",
          "Доступ к использованию разрушителя",
          "10 приватных регионов",
        ],
        kitsImage: "kit-superb.png",
      },
      {
        name: "Infinity",
        color: "#F5F",
        price: 1390,
        commands: [
          { name: "god", description: "Режим бога" },
          {
            name: "tpa [nick] ",
            description: "Запросить разрешение на телепорт к игроку",
          },
          {
            name: "hat",
            description: "Возможность надевать любой блок на голову",
          },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
          {
            name: "feed",
            description: "Полностью восстанавливает голод. Может заменить пищу",
          },
          {
            name: "near",
            description: "Посмотреть, какие игроки находятся не далеко от тебя",
          },
          {
            name: "ptime reset|day|night|dawn",
            description:
              "Позволяет устанавливать персональное время на сервере",
          },
          {
            name: "clearinventory",
            description: "Очистить свой инвентарь",
          },
        ],
        abilities: [
          "Сохранение инвентаря после смерти",
          "Вход на заполненный сервер",
          "Цветной ник в чате и над головой",
          "Доступ к использованию разрушителя",
          "20 приватных регионов",
          "Возможность устанавливать флаги на свои регионы",
        ],
        flags: [
          { name: "entry", description: "Разрешить/Запретить вход в регион" },
          {
            name: "use",
            description:
              "Разрешить/Запретить использование кнопок, дверей, и т.п.",
          },
          {
            name: "item-drop",
            description: "Разрешить/Запретить игрокам выбрасывать вещи",
          },
          { name: "greeting", description: "Сообщение при входе в регион" },
          {
            name: "mob-spawning",
            description: "Разрешить/Запретить спавн мобов",
          },
          { name: "lightning", description: "Разрешить/Запретить удар молнии" },
          {
            name: "water-flow",
            description: "Разрешить/Запретить потоки воды",
          },
        ],
        kitsImage: "kit-infinity2.png",
      },
      {
        name: "Onyx",
        color: "#555",
        price: 1790,
        commands: [
          { name: "god", description: "Режим бога" },
          {
            name: "tpa [nick] ",
            description: "Запросить разрешение на телепорт к игроку",
          },
          {
            name: "hat",
            description: "Возможность надевать любой блок на голову",
          },
          { name: "heal", description: "Полностью восстановить здоровье" },
          {
            name: "repair all",
            description: "Починить инструмент/броню/зачарованный предмет",
          },
          {
            name: "feed",
            description: "Полностью восстанавливает голод. Может заменить пищу",
          },
          {
            name: "near",
            description: "Посмотреть, какие игроки находятся не далеко от тебя",
          },
          {
            name: "ptime reset|day|night|dawn",
            description:
              "Позволяет устанавливать персональное время на сервере",
          },
          {
            name: "clearinventory",
            description: "Очистить свой инвентарь",
          },
        ],
        abilities: [
          "Сохранение инвентаря после смерти",
          "Вход на заполненный сервер",
          "Цветной ник в чате и над головой",
          "Возможность писать цветным текстом на табличках",
          "Доступ к использованию разрушителя",
          "20 приватных регионов",
          "Возможность устанавливать флаги на свои регионы",
        ],
        flags: [
          { name: "entry", description: "Разрешить/Запретить вход в регион" },
          {
            name: "use",
            description:
              "Разрешить/Запретить использование кнопок, дверей, и т.п.",
          },
          {
            name: "item-drop",
            description: "Разрешить/Запретить игрокам выбрасывать вещи",
          },
          { name: "greeting", description: "Сообщение при входе в регион" },
          {
            name: "mob-spawning",
            description: "Разрешить/Запретить спавн мобов",
          },
          { name: "lightning", description: "Разрешить/Запретить удар молнии" },
          {
            name: "water-flow",
            description: "Разрешить/Запретить потоки воды",
          },
        ],
        kitsImage: "kit-onyx.png",
      },
    ],
  },
};

// При оплате квитанций все чеки об оплате сканированы в общую папку и названы в формате "услуга_месяц.pdf", например: квартплата_июнь.pdf, теплоснабжение_март.pdf, электроснабжение_январь.pdf.
// Список названий чеков в общей папке дан в исходном файле "чеки.txt".
// Как минимум в одном месяце оплачены полностью все квитанции. В других месяцах оплачена как минимум одна квитанция. При неоплате чек по квитанции отсутствует.
// Необходимо сформировать файл чеки_по_папкам.txt, в котором:
// 1. "разложить" файлы по папкам месяцев в формате /месяц/названиефайла
// 2. указать, в каком месяце какая услуга не оплачена (если таковые имеются) в формате
// не оплачены:
// месяц:
// услуга
// услуга


// Пример работы:
// Входной файл чеки.txt:
// газоснабжение_январь.pdf
// газоснабжение_февраль.pdf
// гвс_февраль.pdf
// теплоснабжение_январь.pdf
// теплоснабжение_февраль.pdf
// xвс_январь.pdf
// xвс_февраль.pdf
// электроснабжение_февраль.pdf

// Результат работы: файл чеки_по_папкам.txt:
// /январь/газоснабжение_январь.pdf
// /январь/теплоснабжение_январь.pdf
// /январь/xвс_январь.pdf
// /февраль/газоснабжение_февраль.pdf
// /февраль/гвс_февраль.pdf
// /февраль/теплоснабжение_февраль.pdf
// /февраль/xвс_февраль.pdf
// /февраль/электроснабжение_февраль.pdf
// не оплачены:
// январь:
// гвс
// электроснабжение

let incomingChecks = [
  "газоснабжение_август.pdf",
  "газоснабжение_апрель.pdf",
  "газоснабжение_декабрь.pdf",
  "газоснабжение_июль.pdf",
  "газоснабжение_июнь.pdf",
  "газоснабжение_март.pdf",
  "газоснабжение_октябрь.pdf",
  "газоснабжение_сентябрь.pdf",
  "газоснабжение_февраль.pdf",
  "газоснабжение_январь.pdf",
  "ГВС_август.pdf",
  "ГВС_июнь.pdf",
  "ГВС_май.pdf",
  "ГВС_март.pdf",
  "ГВС_октябрь.pdf",
  "ГВС_сентябрь.pdf",
  "ГВС_февраль.pdf",
  "ГВС_январь.pdf",
  "домофон_август.pdf",
  "домофон_апрель.pdf",
  "домофон_декабрь.pdf",
  "домофон_июль.pdf",
  "домофон_май.pdf",
  "домофон_март.pdf",
  "домофон_ноябрь.pdf",
  "домофон_октябрь.pdf",
  "домофон_сентябрь.pdf",
  "домофон_февраль.pdf",
  "домофон_январь.pdf",
  "капремонт_август.pdf",
  "капремонт_апрель.pdf",
  "капремонт_декабрь.pdf",
  "капремонт_июль.pdf",
  "капремонт_июнь.pdf",
  "капремонт_март.pdf",
  "капремонт_ноябрь.pdf",
  "капремонт_октябрь.pdf",
  "капремонт_февраль.pdf",
  "квартплата_август.pdf",
  "квартплата_апрель.pdf",
  "квартплата_декабрь.pdf",
  "квартплата_июль.pdf",
  "квартплата_июнь.pdf",
  "квартплата_май.pdf",
  "квартплата_март.pdf",
  "квартплата_ноябрь.pdf",
  "квартплата_октябрь.pdf",
  "квартплата_сентябрь.pdf",
  "квартплата_февраль.pdf",
  "квартплата_январь.pdf",
  "ТБО_август.pdf",
  "ТБО_апрель.pdf",
  "ТБО_декабрь.pdf",
  "ТБО_июль.pdf",
  "ТБО_май.pdf",
  "ТБО_март.pdf",
  "ТБО_ноябрь.pdf",
  "ТБО_октябрь.pdf",
  "ТБО_февраль.pdf",
  "ТБО_январь.pdf",
  "теплоснабжение_август.pdf",
  "теплоснабжение_апрель.pdf",
  "теплоснабжение_июль.pdf",
  "теплоснабжение_июнь.pdf",
  "теплоснабжение_май.pdf",
  "теплоснабжение_март.pdf",
  "теплоснабжение_сентябрь.pdf",
  "теплоснабжение_январь.pdf",
  "ХВС_август.pdf",
  "ХВС_декабрь.pdf",
  "ХВС_июнь.pdf",
  "ХВС_май.pdf",
  "ХВС_март.pdf",
  "ХВС_февраль.pdf",
  "ХВС_январь.pdf",
  "электроснабжение_август.pdf",
  "электроснабжение_апрель.pdf",
  "электроснабжение_декабрь.pdf",
  "электроснабжение_июль.pdf",
  "электроснабжение_июнь.pdf",
  "электроснабжение_май.pdf",
  "электроснабжение_март.pdf",
  "электроснабжение_ноябрь.pdf",
  "электроснабжение_октябрь.pdf",
  "электроснабжение_сентябрь.pdf",
  "электроснабжение_февраль.pdf",
];
let monthChecksNew = [];
let monthChecks = [];
let servicesOff = [];
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
let services = ["газоснабжение", "ГВС", "домофон", "капремонт", "квартплата", "ТБО", "теплоснабжение", 'ХВС', "электроснабжение"];

function filterItemsMonths(query) {
  return incomingChecks.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

for (let i = 0; i < months.length; i++) {
  const element = months[i];
  monthChecksNew.push(filterItemsMonths(element));
}

console.log(`Входной файл чеки.txt:`);
for (let i = 0; i < incomingChecks.length; i++) {
  const element = incomingChecks[i];
  console.log(element);
}

console.log();
console.log(`Результат работы: файл чеки_по_папкам.txt:`);

for (let i = 0; i < monthChecksNew.length; i++) {
  for (let j = 0; j < monthChecksNew.length; j++) {
    const elem = `/${months[i]}/${monthChecksNew[i][j]}`;
    if (monthChecksNew[i][j] !== undefined) {
      monthChecks.push(elem);
    }
    else {
      continue;
    }
  }
}

for (let index = 0; index < monthChecks.length; index++) {
  const element = monthChecks[index];
  console.log(element);
}


// for (let i = 0; i < monthChecks.length; i++) {
//   for (let k = 0; k < services.length; k++) {

   
//     if (monthChecks[i].indexOf(services[k]) >-1) {
//       continue
//     }
//     else {
//       console.log(monthChecks[i] , services[k]);
//     }
//   }
// }





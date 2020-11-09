(function() {
    'use strict';

    kintone.events.on('app.record.detail.show', function(event) {
      
        var mySpaceFieldButton = document.createElement('button');
        mySpaceFieldButton.id = 'my_space_field_button';
        mySpaceFieldButton.innerText = '作成する';
        mySpaceFieldButton.onclick = function () {
            
            var record = event.record;
            var tochi,kabu,hoken,sonota,kariire,yokin,igon,kane,jigyou,zouyo,seisan;
            var name = record.代表相続人氏名.value + ' 様';
  
            //和暦表示
            var hasseibi = moment(record.相続発生日.value).format('YYYY');
            var wareki;
            if(hasseibi == '2020') {
                wareki = '令和2年';
            }else if(hasseibi == '2021') {
                wareki = '令和3年';
            }else if(hasseibi == '2022') {
                wareki = '令和4年';
            }else if(hasseibi == '2023') {
              wareki = '令和5年';
          　}else if(hasseibi == '2024') {
              wareki = '令和6年';
          　}else if(hasseibi == '2025') {
              wareki = '令和7年';
          　}else if(hasseibi == '2026') {
              wareki = '令和8年';
            }else if(hasseibi == '2027') {
              wareki = '令和9年';
            }else if(hasseibi == '2028') {
              wareki = '令和10年';
            }else if(hasseibi == '2029') {
              wareki = '令和11年';
            }else if(hasseibi == '2030') {
              wareki = '令和12年';
            }else {
                wareki = hasseibi;
            }
  
            //遺言書の内容
            if(record.遺言書.value == '無') {
               igon = '';
            }else {
               igon = '・遺言書'
            }
  
            //現預貯金の内容
            if(record.現金.value == '有') {
                kane = '・現金の残高のわかるもの(メモ等で結構です)\n'+
                       '・残高証明書('+moment(record.相続発生日.value).format('YYYY年MM月DD')+'時点のもの)\n'+
                       '・既経過利息の計算書類(定期預金がある場合)\n'+
                       '・通帳の原本又は写し('+moment(record.相続発生日.value).add(-3,'years').format('YYYY年MM月DD日')+' ～ '+moment(record.相続発生日.value).format('YYYY年MM月DD日')+')\n'+
                       '　下記金融機関の預金窓口にてご請求ください\n'+
                       '  ['+ record['銀行名']['value'] +']';
            }else {
                kane = '・残高証明書('+moment(record.相続発生日.value).format('YYYY年MM月DD')+'時点のもの)\n'+
                       '・既経過利息の計算書類(定期預金がある場合)\n'+
                       '・通帳の原本又は写し('+moment(record.相続発生日.value).add(-3,'years').format('YYYY年MM月DD日')+' ～ '+moment(record.相続発生日.value).format('YYYY年MM月DD日')+')\n'+
                       '　下記金融機関の預金窓口にてご請求ください\n'+
                       '  ['+ record['銀行名']['value'] +']';
            } 
  
            //名義預金の内容
            if(record.名義預金.value == '有') {
                yokin = '・残高証明書('+moment(record.相続発生日.value).format('YYYY年MM月DD日')+'時点のもの)\n'+
                      　'・通帳の原本又は写し('+moment(record.相続発生日.value).add(-3,'years').format('YYYY年MM月DD日')+' ～ '+moment(record.相続発生日.value).format('YYYY年MM月DD日')+')\n'+
                      　'・既経過利息の計算書類(定期預金がある場合)\n';
            }else {
                yokin = '';
            }
  
            //借地権の内容
            if(record.借地権.value =='有') {
                tochi = '・固定資産税都市計画税納税通知書('+wareki+'度分)、又は名寄帳兼課税台帳\n'+
                        '・土地の賃貸借契約書等';
            }else {
                tochi = '・固定資産税都市計画税納税通知書('+wareki+'度分)、又は名寄帳兼課税台帳\n';
            }
  
            //取引相場のない株式の内容
            if(record.上場有価証券.value == '有' && record.取引相場のない株式.value == '有') {
                kabu = '・残高証明書('+moment(record.相続発生日.value).format('YYYY年MM月DD日')+'時点のもの)\n'+
                       '・配当金支払通知書\n'+
                      '・法人税確定申告書(直前事業年度分)\n'+
                      '・出資証券等\n';
            }else if(record.上場有価証券.value == '有'　&& record.取引相場のない株式.value == '無') {
                kabu = '・残高証明書('+moment(record.相続発生日.value).format('YYYY年MM月DD日')+'時点のもの)\n'+
                       '・配当金支払通知書\n';
            }else {
                kabu = '';
            }
  
            //生命保険の内容
            if(record.生命保険.value == '有' && record.生命保険に関する権利.value == '無'　&& record.退職手当金.value == "無") {
                hoken = '・死亡保険金の支払い調書\n';
            }else if(record.生命保険.value == '有' && record.生命保険に関する権利.value == '有'　&& record.退職手当金.value == "無") {
                hoken = '・死亡保険金の支払い調書\n'+
                        '・保険証券\n'+
                        '・支払保険料計算書\n'+
                        '・所得税の確定申告書(過去3年分の控え)\n';
            }else if(record.生命保険.value == '有' && record.生命保険に関する権利.value== '無'　&& record.退職手当金.value == "有") {
                hoken = '・死亡保険金の支払い調書\n'+
                        '・退職手当金等受給者別支払調書\n'+
                        '・取締役会議事録等\n';
            }else　if(record.生命保険.value == '無' && record.生命保険に関する権利.value== '有'　&& record.退職手当金.value == "無") {
                hoken = '・保険証券\n'+
                　　　　 '・支払保険料計算書\n'+
                        '・所得税の確定申告書(過去3年分の控え)\n';
            }else if(record.生命保険.value == '無' && record.生命保険に関する権利.value== '無'　&& record.退職手当金.value == "有") {
                hoken = '・退職手当金等受給者別支払調書\n'+
                        '・取締役会議事録等\n';
            }
  
            //確定申告の内容
            if(record.確定申告.value == '有(事業用財産なし)') {
                jigyou = '・総勘定元帳\n'+
                        '・決算書\n'+
                        '・減価償却内訳明細書\n'+
                        '・償却資産申告書\n'+
                        '・所得税及び復興特別所得税の申告書(過去3年分の控え)\n'+
                        '・青色申告決算書\n';
            }else　if(record.確定申告.value == '有(事業用財産あり)') {
                jigyou = '・所得税及び復興特別所得税の申告書(過去3年分の控え)';
            }else {
                jigyou = '';
            }
  
            //家庭用財産の内容
            if(record['家庭用財産']['value'].indexOf('建物更生共済') >= 0) {
                sonota = '・建物更生共済の保険証券、その他解約返戻金相当額を確認できるもの('+moment(record.相続発生日.value).format('YYYY年MM月DD日')+'時点)\n';
            }else {
                sonota = '';
            }
  
            //債務の内容
            if(record.借入金.value == '有'　&&　record.未払金.value == '有') {
                kariire = '・借入金の残高証明書\n'+
                          '・金銭消費貸借契約書\n'+
                          '・請求書等\n'+
                          '・売買契約書\n'+
                          '・医療費の領収書等\n'+
                          '・公租公課';
            }else if(record.借入金.value == '無'　&&　record.未払金.value == '有') {
                kariire = '・売買契約書\n'+
                          '・医療費の領収書等\n'+
                          '・公租公課';
            };
  
            //贈与の内容
            if(record.贈与.value == '有') {
                zouyo = '・贈与証書\n'+
                        '・贈与税の申告書(控)\n'+
                        '・相続開始前３年間の預貯金通帳及び有価証券の取引明細書(家族分含む)';
            }else {
                zouyo = '';
            }
  
            //相続時精算課税制度
            if(record.相続時精算課税制度.value == '有') {
                seisan = '・贈与税の申告書(控)\n'+
                         '・贈与税の申告内容の開示書\n';
            }else {
                seisan = '';
            }
  
            var body = {
                "app":appID,
                "record":{
                    "代表相続人氏名": {
                        "value": name
                    },
                    "預貯金":{
                        "value": kane
                    },
                    "名義預金":{
                        "value":yokin    
                    },
                    "土地建物":{
                        "value":tochi
                    },
                    "有価証券":{
                        "value":kabu
                    },
                    "生命保険":{
                        "value":hoken
                    },
                    "家庭用財産":{
                        "value":sonota
                    },
                    "債務":{
                        "value" :kariire
                    },
                    "遺言書":{
                        "value" : igon
                    },
                    "key" : {
                        "value" : record.レコード番号.value
                　  },  
                    "その他の資産" :{
                        "value" : record.その他の資産.value
                    },
                    "日付":{
                        "value" : moment().format('YYYY年MM月DD日')
                    },
                    "確定申告":{
                        "value" : jigyou
                    },
                    "贈与":{
                        "value" : zouyo
                    },
                    "相続時精算課税制度" : {
                        "value" : seisan
                    }
                }
            };
  
            kintone.api(kintone.api.url('/k/v1/record', true), 'POST', body, function(resp) {
                var link = 'https://サブドメイン名.cybozu.com/k/appID/show#record=' + resp.id + '&mode=edit';
                window.open(link);
                console.log(resp);
            }, function(error) {
              console.log(error);
            });
        }
        kintone.app.record.getSpaceElement('button').appendChild(mySpaceFieldButton);
        return event;
    });
})();
  

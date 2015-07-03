module.exports = {
  NavList: [
    { label: '主題'},
    { path: '/uberx/', label: 'UberX 自用車載客', icon: 'motc.png', type: 'sub'},
    { path: '/cyberbullying/', label: '網路霸凌', icon: 'MOJ-MOHW.png', type: 'sub'},
    { path: '/infosecurity/', label: '資安管理', icon: 'nnicst.png', type: 'sub'},
    { path: '/crowdfunding/', label: '群眾募資', icon: 'sfb.png', type: 'sub'},
    { path: '/closelyheld/', label: '閉鎖型公司', icon: 'DOCMOEA.png', type: 'sub'},
    { path: '/etax/', label: '網路交易課稅', icon: 'MOFTA.png', type: 'sub'},
    { path: '/distant-education/', label: '遠距教育', icon: 'MOE.png', type: 'sub'},
    { path: '/telework/', label: '電傳勞動', icon: 'mol.png', type: 'sub'},
    { path: '/telemedicine/', label: '遠距健康照護', icon: 'MOHW.png', type: 'sub'},
    { path: '/data-levy/', label: '開放資料例外收費原則', icon: 'opendata_mis_ndc.png', type: 'sub'},
    { path: '/consumer-protection/', label: '零售業網路定型化契約', icon: 'CPCEY.png', type: 'sub'},
    { path: '/personal-data-protection/', label: '個人資料利用與去識別', icon: 'moj.png', type: 'sub'},
    { path: '/how/', label: '如何發言' },
    { path: '/tutorial/', label: '使用手冊' },
    { path: '/about/', label: '關於' }
  ],
  crowdfunding: [
    { path: '/', label: '首頁' },
    { label: '群眾募資', type: 'title' },
    { path: '/crowdfunding/init/', label: '討論', icon: 'sfb.png', type: 'sub' },
    { path: '/crowdfunding/spec/1/', label: '建議', icon: 'sfb.png', type: 'sub' },
    { path: '/crowdfunding/ref1/', label: '草案＃1', icon: 'sfb.png', type: 'sub' },
    { path: '/crowdfunding/act1/', label: '定案', icon: 'sfb.png', type: 'sub' }
  ],
  "crowdfunding/spec": [
    { path: '/crowdfunding', label: '群眾募資' },
    { label: '建議', type: 'title' },
    { path: '/crowdfunding/spec', label: '股權式群募：具體建議' },
    { path: '/crowdfunding/spec/1', label: '需求與建議' },
    { path: '/crowdfunding/spec/1/358', label: '開放民間股權群募平台', icon: 'spec.png', type: 'sub'},
    { path: '/crowdfunding/spec/1/359', label: '對提案募資者的規範', icon: 'spec.png', type: 'sub' },
    { path: '/crowdfunding/spec/1/360', label: '對投資者的規範', icon: 'spec.png', type: 'sub'},
    { path: '/crowdfunding/spec/1/361', label: '其他網路金融模式', icon: 'spec.png', type: 'sub'}
  ]
};

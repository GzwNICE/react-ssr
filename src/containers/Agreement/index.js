import React, { Component } from 'react'
import back from '../../static/back.png'
import style from './style.less'

export default class Agreement extends Component {
  render() {
    return (
      <div className={style.Protocol}>
        <div
          className={style.goBack}
          onClick={() => {
            this.props.history.go(-1)
          }}
        >
          <img src={back} alt="bank" />
        </div>
        <div className={style.centent}>
          <h1 className={style.segment} style={{ marginTop: 10 }}>
            最佳东方用户协议及隐私政策
          </h1>
          <p>
            尊敬的用户：
            <br />
            在您成为最佳东方会员，使用最佳东方提供的服务之前，请您认真阅读本用户协议及隐私条款，更好地了解我们所提供的服务以及您享有的权利义务。您开始使用最佳东方提供的服务，即表示您已经确认并接受了本文件中的全部条款。
          </p>
          <h1 className={style.segment}>第一部分 用户协议</h1>
          <p>
            最佳东方服务条款协议(以下简称“本协议”)内容包括协议正文及所有最佳东方已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何最佳东方及其关联公司提供的服务（以下简称“服务”）均受本协议约束。
          </p>
          <h2 className={style.subtitle}>一、协议内容及签署</h2>
          <p>
            1.最佳东方—旅游服务业（酒店、餐饮、休闲娱乐、康养）的招聘求职平台
            （VeryEast.CN）是杭州东方网升科技股份有限公司旗下网站，最佳东方完全按照其发布的服务条款和操作规则提供服务。通过首页进入
            <span className={style.subtitle}>www.VeryEast.CN</span>
            ，即表示用户同意并已经与最佳东方订立本协议，且将受本协议的条款和条件约束。
          </p>
          <p>
            2.如果用户不同意本协议的约定，用户应立即停止注册程序或停止使用最佳东方及其关联公司提供的网络服务。
          </p>
          <p>
            {' '}
            3.最佳东方有权随时单方更改本协议“条款”。如本协议“条款”有任何变更，最佳东方将在其网站上刊载公告。如用户不同意相关变更，必须停止使用“服务”。经修订的“条款”一经在最佳东方的公布后，立即自动生效。用户继续使用“服务”将表示用户接受修订后的“条款”。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。除非经最佳东方的授权高层管理人员签订书面协议，本协议不另行作出修订。
          </p>
          <h2 className={style.subtitle}>二、注册及登录</h2>
          <strong className={style.crosshead}>1.注册条件</strong>
          <p>
            申请注册成为最佳东方会员应同时满足下列全部条件：
            <br />
            a.在注册之日以及此后使用最佳东方服务期间必须以招聘或应聘为目的
            <br />
            b.在注册之日必须年满18周岁以上
          </p>
          <strong className={style.crosshead}>2.收费</strong>
          <p>
            我们对部分网络会员（包括但不限于企业会员）收取一定的费用。在此情况下，最佳东方会在相关页面上做明确的提示。
          </p>
          <strong className={style.crosshead}>3.用户资料</strong>
          <p>
            “用户资料”包括用户在注册、登录
            过程中、在任何公开信息场合或通过任何电子邮件形式，向本公司或其他用户提供的任何资料，包括但不限于数据、文本、软件、音乐、声响、照片、图画、影像、词句和其他材料。用户应对“用户资料”负全部责任，而本公司仅作为用户在网上发布和刊登“用户资料”的被动渠道。
          </p>
          <strong className={style.crosshead}>4.对用户资料的要求</strong>
          <p>
            用户确保，其上传在本网站上的任何资料（包括但不限于数据、文本、软件、音乐、声响、照片、图画、影像、词句和其他材料）和在网站上交易的任何“物品”（泛指一切可供依法交易的、有形的或无形的、以各种形态存在的某种具体的物品，或某种权利或利益，或某种票据或证券，或某种服务或行为。本协议中“物品”一词均含此义）符合以下规定：
          </p>
          <p>a.无欺诈成分，与售卖伪造或盗窃无涉；</p>
          <p>
            b.不侵犯任何第三者对该物享有的物权，或版权、专利、商标、商业秘密及其他知识产权，或隐私权、名誉权；
          </p>
          <p>
            c.不违反任何法律、法规、条例或规章
            (包括但不限于关于规范出口管理、贸易配额、保护消费者、不正当竞争或虚假广告的法律、法规、条例或规章)；
          </p>
          <p>d.不含诽谤（包括商业诽谤）、非法恐吓或非法骚扰的内容；</p>
          <p>e.不含淫秽、或任何儿童色情内容；</p>
          <p>
            f.不含包括但不限于蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹等电脑程序；
          </p>
          <p>
            g.不直接或间接与下述各项货物或服务连接，或包含对下述各项货物或服务的描述：(i)
            本协议项下禁止的货物或服务；或 (ii) 用户无权连接或包含的货物或服务。
          </p>
          <p>
            h.不在与任何连锁信件、大量胡乱邮寄的电子邮件、滥发电子邮件或任何复制或多余的信息有关的方面使用“服务”；
          </p>
          <p>
            i.不在未经其他人士同意下，利用“服务”收集其他人士的电子邮件地址及其他资料；
          </p>
          <p>
            j.不利用“服务”制作虚假的电子邮件地址，或以其他形式试图在发送人的身份或信息的来源方面误导其他人士。
          </p>
          <h2 className={style.subtitle}>三、服务条款</h2>
          <strong className={style.crosshead}>1.服务内容</strong>
          <p>
            最佳东方网络服务的具体内容由最佳东方根据实际情况提供，例如招聘通等产品。最佳东方保留随时变更、中断或终止部分或全部网络服务的权利。
          </p>
          <strong className={style.crosshead}>2.服务说明</strong>
          <p>
            a.最佳东方运用自己的操作系统通过国际互联网向用户提供丰富的网上资源，包括招聘平台等内容和服务。除非另有明确规定，增强或强化目前服务的任何新功能，包括新产品，均无条件地适用本协议。
          </p>
          <p>
            b.最佳东方对网络服务不承担任何责任，即由用户对网络服务的使用承担全部风险。最佳东方不保证服务一定会满足用户的使用要求，也不保证服务不会受中断，对服务的及时性、安全性、准确性也不作担保。
          </p>
          <p>
            c.用户因进行交易、向本公司获取有偿服务或接触本公司服务器而发生的所有应纳税赋，以及由此产生的包括但不限于一切相关硬件、软件、服务及其他方面的费用均由用户自己负责支付。
          </p>
          <p>d.用户接受本服务须同意：</p>
          <p>(i) 提供完整、真实、准确、最新的个人资料，不断更新注册资料。</p>
          <p>
            (ii)
            若用户提供任何错误、不实、过时或不完整的资料，发布与网站内容不相适应的信息，并为最佳东方所确知；或者最佳东方有合理理由怀疑前述资料为错误、不实、过时、不完整或含有欺诈性质的，最佳东方有权修改或删除用户发布的信息，有权暂停或终止用户的帐户，并有权在现在或将来全部或部分限制用户使用本服务。
          </p>
          <p>
            (iii)用户关于最佳东方的意见建议可以通过网站专门渠道表达，不得在本协议规定之外的渠道发表不利于最佳东方的言论，否则最佳东方保留在发出通知或不发出通知的情况下，随时停止提供“服务”或其任何部份的权利。
          </p>
          <p>
            (iv)默认接收最佳东方的手机短信、邮件通知，包括商业性的短信和邮件。
          </p>
          <strong className={style.crosshead}>3.服务声明</strong>
          <p>
            最佳东方有权规定并修改使用其服务的一般措施，包括但不限于招聘信息内容或其他上载内容的时间、本服务一个帐号可上载保存文章等内容的数量等。如最佳东方对未能及时储存或删除本服务的内容或其他信息，对此所造成的损害不负任何责任。最佳东方将在本公司网站上公布并不定时修订法律声明，法律声明的全部条款构成本协议的有效组成部分。
          </p>
          <p>
            除本协议有特别规定，本公司为了保障公司业务发展和调整的自主权，保留在无须发出通知的情况下，暂时或永久地更改或停止部份或全部“服务”的权利。
          </p>
          <h2 className={style.subtitle}>四、特别授权</h2>
          <p>
            用户授予本公司独家的、永久的、免费的、全球范围的许可使用权利(并有权在多个层面对该权利进行再授权)，使本公司有权全部或部份地使用、复制、修订、改写、发布、分发、翻译、执行和展示用户在本网站的资料，和/或以现在已知或日后开发的任何形式、媒体或技术，将“用户资料”纳入其他作品内。在不透露单个用户隐私资料的前提下，最佳东方有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。最佳东方可随时直接以电子邮件或其它方式与用户联系，或向用户发送信息。
          </p>
          <h2 className={style.subtitle}>五、协议终止</h2>
          <p>
            1.如果用户是个人会员（包括不限于求职个人会员），用户同意，最佳东方可自行全权决定以任何理由
            (包括但不限于最佳东方认为用户已违反本协议的字面意义和精神，或以不符合本协议的字面意义和精神的方式行事)
            终止用户的“服务”密码、帐户
            (或其任何部份)或用户对“服务”的使用，并删除和丢弃用户在使用“服务”中提交的“用户资料”。
          </p>
          <p>
            2.如果用户是非个人会员（包括但不限于企业会员，院校会员），最佳东方有权在基于合理的怀疑且经电子邮件通知的情况下实施上述终止服务的行为。并有权注销用户的帐户和用户的帐户内的所有相关资料和档案，并保留禁止用户进一步接入该等档案或“服务”的权利。同时，最佳东方就终止用户接入“服务”不对用户或任何第三者承担任何责任。
          </p>
          <h2 className={style.subtitle}>六、责任条款</h2>
          <p>
            1.在注册过程中，用户将选择会员注册名和密码。用户须自行负责对会员注册名和密码保密，且须对用户在会员注册名和密码下发生的所有活动承担责任。用户同意：(a)
            如发现任何人未经授权使用用户的会员注册名或密码，或发生违反保密规定的其他情况，用户会立即通知最佳东方；(b)
            确保用户在每个上网时段结束时，以正确步骤离开网站。最佳东方不能也不会对因用户未能遵守本款规定而发生的任何损失或损毁负责。
          </p>
          <p>
            2.若本公司认为“用户资料”可能使本公司承担任何法律或道义上的责任，或可能使本公司全部或部分地遭受显性或隐性的损失，本公司可自行全权决定对“用户资料”采取必要或适当的任何行动，包括但不限于删除该类资料。由于用户提供的资料对第三方构成侵权的，本公司不承担任何责任。用户特此保证，用户对提交给最佳东方的“用户资料”拥有全部权利，包括全部版权。用户确认，最佳东方没有责任去认定或决定用户提交给本公司的资料是否应当受到保护，因本公司对享有“服务”的其他用户提供和使用“用户资料”而对用户造成的损害，本公司不承担任何责任。
          </p>
          <p>
            3.用户明确理解和同意，最佳东方不对因下述情况而发生的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿
            (无论最佳东方是否已被告知该等损害赔偿的可能性)：
          </p>
          <p>a.使用或未能使用“服务”；</p>
          <p>
            b.因通过或从“服务”购买、获取任何货物、样品、数据、资料、服务，或通过或从“服务”接收任何信息、缔结任何交易所产生的获取替代货物和服务的费用；
          </p>
          <p>c.任何第三者未经批准接入或更改用户的传输资料或数据；</p>
          <p>d.任何第三者对“服务”的声明或关于“服务”的行为；</p>
          <p>e.因任何原因而引起的与“服务”有关的其他事宜，包括疏忽。</p>
          <p>
            4.用户同意保障和维护最佳东方及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给最佳东方或任何其他第三人造成损失，用户承担由此造成的全部责任。同时，最佳东方有权根据用户的行为性质，采取包括但不限于停止提供服务、限制使用、回收帐号、法律追究等措施。
          </p>
          <p>
            5.“服务”或第三者均可提供与其他网站或资源的链接。由于最佳东方并不控制该等网站和资源，用户承认并同意，最佳东方不保证因向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由最佳东方实际控制的任何网页上的内容，任何因使用或信赖此类网站或资源上获取的此类内容、宣传、产品、服务或其他材料而造成（或声称造成）的任何直接或间接损失，或由此对第三方构成侵权的，最佳东方不承担任何责任。
          </p>
          <p>
            6.最佳东方对因在传送或递交全部或部分上述资料过程中产生的延误、不准确、错误和遗漏及由此产生的对用户和第三方的损害，不承担任何责任。
          </p>
          <p>
            7.对于因本公司合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等，致使本公司延迟或未能履约的，最佳东方不承担任何责任。
          </p>
          <h2 className={style.subtitle}>七、隐私</h2>
          <p>
            最佳东方有权根据本公司的隐私声明使用“用户资料”，最佳东方将在本公司网站上公布并不时修订隐私权政策，隐私权政策构成本协议的有效组成部分。
          </p>
          <h2 className={style.subtitle}>八、知识产权</h2>
          <p>
            用户同意，遵守《中华人民共和国著作权法》、《中华人民共和国商标法》、《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《互联网著作权行政保护办法》以及相关的法律、法规、实施办法。
          </p>
          <p>
            最佳东方提供的网络服务中包含的但不限于任何文本、图片、图形、音频和视频资料均受上述法律法规的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、以及出于播放或发布目的改写或再发行，或被用于其他商业目的。
          </p>
          <p>
            最佳东方认为用户的行为可能违反上述法律、法规，最佳东方可以在任何情况下随时不经事先通知即终止向该用户提供服务。
          </p>
          <h2 className={style.subtitle}>九、其他规定</h2>
          <p>
            1.除非另有明确规定，任何通知应以网页公告或者邮件形式发送，(就最佳东方而言)
            电子邮件地址为(veryeast.com)，或 (就用户而言)
            发送到用户在登记过程中向最佳东方提供的电子邮件地址，或有关方指明的该等其他地址。在电子邮件发出二十四
            (24)
            小时后，通知应被视为已送达，除非发送人被告知相关电子邮件地址已作废。
          </p>
          <p>
            2.本协议构成用户和最佳东方之间的全部协议，将取代用户和最佳东方先前订立的任何书面或口头协议。本协议任何规定被裁定为无效或不可强制执行，该项规定应被撤销，撤销的效力不及于本协议其他规定。条款标题仅为方便参阅而设，并不以任何方式界定、限制、解释或描述该条款的范围或限度。本公司未就用户或其他人士的某项违约行为采取行动，并不表明本公司撤回就任何继后或类似的违约事件采取行动的权利。
          </p>
          <h2 className={style.subtitle}>十、诉讼</h2>
          <p>
            1.本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照行业惯例。
          </p>
          <p>
            2.因本协议产生之争议，应依照中华人民共和国法律予以处理，并以浙江省杭州市西湖区人民法院为第一审管辖法院。
          </p>
          <h1 className={style.segment}>第二部分 隐私协议</h1>
          <p>
            最佳东方
            注重保护用户个人信息及个人隐私。本隐私权保护声明解释了用户个人信息收集和使用的有关情况，本隐私权保护声明适用于最佳东方网的所有相关服务。
          </p>
          <h2 className={style.subtitle}>一、您个人信息的收集</h2>
          <p>
            在某些情况下，使用者使用最佳东方提供的服务，如“简历中心”，或参加最佳东方上举办的有奖竞赛、或要购买某一种在最佳东方上公开的产品，最佳东方可能需要使用者提供一些具体的个人资料。在获得使用者的同意后，我们可能利用这些资料向使用者发送相关职位信息或提供我们认为使用者可能感兴趣的相关的产品和服务信息，或者在最佳东方网站发生改变时通知使用者或和使用者联系。我们也会基于优化用户体验的目的，收集其他有关的信息。例如当用户访问最佳东方网站，我们收集哪些网页的受欢迎程度、浏览器软件信息等以便优化我们的网站服务。
          </p>
          <h2 className={style.subtitle}>二、您个人信息的公开</h2>
          <p>
            由于最佳东方是一个招聘网站，你可以把你的简历放入我们的数据库。向最佳东方购买了相应服务的招聘企业或人员可以通过我们的简历数据库找到你的简历。当你向最佳东方递交你的简历时，并选择了公开你的简历选项时，你已经同意向最佳东方购买了相应服务的招聘企业或人员拥有法律上许可的对你的简历进行查询及使用的权利。对于因此而引起的任何法律纠纷（包括但不限于招聘企业或人员错误或非法使用前述简历信息），最佳东方不承担任何法律责任。
          </p>
          <p>
            最佳东方网不会未经允许向第三方披露您的个人信息。除非满足下述情形之一：
            (1)根据法律法规的规定；（2）符合您与最佳东方网之间的相关服务条款、软件许可使用协议的约定。
          </p>
          <h2 className={style.subtitle}>三、您个人信息的安全</h2>
          <p>
            最佳东方网严格保护您的个人信息安全。我们使用各种制度、安全技术和程序等措施来保护您的个人信息不被未经授权的访问、使用或泄漏。如果您对我们的个人信息保护有任何疑问，请联系我们。
            尽管最佳东方已作好了全面的安全防范措施后，以下情况仍然有可能发生，例如某一第三方躲过了我们的安全措施并进入我们的数据库，查找到你的简历。最佳东方认为在你把你的简历放入我们的数据库时，你已经意识到了这种风险的存在，并同意承担这样的风险。对于因此而引起的任何法律纠纷，最佳东方不承担任何法律责任。
          </p>
          <h2 className={style.subtitle}>四、Cookies</h2>
          <p>
            本网站会使用Cookie来存储或偶尔追访用户的信息，以便给您提供更加周到的个性化服务。
          </p>
          <p>
            所谓Cookie是指一小段可供读取的信息，是由网站服务器发送到访问者的浏览器内，并储存到访问者的电脑硬盘内。本网站用Cookie追访访问者的资讯偏好，为访问者提供访问者感兴趣的信息资料；或储存密码，以便访问者造访本网站时不必每次重复输入密码。
          </p>
          <h2 className={style.subtitle}>五、信息保密承诺的改变</h2>
          <p>
            如果我们决定改变最佳东方的信息保密承诺，我们会在此公布改变的内容，因此使用者会随时了解到我们向使用者收集什么资料，我们如何使用这些资料，以及我们是否向别人公开这些资料。
          </p>
        </div>
      </div>
    )
  }
}

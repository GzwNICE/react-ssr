import Loadable from "react-loadable";
import React from 'react'
// import path from 'path'
import { Switch, Route, Redirect } from 'react-router-dom'
// import isServer from './helper/isServer'
import First from './containers/Login'

const loading = (<div>Loading...</div>)
/** 下面是代码分割异步加载的方式引入各页面 **/
const BindExistAccount = Loadable({
  loader: () => import("./containers/BindExistAccount"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ActivityRegister = Loadable({
  loader: () => import("./containers/ActivityRegister"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Home = Loadable({
  loader: () => import("./containers/HomePage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const JobPage = Loadable({
  loader: () => import("./containers/JobPage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const MassagePage = Loadable({
  loader: () => import("./containers/MassagePage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const UserPage = Loadable({
  loader: () => import("./containers/UserPage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const SearchEnd = Loadable({
  loader: () => import("./containers/SearchEnd"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Searchpage = Loadable({
  loader: () => import("./containers/Searchpage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const DeliveryRecord = Loadable({
  loader: () => import("./containers/DeliveryRecord"),
  loading: () => loading, // 自定义的Loading动画组件
});
const PrivacyService = Loadable({
  loader: () => import("./containers/PrivacyService"),
  loading: () => loading, // 自定义的Loading动画组件
});
const MoreSeeting = Loadable({
  loader: () => import("./containers/MoreSeeting"),
  loading: () => loading, // 自定义的Loading动画组件
});
const SystemMessage = Loadable({
  loader: () => import("./containers/SystemMessage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const SelectPost = Loadable({
  loader: () => import("./containers/SelectPost"),
  loading: () => loading, // 自定义的Loading动画组件
});
const SelectCompany = Loadable({
  loader: () => import("./containers/SelectCompany"),
  loading: () => loading, // 自定义的Loading动画组件
});
const BusinessLetter = Loadable({
  loader: () => import("./containers/BusinessLetter"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Subscription = Loadable({
  loader: () => import("./containers/Subscription"),
  loading: () => loading, // 自定义的Loading动画组件
});
const AddCompany = Loadable({
  loader: () => import("./containers/AddCompany"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ChangePassword = Loadable({
  loader: () => import("./containers/ChangePassword"),
  loading: () => loading, // 自定义的Loading动画组件
});
const BindMoblePhone = Loadable({
  loader: () => import("./containers/BindMoblePhone"),
  loading: () => loading, // 自定义的Loading动画组件
});
const BindEmail = Loadable({
  loader: () => import("./containers/BindEmail"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Opintion = Loadable({
  loader: () => import("./containers/Opintion"),
  loading: () => loading, // 自定义的Loading动画组件
});
const AboutOus = Loadable({
  loader: () => import("./containers/AboutOus"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeInfo = Loadable({
  loader: () => import("./containers/ResumeInfo"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeIntention = Loadable({
  loader: () => import("./containers/ResumeIntention"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeEducationEdit = Loadable({
  loader: () => import("./containers/ResumeEducationEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeEducation = Loadable({
  loader: () => import("./containers/ResumeEducation"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeExperienceEdit = Loadable({
  loader: () => import("./containers/ResumeExperienceEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeExperience = Loadable({
  loader: () => import("./containers/ResumeExperience"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeLanguageEdit = Loadable({
  loader: () => import("./containers/ResumeLanguageEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeLanguage = Loadable({
  loader: () => import("./containers/ResumeLanguage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeSkillsEdit = Loadable({
  loader: () => import("./containers/ResumeSkillsEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeSkills = Loadable({
  loader: () => import("./containers/ResumeSkills"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeTrainingEdit = Loadable({
  loader: () => import("./containers/ResumeTrainingEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeTraining = Loadable({
  loader: () => import("./containers/ResumeTraining"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeCertificateEdit = Loadable({
  loader: () => import("./containers/ResumeCertificateEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeCertificate = Loadable({
  loader: () => import("./containers/ResumeCertificate"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeOtherEdit = Loadable({
  loader: () => import("./containers/ResumeOtherEdit"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeOther = Loadable({
  loader: () => import("./containers/ResumeOther"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ResumeDescription = Loadable({
  loader: () => import("./containers/ResumeDescription"),
  loading: () => loading, // 自定义的Loading动画组件
});
const MicroResume = Loadable({
  loader: () => import("./containers/MicroResume"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Resume = Loadable({
  loader: () => import("./containers/Resume"),
  loading: () => loading, // 自定义的Loading动画组件
});
const JobDetails_pan = Loadable({
  loader: () => import("./containers/JobDetails_pan"),
  loading: () => loading, // 自定义的Loading动画组件
});
const CompanyIntroduce = Loadable({
  loader: () => import("./containers/CompanyIntroduce"),
  loading: () => loading, // 自定义的Loading动画组件
});
// console.log(path.join(__dirname, './containers/Login'))
let Login = Loadable({
  loader: () => import("./containers/Login"),
  loading: () => loading, // 自定义的Loading动画组件
  // delay: 300,
  // timeout: 10000, // 10 seconds
  // serverSideRequirePath: path.join(__dirname, './containers/Login'),
});

const LoginCode = Loadable({
  loader: () => import("./containers/LoginCode"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Register = Loadable({
  loader: () => import("./containers/Register"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ForgetPassword = Loadable({
  loader: () => import("./containers/ForgetPassword"),
  loading: () => loading, // 自定义的Loading动画组件
});
const Chat = Loadable({
  loader: () => import("./containers/Chat"),
  loading: () => loading, // 自定义的Loading动画组件
});
const TipOffs = Loadable({
  loader: () => import("./containers/TipOffs"),
  loading: () => loading, // 自定义的Loading动画组件
});
const MobileBind = Loadable({
  loader: () => import("./containers/MobileBind"),
  loading: () => loading, // 自定义的Loading动画组件
});
const EmailBind = Loadable({
  loader: () => import("./containers/EmailBind"),
  loading: () => loading, // 自定义的Loading动画组件
});
const PositionDetail = Loadable({
  loader: () => import("./containers/PositionDetail"),
  loading: () => loading, // 自定义的Loading动画组件
});
const CompanyDetail = Loadable({
  loader: () => import("./containers/CompanyDetail"),
  loading: () => loading, // 自定义的Loading动画组件
});
const HomePage = Loadable({
  loader: () => import("./containers/HomePage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const BlocPage = Loadable({
  loader: () => import("./containers/BlocPage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const routes = [
  {
    path: '/user/bindExistAccount',
    component: BindExistAccount,
  },
  {
    path: '/bloc/:c_userid',
    component: BlocPage,
  },
  {
    path: '/activityRegister',
    component: ActivityRegister,
  },
  {
    path: '/tabs/home',
    component: Home,
  },
  {
    path: '/tabs/job',
    component: JobPage,
  },
  {
    path: '/tabs/massage',
    component: MassagePage,
  },
  {
    path: '/tabs/user',
    component: UserPage,
  },
  {
    path: '/search/:keyword',
    component: SearchEnd,
  },
  {
    path: '/search',
    component: Searchpage,
  },
  {
    path: '/person/applyRecord',
    component: DeliveryRecord,
  },
  {
    path: '/person/privacy',
    component: PrivacyService,
  },
  {
    path: '/person/more',
    component: MoreSeeting,
  },
  {
    path: '/person/message',
    component: SystemMessage,
  },
  {
    path: '/person/jobFavorites',
    component: SelectPost,
  },
  {
    path: '/person/followedCompanies',
    component: SelectCompany,
  },
  {
    path: '/person/letter/:message_id',
    component: BusinessLetter,
  },
  {
    path: '/person/subscription',
    component: Subscription,
  },
  {
    path: '/person/shield',
    component: AddCompany,
  },
  {
    path: '/user/changePassword',
    component: ChangePassword,
  },
  {
    path: '/user/bindPhone',
    component: BindMoblePhone,
  },
  {
    path: '/user/bindEmail',
    component: BindEmail,
  },
  {
    path: '/feedback',
    component: Opintion,
  },
  {
    path: '/aboutous',
    component: AboutOus,
  },
  {
    path: '/resume/info',
    component: ResumeInfo,
  },
  {
    path: '/resume/intention',
    component: ResumeIntention,
  },
  {
    path: '/resume/education/:id',
    component: ResumeEducationEdit,
  },
  {
    path: '/resume/education',
    component: ResumeEducation,
  },
  {
    path: '/resume/experience/:id',
    component: ResumeExperienceEdit,
  },
  {
    path: '/resume/experience',
    component: ResumeExperience,
  },
  {
    path: '/resume/language/:id',
    component: ResumeLanguageEdit,
  },
  {
    path: '/resume/language',
    component: ResumeLanguage,
  },
  {
    path: '/resume/skills/:id',
    component: ResumeSkillsEdit,
  },
  {
    path: '/resume/skills',
    component: ResumeSkills,
  },
  {
    path: '/resume/training/:id',
    component: ResumeTrainingEdit,
  },
  {
    path: '/resume/training',
    component: ResumeTraining,
  },
  {
    path: '/resume/certificate/:id',
    component: ResumeCertificateEdit,
  },
  {
    path: '/resume/certificate',
    component: ResumeCertificate,
  },
  {
    path: '/resume/other/:id',
    component: ResumeOtherEdit,
  },
  {
    path: '/resume/other',
    component: ResumeOther,
  },
  {
    path: '/resume/description',
    component: ResumeDescription,
  },
  {
    path: '/resume/micro',
    component: MicroResume,
  },
  {
    path: '/resume',
    component: Resume,
  },
  {
    path: '/jobdetails',
    component: JobDetails_pan,
  },
  {
    path: '/companyintroduce',
    component: CompanyIntroduce,
  },
  {
    path: '/user/login',
    component: Login,
  },
  {
    path: '/user/logincode',
    component: LoginCode,
  },
  {
    path: '/user/register',
    component: Register,
  },
  {
    path: '/user/forgetPassword',
    component: ForgetPassword,
  },
  {
    path: '/chat/:id',
    component: Chat,
  },
  {
    path: '/tip-offs',
    component: TipOffs,
  },
  {
    path: '/mobilebind/:status/:mobile/:hidden_mobile',
    component: MobileBind,
  },
  {
    path: '/emailbind/:status/:email/:hidden_email',
    component: EmailBind,
  },
  {
    path: '/:company_id/:job_id',
    component: PositionDetail,
  },
  {
    path: '/:company_id',
    component: CompanyDetail,
  },
  {
    path: '/',
    component: HomePage,
  },
]
export default (
  <Switch>
    <Redirect exact from="/" to="/tabs/home" />
    {routes.map(({ path, exact, component: Component, ...rest }) => (
      <Route key={path} path={path} render={(props) => (
        <Component {...props} {...rest} />
      )} />
    ))}
  </Switch>
)
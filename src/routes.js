import Loadable from "react-loadable";
import React from 'react'
// import path from 'path'
import { Switch, Route, Redirect } from 'react-router-dom'
const styleObj = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  lineHeight: '400px',
}
const loading = (<div style={styleObj}>Loading...</div>)
/** 下面是代码分割异步加载的方式引入各页面 **/
const PerfectionResume = Loadable({
  loader: () => import("./containers/PerfectionResume"),
  loading: () => loading, // 自定义的Loading动画组件
});
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
const SelectConcern = Loadable({
  loader: () => import("./containers/SelectConcern"),
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
  loader: () => import("./containers/OpintionPage"),
  loading: () => loading, // 自定义的Loading动画组件
});
const CoupleBack = Loadable({
  loader: () => import("./containers/Opintion"),
  loading: () => loading, // 自定义的Loading动画组件
});
const ProblemPages = Loadable({
  loader: () => import("./containers/ProblemPage"),
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
const ResumePreview = Loadable({
  loader: () => import("./containers/ResumePreview"),
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
const LoginPage = Loadable({
  loader: () => import("./containers/LoginPage"),
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

const Agreement = Loadable({
  loader: () => import("./containers/Agreement"),
  loading: () => loading, // 自定义的Loading动画组件
});
const routes = [
  {
    path: '/resume/micro/perfect',
    exact: true,
    component: PerfectionResume,
  },
  {
    path: '/user/bindExistAccount',
    exact: true,
    component: BindExistAccount,
  },
  {
    path: '/bloc/:c_userid',
    exact: true,
    component: BlocPage,
  },
  {
    path: '/activityRegister',
    exact: true,
    component: ActivityRegister,
  },
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/job',
    exact: true,
    component: JobPage,
  },
  {
    path: '/agreement',
    exact: true,
    component: Agreement,
  },
  {
    path: '/search/:keyword',
    exact: true,
    component: SearchEnd,
  },
  {
    path: '/search',
    exact: true,
    component: Searchpage,
  },
  {
    path: '/person/applyRecord',
    exact: true,
    component: DeliveryRecord,
  },
  {
    path: '/person/privacy',
    exact: true,
    component: PrivacyService,
  },
  {
    path: '/person/more',
    exact: true,
    component: MoreSeeting,
  },
  {
    path: '/person/message',
    exact: true,
    component: SystemMessage,
  },
  {
    path: '/person/jobFavorites',
    exact: true,
    component: SelectPost,
  },
  {
    path: '/person/followedCompanies',
    exact: true,
    component: SelectCompany,
  },
  {
    path: '/person/concern',
    exact: true,
    component: SelectConcern,
  },
  {
    path: '/person/letter/:message_id',
    exact: true,
    component: BusinessLetter,
  },
  {
    path: '/person/subscription',
    exact: true,
    component: Subscription,
  },
  {
    path: '/person/shield',
    exact: true,
    component: AddCompany,
  },
  {
    path: '/user',
    exact: true,
    component: UserPage,
  },
  {
    path: '/user/changePassword',
    exact: true,
    component: ChangePassword,
  },
  {
    path: '/user/bindPhone',
    exact: true,
    component: BindMoblePhone,
  },
  {
    path: '/user/bindEmail',
    exact: true,
    component: BindEmail,
  },
 
  {
    path: '/feedback',
    exact: true,
    component: Opintion,
  },
  {
    path: '/coupleBack',
    exact: true,
    component: CoupleBack,
  },
  {
    path: '/problem/:id',
    exact: true,
    component: ProblemPages,
  },
  {
    path: '/aboutous',
    exact: true,
    component: AboutOus,
  },
  {
    path: '/resume/info',
    exact: true,
    component: ResumeInfo,
  },
  {
    path: '/resume/intention',
    exact: true,
    component: ResumeIntention,
  },
  {
    path: '/resume/education/:id',
    exact: true,
    component: ResumeEducationEdit,
  },
  {
    path: '/resume/education',
    exact: true,
    component: ResumeEducation,
  },
  {
    path: '/resume/experience/:id',
    exact: true,
    component: ResumeExperienceEdit,
  },
  {
    path: '/resume/experience',
    exact: true,
    component: ResumeExperience,
  },
  {
    path: '/resume/language/:id',
    exact: true,
    component: ResumeLanguageEdit,
  },
  {
    path: '/resume/language',
    exact: true,
    component: ResumeLanguage,
  },
  {
    path: '/resume/skills/:id',
    exact: true,
    component: ResumeSkillsEdit,
  },
  {
    path: '/resume/skills',
    exact: true,
    component: ResumeSkills,
  },
  {
    path: '/resume/training/:id',
    exact: true,
    component: ResumeTrainingEdit,
  },
  {
    path: '/resume/training',
    exact: true,
    component: ResumeTraining,
  },
  {
    path: '/resume/certificate/:id',
    exact: true,
    component: ResumeCertificateEdit,
  },
  {
    path: '/resume/certificate',
    exact: true,
    component: ResumeCertificate,
  },
  {
    path: '/resume/other/:id',
    exact: true,
    component: ResumeOtherEdit,
  },
  {
    path: '/resume/other',
    exact: true,
    component: ResumeOther,
  },
  {
    path: '/resume/description',
    exact: true,
    component: ResumeDescription,
  },
  {
    path: '/resume/micro',
    exact: true,
    component: MicroResume,
  },
  {
    path: '/resume',
    exact: true,
    component: Resume,
  },
  {
    path: '/resumepreview',
    exact: true,
    component: ResumePreview,
  },
  {
    path: '/jobdetails',
    exact: true,
    component: JobDetails_pan,
  },
  {
    path: '/companyintroduce',
    exact: true,
    component: CompanyIntroduce,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/user/forgetPassword',
    exact: true,
    component: ForgetPassword,
  },
  {
    path: '/chat/:id',
    exact: true,
    component: Chat,
  },
  {
    path: '/tip-offs',
    exact: true,
    component: TipOffs,
  },
  {
    path: '/mobilebind/:status/:mobile/:hidden_mobile',
    exact: true,
    component: MobileBind,
  },
  {
    path: '/emailbind/:status/:email/:hidden_email',
    exact: true,
    component: EmailBind,
  },
  {
    path: '/:company_id/:job_id',
    exact: true,
    component: PositionDetail,
  },
  {
    path: '/:company_id',
    exact: true,
    component: CompanyDetail,
  },
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  
]
export default (
  <Switch>
    <Redirect exact from="/" to="/home" />
    {routes.map(({ path, exact, component: Component, ...rest }) => (
      <Route key={path} path={path} exact={exact} render={(props) => (
        <Component {...props} {...rest} />
      )} />
    ))}
  </Switch>
)
// 清酒稻香
import React from 'react'
import Tab from './containers/Tabs'
import { Switch, Route, Redirect } from 'react-router-dom'
const codeTypeTentXun = true  // 默认使用腾讯验证码
let loginComponent = require('./containers/Login/index2').default
let loginCodeComponent = require('./containers/LoginCode/index2').default
let registerComponent = require('./containers/Register/index2').default
let forgetPasswordComponent = require('./containers/ForgetPassword/index2').default
let bindMoblePhoneComponent = require('./containers/BindMoblePhone/index2').default
let bindEmailComponent = require('./containers/BindEmail/index2').default
if (!codeTypeTentXun) {
  loginComponent = require('./containers/Login/index').default
  registerComponent = require('./containers/Register/index').default
  forgetPasswordComponent = require('./containers/ForgetPassword/index').default
  loginCodeComponent = require('./containers/LoginCode/index').default
  bindMoblePhoneComponent = require('./containers/BindMoblePhone/index').default
  bindEmailComponent = require('./containers/BindEmail/index').default
}

export default (
  <Switch>
      <Route
        path="/activityRegister"
        component={require('./containers/ActivityRegister').default} />
      {/*<Route*/}
        {/*path="/tabs/:name"*/}
        {/*component={props => (<Tab {...props} />)} />*/}
      <Route
        path="/tabs/home"
        component={require('./containers/HomePage').default} />
      <Route
        path="/tabs/job"
        component={require('./containers/JobPage').default} />
      <Route
        path="/tabs/massage"
        component={require('./containers/MassagePage').default} />
      <Route
        path="/tabs/user"
        component={require('./containers/UserPage').default} />
      <Route
        path="/search/:keyword"
        component={require('./containers/SearchEnd').default} />
      <Route
        path="/search"
        component={require('./containers/Searchpage').default} />
      <Route
        path="/person/applyRecord"
        component={require('./containers/DeliveryRecord').default} />
      <Route
        path="/person/privacy"
        component={require('./containers/PrivacyService').default} />
      <Route
        path="/person/more"
        component={require('./containers/MoreSeeting').default} />
      <Route
        path="/person/message"
        component={require('./containers/SystemMessage').default} />
      <Route
        path="/person/jobFavorites"
        component={require('./containers/SelectPost').default} />
      <Route
        path="/person/followedCompanies"
        component={require('./containers/SelectCompany').default} />
      <Route
        path="/person/letter/:message_id"
        component={require('./containers/BusinessLetter').default} />
      <Route
        path="/person/subscription"
        component={require('./containers/Subscription').default} />
      <Route
        path="/person/shield"
        component={require('./containers/AddCompany').default} />
      <Route
        path="/user/changePassword"
        component={require('./containers/ChangePassword').default} />
      <Route
        path="/user/bindPhone"
        component={bindMoblePhoneComponent} />
      <Route
        path="/user/bindEmail"
        component={bindEmailComponent} />
      <Route
        path="/feedback"
        component={require('./containers/Opintion').default} />
      <Route
        path="/aboutous"
        component={require('./containers/AboutOus').default} />
      <Route
        path="/resume/info"
        component={require('./containers/ResumeInfo').default} />
      <Route
        path="/resume/intention"
        component={require('./containers/ResumeIntention').default} />
      <Route
        path="/resume/education/:id"
        component={require('./containers/ResumeEducationEdit').default} />
      <Route
        path="/resume/education"
        component={require('./containers/ResumeEducation').default} />
      <Route
        path="/resume/experience/:id"
        component={require('./containers/ResumeExperienceEdit').default} />
      <Route
        path="/resume/experience"
        component={require('./containers/ResumeExperience').default} />
      <Route
        path="/resume/language/:id"
        component={require('./containers/ResumeLanguageEdit').default} />
      <Route
        path="/resume/language"
        component={require('./containers/ResumeLanguage').default} />
      <Route
        path="/resume/skills/:id"
        component={require('./containers/ResumeSkillsEdit').default} />
      <Route
        path="/resume/skills"
        component={require('./containers/ResumeSkills').default} />
      <Route
        path="/resume/training/:id"
        component={require('./containers/ResumeTrainingEdit').default} />
      <Route
        path="/resume/training"
        component={require('./containers/ResumeTraining').default} />
      <Route
        path="/resume/certificate/:id"
        component={require('./containers/ResumeCertificateEdit').default} />
      <Route
        path="/resume/certificate"
        component={require('./containers/ResumeCertificate').default} />
      <Route
        path="/resume/other/:id"
        component={require('./containers/ResumeOtherEdit').default} />
      <Route
        path="/resume/other"
        component={require('./containers/ResumeOther').default} />
      <Route
        path="/resume/description"
        component={require('./containers/ResumeDescription').default} />
      <Route
        path="/resume/micro"
        component={require('./containers/MicroResume').default} />
      <Route
        path="/resume"
        component={require('./containers/Resume').default} />
      <Route
        path="/jobdetails"
        component={require('./containers/JobDetails_pan').default} />
      <Route
        path="/companyintroduce"
        component={require('./containers/CompanyIntroduce').default} />
      <Route
        path="/user/login"
        component={loginComponent} />
      <Route
        path="/user/logincode"
        component={loginCodeComponent} />
      <Route
        path="/user/register"
        component={registerComponent} />
      <Route
        path="/user/forgetPassword"
        component={forgetPasswordComponent} />
      <Route
        path="/chat/:id"
        component={require('./containers/Chat').default} />
      <Route
        path="/tip-offs"
        component={require('./containers/TipOffs').default} />
      <Route
        path="/mobilebind/:status/:mobile/:hidden_mobile"
        component={require('./containers/MobileBind').default} />
      <Route
        path="/emailbind/:status/:email/:hidden_email"
        component={require('./containers/EmailBind').default} />
      <Route
        path="/:comapny_id/:job_id"
        component={require('./containers/PositionDetail').default} />
      <Route
        path="/:comapny_id"
        component={require('./containers/CompanyDetail').default} />
      <Route
        path="/"
        component={require('./containers/HomePage').default} />
      <Redirect to="/" />
    {/* <Route component={() => <h1>404</h1>} /> */}
  </Switch>
)
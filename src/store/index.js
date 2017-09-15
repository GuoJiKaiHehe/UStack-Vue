import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import auth from './modules/auth'
import global from './modules/global'
import showmsg from './modules/showmsg'
import people from './modules/people'
import projectType from './modules/projectType'

import delete_item from './modules/delete'
import projectConfig from './modules/projectConfig'
import sensorType from './modules/sensorType'
import project from './modules/project'
import deviceType from './modules/deviceType'
import areaType from './modules/areaType'
import classification from './modules/classification'
import device from './modules/device'
import verification from './modules/verification'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  modules: {
    global,
    auth,
    showmsg,
    people,
    projectType,
    delete_item,
    projectConfig,
    sensorType,
    project,
    deviceType,
    device,
    verification,
    areaType,
    classification
  },

})

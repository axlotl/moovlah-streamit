import service from '@/store/services/profile-service';
// import jwt from 'jsonwebtoken';

const objectIsEmpty = (obj) => {
   for (var x in obj) { return false; }
   return true;
}

const state = {
  me: null,
  myacl:null,
  account:null,
  cubetoken:null,
  permissions:[],
  allowedPermissions:[],
  roles:[],
  accountList:[],
  myaccountsroles:[],
  myaccountspermissions:[],
  acl: {},
  currentAccount: {},
  accounts: {},
  verifiedUser: false,
  myaccount : null
};

const mutations = {
  SET_RESOURCE: (state, me) => {
    state.me = me;
  },

  SET_ACL: (state, acl) => {
    //console.log('SET ACL', acl);
    state.acl = acl.permissions;
    state.accounts = acl.accounts;
    state.currentAccount = acl.currentAccount;
    state.cubeJSToken    = acl.cubeJSToken;
    state.verifiedUser   =  acl.verified

    state.myaccount  = acl.myaccount

  },

  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },

  SET_ACCOUNTS_PERMISSIONS: (state, myaccountspermissions) => {
    state.myaccountspermissions = myaccountspermissions;
  },

  SET_CUBE_TOKEN: (state, myaccounts) => {
   // console.info('cubeperms', myaccounts);
    const dta = {
      account_id: myaccounts.default_account,
      permissions: {}
    };
    for(let acc in myaccounts.account_permissions) {
      console.info('cubeacc', acc, myaccounts.default_account);
      if(parseInt(acc) === myaccounts.default_account) {
        console.info('cubeacc match', acc);
        for(let r in myaccounts.account_permissions[acc].roles) {
          for(let rp in myaccounts.account_permissions[acc].roles[r]) {
            const str = rp.split(" ").pop();
            dta.permissions[str] = dta.permissions[str] || {};
          }
        }
        for(let x=0; x < myaccounts.account_permissions[acc].permissions.length; x++) {
          const str = myaccounts.account_permissions[acc].permissions[x].name.split(" ").pop();
          dta.permissions[str] = dta[str] || {};
          if(myaccounts.account_permissions[acc].permissions[x].allowed_ids) {
            dta.permissions[str].allowed_ids = myaccounts.account_permissions[acc].permissions[x].allowed_ids;
          }
        }
      }
    }
    console.info('cubedta', dta);
    //state.cubetoken = jwt.sign(dta, process.env.VUE_APP_CUBE_API_SECRET, { expiresIn: '30d' });
    console.info('tok', state.cubetoken);
  },


  SET_ACCOUNT_LIST: (state, accountList) => {
    state.accountList = accountList;
  },


  SET_ACCOUNTS_ROLES: (state, myaccountsroles) => {
    state.myaccountsroles = myaccountsroles;
  },

  SET_ACESS_LIST: (state, myacl) => {
   // console.log('SET ACCESS LIST', myacl);
    state.myacl               = myacl;
    state.permissions         = myacl.permissions || [];
    state.allowedPermissions  = myacl.allowed;

    state.roles               = myacl.user_roles;
   }
};

const actions = {

  loadACL({commit, dispatch}, params) {
     if(!objectIsEmpty(state.acl) && !objectIsEmpty(state.accounts) && !objectIsEmpty(state.currentAccount)) {
       return {
         acl: state.acl,
         accounts: state.accounts,
         currentAccount: state.currentAccount
       };
     }
     return service.acl()
     .then((data) => {
      commit('SET_ACL', data);
       return {
        acl: data.permissions,
        accounts: data.accounts,
        currentAccount: data.currentAccount
      };
    }).catch((e) => {
      console.error('login error');
    const data = {
        acl: {},
        accounts: {},
        currentAccount: {}
      }
      commit('SET_ACL', data);
      dispatch('auth/logout', null, { root: true })
      return {
        acl: {},
        accounts: {},
        currentAccount: {}
      }
    });
  },

  me({commit, dispatch}, params = {}) {
    if(state.me && state.me.id && state.myaccountsroles.length > 0) {
      return {
        me: state.me,
        myaccountsroles: state.myaccountsroles
      };
    }
    console.info('me back to source');
    return service.get(params)
      .then((profile) => {
          console.info('me return', profile.list, profile.accounts);
         commit('SET_RESOURCE'      , profile.list);
         commit('SET_ACCOUNTS_ROLES', profile.accounts);

      });
  },



  emailVerify({commit, dispatch},params) {

    return service.emailVerify(params)
         .then((data) => {
                // console.log(data);
                 return data

              });

     },


  sendVeriyUrl({commit, dispatch},params) {

      return service.sendVeriyUrl(params)
           .then((data) => {
                  // console.log(data);
                   return data

                });

       },

  resend({commit, dispatch},params) {

          return service.resend(params)
              .then((data) => {
                      return data

                    });

          },


  setAccount({commit, dispatch}, accountId) {
      commit('SET_ACCOUNT',accountId);
      return service.setDefaultAccount(accountId)
      .then((data) => {
        commit('SET_ACCOUNT',accountId);
        return service.acl()
        .then((data) => {
         // console.log(data);
          commit('SET_ACL', data);
        });
      });

  },


  getAccounts({commit, dispatch}, params) {
    if(state.accountList.length > 0 && state.account !== null && state.myacl && (state.myacl.permissions || state.myacl.allowed || state.myacl.permissions)) {
      return {
        accountList: state.accountList,
        account: state.account,
        myacl: state.myacl
      };
    }
    console.info('getAccounts back to source');
    return service.myaccounts(params)
      .then((data) => {
        console.info('getAccounts return');
        commit('SET_ACCOUNT_LIST', data.accounts);
        commit('SET_ACCOUNT'     , data.default);
        commit('SET_ACESS_LIST'  , data.myacl);
      });
  },

  async getAccountsPermissions({commit, dispatch}, params) {
    if(state.myaccountspermissions.length > 0 || state.cubetoken !== null) {
      return {
        accountsPermissions: state.myaccountspermissions,
        cubeToken: state.cubetoken
      };
    }
    ///console.info('getAccountsPermissions back to source');
    return service.accountsPermissions(params)
      .then((data) => {
        console.info('getAccountsPermissions return', data.account_permissions);
        commit('SET_ACCOUNTS_PERMISSIONS', data.account_permissions);
        commit('SET_CUBE_TOKEN', data);
      });
  },


  setAcessList({commit, dispatch}, params) {
      let account_id = state.account
       return service.permissions()
      .then((data) => {
        commit('SET_ACESS_LIST', data);
      });
  },


  update({commit, dispatch}, params) {
    return service.update(params)
      .then((profile) => {
        commit('SET_RESOURCE', profile);
      });
  },
};

const getters = {
  me: state => state.me,
  myacl: state => state.myacl,
  allowedPermissions : state => state.allowedPermissions,
  permissions: (state) => state.permissions.map( p => (p.name)),
  roles :  (state) => state.roles.map( p => (p.name)),
  accountList : (state) => state.accounts ,
  account : (state) => state.account,
  accountsRoles :  (state) => state.myaccountsroles,
  accountsPermissions: (state) => state.myaccountspermissions,
  cubeToken: (state) => state.cubeJSToken,
  acl: (state) => state.acl,
  accounts: (state) => state.accounts,
  currentAccount: (state) => state.currentAccount,
  verification :(state) => state.verifiedUser,
  myaccount : (state) => state.myaccount
};

const profile = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default profile;

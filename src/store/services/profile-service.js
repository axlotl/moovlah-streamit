import axios from 'axios';
import Jsona from 'jsona';

const url = process.env.VUE_APP_API_BASE_URL;
const jsona = new Jsona();

function get() {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.get(`${url}/me`, options)

    .then((response) => {
      console.info('meresp', response.data);
      return {
        list: jsona.deserialize(response.data),
        meta: response.data.meta,
        //roles:response.data.data.user_roles,
        accounts: response.data.data.user_accounts
      };
    });
}


function emailVerify(params) {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

   var params = JSON.parse(JSON.stringify(params))

    return axios.get(`${url}/email/verify/${params.userId}?expires=${params.expires}&hash=${params.hash}&signature=${params.signature}`, options)
         .then((response) => {
       //console.info('veriyresponse', response.data);
       return response.data

    });
}


function sendVeriyUrl() {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };


    return axios.get(`${url}/verify-email`, options)
         .then((response) => {
       //console.info('veriyresponse', response.data);
       return response.data

    });
}


function resend(email) {

  const payload = {
    email : email,

  };

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };


    return axios.post(`${url}/verify-resend`, payload, options)
         .then((response) => {
          //console.info('veriyresponse', response.data);
          return response.data

    });
}




function update(profile) {

  const payload = jsona.serialize({
    stuff: profile,
    includeNames: []
  });

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.patch(`${url}/me`, payload, options)
    .then(response => {
      return jsona.deserialize(response.data);
    });
}

function acl(){
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.get(`${url}/acl`, options)
    .then(response => {
       return response.data;
    });
}

function permissions(){
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.get(`${url}/myacl`, options)
    .then(response => {
       return response.data;
    });
}

function accountsPermissions(){
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  /**
  ADD CATCH IN HERE AND IN OTHERS
  */
  return axios.get(`${url}/accounts-permissions`, options)
    .then(response => {
       return response.data;
    });
}



function setDefaultAccount(account) {

  const payload = {
    account_id: account,

   };

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.patch(`${url}/set-account`, payload, options)
    .then(response => {
      console.log(response)
      return response.data
     });
}


function myaccounts() {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.get(`${url}/my-accounts`, options)
    .then(response => {
      return response.data

    });
}

export default {
  get,
  update,
  permissions,
  setDefaultAccount,
  accountsPermissions,
  myaccounts,
  acl,
  emailVerify,
  sendVeriyUrl,
  resend
};

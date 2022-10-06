import * as React from 'react';
import axios from 'axios';
import Constant from '../Component/Constant';
import CommonMethods from '../Lib/CommonMethods';
import NetInfo from "@react-native-community/netinfo";

export default class Apicall extends React.Component {


    static ApiMethod(Method, Url, SendData) {
        console.log("encryptedval", SendData);
        var config = {
            method: Method,
            url: Constant.Base_Url + Url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: SendData
        };
        console.log("configfile", config);

        return axios(config)
            .then((response) => {
                console.log("api_call is successfull and data send", response);
                return response;
            })
            .catch((error) => {
                console.log("api_responsefail_resp move in catech", error);
                CommonMethods.showSuccess("Someting went wrong? Please try again")
                return error;
            });

    }
    static MainApiMethod(Method, Url, SendData, data) {
        console.log("encryptedval", SendData, data);
        var config = {
            method: Method,
            url: Constant.Base_Url + Url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + SendData
            },
            data: data
        };
        console.log("configfile", config);

        return axios(config)
            .then((response) => {
                // console.log("mainapicall", response);
                return response;
            })
            .catch((error) => {
                console.log("mainapicallerror", error);
                return error;
            });

    }
}
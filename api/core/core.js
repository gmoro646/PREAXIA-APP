

module.exports = function (req) {
    //setting default value
    this.Code = "P00001";
    this.Message = "Success";
    this.Data = null;
    this.req = req;

    this.getSuccessOutOut = function () {
        return {
            Code :"P00001",
            Message : this.Message , // "Get message from repo";
            Data : this.Data
        }
    };

    this.getErrorOutOut = function (code) {
        return {
            Code :code,
            Message : this.getMessageByCode(code), // "Get message from repo";
            Data : null
        }
    };

    this.getMessageByCode = function (code) {
        var codes = [
            { Code: "ERR000", Text: "Unknown error code"},
            { Code: "ACC011", Text: "Link Expired", GTEXT: "this is gernam error message" },
            { Code: "ACC013", Text: "Link Verified" },
            { Code: "ACC012", Text: "Link does't Exist" },
            { Code: "ACC001", Text: "Invalid username and password" },
            { Code: "ACC002", Text: "Email Id Already Exist" },
            { Code: "E00002", Text: "Second Message" },
            { Code: "POS001", Text: "Email Id Already Exist" },
            { Code: "UPD001", Text: "Error updating in record" },
            { Code: "PRC001", Text: "Process not defined  in the system" },
            { Code: "ACC005", Text: "Add Post operation failed.", },
            { Code: "PRC002", Text: "Invalid username or password", GTEXT: "this is gernam error message for prc002" },
            { Code: "PRE001", Text: "User does't Exist" },
            { Code: "PRE002", Text: "Enter data is not in correct format" },
            { Code: "ACC007", Text: "Incorrect refferal code" }
        ];

        var txt = "Unknown error code";
        for (var i = 0; i < codes.length; i++) {
            if (codes[i].Code == code) {
                var lang = "en"
                if (this.req && this.req.headers.lang)
                    lang = this.req.headers.lang
                
                if (lang == "en")
                    txt = codes[i].Text;
                else
                    txt = codes[i].GTEXT;
                break;
            }
        }

        return txt;
    };

    this.wrapResponse = function (data, errorCode) {
        var toReturn = null;
        if (errorCode) {
            toReturn = this.getErrorOutOut(errorCode);
            toReturn.Data = null;
        } else {
            toReturn = this.getSuccessOutOut();
            toReturn.Data = data;
        }
        return toReturn;
    }

    this.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

}